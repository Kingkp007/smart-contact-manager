// Home.js
import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const handleGetStarted = () => {
        navigate("/profile");
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="pt-16"> {/* Adjusted padding to match the navbar height */}
                <header className="bg-blue-600 text-white text-center py-20">
                    <div className="container mx-auto">
                        <h1 className="text-4xl font-bold">Welcome to Smart Contact Manager</h1>
                        <p className="mt-4 text-lg">Manage all your contacts effortlessly and securely in one place.</p>
                        <button 
                        onClick={handleGetStarted}
                        className="mt-8 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-gray-100">
                            Get Started
                        </button>
                    </div>
                </header>
                <main className="container mx-auto py-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="p-6 bg-white shadow-md rounded-lg">
                            <h2 className="text-2xl font-bold mb-4">Easy Contact Management</h2>
                            <p>Add, edit, and organize your contacts in a user-friendly interface.</p>
                        </div>
                        <div className="p-6 bg-white shadow-md rounded-lg">
                            <h2 className="text-2xl font-bold mb-4">Secure Storage</h2>
                            <p>Your data is protected with top-level encryption and security measures.</p>
                        </div>
                        <div className="p-6 bg-white shadow-md rounded-lg">
                            <h2 className="text-2xl font-bold mb-4">24/7 Access</h2>
                            <p>Access your contacts anytime, anywhere from any device.</p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Home;
