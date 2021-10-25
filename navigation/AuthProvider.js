import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCxiOER4QQ1qETpN5ifO2-HR1dNj45flz8",
  authDomain: "diary-379ea.firebaseapp.com",
  projectId: "diary-379ea",
  storageBucket: "diary-379ea.appspot.com",
  messagingSenderId: "749208997267",
  appId: "1:749208997267:web:fee818608add36f165ac66",
};
export const firebaseApp = initializeApp(firebaseConfig);
export const authService = getAuth();
export const dbService = getFirestore();
export const storageService = getStorage(firebaseApp);
