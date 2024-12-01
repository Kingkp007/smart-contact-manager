import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TextField, Button, InputAdornment } from "@mui/material";
import { addContact } from "../services/apiService";
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Home as HomeIcon,
  Description as DescriptionIcon,
  Link as LinkIcon,
  Image as ImageIcon,
} from "@mui/icons-material";

const AddContacts = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    description: "",
    websiteLink: "",
    linkedInLink: "",
    contactImage: null,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
      description: "",
      websiteLink: "",
      linkedInLink: "",
      contactImage: null,
    });
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.name.trim() === "") {
      newErrors.name = "Name is required";
    }
    if (!formData.email.includes("@")) {
      newErrors.email = "Enter a valid email";
    }
    if (!/^\d+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must contain only digits";
    } else if (formData.phoneNumber.length < 10) {
      newErrors.phoneNumber = "Phone number must be at least 10 digits";
    }
    if (formData.address.trim() === "") {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    console.log(formData);
    try {
      const response = await addContact(formData);
      console.log(response.data);
      if (response.statusCode == 201) {
        toast.success("Contact Successfully Added!");
        handleReset();
        navigate("/profile");
      } else if (response.status == 400) {
        toast.error(response.data.errorMessage || "An error occurred during registration.");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 p-6 pl-72 mt-16">
        <Navbar />
        <ToastContainer />
        <div className="max-w-4xl mx-auto p-6 bg-gray-100 shadow-md rounded-lg mt-8">
          <h1 className="text-2xl font-bold mb-6 text-center">Add New Contact</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField
              className="bg-white"
              label="Contact Name"
              variant="outlined"
              fullWidth
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={Boolean(errors.name)}
              helperText={errors.name}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              className="bg-white"            
              label="Contact Email"
              variant="outlined"
              fullWidth
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              className="bg-white"
              label="Contact Phone"
              variant="outlined"
              fullWidth
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              error={Boolean(errors.phoneNumber)}
              helperText={errors.phoneNumber}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              className="bg-white"
              label="Contact Address"
              variant="outlined"
              fullWidth
              name="address"
              value={formData.address}
              onChange={handleChange}
              error={Boolean(errors.address)}
              helperText={errors.address}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <HomeIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              className="bg-white"
              label="Contact Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DescriptionIcon />
                  </InputAdornment>
                ),
              }}
            />
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
              <TextField
                className="bg-white"
                label="Personal Website"
                variant="outlined"
                fullWidth
                name="websiteLink"
                value={formData.websiteLink}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LinkIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                className="bg-white"
                label="LinkedIn URL"
                variant="outlined"
                fullWidth
                name="linkedInLink"
                value={formData.linkedInLink}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LinkIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="contained"
                component="label"
                startIcon={<ImageIcon />}
              >
                Upload Profile Picture
                <input
                  type="file"
                  accept="image/*"
                  name="contactImage"
                  className="hidden"
                  onChange={handleChange}
                />
              </Button>
              {formData.contactImage && <span>{formData.contactImage.name}</span>}
            </div>
            <div className="flex justify-between mt-6">
              <Button variant="contained" color="secondary" onClick={handleReset}>
                Reset
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Add Contact"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddContacts;
