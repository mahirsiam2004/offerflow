import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";

export const AuthProvider = (children) => {
  const googleProvider = new GoogleAuthProvider();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const loginWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const loginWithPassword = (email, password) => {
    return signInWithCredential(auth, email, password);
  };

  const registerWithPassword = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const userInfo = {
    loginWithGoogle,
    loading,
    user,
    setUser,
    loginWithPassword,
    registerWithPassword,
  };
  return <AuthContext value={userInfo} >{children}</AuthContext>;
};
