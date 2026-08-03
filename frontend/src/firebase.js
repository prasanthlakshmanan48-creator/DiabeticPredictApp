import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDiabetesPredictAppDefaultKey12345",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "diabetes-prediction-app-7db47.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "diabetes-prediction-app-7db47",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "diabetes-prediction-app-7db47.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "102938475610",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:102938475610:web:abcdef123456789"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
