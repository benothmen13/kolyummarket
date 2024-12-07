import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { collection, addDoc, getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import './Signup.css';

// Remplacez par votre configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA08BY22cYY3lbutk5K_cTsuo9TVt30Va8",
  authDomain: "marketplace-d2beb.firebaseapp.com",
  projectId: "marketplace-d2beb",
  storageBucket: "marketplace-d2beb.appspot.com",
  messagingSenderId: "981246853512",
  appId: "1:981246853512:web:865b7c8c0b70a030c17a3d",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [dateDeNaissance, setDateDeNaissance] = useState('');
  const [error, setError] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await addDoc(collection(db, 'utilisateur'), {
        uid: user.uid,
        email: email,
        nom: nom,
        prenom: prenom,
        dateDeNaissance: dateDeNaissance
      });

      console.log("User signed up:", user);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
    
      <form onSubmit={handleSignUp}>
      <h2>Sign Up</h2>
        <div>
          <input type="text" placeholder='Nom' value={nom} onChange={(e) => setNom(e.target.value)} required />
        </div>
        <div>
          <input type="text" placeholder='Prénom' value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
        </div>
        <div>
          <input type="date" placeholder='Date de naissance' value={dateDeNaissance} onChange={(e) => setDateDeNaissance(e.target.value)} required />
        </div>
        <div>
          <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <input type="password" placeholder='Mot de passe' value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <input
            label="Image"
            placeholder="Choose image"
            accept="image/png,image/jpeg"
            type="file"
            onChange={(e) => setImageUpload(e.target.files[0])}
          />
        </div>
        <button  className='btn-sginup' type="submit">Sign Up</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default SignUp;

