import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FcGoogle } from "react-icons/fc";
import GitHubIcon from "@mui/icons-material/GitHub";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Make sure to include this for styling
import Navbar from "../components/Navbar";
import { loginUser, handleGoogleLogin, handleGithubLogin } from "../services/apiService"; // Assuming loginUser is defined in apiService
import { MyContext } from '../context/MyContext'

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState(null); // Define serverMessage
  const navigate = useNavigate();
  const {isUserLoggedIn,setIsUserLoggedIn} = useContext(MyContext);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData({
      email: "",
      password: "",
    });
    setErrors({});
    setServerMessage(null);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.includes("@")) {
      newErrors.email = "Enter a valid email";
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setServerMessage(null);
    try {
      const response = await loginUser(formData);
      console.log(response);
      if (response.statusCode == 200) {
        toast.success("Login successful!");
        handleReset();
        // localStorage.setItem("loggedIn", "true");
        setIsUserLoggedIn(true);
        navigate("/"); // Redirect to dashboard on successful login
      } else {
        toast.error(response.data.errorMessage || "An error occurred during login.");
      }
    } catch (error) {
      toast.error("An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <ToastContainer />
      <div className="flex-grow flex items-center justify-center p-6">
        <div className="w-full max-w-lg bg-white p-6 rounded-md shadow-md space-y-4">
          <h2 className="text-2xl font-semibold mb-4 text-center">Login Here</h2>
          <h5 className="text-md font-normal text-center text-gray-600">
            Welcome back to manage your contacts...
          </h5>

          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={Boolean(errors.password)}
              helperText={errors.password}
            />

            <div className="flex flex-col md:flex-row justify-center items-center w-full mt-6 space-y-4 md:space-y-0 md:space-x-4">
              <Button
                className="rounded-xl"
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
              <Button
                className="rounded-xl"
                variant="contained"
                style={{ backgroundColor: "red", color: "white" }}
                fullWidth
                onClick={handleReset}
              >
                Reset
              </Button>
            </div>
          </form>

          <div className="flex flex-col md:flex-row justify-center items-center w-full mt-6 space-y-4 md:space-y-0 md:space-x-4">
            <Button
              variant="outlined"
              color="inherit"
              fullWidth
              startIcon={<FcGoogle />}
              className="hover:bg-gray-200 md:w-auto"
              onClick={handleGoogleLogin}
            >
              Login with Google
            </Button>
            {/* <GoogleLogin onSuccess={handleLoginSuccess} onError={() => console.log('Login Failed')} className="hover:bg-gray-200 md:w-auto" /> */}
            <Button
              variant="outlined"
              color="inherit"
              fullWidth
              startIcon={<GitHubIcon />}
              className="hover:bg-gray-200 md:w-auto"
              onClick={handleGithubLogin}
            >
              Login with GitHub
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
