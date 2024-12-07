import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar.js';

const Home = ({
  user,
  onLogout,
  products,
  categories,
  selectedCategory,
  onCategoryChange,
  onSearch,
}) => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Navbar with support for logout and search */}
      <Navbar user={user} onLogout={onLogout} onSearch={onSearch} />

      <div className="category-filter">
        {/* Category filter section */}
        <label htmlFor="category-select">Categories: </label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="product-grid">
        {/* Display products */}
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => navigate(`/product/${product.id}`)} // Navigate to product details
            >
              <img src={product.imageBase64} alt={product.nomProduit} />
              <h4>{product.nomProduit}</h4>

              <p>
                <strong>Categories:</strong> {product.categorie}
              </p>
              <p className="price">
                Total: {product.prix}
              </p>
              <p className={product.stock ? 'stock-status' : 'out-of-stock'}>
                {product.stock ? 'In Stock' : 'Out of Stock'}
              </p>
            </div>
          ))
        ) : (
          <p className="no-products">No products to display.</p>
        )}
      </div>
    </div>
  );
};

export default Home;

