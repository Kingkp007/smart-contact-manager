// Services.js
import React from "react";
import Navbar from "../components/Navbar";
import { Cloud as CloudIcon, Email as EmailIcon, GetApp as DownloadIcon } from "@mui/icons-material";

const Services = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container mx-auto pt-16">
                <header className="text-center py-10">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Services</h1>
                    <p className="text-lg text-gray-600">We offer a suite of tools to manage your contacts efficiently and effectively.</p>
                </header>
                <main className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 pb-20">
                    <div className="p-6 bg-white shadow-lg rounded-lg text-center">
                        <CloudIcon className="text-blue-500 text-6xl mb-4" />
                        <h2 className="text-2xl font-bold mb-2">Save Contacts and All Data</h2>
                        <p className="text-gray-600">Securely save and manage all your contacts and data in one place.</p>
                    </div>
                    <div className="p-6 bg-white shadow-lg rounded-lg text-center">
                        <EmailIcon className="text-green-500 text-6xl mb-4" />
                        <h2 className="text-2xl font-bold mb-2">Contact Any Person with Mail</h2>
                        <p className="text-gray-600">Easily reach out to any contact via email directly from our platform.</p>
                    </div>
                    <div className="p-6 bg-white shadow-lg rounded-lg text-center">
                        <DownloadIcon className="text-red-500 text-6xl mb-4" />
                        <h2 className="text-2xl font-bold mb-2">Download Contact List</h2>
                        <p className="text-gray-600">Quickly download your entire contact list in a convenient format.</p>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Services;
