// ContactUs.js
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { TextField, Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import ClearIcon from '@mui/icons-material/Clear';
import logo from '../assets/contactus.jpg'; // Ensure the correct path to your image

const ContactUs = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [query, setQuery] = useState("");

    const handleSend = () => {
        const mailtoLink = `mailto:patilkshitish@gmail.com?subject=Query on SCM Products&body=Name: ${name}%0AEmail: ${email}%0AQuery: ${query}`;
        window.location.href = mailtoLink;
    };

    const handleClear = () => {
        setName("");
        setEmail("");
        setQuery("");
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container mx-auto pt-16 flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 p-6">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">Contact Us</h1>
                    <p className="text-lg text-gray-600 mb-8 text-center">We'd love to hear from you! Please fill out the form below with your query.</p>
                    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                        <form>
                            <div className="mb-4">
                                <TextField
                                    label="Name"
                                    variant="outlined"
                                    fullWidth
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <TextField
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <TextField
                                    label="Query"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex justify-between">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<SendIcon />}
                                    onClick={handleSend}
                                    sx={{
                                        backgroundColor: "#1976d2",
                                        color: "#fff",
                                        borderRadius: "30px",
                                        "&:hover": {
                                            backgroundColor: "#155a9c",
                                        },
                                    }}
                                >
                                    Send
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    startIcon={<ClearIcon />}
                                    onClick={handleClear}
                                    sx={{
                                        borderRadius: "30px",
                                    }}
                                >
                                    Clear
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="md:w-1/2 p-6 flex justify-center">
                    <img
                        src={logo}
                        alt="Contact Us"
                        className="w-3/4 md:w-full rounded-full shadow-md"
                    />
                </div>
            </div>
        </div>
    );
};

export default ContactUs;


