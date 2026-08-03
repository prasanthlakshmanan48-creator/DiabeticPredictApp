import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMyNWDC31ycEeBcmBbbNRZl4Cci1yd9ts",
  authDomain: "diabetes-prediction-app-7db47.firebaseapp.com",
  projectId: "diabetes-prediction-app-7db47",
  storageBucket: "diabetes-prediction-app-7db47.firebasestorage.app",
  messagingSenderId: "1010148864086",
  appId: "1:1010148864086:web:3097581f80bb39808f4bf7",
  measurementId: "G-L5D3YYGV3N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
