import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ role, children }) => {
  const authToken = localStorage.getItem("authToken");
  const userRole = localStorage.getItem("userRole");

  if (!authToken) {
    return <Navigate to="/theatermanagement" replace />;
  }

  if (role && userRole !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
