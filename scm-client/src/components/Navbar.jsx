// Navbar.js
import React, { useState, useContext, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu as MenuIcon, Close as CloseIcon, DarkMode, LightMode } from '@mui/icons-material';
import { Button } from '@mui/material';
import logo from "../assets/truecaller.png";
import { logout } from '../services/apiService';
import { MyContext } from '../context/MyContext';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // State for dark mode
  const [logOutButton, setLogOutButton] = useState(false);
  const location = useLocation();
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(MyContext);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response.status === 200) {
        localStorage.setItem('loggedIn', 'false');
        localStorage.clear();
        navigate('/login');
        // setIsUserLoggedIn(false);
      } else {
        console.error('Failed to logout');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const scrollLinks = (
    <>
      <ScrollLink to="home" smooth={true} duration={500} className="hover:text-gray-300 cursor-pointer">Home</ScrollLink>
      <ScrollLink to="services" smooth={true} duration={500} className="hover:text-gray-300 cursor-pointer">Services</ScrollLink>
      <ScrollLink to="about" smooth={true} duration={500} className="hover:text-gray-300 cursor-pointer">About</ScrollLink>
      <ScrollLink to="contact" smooth={true} duration={500} className="hover:text-gray-300 cursor-pointer">Contact</ScrollLink>
    </>
  );

  const routerLinks = (
    <>
      <RouterLink to="/" className="hover:text-gray-300 cursor-pointer">Home</RouterLink>
      <RouterLink to="/" className="hover:text-gray-300 cursor-pointer">Services</RouterLink>
      <RouterLink to="/" className="hover:text-gray-300 cursor-pointer">About</RouterLink>
      <RouterLink to="/" className="hover:text-gray-300 cursor-pointer">Contact</RouterLink>
    </>
  );

  return (
    <nav className={`w-full ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'} text-white fixed top-0 left-0 right-0 z-50`}>
      <div className="flex items-center justify-between p-5 md:max-w-6xl md:mx-auto">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="w-10 h-10 object-contain rounded-xl" />
          <span className="text-2xl font-bold">SCM</span>
        </div>
        <div className="hidden md:flex space-x-6 text-lg font-medium">
          {location.pathname === "/" ? scrollLinks : routerLinks}
        </div>
        <div className="hidden md:flex items-center space-x-4">
          {localStorage.getItem('loggedIn') ? (
            <Button variant="contained" className="bg-white text-blue-600 font-bold" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Button variant="contained" className="bg-white text-blue-600 font-bold" component={RouterLink} to="/login">
                Login
              </Button>
              <Button variant="contained" className="bg-white text-blue-600 font-bold" component={RouterLink} to="/signup">
                Signup
              </Button>
            </>
          )}
          <button onClick={toggleDarkMode} className="bg-gray-300 p-2 rounded-full">
            {darkMode ? <LightMode /> : <DarkMode />}
          </button>
        </div>
        <div className="md:hidden flex items-center space-x-4 ml-auto">
          <button onClick={toggleMenu}>
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="flex flex-col items-center bg-blue-700 md:hidden space-y-2 p-4">
          {location.pathname === "/" ? scrollLinks : routerLinks}
          {localStorage.getItem('loggedIn') ? (
            <Button variant="contained" className="w-full bg-white text-blue-600 font-bold mt-4" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Button variant="contained" className="w-full bg-white text-blue-600 font-bold mt-4" component={RouterLink} to="/login">
                Login
              </Button>
              <Button variant="outlined" className="w-full" component={RouterLink} to="/signup">
                Signup
              </Button>
            </>
          )}
          <button onClick={toggleDarkMode} className="bg-gray-300 p-2 rounded-full">
            {darkMode ? <LightMode /> : <DarkMode />}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
