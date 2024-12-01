import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Home as HomeIcon,
  Description as DescriptionIcon,
  Link as LinkIcon,
  Image as ImageIcon,
} from "@mui/icons-material";

const UpdateContactModal = ({ open, onClose, contact, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: contact?.name || "",
    email: contact?.email || "",
    phoneNumber: contact?.phoneNumber || "",
    address: contact?.address || "",
    description: contact?.description || "",
    websiteLink: contact?.websiteLink || "",
    linkedInLink: contact?.linkedInLink || "",
    contactImage: null,
  });

  useEffect(() => {
    if (contact) {
      setFormData({
        name: contact.name || "",
        email: contact.email || "",
        phoneNumber: contact.phoneNumber || "",
        address: contact.address || "",
        description: contact.description || "",
        websiteLink: contact.websiteLink || "",
        linkedInLink: contact.linkedInLink || "",
        contactImage: null, // Keep null to allow the user to upload a new image if needed
      });
    }
  }, [contact]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'contactImage') {
        // If a file is selected, set it; otherwise, set it to null
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : null,
        }));
    } else {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }
  };

  const handleSubmit = () => {
    const updatedData = { ...formData };
    if (!formData.contactImage) {
        updatedData.contactImage = null;
    }
    onUpdate(updatedData);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Contact</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <HomeIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={2}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <DescriptionIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Website Link"
          name="websiteLink"
          value={formData.websiteLink}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LinkIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="LinkedIn URL"
          name="linkedInLink"
          value={formData.linkedInLink}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LinkIcon />
              </InputAdornment>
            ),
          }}
        />
        <div className="flex items-center space-x-2 mt-2">
          <Button variant="contained" component="label" startIcon={<ImageIcon />}>
            Upload Image
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateContactModal;
