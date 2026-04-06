import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Optional, if using direct navigation

const Dashboard = ({ setAuth }) => {
  const [stats, setStats] = useState({ totalSavings: 0, memberCount: 0 });

  // --- Logout Logic ---
  const handleLogout = () => {
    // 1. Remove the token from local storage
    localStorage.removeItem('token');
    
    // 2. Update the auth state to false
    // This will trigger App.js to redirect to the Login page
    setAuth(false);
  };

  useEffect(() => {
    // Fetch data for stats
    const fetchStats = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/members');
        const members = res.data;
        const savings = members.reduce((acc, curr) => acc + parseFloat(curr.balance), 0);
        setStats({ totalSavings: savings, memberCount: members.length });
      } catch (err) {
        console.error("Error fetching stats", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6 max-w-7xl mx-auto">
      
      {/* --- NEW HEADER SECTION WITH LOGOUT --- */}
      <div className="bg-white shadow-sm rounded-lg p-4 mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 text-sm">Welcome back, Admin</p>
        </div>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium text-sm"
        >
          {/* Logout Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
          </svg>
          Logout
        </button>
      </div>

      {/* --- DASHBOARD CONTENT --- */}
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Savings Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Total Savings</h3>
            <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            ${stats.totalSavings.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
          <p className="text-green-500 text-sm mt-2 flex items-center gap-1">
            <span>↑ 12%</span> 
            <span className="text-gray-400 font-normal">from last month</span>
          </p>
        </div>

        {/* Members Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Active Members</h3>
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.memberCount}</p>
          <p className="text-gray-400 text-sm mt-2">Registered in the system</p>
        </div>

        {/* Pending Actions Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Pending Requests</h3>
            <div className="p-2 bg-yellow-100 rounded-lg text-yellow-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">0</p>
          <p className="text-gray-400 text-sm mt-2">Requires attention</p>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-gray-800">Recent Transactions</h3>
          <a href="/transactions" className="text-indigo-600 text-sm hover:underline">View All</a>
        </div>
        <div className="p-6 text-center text-gray-500">
          <p>No recent transactions to display.</p>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;