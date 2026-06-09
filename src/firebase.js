import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAmehwcKg05fUoqxXfCxOK9GlBpiPFaABg",
  authDomain: "levelup-football-67e11.firebaseapp.com",
  projectId: "levelup-football-67e11",
  storageBucket: "levelup-football-67e11.firebasestorage.app",
  messagingSenderId: "348215091150",
  appId: "1:348215091150:web:4cd3a1c717136e7a4f959f",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);