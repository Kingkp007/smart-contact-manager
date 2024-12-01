import React, { createContext, useState } from 'react';

// Create a context
const MyContext = createContext();

// Create a provider component
const MyProvider = ({ children }) => {
  // State management
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  // Context value
  const value = {
    isUserLoggedIn,
    setIsUserLoggedIn,
  };

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

// Export both context and provider
export { MyContext, MyProvider };
