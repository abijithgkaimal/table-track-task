import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
function Header() {
  const [showLoginOptions, setShowLoginOptions] = useState(false);

  return (
    <header className="bg-[#a97b56] text-[#3b2a1e] shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        
      <Link
  to="/"
  className="flex items-center gap-2 text-3xl font-semibold tracking-wide hover:text-black transition-colors"
>
  <img src={logo} alt="Table Tracker Logo" width="60" />
  <span>Table Tracker</span>
</Link>


       
        <div className="relative">
          <button onClick={() => setShowLoginOptions(!showLoginOptions)} className="bg-white text-[#8b5e3c] font-semibold px-4 py-2 rounded-lg hover:bg-orange-100 transition-colors"
          >
            Login
          </button>

         
          {showLoginOptions && (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg p-2 z-50">
              <Link to="/admin/login" className="block text-[#8b5e3c] px-4 py-2 rounded-md hover:bg-orange-50"
              >
                Admin Login
              </Link>
              <Link to="/employee-login" className="block text-[#8b5e3c] px-4 py-2 rounded-md hover:bg-orange-50"
              >
                Employee Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
