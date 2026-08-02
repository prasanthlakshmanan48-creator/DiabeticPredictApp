import os
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

def load_or_create_dataset(base_dir):
    """Loads dataset from dataset/diabetes.xlsx or dataset/diabetes.csv.
    If not found, generates a high-quality simulated PIMA Diabetes dataset.
    """
    dataset_dir = os.path.join(base_dir, 'dataset')
    os.makedirs(dataset_dir, exist_ok=True)

    excel_path = os.path.join(dataset_dir, 'diabetes.xlsx')
    csv_path = os.path.join(dataset_dir, 'diabetes.csv')

    if os.path.exists(excel_path):
        print(f" Found dataset at: {excel_path}")
        df = pd.read_excel(excel_path)
    elif os.path.exists(csv_path):
        print(f" Found dataset at: {csv_path}")
        df = pd.read_csv(csv_path)
    else:
        print(" Dataset file not found in 'dataset/'. Automatically generating simulation dataset...")
        np.random.seed(42)
        n0 = 515
        df0 = pd.DataFrame({
            'Pregnancies': np.random.poisson(2.5, n0),
            'Glucose': np.random.normal(110, 20, n0).clip(70, 199),
            'BloodPressure': np.random.normal(70, 10, n0).clip(40, 122),
            'SkinThickness': np.random.normal(22, 8, n0).clip(0, 60),
            'Insulin': np.random.normal(70, 35, n0).clip(0, 300),
            'BMI': np.random.normal(28.5, 5.5, n0).clip(18.2, 50.0),
            'DiabetesPedigreeFunction': np.random.exponential(0.35, n0).clip(0.08, 2.3),
            'Age': np.random.normal(31, 9, n0).clip(21, 81),
            'Outcome': 0
        })

        n1 = 285
        df1 = pd.DataFrame({
            'Pregnancies': np.random.poisson(4.8, n1),
            'Glucose': np.random.normal(148, 25, n1).clip(85, 200),
            'BloodPressure': np.random.normal(76, 12, n1).clip(50, 122),
            'SkinThickness': np.random.normal(31, 9, n1).clip(0, 65),
            'Insulin': np.random.normal(140, 60, n1).clip(0, 450),
            'BMI': np.random.normal(35.2, 6.5, n1).clip(22.0, 67.1),
            'DiabetesPedigreeFunction': np.random.exponential(0.6, n1).clip(0.12, 2.42),
            'Age': np.random.normal(42, 11, n1).clip(21, 81),
            'Outcome': 1
        })

        df = pd.concat([df0, df1], ignore_index=True).sample(frac=1.0, random_state=42).reset_index(drop=True)
        df.to_csv(csv_path, index=False)
        print(f" Saved generated dataset to: {csv_path}")

    return df

def preprocess_data(df):
    """Performs full data cleaning, missing value handling, outlier detection,
    feature scaling, and 80:20 train-test splitting.
    """
    print("\n" + "="*60)
    print(" 1. DATASET PREVIEW & INFORMATION")
    print("="*60)
    print(f"Dataset Shape: {df.shape[0]} Rows x {df.shape[1]} Columns")
    print("\nFirst 5 Records:")
    print(df.head())

    print("\nDataset Info:")
    print(df.info())

    # Detect Missing / Zero values
    print("\n" + "="*60)
    print(" 2. MISSING VALUES & DUPLICATE ANALYSIS")
    print("="*60)
    missing_count = df.isnull().sum()
    print("Explicit Null Values Per Column:\n", missing_count)

    # Detect duplicate rows
    duplicates = df.duplicated().sum()
    print(f"\nDuplicate Records Found: {duplicates}")
    if duplicates > 0:
        df = df.drop_duplicates().reset_index(drop=True)
        print(f" Removed {duplicates} duplicates. New shape: {df.shape}")

    # Handle unphysical zero values (Glucose, BloodPressure, SkinThickness, Insulin, BMI cannot be 0 in reality)
    zero_cols = ['Glucose', 'BloodPressure', 'SkinThickness', 'Insulin', 'BMI']
    print("\nZero Values Found in Physiological Parameters:")
    for col in zero_cols:
        if col in df.columns:
            z_count = (df[col] == 0).sum()
            print(f"  - {col}: {z_count} zeros")
            if z_count > 0:
                # Replace 0 with NaN then impute median
                df[col] = df[col].replace(0, np.nan)
                median_val = df[col].median()
                df[col] = df[col].fillna(median_val)

    # Outlier Detection (IQR Method)
    print("\n" + "="*60)
    print(" 3. OUTLIER DETECTION (IQR METHOD)")
    print("="*60)
    feature_cols = [c for c in df.columns if c != 'Outcome']
    for col in feature_cols:
        Q1 = df[col].quantile(0.25)
        Q3 = df[col].quantile(0.75)
        IQR = Q3 - Q1
        outliers = ((df[col] < (Q1 - 1.5 * IQR)) | (df[col] > (Q3 + 1.5 * IQR))).sum()
        print(f"  - {col}: {outliers} potential outliers detected")

    # Feature Splitting
    X = df[feature_cols]
    y = df['Outcome']

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.20, random_state=42, stratify=y
    )

    # Standardization
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    print("\n" + "="*60)
    print(" 4. TRAIN-TEST SPLIT & FEATURE SCALING")
    print("="*60)
    print(f"Training Set: {X_train.shape[0]} samples (80%)")
    print(f"Testing Set:  {X_test.shape[0]} samples (20%)")
    print("Features Standardized using StandardScaler()")

    return {
        'raw_df': df,
        'X_train': X_train,
        'X_test': X_test,
        'y_train': y_train,
        'y_test': y_test,
        'X_train_scaled': X_train_scaled,
        'X_test_scaled': X_test_scaled,
        'scaler': scaler,
        'feature_names': feature_cols
    }
