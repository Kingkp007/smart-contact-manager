// AboutUs.js
import React from "react";
import Navbar from "../components/Navbar";
import aboutImage from "../assets/about2.jpg"; // Make sure to replace with the actual path to your image

const About = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="container mx-auto pt-16 flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 p-6">
                    
                    <div className="mb-4 mt-4">
                        <h2 className="text-3xl font-bold mb-4">About Us</h2>
                    </div>
                    <p className="text-lg text-gray-700 mb-4">
                    Smart Contact Manager is a cutting-edge application designed to streamline and enhance your contact management experience. With our platform, users can securely store a wealth of personal information for each contact, ensuring that important details are always at their fingertips.    
                    </p>
                    <p className="text-lg text-gray-700 mb-4">
                    Embrace the future of contact management with our intuitive interface and powerful features, and experience a new level of efficiency and connectivity in your personal and professional life.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="p-4 bg-gray-200 rounded-lg text-center">
                            <h3 className="text-2xl font-bold">12 yrs</h3>
                            <p className="mt-2 text-lg">Experiences</p>
                        </div>
                        <div className="p-4 bg-gray-200 rounded-lg text-center">
                            <h3 className="text-2xl font-bold">4.8k</h3>
                            <p className="mt-2 text-lg">Products</p>
                        </div>
                        <div className="p-4 bg-gray-200 rounded-lg text-center">
                            <h3 className="text-2xl font-bold">200+</h3>
                            <p className="mt-2 text-lg">Clients</p>
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold mb-4">Our Process</h2>
                    <p className="text-lg text-gray-700">
                    Our cloud-based solution guarantees that your contacts are accessible from anywhere, providing flexibility and convenience in managing your connections.
                    </p>
                </div>
                <div className="md:w-1/2 p-6">
                    <img
                        src={aboutImage}
                        alt="About Us"
                        className="w-full rounded-lg shadow-md"
                    />
                </div>
            </div>
        </div>
    );
};

export default About;
