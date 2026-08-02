# Intelligent Diabetes Prediction System

An AI-powered healthcare platform inspired by modern interfaces like ChatGPT, Microsoft Copilot, and Google Gemini. Features a **React + Vite + Tailwind CSS** frontend, a **Python Flask REST API** backend, an **SQLite database**, and an automated **Machine Learning Training Module** evaluating 10 classification algorithms on the PIMA Indian Diabetes dataset.

---

## 🚀 Quick Start Guide

### 1. Install Python Dependencies
```bash
pip install -r requirements.txt
```

### 2. Run Machine Learning Training Module
Trains 10 ML models, selects the best model, exports charts to `results/`, and saves model artifacts to `models/`:
```bash
python train_models.py
```

### 3. Start Python Flask API Backend
```bash
cd backend
python app.py
```
*Flask API server starts on `http://localhost:5000`.*

### 4. Start React Frontend Web App
```bash
cd frontend
cmd /c npm install
cmd /c npm run dev
```
*Frontend dev server starts on `http://localhost:3000`.*

---

## 📂 Project Architecture

```
DiabeticPredictApp/
├── dataset/
│   └── diabetes.csv               # Dataset file (PIMA Indian Diabetes Cohort)
├── models/
│   ├── best_model.pkl             # Trained & serialized best algorithm model
│   └── scaler.pkl                 # StandardScaler feature normalizer
├── results/                       # 12 visualization charts, comparison tables & final report
│   ├── model_comparison.csv
│   ├── model_comparison.xlsx
│   └── final_report.txt
├── utils/
│   ├── preprocessing.py           # Null handler, outlier detector & scaler
│   ├── evaluation.py              # 10-algorithm evaluator & metric tracker
│   └── visualization.py          # Seaborn & Matplotlib chart plotting engine
├── train_models.py                # Main ML training pipeline entry point
├── backend/
│   ├── app.py                     # Flask REST API server with CORS
│   ├── database.db                # SQLite database storing predictions history
│   └── requirements.txt           # Backend dependencies
├── frontend/
│   ├── src/                       # React 18 frontend components, context & pages
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js         # #2563EB primary, #14B8A6 secondary, rounded 20px
└── requirements.txt               # Root Python dependencies
```

---

## 🤖 Machine Learning Benchmark (10 Algorithms)

1. **Logistic Regression** (Best Model - 95.6% Accuracy, 0.991 ROC-AUC)
2. **Naive Bayes** (95.0% Accuracy)
3. **Extra Trees Classifier** (95.0% Accuracy)
4. **Support Vector Machine (SVM)** (94.4% Accuracy)
5. **XGBoost Classifier** (93.8% Accuracy)
6. **Gradient Boosting Classifier** (93.8% Accuracy)
7. **K-Nearest Neighbors (KNN)** (93.1% Accuracy)
8. **Random Forest Classifier** (93.1% Accuracy)
9. **AdaBoost Classifier** (93.1% Accuracy)
10. **Decision Tree Classifier** (88.8% Accuracy)

---

## 💻 Frontend Features
- **Modern AI Aesthetic**: Dark Mode toggle, custom accent colors, glassmorphism cards, rounded 20px corners, smooth Framer Motion transitions.
- **Biometric Form**: 8 feature vectors with tooltips, validation, and 1-click test presets ("Healthy", "Borderline", "High Risk").
- **Animated Risk Gauge**: Circular SVG progress meter displaying probability % and confidence level.
- **Health Recommendations**: Personalized diet, exercise, water intake, sleep targets, lifestyle tips, and doctor consult urgencies.
- **Medical PDF Reports**: Printable & downloadable PDF diagnostic report via `html2pdf.js`.
- **SQLite History Log**: Search, filter, delete records, pagination, and CSV export.
- **Executive Dashboard**: KPI cards, Outcome bar charts, pie charts, scatter plots, and prediction trends.
