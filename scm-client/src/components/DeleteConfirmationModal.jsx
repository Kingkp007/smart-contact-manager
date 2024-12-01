import React from "react";
import { Modal, Typography, Button } from "@mui/material";
import alert from "../assets/alert.png";

const DeleteConfirmationModal = ({ open, onClose, onDelete }) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="delete-modal-title">
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
          <Typography
            variant="h6"
            id="delete-modal-title"
            gutterBottom
            className="mb-4"
          >
            Do you want to delete this contact?
          </Typography>
          <img
            src={alert}
            alt="Alert"
            className="w-20 h-20 mx-auto mb-4"
          />
          <div className="flex justify-around mt-4 space-x-4">
            <Button
              variant="contained"
              color="error"
              onClick={onDelete}
              className="rounded-lg px-6"
            >
              Delete
            </Button>
            <Button
              variant="outlined"
              onClick={onClose}
              className="rounded-lg px-6"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
