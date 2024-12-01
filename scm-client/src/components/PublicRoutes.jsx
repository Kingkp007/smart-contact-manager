import {Navigate} from "react-router-dom" 

const PublicRoutes = ({ children }) => {
    return localStorage.getItem('loggedIn') ? <Navigate to="/" /> : children;
  };

  export default PublicRoutes;