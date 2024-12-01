import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkLogin } from "../services/apiService";
import { CircularProgress } from "@mui/material"; 

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null indicates loading state

  useEffect(() => {
    const verifyAuthentication = async () => {
      try {
        const response = await checkLogin(); // Call API to check login status
        if (response && response.statusCode === "200") {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        setIsAuthenticated(false);
      }
    };

    verifyAuthentication();
  }, []);

  if (isAuthenticated === null) {
    // Show loading state while verifying
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <CircularProgress color="primary" size={60} />
        <p className="mt-4 text-lg font-semibold text-gray-700">
          Verifying your credentials...
        </p>
      </div>
    </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
