import React, { useState, useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from './firebase.js';
import { onAuthStateChanged } from 'firebase/auth';

const AddProduct = () => {
  const [categorie, setCategorie] = useState('');
  const [description, setDescription] = useState('');
  const [nomProduit, setNomProduit] = useState('');
  const [prix, setPrix] = useState(0);
  const [stock, setStock] = useState(true);
  const [imageBase64, setImageBase64] = useState(null); // For Base64 image data
  const [userID, setUserID] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserID(user.email);
        setErrorMessage('');
      } else {
        setErrorMessage('You must be logged in to add a product.');
      }
    });
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result); // Set the Base64 string
      };
      reader.readAsDataURL(file); // Convert to Base64
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!userID) {
      setErrorMessage('You need to be logged in to add a product.');
      return;
    }

    try {
      // Add product to Firestore with Base64 image data
      await addDoc(collection(db, 'products'), {
        categorie,
        description,
        nomProduit,
        prix,
        stock,
        imageBase64, // Store the Base64 string in Firestore
        userID,
      });

      setSuccessMessage('Product added successfully!');
      setErrorMessage('');
      setCategorie('');
      setDescription('');
      setNomProduit('');
      setPrix(0);
      setStock(true);
      setImageBase64(null);
    } catch (error) {
      console.error('Error adding product:', error);
      setErrorMessage('Error adding product. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <h2>Add New Product</h2>
      <form onSubmit={handleAddProduct}>
        <input
          type="text"
          placeholder="Category"
          value={categorie}
          onChange={(e) => setCategorie(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Product Name"
          value={nomProduit}
          onChange={(e) => setNomProduit(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={prix}
          onChange={(e) => setPrix((e.target.value))}
          required
        />
        <label>
          In Stock:
          <input
            type="checkbox"
            checked={stock}
            onChange={(e) => setStock(e.target.checked)}
          />
        </label>
        <input
          type="file"
          onChange={handleImageUpload} // Handle image as Base64
        />
        <button type="submit">Add Product</button>
      </form>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default AddProduct;
