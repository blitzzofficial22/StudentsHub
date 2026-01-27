import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDvsw1lTjRcsMeBU9zEdNTkKLU0B3ccmHg",
  authDomain: "students-hub-7b136.firebaseapp.com",
  projectId: "students-hub-7b136",
  storageBucket: "students-hub-7b136.firebasestorage.app",
  messagingSenderId: "901239401020",
  appId: "1:901239401020:web:b890a2e18319a7b9783139",
  measurementId: "G-C3BE0XNL5C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
