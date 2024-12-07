import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';



const firebaseConfig = {
  apiKey: "AIzaSyA08BY22cYY3lbutk5K_cTsuo9TVt30Va8",
  authDomain: "marketplace-d2beb.firebaseapp.com",
  projectId: "marketplace-d2beb",
  storageBucket: "marketplace-d2beb.appspot.com",
  messagingSenderId: "981246853512",
  appId: "1:981246853512:web:865b7c8c0b70a030c17a3d"
};


 const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db, app };
