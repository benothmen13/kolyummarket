import React, { createContext, useState, useContext } from 'react';

// Create the LanguageContext
export const LanguageContext = createContext();

const translations = {
  en: {
    signup: 'Sign Up',
    login: 'Login',
    logout: 'Logout',
    home: 'Home',
    cart: 'Cart',
    profile: 'Profile',
    addProduct: 'Add Product',
    categories: 'Categories',
    searchPlaceholder: 'Search products...',
    noProducts: 'No products to display.',
    total: 'Total',
    categories: 'Filter by Category',
    inStock: 'In Stock',
    outOfStock: 'Out of Stock',
  },
  fr: {
    signup: 'S\'inscrire',
    login: 'Se connecter',
    logout: 'Déconnexion',
    home: 'Accueil',
    cart: 'Panier',
    profile: 'Profil',
    addProduct: 'Ajouter un produit',
    categories: 'Catégories',
    searchPlaceholder: 'Rechercher des produits...',
    noProducts: 'Aucun produit à afficher.',
    total: 'Total',
    categories: 'Filtrer par catégorie',
    inStock: 'En stock',
    outOfStock: 'Rupture de stock',
  },
  ar: {
    signup: 'التسجيل',
    login: 'تسجيل الدخول',
    logout: 'تسجيل الخروج',
    home: 'الرئيسية',
    cart: 'عربة التسوق',
    profile: 'الملف الشخصي',
    addProduct: 'إضافة منتج',
    categories: 'الفئات',
    searchPlaceholder: 'البحث عن المنتجات...',
    noProducts: 'لا توجد منتجات لعرضها.',
    total: 'المجموع',
    categories: 'تصفية حسب الفئة',
    inStock: 'متوفر',
    outOfStock: 'غير متوفر',
  },
};

// LanguageProvider component to wrap the app and provide the context
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const translate = (key) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

// useLanguage hook for easy access to the context
export const useLanguage = () => useContext(LanguageContext);
