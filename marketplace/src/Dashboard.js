import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import './Dashboard.css';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { app } from './firebase.js';

const Dashboard = () => {
  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [productsByCategory, setProductsByCategory] = useState({});

  const db = getFirestore(app);

  // Fetch statistics from Firebase
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch number of products
        const productsSnapshot = await getDocs(collection(db, 'products'));
        const products = productsSnapshot.docs.map((doc) => doc.data());
        setProductCount(products.length);

        // Fetch number of users
        const usersSnapshot = await getDocs(collection(db, 'users'));
        setUserCount(usersSnapshot.size);

        // Calculate products by category
        const categoryCounts = {};
        products.forEach((product) => {
          const category = product.categorie || 'Unknown';
          categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        });
        setProductsByCategory(categoryCounts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchStats();
  }, [db]);

  // Prepare data for the Bar chart
  const barData = {
    labels: Object.keys(productsByCategory),
    datasets: [
      {
        label: 'Products by Category',
        data: Object.values(productsByCategory),
        backgroundColor: ['#3498db', '#2ecc71', '#e74c3c', '#9b59b6', '#f1c40f'],
      },
    ],
  };

  // Prepare data for the Pie chart
  const pieData = {
    labels: ['Products', 'Users'],
    datasets: [
      {
        data: [productCount, userCount],
        backgroundColor: ['#3498db', '#e67e22'],
      },
    ],
  };

  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>
      <div className="summary">
        <div className="summary-item">
          <h3>Total Products</h3>
          <p>{productCount}</p>
        </div>
        <div className="summary-item">
          <h3>Total Users</h3>
          <p>{userCount}</p>
        </div>
      </div>
      <div className="chart-container">
        <div className="chart">
          <h2>Products by Category</h2>
          <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
        <div className="chart">
          <h2>Overall Breakdown</h2>
          <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
