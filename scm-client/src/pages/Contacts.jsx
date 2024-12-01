import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { getContactsByFilter, getContacts, deleteContactsById, updateContact } from "../services/apiService"; // Update this service
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Menu,
  MenuItem,
  TablePagination,
  TableSortLabel,
  TextField,
} from "@mui/material";
import {
  Link as LinkIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Search as SearchIcon,
  KeyboardArrowDown as ArrowDownIcon,
} from "@mui/icons-material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ContactDetailsModal from "../components/ContactDetailsModal"; // Import the modal component
import DeleteConfirmationModal from "../components/DeleteConfirmationModal"; // Import the delete confirmation modal
import UpdateContactModal from "../components/UpdateContactModal"; // Import the update modal component

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [selectedFilter, setSelectedFilter] = useState("Search By");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortBy, setSortBy] = useState("name");
  const [direction, setDirection] = useState("asc");
  const [totalContacts, setTotalContacts] = useState(0);
  const [selectedContact, setSelectedContact] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); // For delete modal
  const [contactToDelete, setContactToDelete] = useState(null); // Contact to be deleted
  const [updateModalOpen, setUpdateModalOpen] = useState(false); // For update modal
  const [contactToUpdate, setContactToUpdate] = useState(null); // Contact to be updated
  const [refreshPage, setRefreshPage] = useState(false); // Refresh

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await getContacts(page, rowsPerPage, sortBy, direction);
        setContacts(response.content);
        setTotalContacts(response.totalElements); // Assuming total count is in totalElements
      } catch (error) {
        console.error("Failed to fetch contacts:", error);
      }
    };
    fetchContacts();
  }, [page, rowsPerPage, sortBy, direction,refreshPage]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (field) => {
    const isAsc = sortBy === field && direction === "asc";
    setDirection(isAsc ? "desc" : "asc");
    setSortBy(field);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (option) => {
    setSelectedFilter(option);
    setAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = async () => {
    try {
      const response = await getContactsByFilter(search, selectedFilter, page, rowsPerPage, sortBy, direction);
      setContacts(response.content);
      setTotalContacts(response.totalElements); // Assuming total count is in totalElements
    } catch (error) {
      console.error("Failed to search contacts:", error);
    }
  };

  const handleOpenModal = (contactId) => {
    const contact = contacts.find((c) => c.id === contactId);
    console.log(contact);
    setSelectedContact(contact);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedContact(null);
  };

  // Open delete modal
  const handleOpenDeleteModal = (contactId) => {
    setContactToDelete(contactId);
    setDeleteModalOpen(true);
  };

  // Close delete modal
  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setContactToDelete(null);
  };

  // Handle delete confirmation
  const handleDeleteContact = async () => {
    try {
      const response = await deleteContactsById(contactToDelete);
      console.log(response);
      if (response.status === 201) {
        setContacts((prevContacts) =>
          prevContacts.filter((contact) => contact.id !== contactToDelete)
        );
        setDeleteModalOpen(false);
        setTotalContacts((prevTotal) => prevTotal - 1);
      }
    } catch (error) {
      console.error("Failed to delete contacts:", error);
    }
  };

  // Handle opening the update modal
  const handleOpenUpdateModal = (contactId) => {
    const contact = contacts.find((c) => c.id === contactId);
    setContactToUpdate(contact);
    setUpdateModalOpen(true);
  };

  // Handle closing the update modal
  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
    setContactToUpdate(null);
  };

  // Handle updating the contact
  const handleUpdateContact = async (updatedContactData) => {
    try {
      const updatedContact = await updateContact(updatedContactData, contactToUpdate.id);
      if(updatedContact.statusCode=='201'){
        setUpdateModalOpen(false);
        setRefreshPage(prevState => !prevState);
      }   
    } catch (error) {
      console.error("Failed to update contact:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 pl-72 mt-16">
        <Navbar />
        <ToastContainer />
        <div className="max-w-4xl mx-auto p-6 bg-gray-100 shadow-md rounded-lg mt-8">
          <div className="flex justify-between items-center mb-4 space-x-4">
            <Button
              variant="outlined"
              color="default"
              aria-controls={open ? "action-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleMenuClick}
              sx={{
                borderRadius: "20px",
                px: 3,
                py: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "5px",
                color: "#555",
                borderColor: "#ccc",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              {selectedFilter} <ArrowDownIcon />
            </Button>
            <Menu
              id="action-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              MenuListProps={{
                "aria-labelledby": "action-button",
              }}
            >
              {["Name", "Phone", "Email"].map((option) => (
                <MenuItem key={option} onClick={() => handleMenuItemClick(option)}>
                  {option}
                </MenuItem>
              ))}
            </Menu>
            <div className="flex items-center w-1/2 space-x-4">
              <TextField
                variant="outlined"
                value={search}
                placeholder="Search User"
                onChange={(e) => setSearch(e.target.value)}
                fullWidth
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: "30px",
                  "&:hover": {
                    backgroundColor: "#e8e8e8",
                  },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "30px",
                    "& fieldset": {
                      borderColor: "#ccc",
                    },
                    "&:hover fieldset": {
                      borderColor: "#999",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#666",
                    },
                  },
                }}
              />
              <Button
                variant="contained"
                onClick={handleSearch}
                sx={{
                  borderRadius: "30px",
                  backgroundColor: "#1976d2",
                  color: "#fff",
                  px: 3,
                  "&:hover": {
                    backgroundColor: "#155a9c",
                  },
                }}
              >
                <SearchIcon />
              </Button>
            </div>
          </div>
          <TableContainer
            component={Paper}
            sx={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === "name"}
                      direction={sortBy === "name" ? direction : "asc"}
                      onClick={() => handleSort("name")}
                    >
                      Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === "phoneNumber"}
                      direction={sortBy === "phoneNumber" ? direction : "asc"}
                      onClick={() => handleSort("phoneNumber")}
                    >
                      Phone
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Links</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contacts.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell>
                      <div className="flex items-center space-x-4">
                        <img
                          src={contact.picture}
                          alt={contact.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p>{contact.name}</p>
                          <p className="text-sm text-gray-600">{contact.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{contact.phoneNumber}</TableCell>
                    <TableCell>
                      <IconButton>
                        <LinkedInIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleOpenModal(contact.id)}>
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton onClick={() => handleOpenUpdateModal(contact.id)}> 
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleOpenDeleteModal(contact.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalContacts}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
        </div>
      </div>
      <ContactDetailsModal
        open={openModal}
        onClose={handleCloseModal}
        contact={selectedContact}
      />
      <DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        onDelete={handleDeleteContact}
      />
      <UpdateContactModal
        open={updateModalOpen}
        onClose={handleCloseUpdateModal}
        contact={contactToUpdate}
        onUpdate={handleUpdateContact}
      />
    </div>
  );
};

export default Contacts;
