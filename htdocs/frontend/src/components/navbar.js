import React from 'react';

const Navbar = ({ setAuth }) => {
  
  const onLogout = () => {
    // 1. Remove the token from local storage
    localStorage.removeItem('token');
    
    // 2. Update the authentication state to false
    // This will trigger App.js to redirect the user to the Login page
    setAuth(false);
  };

  return (
    <nav className="bg-indigo-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center max-w-7xl">
        {/* Logo / Brand Name */}
        <div className="text-xl font-bold flex items-center gap-2">
            <span>ChamaFlow</span>
        </div>

        {/* Navigation Links & Logout */}
        <div className="flex items-center gap-6">
            <a href="/" className="hover:text-indigo-200 transition">Dashboard</a>
            <a href="/members" className="hover:text-indigo-200 transition">Members</a>
            <a href="/transactions" className="hover:text-indigo-200 transition">Transactions</a>
            
            <button 
                onClick={onLogout}
                className="bg-indigo-800 hover:bg-indigo-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition border border-indigo-400"
            >
                Logout
            </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;