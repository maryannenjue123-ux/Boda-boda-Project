import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setAuth }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setAuth(true);
    } catch (err) {
      console.error(err.response?.data || err.message);
      // Simple error alert for this demo
      alert('Login Failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 p-4">
      
      {/* Login Card */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
        
       {/* Card Header / Logo Section */}
<div className="bg-indigo-600 p-8 text-center">
  {/* Logo Container */}
  <div className="mx-auto w-24 h-24 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 shadow-lg border border-white/20 p-2">
    
    {/* YOUR LOGO IMAGE HERE */}
    <img 
      src="download (3).jpg"        // Make sure this matches your filename in /public
      alt="Chama Logo" 
      className="h-full w-full object-contain drop-shadow-md"
    />

  </div>
  
  <h2 className="text-3xl font-extrabold text-white tracking-tight">Motorbike Chama</h2>
  <p className="text-indigo-100 mt-2 text-sm">Manage your group savings securely</p>
</div>

        {/* Form Body */}
        <div className="p-8">
          <form onSubmit={onSubmit} className="space-y-6">
            
            {/* Email Input Group */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {/* Mail Icon */}
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input 
                  type="email" 
                  name="email" 
                  id="email"
                  placeholder="admin@chama.com" 
                  onChange={onChange} 
                  required
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                />
              </div>
            </div>

            {/* Password Input Group */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {/* Lock Icon */}
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input 
                  type="password" 
                  name="password" 
                  id="password"
                  placeholder="••••••••" 
                  onChange={onChange} 
                  required
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                />
              </div>
              <div className="flex justify-end mt-1">
                <a href="#" className="text-xs text-indigo-600 hover:text-indigo-500 font-medium">Forgot password?</a>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:scale-[1.02]"
            >
              Sign In
            </button>
          </form>
        </div>

        {/* Card Footer */}
        <div className="bg-gray-50 px-8 py-4 border-t border-gray-100">
            <p className="text-center text-xs text-gray-500">
                © 2023 ChamaFlow Systems. All rights reserved.
            </p>
        </div>

      </div>
    </div>
  );
};

export default Login;