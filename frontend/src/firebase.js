import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBMyNWDC31ycEeBcmBbbNRZl4Cci1yd9ts",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "diabetes-prediction-app-7db47.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "diabetes-prediction-app-7db47",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "diabetes-prediction-app-7db47.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1010148864086",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1010148864086:web:3097581f80bb39808f4bf7"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
