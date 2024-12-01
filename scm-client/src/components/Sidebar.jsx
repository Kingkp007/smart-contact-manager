// Sidebar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import { Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import logo from "../assets/logo.jpg";
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ContactsIcon from '@mui/icons-material/Contacts';
import ShopIcon from '@mui/icons-material/Shop';
import { MdOutlinePhonelinkSetup } from "react-icons/md";
import { logout } from '../services/apiService';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response.status === 200) {
        localStorage.setItem('loggedIn', 'false');
        // localStorage.clear();
        // setIsUserLoggedIn(false);
      } else {
        console.error('Failed to logout');
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      {/* Mobile Sidebar Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-16 z-50 bg-gray-800 text-white p-2 rounded"
        onClick={toggleSidebar}
      >
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      {/* Sidebar */}
      <div className={`fixed top-16 mt-4 left-0 h-full bg-gray-800 text-white transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 w-64 z-40`}>
        <div className="flex-grow flex flex-col">
          <Link to="/profile" className="p-4 flex items-center space-x-2 hover:bg-gray-700">
            <PersonIcon /><span>Profile</span>
          </Link>
          <Link to="/add-contact" className="p-4 flex items-center space-x-2 hover:bg-gray-700">
            <PersonAddIcon /><span>Add Contact</span>
          </Link>
          <Link to="/contacts" className="p-4 flex items-center space-x-2 hover:bg-gray-700">
            <ContactsIcon /><span>Contacts</span>
          </Link>
          <Link to="/products" className="p-4 flex items-center space-x-2 hover:bg-gray-700">
            <ShopIcon /><span>Products</span>
          </Link>
          <Link onClick={handleLogout} className="p-4 flex items-center space-x-2 hover:bg-gray-700">
            <LoginIcon /><span>Sign Out</span>
          </Link>
          {/* <Link to="/signup" className="p-4 flex items-center space-x-2 hover:bg-gray-700">
            <MdOutlinePhonelinkSetup /><span>Sign Up</span>
          </Link> */}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
