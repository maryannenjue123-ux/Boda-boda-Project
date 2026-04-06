// ... imports remain the same
import Dashboard from './components/Dashboard'; 

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsAuthenticated(true);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login setAuth={setIsAuthenticated} /> : <Navigate to="/" />} />
        
        {/* IMPORTANT: Pass setAuth={setIsAuthenticated} to Dashboard here */}
        <Route path="/" element={
          isAuthenticated ? (
            <Dashboard setAuth={setIsAuthenticated} /> 
          ) : (
            <Navigate to="/login" />
          )
        } />
        
        {/* If you use this Dashboard on other routes, pass setAuth there too */}
        <Route path="/members" element={isAuthenticated ? <MemberList /> : <Navigate to="/login" />} />
        <Route path="/transactions" element={isAuthenticated ? <Transactions /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}