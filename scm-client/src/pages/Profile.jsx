import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { MyContext } from "../context/MyContext";
import profile from "../assets/profile.png";
import { getUserProfile,checkLogin } from "../services/apiService";

const Profile = () => {
  const [user, setUser] = useState({
    name: "Loading...",
    email: "Loading...",
    phone: "Loading...",
    about: "Loading",
    profilePic: profile,
  });
  const { setIsUserLoggedIn } = useContext(MyContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // localStorage.setItem("loggedIn", "true");
        console.log("Inside useEffect of Profile after login Authentication");
        // Fetch user profile data from the API
        const response = await getUserProfile();
        console.log("Inside useEffect of Profile before getting user profile");
        const { data } = response;
        const profilePicUrl = data.profilePic ? data.profilePic : profile;
        console.log(profilePicUrl);
        setUser({
          name: data.name,
          email: data.username,
          phone: data.phoneNumber ? data.phoneNumber : "123-456-789",
          about: data.about,
          profilePic: profilePicUrl,
        });
        setIsUserLoggedIn(true);
        localStorage.setItem("loggedIn", "true");
      } catch (error) {
        console.error("Failed to fetch profile data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <div className="flex flex-grow">
        <Sidebar />
        <main className="flex-grow p-8 ml-0 mt-16 md:ml-64 transition-all duration-300 ease-in-out">
          <div className="flex flex-col md:flex-row items-center md:items-start bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="md:w-1/2 w-full mb-6 md:mb-0 text-center md:text-left">
              <p className="text-4xl font-bold mb-4">{user.name}</p>
              {/* <p className="text-lg mb-4">I'm a visual designer from Mars. Currently working with @uigate as a concept artist.</p> */}
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                <strong>Phone:</strong> {user.phone}
              </p>
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                <strong>About:</strong> {user.about}
              </p>
              <button
                className="bg-red-500 text-white px-6 py-2 rounded-full mb-4"
                onClick={() => navigate("/add-contact")}
              >
                Get Started
              </button>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-700 dark:text-gray-400">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-gray-700 dark:text-gray-400">
                  <i className="fas fa-globe"></i>
                </a>
              </div>
            </div>
            <div className="md:w-1/2 w-full text-center">
              <img
                src={user.profilePic}
                alt="Profile"
                className="w-full rounded-lg shadow-md"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
