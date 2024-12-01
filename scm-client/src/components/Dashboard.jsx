// MainApp.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "../pages/Home";
import Services from "../pages/Services";
import AboutUs from "../pages/About";
import ContactUs from "../pages/ContactUs";
import Login from "../pages/Login";

const Dashboard = () => {
    return (
        <>
            <Navbar />
                    <div>
                        <div id="home">
                            <Home />
                        </div>
                        <div id="services">
                            <Services />
                        </div>
                        <div id="about">
                            <AboutUs />
                        </div>
                        <div id="contact">
                            <ContactUs />
                        </div>
                    </div>
        </>
    );
};

export default Dashboard;
