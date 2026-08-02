import os
import matplotlib
matplotlib.use('Agg') # Non-interactive backend for automated plotting
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

try:
    import seaborn as sns
    HAS_SEABORN = True
    plt.style.use('ggplot')
    sns.set_palette("muted")
except ImportError:
    HAS_SEABORN = False
    plt.style.use('ggplot')

def generate_all_plots(df_results, trained_models, raw_df, feature_names, results_dir):
    """Generates all 12 requested high-resolution charts and saves them into results_dir."""
    os.makedirs(results_dir, exist_ok=True)
    print("\n" + "="*70)
    print(" GENERATING VISUALIZATION CHARTS IN 'results/'")
    print("="*70)

    # Helper function for single metric bar charts
    def plot_metric_bar(metric_name, filename, color):
        plt.figure(figsize=(10, 6))
        sorted_df = df_results.sort_values(by=metric_name, ascending=True)
        bars = plt.barh(sorted_df['Algorithm'], sorted_df[metric_name], color=color, edgecolor='black', alpha=0.85)
        
        plt.title(f'Diabetes Prediction - {metric_name} Comparison', fontsize=14, fontweight='bold', pad=15)
        plt.xlabel(metric_name, fontsize=12, fontweight='bold')
        plt.ylabel('Algorithm', fontsize=12, fontweight='bold')
        plt.xlim(0, 1.05)

        for bar in bars:
            width = bar.get_width()
            plt.text(width + 0.01, bar.get_y() + bar.get_height()/2, f'{width:.3f}', 
                     va='center', ha='left', fontsize=10, fontweight='bold')

        plt.tight_layout()
        save_path = os.path.join(results_dir, filename)
        plt.savefig(save_path, dpi=300)
        plt.close()
        print(f" Saved: {save_path}")

    # 1. Accuracy Comparison
    plot_metric_bar('Accuracy', 'accuracy_comparison.png', '#2563EB')

    # 2. Precision Comparison
    plot_metric_bar('Precision', 'precision_comparison.png', '#14B8A6')

    # 3. Recall Comparison
    plot_metric_bar('Recall', 'recall_comparison.png', '#7C3AED')

    # 4. F1 Score Comparison
    plot_metric_bar('F1 Score', 'f1_score_comparison.png', '#EC4899')

    # 5. ROC Curves
    plt.figure(figsize=(10, 8))
    for name, data in trained_models.items():
        if isinstance(data, dict) and 'y_proba' in data:
            y_proba = data['y_proba']
            auc_val = data.get('metrics', {}).get('roc_auc', 0.5)
        else:
            # Model object direct
            continue

        from sklearn.metrics import roc_curve
        fpr, tpr, _ = roc_curve(raw_df['Outcome'].iloc[-len(y_proba):], y_proba)
        plt.plot(fpr, tpr, label=f"{name} (AUC = {auc_val:.3f})", linewidth=2)

    plt.plot([0, 1], [0, 1], 'k--', label='Random Guessing (AUC = 0.50)')
    plt.title('Receiver Operating Characteristic (ROC) Curves', fontsize=14, fontweight='bold')
    plt.xlabel('False Positive Rate (1 - Specificity)', fontsize=12)
    plt.ylabel('True Positive Rate (Sensitivity)', fontsize=12)
    plt.legend(loc='lower right', fontsize=9)
    plt.grid(True, linestyle='--', alpha=0.5)
    plt.tight_layout()
    roc_path = os.path.join(results_dir, 'roc_curves.png')
    plt.savefig(roc_path, dpi=300)
    plt.close()
    print(f" Saved: {roc_path}")

    # 6. Confusion Matrices Subplot Grid
    n_models = len(trained_models)
    cols = 3
    rows = (n_models + cols - 1) // cols
    fig, axes = plt.subplots(rows, cols, figsize=(14, 4 * rows))
    axes = axes.flatten()

    for idx, (name, data) in enumerate(trained_models.items()):
        cm = data['confusion_matrix']
        ax = axes[idx]
        if HAS_SEABORN:
            sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', ax=ax, cbar=False,
                        xticklabels=['Non-Diabetic', 'Diabetic'],
                        yticklabels=['Non-Diabetic', 'Diabetic'])
        else:
            im = ax.imshow(cm, cmap='Blues')
            for i in range(2):
                for j in range(2):
                    ax.text(j, i, str(cm[i, j]), ha="center", va="center", color="black", fontweight="bold")
            ax.set_xticks([0, 1])
            ax.set_yticks([0, 1])
            ax.set_xticklabels(['Non-Diabetic', 'Diabetic'])
            ax.set_yticklabels(['Non-Diabetic', 'Diabetic'])

        ax.set_title(f"{name}", fontsize=11, fontweight='bold')
        ax.set_xlabel('Predicted')
        ax.set_ylabel('Actual')

    for idx in range(n_models, len(axes)):
        fig.delaxes(axes[idx])

    plt.suptitle('Confusion Matrix Heatmaps Across All Algorithms', fontsize=16, fontweight='bold', y=1.02)
    plt.tight_layout()
    cm_path = os.path.join(results_dir, 'confusion_matrices.png')
    plt.savefig(cm_path, dpi=300)
    plt.close()
    print(f" Saved: {cm_path}")

    # 7. Feature Importance (Best ensemble model)
    best_name = df_results.iloc[0]['Algorithm']
    best_model_obj = trained_models[best_name]['model']

    if hasattr(best_model_obj, 'feature_importances_'):
        importances = best_model_obj.feature_importances_
        feat_df = pd.DataFrame({'Feature': feature_names, 'Importance': importances})
        feat_df = feat_df.sort_values(by='Importance', ascending=True)

        plt.figure(figsize=(10, 6))
        plt.barh(feat_df['Feature'], feat_df['Importance'], color='#10B981', edgecolor='black')
        plt.title(f'Feature Importances Ranking ({best_name})', fontsize=14, fontweight='bold')
        plt.xlabel('Importance Ratio (Gini Weight)', fontsize=12)
        plt.tight_layout()
        feat_path = os.path.join(results_dir, 'feature_importance.png')
        plt.savefig(feat_path, dpi=300)
        plt.close()
        print(f" Saved: {feat_path}")

    # 8. Correlation Heatmap
    plt.figure(figsize=(10, 8))
    corr_df = raw_df.corr()
    if HAS_SEABORN:
        sns.heatmap(corr_df, annot=True, fmt='.2f', cmap='coolwarm', linewidths=0.5)
    else:
        plt.imshow(corr_df, cmap='coolwarm')
        plt.colorbar()
        plt.xticks(range(len(corr_df.columns)), corr_df.columns, rotation=45, ha='right')
        plt.yticks(range(len(corr_df.columns)), corr_df.columns)
    plt.title('Dataset Correlation Matrix Heatmap', fontsize=14, fontweight='bold')
    plt.tight_layout()
    corr_path = os.path.join(results_dir, 'correlation_heatmap.png')
    plt.savefig(corr_path, dpi=300)
    plt.close()
    print(f" Saved: {corr_path}")

    # 9. Outcome Distribution Chart
    plt.figure(figsize=(7, 5))
    outcome_counts = raw_df['Outcome'].value_counts()
    plt.pie(outcome_counts, labels=['Non-Diabetic (0)', 'Diabetic (1)'], autopct='%1.1f%%',
            colors=['#10B981', '#EF4444'], startangle=140, explode=(0.05, 0))
    plt.title('Target Outcome Distribution (Class Ratio)', fontsize=14, fontweight='bold')
    plt.tight_layout()
    out_path = os.path.join(results_dir, 'outcome_distribution.png')
    plt.savefig(out_path, dpi=300)
    plt.close()
    print(f" Saved: {out_path}")

    # 10. BMI Distribution Histogram
    plt.figure(figsize=(8, 5))
    if HAS_SEABORN:
        sns.histplot(raw_df['BMI'], kde=True, color='#3B82F6', bins=25)
    else:
        plt.hist(raw_df['BMI'], color='#3B82F6', bins=25, edgecolor='black', alpha=0.7)
    plt.title('Patient BMI Distribution Histogram', fontsize=14, fontweight='bold')
    plt.xlabel('Body Mass Index (BMI)', fontsize=12)
    plt.ylabel('Frequency Count', fontsize=12)
    plt.tight_layout()
    bmi_path = os.path.join(results_dir, 'bmi_distribution.png')
    plt.savefig(bmi_path, dpi=300)
    plt.close()
    print(f" Saved: {bmi_path}")

    # 11. Age Distribution Histogram
    plt.figure(figsize=(8, 5))
    if HAS_SEABORN:
        sns.histplot(raw_df['Age'], kde=True, color='#8B5CF6', bins=25)
    else:
        plt.hist(raw_df['Age'], color='#8B5CF6', bins=25, edgecolor='black', alpha=0.7)
    plt.title('Patient Age Distribution Histogram', fontsize=14, fontweight='bold')
    plt.xlabel('Age (Years)', fontsize=12)
    plt.ylabel('Frequency Count', fontsize=12)
    plt.tight_layout()
    age_path = os.path.join(results_dir, 'age_distribution.png')
    plt.savefig(age_path, dpi=300)
    plt.close()
    print(f" Saved: {age_path}")

    # 12. Glucose Distribution Histogram
    plt.figure(figsize=(8, 5))
    if HAS_SEABORN:
        sns.histplot(raw_df['Glucose'], kde=True, color='#F59E0B', bins=25)
    else:
        plt.hist(raw_df['Glucose'], color='#F59E0B', bins=25, edgecolor='black', alpha=0.7)
    plt.title('Fasting Plasma Glucose Distribution Histogram', fontsize=14, fontweight='bold')
    plt.xlabel('Glucose Concentration (mg/dL)', fontsize=12)
    plt.ylabel('Frequency Count', fontsize=12)
    plt.tight_layout()
    glu_path = os.path.join(results_dir, 'glucose_distribution.png')
    plt.savefig(glu_path, dpi=300)
    plt.close()
    print(f" Saved: {glu_path}")

    print("\n All 12 visualization charts successfully generated and saved to results/")
