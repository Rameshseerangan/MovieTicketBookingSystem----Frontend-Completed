import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ setSearchQuery }) => {
  const [query, setQuery] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Clear token
    localStorage.removeItem("userRole"); // Clear role if stored
    setIsAuthenticated(false);
    navigate("/"); // Redirect to login page
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gray-900 text-white shadow-lg">
      {/* Movie Explorer Logo */}
      <h1 className="text-3xl font-bold text-red-500">Movie Explorer</h1>

      {/* Search Bar */}
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search movies..."
          className="p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          onClick={() => setSearchQuery(query)}
        >
          Search
        </button>
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center space-x-4">
        {isAuthenticated ? (
          // Show Logout button if user is logged in
          <button
            onClick={handleLogout}
            className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Logout
          </button>
        ) : (
          // Show Login & Register buttons if user is NOT logged in
          <>
            <Link to="/login">
              <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
                Register
              </button>
            </Link>
          </>
        )}

        <Link to="/bookings">
          <button className="p-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500">
            BookingInfo
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
