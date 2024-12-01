export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
  
    // Fetch authentication status
    const fetchAuthStatus = () => {
      setLoading(true);
      axios
        .get("/api/auth/status", { withCredentials: true })
        .then((response) => {
          setIsAuthenticated(response.data.isAuthenticated);
          setLoading(false);
        })
        .catch(() => {
          setIsAuthenticated(false);
          setLoading(false);
        });
    };
  
    useEffect(() => {
      fetchAuthStatus(); // Initial check when the app loads
    }, []);
  
    return (
      <AuthContext.Provider value={{ isAuthenticated, loading, fetchAuthStatus }}>
        {children}
      </AuthContext.Provider>
    );
  };
  