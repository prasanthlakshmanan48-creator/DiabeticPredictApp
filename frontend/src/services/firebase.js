// Firebase App Configuration & Authentication Client
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail, sendEmailVerification } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, query, where, getDocs, deleteDoc, orderBy } from 'firebase/firestore';

// Environment credentials or fallback mock config for offline development
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDemoKeyForLocalTestingMode12345",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "diabetex-ai-health.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "diabetex-ai-health",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "diabetex-ai-health.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789012",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789012:web:demo12345"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  doc, setDoc, getDoc, collection, addDoc, query, where, getDocs, deleteDoc, orderBy
};
