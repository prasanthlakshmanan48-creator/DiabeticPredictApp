import time
import os
import warnings
import pandas as pd

from sklearn.model_selection import cross_val_score, GridSearchCV
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    roc_auc_score, confusion_matrix, classification_report
)

# 10 Classification Algorithms
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import (
    RandomForestClassifier,
    GradientBoostingClassifier,
    AdaBoostClassifier,
    ExtraTreesClassifier
)
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier
from sklearn.naive_bayes import GaussianNB

# Suppress sklearn deprecation/future warnings
warnings.filterwarnings('ignore')

# Optional XGBoost import with graceful fallback
try:
    from xgboost import XGBClassifier
    HAS_XGBOOST = True
except ImportError:
    HAS_XGBOOST = False


def get_models():
    """Instantiates and returns the 10 machine learning classification models."""
    models = {
        'Logistic Regression': LogisticRegression(max_iter=1000, random_state=42),
        'Decision Tree': DecisionTreeClassifier(random_state=42),
        'Random Forest': RandomForestClassifier(n_estimators=120, max_depth=8, random_state=42),
        'Support Vector Machine': SVC(probability=True, random_state=42),
        'K-Nearest Neighbors': KNeighborsClassifier(n_neighbors=5),
        'Naive Bayes': GaussianNB(),
        'Gradient Boosting': GradientBoostingClassifier(n_estimators=100, random_state=42),
        'AdaBoost': AdaBoostClassifier(n_estimators=100, random_state=42),
        'Extra Trees': ExtraTreesClassifier(n_estimators=100, random_state=42),
    }

    if HAS_XGBOOST:
        models['XGBoost'] = XGBClassifier(
            use_label_encoder=False,
            eval_metric='logloss',
            random_state=42
        )
    else:
        models['XGBoost (GBM Fallback)'] = GradientBoostingClassifier(
            n_estimators=150,
            learning_rate=0.05,
            random_state=42
        )

    return models


def tune_hyperparameters(X_train, y_train):
    """Performs GridSearchCV hyperparameter tuning on key classifiers:
    Random Forest, Decision Tree, SVM, KNN, and XGBoost.
    """
    print("\n==========================================================")
    print(" PERFORMING GRIDSEARCHCV HYPERPARAMETER TUNING")
    print("==========================================================")

    param_grids = {
        'Random Forest': (
            RandomForestClassifier(random_state=42),
            {'n_estimators': [50, 100, 150], 'max_depth': [5, 8, 12, None]}
        ),
        'Decision Tree': (
            DecisionTreeClassifier(random_state=42),
            {'max_depth': [3, 5, 8, 12], 'min_samples_split': [2, 5, 10]}
        ),
        'Support Vector Machine': (
            SVC(probability=True, random_state=42),
            {'C': [0.1, 1, 10], 'kernel': ['rbf', 'linear']}
        ),
        'K-Nearest Neighbors': (
            KNeighborsClassifier(),
            {'n_neighbors': [3, 5, 7, 9], 'weights': ['uniform', 'distance']}
        )
    }

    tuned_models = {}
    best_params_summary = {}

    for name, (base_model, param_grid) in param_grids.items():
        grid_search = GridSearchCV(base_model, param_grid, cv=3, scoring='accuracy', n_jobs=-1)
        grid_search.fit(X_train, y_train)
        tuned_models[name] = grid_search.best_estimator_
        best_params_summary[name] = grid_search.best_params_
        print(f"  [Tuned] {name:22s} | Best CV Accuracy: {grid_search.best_score_*100:.2f}% | Params: {grid_search.best_params_}")

    return tuned_models, best_params_summary


def evaluate_models(models, X_train, X_test, y_train, y_test):
    """Trains each candidate algorithm, records latency, computes evaluation metrics,
    and returns a trained models dictionary along with a sorted comparison DataFrame.
    """
    results_list = []
    trained_models = {}

    for name, model in models.items():
        try:
            # Measure training latency
            t0 = time.time()
            model.fit(X_train, y_train)
            t_train = time.time() - t0

            # Measure inference latency
            t0 = time.time()
            y_pred = model.predict(X_test)
            t_pred = time.time() - t0

            # Probability predictions for ROC AUC
            if hasattr(model, "predict_proba"):
                y_prob = model.predict_proba(X_test)[:, 1]
            else:
                y_prob = y_pred

            # Calculate evaluation metrics
            acc = accuracy_score(y_test, y_pred)
            prec = precision_score(y_test, y_pred, zero_division=0)
            rec = recall_score(y_test, y_pred, zero_division=0)
            f1 = f1_score(y_test, y_pred, zero_division=0)

            try:
                roc_auc = roc_auc_score(y_test, y_prob)
            except Exception:
                roc_auc = 0.5

            # 5-Fold Cross Validation Score
            cv_scores = cross_val_score(model, X_train, y_train, cv=5, scoring='accuracy')
            cv_mean = cv_scores.mean()

            # Store metrics
            results_list.append({
                'Algorithm': name,
                'Accuracy': round(acc, 5),
                'Precision': round(prec, 5),
                'Recall': round(rec, 5),
                'F1 Score': round(f1, 5),
                'ROC AUC': round(roc_auc, 5),
                'CV Score': round(cv_mean, 5),
                'Training Time (s)': round(t_train, 4),
                'Prediction Time (s)': round(t_pred, 4)
            })

            cm = confusion_matrix(y_test, y_pred)

            # Store model object, y_proba, and confusion matrix
            trained_models[name] = {
                'model': model,
                'y_proba': y_prob,
                'confusion_matrix': cm,
                'metrics': {'roc_auc': roc_auc}
            }

            print(f"  {name:25s} | Acc: {acc*100:5.2f}% | F1: {f1:.3f} | ROC AUC: {roc_auc:.3f} | Train: {t_train:.3f}s")

        except Exception as e:
            print(f"  [!] Failed training algorithm {name}: {str(e)}")

    # Convert results into a DataFrame and sort by Accuracy descending
    comparison_df = pd.DataFrame(results_list)
    if not comparison_df.empty:
        comparison_df = comparison_df.sort_values(by='Accuracy', ascending=False).reset_index(drop=True)

    return trained_models, comparison_df


def generate_evaluation_report(comparison_df, best_model_name, report_path='results/final_report.txt'):
    """Generates a text report summarizing the pipeline benchmark results."""
    os.makedirs(os.path.dirname(report_path), exist_ok=True)
    with open(report_path, 'w', encoding='utf-8') as f:
        f.write("=======================================================================\n")
        f.write(" INTELLIGENT DIABETES PREDICTION SYSTEM - ML BENCHMARK REPORT\n")
        f.write("=======================================================================\n\n")
        f.write(f"Best Performing Classifier Algorithm: {best_model_name}\n\n")
        f.write("MODEL COMPARISON TABLE:\n")
        f.write(comparison_df.to_string(index=False))
        f.write("\n\n=======================================================================\n")


def export_and_generate_report(comparison_df, best_name, results_dir):
    """Exports comparison table to CSV, XLSX, and text report."""
    os.makedirs(results_dir, exist_ok=True)
    csv_path = os.path.join(results_dir, 'model_comparison.csv')
    xlsx_path = os.path.join(results_dir, 'model_comparison.xlsx')
    txt_path = os.path.join(results_dir, 'final_report.txt')

    comparison_df.to_csv(csv_path, index=False)
    print(f" Model comparison table exported to: {csv_path}")

    try:
        comparison_df.to_excel(xlsx_path, index=False)
        print(f" Model comparison table exported to: {xlsx_path}")
    except Exception as e:
        print(f" Excel export skipped: {str(e)}")

    generate_evaluation_report(comparison_df, best_name, txt_path)
    print(f" Final comprehensive text report generated at: {txt_path}")

