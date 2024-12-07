import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ user, onLogout, cartItemCount, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [language, setLanguage] = useState('fr'); // Langue par défaut : français

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm); // Appelle la fonction de recherche fournie en tant que prop
    }
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    // Implémenter ici une gestion des traductions globales si nécessaire
  };

  // Traductions simples (peut être remplacé par i18next ou une autre solution)
  const translations = {
    en: {
      searchPlaceholder: 'Search products...',
      profile: 'Edit Profile',
      categories: 'Categories',
      addProduct: 'Add Product',
      logout: 'Logout',
      login: 'Login',
      signup: 'Sign Up',
    },
    fr: {
      searchPlaceholder: 'Rechercher des produits...',
      profile: 'Modifier Profil',
      categories: 'Catégories',
      addProduct: 'Ajouter un produit',
      logout: 'Déconnexion',
      login: 'Connexion',
      signup: 'Inscription',
    },
    ar: {
      searchPlaceholder: 'ابحث عن المنتجات...',
      profile: 'تعديل الملف الشخصي',
      categories: 'الفئات',
      addProduct: 'إضافة منتج',
      logout: 'تسجيل الخروج',
      login: 'تسجيل الدخول',
      signup: 'إنشاء حساب',
    },
  };

  const t = translations[language]; // Obtenir les traductions selon la langue actuelle

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">KOLYUM</Link>

      {/* Barre de recherche */}
      <form className="navbar-search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder={t.searchPlaceholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">🔍</button>
      </form>

      {user ? (
        <div className="navbar-right">
          <Link to="/cart" className="navbar-cart">
            🛒
            {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
          </Link>
          <div className="navbar-dropdown">
            <button className="navbar-dropdown-toggle">
              {user.email} ▼
            </button>
            <div className="navbar-dropdown-menu">
              <Link to="/profile" className="navbar-dropdown-item">{t.profile}</Link>
              <Link to="/categories" className="navbar-dropdown-item">{t.categories}</Link>
              <Link to="/add-product" className="navbar-dropdown-item">{t.addProduct}</Link>
              <button onClick={onLogout} className="navbar-dropdown-item">{t.logout}</button>
              {/* Sélecteur de langue */}
              <div className="navbar-dropdown-item">
                <label htmlFor="language-select">🌐 Langue :</label>
                <select
                  id="language-select"
                  value={language}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                >
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                  <option value="ar">العربية</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="navbar-links">
          <Link to="/login" className="navbar-link">{t.login}</Link>
          <Link to="/signup" className="navbar-link">{t.signup}</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
