import os
import json
import joblib
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score, confusion_matrix

def generate_pima_dataset():
    """Generates a realistic PIMA Indian Diabetes Dataset simulation based on standard epidemiological statistics."""
    np.random.seed(42)
    n_samples = 800

    # Non-diabetic (Outcome = 0) ~ 500 samples
    n0 = 515
    pregnancies_0 = np.random.poisson(lam=2.5, size=n0)
    glucose_0 = np.random.normal(loc=110, scale=20, size=n0).clip(70, 199)
    bp_0 = np.random.normal(loc=70, scale=10, size=n0).clip(40, 122)
    skin_0 = np.random.normal(loc=22, scale=8, size=n0).clip(0, 60)
    insulin_0 = np.random.normal(loc=70, scale=35, size=n0).clip(0, 300)
    bmi_0 = np.random.normal(loc=28.5, scale=5.5, size=n0).clip(18.2, 50.0)
    dpf_0 = np.random.exponential(scale=0.35, size=n0).clip(0.08, 2.3)
    age_0 = np.random.normal(loc=31, scale=9, size=n0).clip(21, 81)

    # Diabetic (Outcome = 1) ~ 285 samples
    n1 = 285
    pregnancies_1 = np.random.poisson(lam=4.8, size=n1)
    glucose_1 = np.random.normal(loc=148, scale=25, size=n1).clip(85, 200)
    bp_1 = np.random.normal(loc=76, scale=12, size=n1).clip(50, 122)
    skin_1 = np.random.normal(loc=31, scale=9, size=n1).clip(0, 65)
    insulin_1 = np.random.normal(loc=140, scale=60, size=n1).clip(0, 450)
    bmi_1 = np.random.normal(loc=35.2, scale=6.5, size=n1).clip(22.0, 67.1)
    dpf_1 = np.random.exponential(scale=0.6, size=n1).clip(0.12, 2.42)
    age_1 = np.random.normal(loc=42, scale=11, size=n1).clip(21, 81)

    df0 = pd.DataFrame({
        'Pregnancies': pregnancies_0, 'Glucose': glucose_0, 'BloodPressure': bp_0,
        'SkinThickness': skin_0, 'Insulin': insulin_0, 'BMI': bmi_0,
        'DiabetesPedigreeFunction': dpf_0, 'Age': age_0, 'Outcome': 0
    })

    df1 = pd.DataFrame({
        'Pregnancies': pregnancies_1, 'Glucose': glucose_1, 'BloodPressure': bp_1,
        'SkinThickness': skin_1, 'Insulin': insulin_1, 'BMI': bmi_1,
        'DiabetesPedigreeFunction': dpf_1, 'Age': age_1, 'Outcome': 1
    })

    df = pd.concat([df0, df1], ignore_index=True).sample(frac=1.0, random_state=42).reset_index(drop=True)
    return df

def train_and_save():
    model_dir = os.path.join(os.path.dirname(__file__), 'model')
    os.makedirs(model_dir, exist_ok=True)

    csv_path = os.path.join(os.path.dirname(__file__), 'diabetes.csv')
    if os.path.exists(csv_path):
        df = pd.read_csv(csv_path)
    else:
        df = generate_pima_dataset()
        df.to_csv(csv_path, index=False)

    feature_cols = ['Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness', 'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age']
    X = df[feature_cols]
    y = df['Outcome']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    # 1. Random Forest Classifier
    rf_model = RandomForestClassifier(n_estimators=120, max_depth=8, random_state=42)
    rf_model.fit(X_train_scaled, y_train)

    rf_pred = rf_model.predict(X_test_scaled)
    rf_proba = rf_model.predict_proba(X_test_scaled)[:, 1]

    # 2. Logistic Regression
    lr_model = LogisticRegression(max_iter=1000, random_state=42)
    lr_model.fit(X_train_scaled, y_train)

    lr_pred = lr_model.predict(X_test_scaled)
    lr_proba = lr_model.predict_proba(X_test_scaled)[:, 1]

    # Metrics computation
    def compute_metrics(y_true, y_pred, y_proba):
        cm = confusion_matrix(y_true, y_pred)
        return {
            'accuracy': float(accuracy_score(y_true, y_pred)),
            'precision': float(precision_score(y_true, y_pred)),
            'recall': float(recall_score(y_true, y_pred)),
            'f1_score': float(f1_score(y_true, y_pred)),
            'roc_auc': float(roc_auc_score(y_true, y_proba)),
            'confusion_matrix': {
                'tn': int(cm[0][0]),
                'fp': int(cm[0][1]),
                'fn': int(cm[1][0]),
                'tp': int(cm[1][1])
            }
        }

    rf_metrics = compute_metrics(y_test, rf_pred, rf_proba)
    lr_metrics = compute_metrics(y_test, lr_pred, lr_proba)

    # Feature importances
    feature_importances = [
        {'feature': col, 'importance': float(imp)}
        for col, imp in sorted(zip(feature_cols, rf_model.feature_importances_), key=lambda x: x[1], reverse=True)
    ]

    metrics_payload = {
        'random_forest': rf_metrics,
        'logistic_regression': lr_metrics,
        'feature_importances': feature_importances,
        'dataset_summary': {
            'total_samples': len(df),
            'diabetic_count': int((df['Outcome'] == 1).sum()),
            'non_diabetic_count': int((df['Outcome'] == 0).sum()),
            'avg_bmi': float(df['BMI'].mean()),
            'avg_glucose': float(df['Glucose'].mean()),
            'avg_age': float(df['Age'].mean()),
            'avg_bp': float(df['BloodPressure'].mean()),
            'avg_insulin': float(df['Insulin'].mean())
        }
    }

    # Save artifacts
    joblib.dump(rf_model, os.path.join(model_dir, 'diabetes_model.pkl'))
    joblib.dump(scaler, os.path.join(model_dir, 'scaler.pkl'))

    with open(os.path.join(model_dir, 'metrics.json'), 'w') as f:
        json.dump(metrics_payload, f, indent=2)

    print("Model training complete! Saved diabetes_model.pkl, scaler.pkl, and metrics.json")

if __name__ == '__main__':
    train_and_save()
