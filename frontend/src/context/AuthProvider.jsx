import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
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


  const logoutUser=()=>{
    return signOut(auth);
  }

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
      setLoading(false);
      setUser(currentUser);
    })

    return()=>{
      unsubscribe();
    }
  },[])




  const userInfo = {
    loginWithGoogle,
    loading,
    user,
    setUser,
    loginWithPassword,
    registerWithPassword,
    logoutUser,
  };
  return <AuthContext value={userInfo}>{children}</AuthContext>;
};
