import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Rating,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LanguageIcon from '@mui/icons-material/Language';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const ContactDetailsModal = ({ contact, open, onClose }) => {
  // Check if contact is null or undefined
  if (!contact) {
    return null; // Return null if the contact data is not available
  }

  // Generate a random number of stars between 1 and 5
  const randomStars = Math.floor(Math.random() * 5) + 1;
  const picture = contact.picture || "https://via.placeholder.com/150"; // Fallback for picture if null

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box sx={modalStyle}>
        <div className="flex justify-between items-center">
          <Typography variant="h6" id="modal-title">
            Contact Details
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2} alignItems="center">
          {/* Contact photo and name */}
          <Grid item xs={12} sm={4} container justifyContent="center">
            <img
              src={picture}
              alt={contact.name}
              style={{ width: "120px", height: "120px", borderRadius: "50%", objectFit: "cover" }}
            />
          </Grid>

          <Grid item xs={12} sm={8}>
            <Typography variant="h6">{contact.name}</Typography>
            <Typography variant="body1" color="textSecondary">
              {contact.email}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {contact.phoneNumber}
            </Typography>
          </Grid>
        </Grid>

        {/* Borderless table with icons */}
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell sx={{ padding: 1, borderBottom: "none" }} align="left">
                  <LocationOnIcon sx={{ mr: 1 }} />
                  Address:
                </TableCell>
                <TableCell sx={{ padding: 1, borderBottom: "none" }} align="left">
                  {contact.address}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ padding: 1, borderBottom: "none" }} align="left">
                  <PersonIcon sx={{ mr: 1 }} />
                  Description:
                </TableCell>
                <TableCell sx={{ padding: 1, borderBottom: "none" }} align="left">
                  {contact.description}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ padding: 1, borderBottom: "none" }} align="left">
                  <FavoriteBorderIcon sx={{ mr: 1 }} />
                  Rating:
                </TableCell>
                <TableCell sx={{ padding: 1, borderBottom: "none" }} align="left">
                  <Rating name="read-only" value={randomStars} readOnly precision={0.1} />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ padding: 1, borderBottom: "none" }} align="left">
                  <LanguageIcon sx={{ mr: 1 }} />
                  Website:
                </TableCell>
                <TableCell sx={{ padding: 1, borderBottom: "none" }} align="left">
                  <a href={contact.websiteLink} target="_blank" rel="noopener noreferrer" style={{ color: "#1976d2" }}>
                    {contact.websiteLink}
                  </a>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ padding: 1, borderBottom: "none" }} align="left">
                  <LinkedInIcon sx={{ mr: 1 }} />
                  LinkedIn:
                </TableCell>
                <TableCell sx={{ padding: 1, borderBottom: "none" }} align="left">
                  <a href={contact.linkedInLink} target="_blank" rel="noopener noreferrer" style={{ color: "#1976d2" }}>
                    {contact.linkedInLink}
                  </a>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          onClick={onClose}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: 24,
  width: "80%",
  maxWidth: "600px",
};

export default ContactDetailsModal;
