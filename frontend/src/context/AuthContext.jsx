import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  sendPasswordResetEmail 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('auth_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);

  // Step 13: Detect Logged-in User
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        console.log(firebaseUser);
        const userData = {
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
          email: firebaseUser.email,
          photo: firebaseUser.photoURL || '',
          isAuthenticated: true
        };
        setUser(userData);
        localStorage.setItem('auth_user', JSON.stringify(userData));
      } else {
        console.log("No User");
        setUser(null);
        localStorage.removeItem('auth_user');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log(userCredential.user);
    return userCredential.user;
  };

  const register = async (email, password, name = '') => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log(userCredential.user);
    
    // Step 15: Save User Details to Firestore
    try {
      await setDoc(doc(db, "users", userCredential.user.uid), {
        name: name || userCredential.user.displayName || "User",
        email: userCredential.user.email,
        photo: userCredential.user.photoURL || "",
        createdAt: new Date().toISOString().split('T')[0]
      });
    } catch (err) {
      console.error("Firestore user save error:", err);
    }
    
    return userCredential.user;
  };

  const loginGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    console.log(result.user);

    // Step 15: Save User Details to Firestore
    try {
      await setDoc(doc(db, "users", result.user.uid), {
        name: result.user.displayName || "Google User",
        email: result.user.email,
        photo: result.user.photoURL || "",
        createdAt: new Date().toISOString().split('T')[0]
      });
    } catch (err) {
      console.error("Firestore Google user save error:", err);
    }

    return result.user;
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset email sent.");
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      register, 
      loginGoogle, 
      googleLogin: loginGoogle, 
      logout, 
      resetPassword, 
      isAuthenticated: !!user?.isAuthenticated || !!user?.uid 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

