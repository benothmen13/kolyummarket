import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDoc, doc, getFirestore } from 'firebase/firestore';
import { app } from './firebase.js';
import './ProductDetails.css';
import Navbar from './navbar.js';

const ProductDetails = ({ addToCart, user, onLogout, onSearch }) => {
  const { productId } = useParams(); // Retrieve the product ID from the URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const db = getFirestore(app);
        const productDoc = doc(db, 'products', productId);
        const productData = await getDoc(productDoc);

        if (productData.exists()) {
          setProduct({ id: productData.id, ...productData.data() });
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <p>Loading product details...</p>;
  if (!product) return <p>Product not found!</p>;

  return (
    <div className="product-details">
      {/* Navbar with user, logout, and search props */}
      <Navbar user={user} onLogout={onLogout} onSearch={onSearch} />
      <div className="product-image">
        <img src={product.imageBase64} alt={product.nomProduit} />
      </div>
      <div className="product-info">
        <h1 className="product-title">{product.nomProduit}</h1>
        <p className="product-description">{product.description}</p>
        <p className="product-category">
          <strong>Category:</strong> {product.categorie}
        </p>
        <p className="product-price">
          <strong>Price:</strong> DTN {product.prix}
        </p>
        <p className="product-stock">
          <strong>Stock:</strong> {product.stock ? 'In Stock' : 'Out of Stock'}
        </p>
        <div className="product-actions">
          <button
            className="add-to-cart"
            onClick={() => {
              addToCart(product);
              alert('Product added to cart!');
            }}
          >
            ajouter au panier
          </button>
          <button className="go-to-cart" onClick={() => navigate('/cart')}>
          Aller au Panier
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
