import React from 'react'
import { authContext } from './AuthContext';

export const AuthProvider = (children) => {


    const googleProvider = new Goog

    const userInfo={

    }
  return (
    <authContext value={userInfo}>
        {
            children
        }
    </authContext>
  )
}
