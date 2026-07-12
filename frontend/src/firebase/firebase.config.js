// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.envVITE_APIKEY,
  authDomain: import.meta.envVITE_AUTHDOMAIN,
  projectId: import.meta.envVITE_PROJECTID,
  storageBucket: import.meta.envVITE_STORAGEBUCKET,
  messagingSenderId: import.meta.envVITE_MESSAGINGSENDERID,
  appId: import.meta.envVITE_APPID,
  measurementId: import.meta.envVITE_MEASUREMENTID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);