import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA08BY22cYY3lbutk5K_cTsuo9TVt30Va8",
  authDomain: "marketplace-d2beb.firebaseapp.com",
  databaseURL: "marketplace-d2beb",
  projectId: "marketplace-d2beb.appspot.com",
  storageBucket: "981246853512",
  messagingSenderId: "",
  appId: "1:981246853512:web:865b7c8c0b70a030c17a3d",
};
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const storage = getStorage();
const auth = getAuth();
export const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};
export const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};