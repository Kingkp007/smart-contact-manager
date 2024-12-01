import axios from "axios";
// import { SERVER_URL } from "../config/constant";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
console.log(SERVER_URL);

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(SERVER_URL + "/register", userData);
    console.log(response.data); // If successful, log data to console for debugging purposes
    return response.data; // If successful, return data
  } catch (error) {
    console.log(error);
    console.log(error.response);
    if (error.response.status == 400) {
      return error.response;
    } else {
      // General error if no specific message from backend
      throw new Error("Registration failed. Please try again.");
    }
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(SERVER_URL + "/login", userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.data); // If successful, log data to console for debugging purposes
    return response.data; // If successful, return data
  } catch (error) {
    console.log(error);
    console.log(error.response);
    if (error.response.status == 400) {
      // If backend sent a specific error message
      // throw new Error(error.response.data.errorMessage);
      return error.response;
    } else {
      // General error if no specific message from backend
      throw new Error("Registration failed. Please try again.");
    }
  }
};

export const checkLogin = async () => {
  try {
    const response = await axios.get(`${SERVER_URL}/check`, {
      withCredentials: true, // Include cookies (for session-based auth)
    });
    // console.log(response.data);
    return response.data; // User details if authenticated
  } catch (error) {
    throw error.response || new Error("Failed to check login status");
  }
};

export const handleGoogleLogin = async () => {
  console.log(SERVER_URL);
  window.location.href = SERVER_URL + "/oauth2/authorization/google";
};

export const handleGithubLogin = async () => {
  window.location.href = SERVER_URL + "/oauth2/authorization/github";
};

export const getUserProfile = async () => {
  try {
    const response = await axios.get(SERVER_URL + "/user/profile", {
      withCredentials: true,
    });
    console.log(response);
    return response;
  } catch (e) {
    throw new Error("Registration failed. Please try again. " + e);
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(
      SERVER_URL + "/user/auth/logout",
      {},
      { withCredentials: true }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

export const addContact = async (contactData) => {
  const formData = new FormData();
  Object.entries(contactData).forEach(([key, value]) => {
    formData.append(key, value);
  });

  console.log(formData);

  try {
    const response = await axios.post(
      SERVER_URL + "/user/contacts/add",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    console.log(response.data); // If successful, log data to console for debugging purposes
    return response.data; // If successful, return data
  } catch (error) {
    console.log(error);
    console.log(error.response);
    if (error.response.status == 400) {
      return error.response;
    } else {
      // General error if no specific message from backend
      throw new Error("Registration failed. Please try again.");
    }
  }
};

export const getContacts = async (pageNumber, pageSize, sortBy, direction) => {
  try {
    const response = await axios.get(
      `${SERVER_URL}/user/contacts/get-contacts`,
      {
        params: {
          page: pageNumber, // Current page number
          size: pageSize, // Number of records per page
          sortBy: sortBy, // Field to sort by (e.g., name, phoneNumber)
          direction: direction, // Sort direction (asc or desc)
        },
        withCredentials: true,
      }
    );
    return response.data; // Extract data from response
  } catch (e) {
    throw new Error("Error fetching contacts. Please try again. " + e.message);
  }
};

export const getContactsByFilter = async (
  search,
  filter,
  page,
  rowsPerPage,
  sortBy,
  direction
) => {
  try {
    const response = await axios.get(`${SERVER_URL}/user/contacts/search`, {
      params: {
        value: search,
        field: filter,
        page,
        size: rowsPerPage,
        sortBy,
        direction,
      },
      withCredentials: true,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching contacts. Please try again. " + e.message);
  }
};

export const deleteContactsById = async (contactId) => {
  try {
    const response = await axios.post(
      `${SERVER_URL}/user/contacts/delete/${contactId}`,
      {},
      { withCredentials: true }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    throw new Error(
      "Error Deleting contact. Please try again. " + error.message
    );
  }
};

export const updateContact = async (contactData, contactId) => {
  console.log(contactData);
  const formData = new FormData();
  Object.entries(contactData).forEach(([key, value]) => {
    if (key === "contactImage" && value) {
      formData.append(key, value);
    } else if (key !== "contactImage") {
      formData.append(key, value);
    }
  });

  console.log(formData);

  try {
    const response = await axios.post(
      SERVER_URL + `/user/contacts/update/${contactId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    console.log(response.data); // If successful, log data to console for debugging purposes
    return response.data; // If successful, return data
  } catch (error) {
    throw new Error("Registration failed. Please try again. Error : " + error);
  }
};
