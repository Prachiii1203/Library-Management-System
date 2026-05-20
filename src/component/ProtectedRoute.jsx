import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const accessToken = localStorage.getItem("token");
  const loggedRole = localStorage.getItem("role");

  if (accessToken == null || role !== loggedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
