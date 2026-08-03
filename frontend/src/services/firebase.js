// Firebase App Configuration & Authentication Client
import { auth, db, storage } from '../firebase';
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail, 
  sendEmailVerification 
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  deleteDoc, 
  orderBy 
} from 'firebase/firestore';

export const googleProvider = new GoogleAuthProvider();

export {
  auth,
  db,
  storage,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  doc, setDoc, getDoc, collection, addDoc, query, where, getDocs, deleteDoc, orderBy
};
