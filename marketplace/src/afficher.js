import React, { useState, useEffect } from 'react';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

// Configuration de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA08BY22cYY3lbutk5K_cTsuo9TVt30Va8",
  authDomain: "marketplace-d2beb.firebaseapp.com",
  projectId: "marketplace-d2beb",
  storageBucket: "marketplace-d2beb.appspot.com",
  messagingSenderId: "981246853512",
  appId: "1:981246853512:web:865b7c8c0b70a030c17a3d",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Récupérer tous les documents de la collection "utilisateur"
        const querySnapshot = await getDocs(collection(db, 'utilisateur'));
        
        // Créer un tableau d'utilisateurs à partir des documents
        const usersList = querySnapshot.docs.map(doc => ({
          id: doc.id, // ID du document
          ...doc.data() // Données du document
        }));

        setUsers(usersList);
      } catch (err) {
        setError("Erreur lors de la récupération des utilisateurs : " + err.message);
        console.error("Erreur :", err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Liste des Utilisateurs</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {users.length > 0 ? (
          users.map(user => (
            <li key={user.id}>
              <p><strong>Nom:</strong> {user.nom}</p>
              <p><strong>Prénom:</strong> {user.prenom}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Date de Naissance:</strong> {user.dateDeNaissance}</p>
            </li>
          ))
        ) : (
          <p>Aucun utilisateur trouvé.</p>
        )}
      </ul>
    </div>
  );
};

export default UserList;
