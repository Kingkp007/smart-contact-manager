import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Button, Modal, Box, Typography } from '@mui/material';

const Products = () => {
    const [open, setOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");

    const handleOpen = (content) => {
        setModalContent(content);
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
            <Navbar />
            <div className="flex flex-grow">
                <Sidebar />
                <main className="flex-grow p-8 ml-0 md:ml-64 transition-all duration-300 ease-in-out">
                    <h1 className="text-4xl font-bold mb-8">Products</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
                            <h2 className="text-2xl font-bold mb-4">Download Contacts</h2>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleOpen("Download Contacts feature is currently unavailable for you.")}
                                sx={{ backgroundColor: "#1976d2", color: "#fff", borderRadius: "30px", "&:hover": { backgroundColor: "#155a9c" } }}
                            >
                                Download
                            </Button>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
                            <h2 className="text-2xl font-bold mb-4">Send Email to Contacts</h2>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleOpen("Send Email feature is currently unavailable for you.")}
                                sx={{ backgroundColor: "#1976d2", color: "#fff", borderRadius: "30px", "&:hover": { backgroundColor: "#155a9c" } }}
                            >
                                Send Email
                            </Button>
                        </div>
                    </div>

                    <Modal open={open} onClose={handleClose}>
                        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 300, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: '8px' }}>
                            <Typography id="modal-modal-title" variant="h6" component="h2" className="text-center text-red-600 font-bold">
                                Unavailable
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }} className="text-center">
                                {modalContent}
                            </Typography>
                            <div className="text-center mt-4">
                                <Button variant="contained" color="primary" onClick={handleClose} sx={{ backgroundColor: "#1976d2", color: "#fff", borderRadius: "30px", "&:hover": { backgroundColor: "#155a9c" } }}>
                                    Close
                                </Button>
                            </div>
                        </Box>
                    </Modal>
                </main>
            </div>
        </div>
    );
};

export default Products;
