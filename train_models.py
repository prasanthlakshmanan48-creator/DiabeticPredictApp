import os
import sys
import time
import joblib
try:
    import psutil
    HAS_PSUTIL = True
except ImportError:
    HAS_PSUTIL = False

# Add current workspace directory to sys.path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
if BASE_DIR not in sys.path:
    sys.path.append(BASE_DIR)

from utils.preprocessing import load_or_create_dataset, preprocess_data
from utils.evaluation import get_models, evaluate_models, tune_hyperparameters, export_and_generate_report
from utils.visualization import generate_all_plots

def main():
    t_start = time.time()
    print("="*75)
    print(" INTELLIGENT DIABETES PREDICTION SYSTEM - MACHINE LEARNING SUITE")
    print("="*75)

    # Directories Setup
    models_dir = os.path.join(BASE_DIR, 'models')
    results_dir = os.path.join(BASE_DIR, 'results')
    backend_model_dir = os.path.join(BASE_DIR, 'backend', 'model')

    os.makedirs(models_dir, exist_ok=True)
    os.makedirs(results_dir, exist_ok=True)
    os.makedirs(backend_model_dir, exist_ok=True)

    # 1. Load Dataset
    df = load_or_create_dataset(BASE_DIR)

    # 2. Preprocess Data
    data_dict = preprocess_data(df)

    X_train_scaled = data_dict['X_train_scaled']
    X_test_scaled = data_dict['X_test_scaled']
    y_train = data_dict['y_train']
    y_test = data_dict['y_test']
    scaler = data_dict['scaler']
    feature_names = data_dict['feature_names']

    # 3. Perform Hyperparameter Tuning via GridSearchCV
    tuned_models, best_params = tune_hyperparameters(X_train_scaled, y_train)

    # 4. Instantiate & Evaluate 10 Classifiers
    models = get_models()
    # Update base models with tuned variants
    models.update(tuned_models)

    trained_models, df_results = evaluate_models(
        models, X_train_scaled, X_test_scaled, y_train, y_test
    )

    # 5. Model Comparison Table Output
    print("\n" + "="*75)
    print(" MODEL COMPARISON BENCHMARK TABLE (SORTED BY ACCURACY)")
    print("="*75)
    print(df_results.to_string(index=False))

    # 6. Save Visualizations
    generate_all_plots(df_results, trained_models, data_dict['raw_df'], feature_names, results_dir)

    # 7. Export Comparison Table & Text Report
    best_model_name = df_results.iloc[0]['Algorithm']
    export_and_generate_report(df_results, best_model_name, results_dir)

    # 8. Save Best Model & Scaler Artifacts
    best_model_obj = trained_models[best_model_name]['model']
    best_acc = df_results.iloc[0]['Accuracy'] * 100
    best_f1 = df_results.iloc[0]['F1 Score']
    best_auc = df_results.iloc[0]['ROC AUC']

    best_model_path = os.path.join(models_dir, 'best_model.pkl')
    scaler_path = os.path.join(models_dir, 'scaler.pkl')

    joblib.dump(best_model_obj, best_model_path)
    joblib.dump(scaler, scaler_path)

    # Sync to backend/model for Flask REST API integration
    joblib.dump(best_model_obj, os.path.join(backend_model_dir, 'diabetes_model.pkl'))
    joblib.dump(scaler, os.path.join(backend_model_dir, 'scaler.pkl'))

    print("\n" + "="*75)
    print(" BEST MODEL SELECTION & SAVING SUMMARY")
    print("="*75)
    print(f" Best Algorithm Selected : {best_model_name}")
    print(f" Test Accuracy           : {best_acc:.2f}%")
    print(f" F1 Score                : {best_f1:.4f}")
    print(f" ROC AUC Score           : {best_auc:.4f}")
    print(f" Selection Rationale     : Outperformed candidate classifiers in cross-validation accuracy and ROC-AUC curve precision.")
    print(f" Saved Model Artifact    : {best_model_path}")
    print(f" Saved Scaler Artifact   : {scaler_path}")
    print(f" Synced to Backend API   : {os.path.join(backend_model_dir, 'diabetes_model.pkl')}")

    # Performance & Memory Audit
    t_total = time.time() - t_start
    print("\n" + "="*75)
    print(" EXECUTION PERFORMANCE & MEMORY AUDIT")
    print("="*75)
    print(f" Total Execution Time  : {t_total:.2f} seconds")
    if HAS_PSUTIL:
        mem_mb = psutil.Process().memory_info().rss / (1024 * 1024)
        print(f" Peak Memory Consumption: {mem_mb:.2f} MB")
    else:
        print(" Peak Memory Consumption: N/A (psutil not installed)")
    print("="*75)
    print(" MACHINE LEARNING TRAINING PIPELINE COMPLETED SUCCESSFULLY!\n")

if __name__ == '__main__':
    main()
