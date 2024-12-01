import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FcGoogle } from "react-icons/fc";
import GitHubIcon from "@mui/icons-material/GitHub";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Make sure to include this for styling
import Navbar from "../components/Navbar";
import { registerUser, handleGithubLogin, handleGoogleLogin } from "../services/apiService";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    contact: "",
    password: "",
    about: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState(null); // Define serverMessage
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData({
      username: "",
      email: "",
      contact: "",
      password: "",
      about: "",
    });
    setErrors({});
    setServerMessage(null);
  };

  const validateForm = () => {
    const newErrors = {};
    if (formData.username.trim() === "") {
      newErrors.username = "Username is required";
    }
    if (formData.username.trim().length < 3) {
      newErrors.username = "Username must be more than 3 characters";
    }
    if (!formData.email.includes("@")) {
      newErrors.email = "Enter a valid email";
    }
    if (!/^\d+$/.test(formData.contact)) {
      newErrors.contact = "Contact must contain only numbers";
    } else if (formData.contact.length < 10) {
      newErrors.contact = "Contact must be at least 10 digits";
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
      const response = await registerUser(formData);
      console.log(response.data);
      if (response.statusCode == 201) {
        toast.success("User successfully registered!");
        handleReset();
        navigate("/login");
      } else if (response.status == 400) {
        toast.error(response.data.errorMessage || "An error occurred during registration.");
      }
    } catch (error) {
      toast.error("An error occurred during registration.");
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
          <h2 className="text-2xl font-semibold mb-4 text-center">Signup Here</h2>
          <h5 className="text-md font-normal text-center text-gray-600">
            Start managing contacts on cloud ...
          </h5>

          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              required
              name="username"
              value={formData.username}
              onChange={handleChange}
              error={Boolean(errors.username)}
              helperText={errors.username}
            />
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
              label="Contact"
              variant="outlined"
              fullWidth
              required
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              error={Boolean(errors.contact)}
              helperText={errors.contact}
            />
            <TextField
              label="New Password"
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
            <TextField
              label="About"
              variant="outlined"
              fullWidth
              multiline
              rows={2}
              name="about"
              value={formData.about}
              onChange={handleChange}
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
                {loading ? "Registering..." : "Register"}
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

export default Signup;
