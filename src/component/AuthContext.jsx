import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleSessionExpired = () => {
    localStorage.clear();
    setRole(null);
    setToken(null);

    toast.error("Session expired. Please login again.");

    setTimeout(() => {
      nav("/");
    }, 1500);
  };

  return (
    <AuthContext.Provider value={{ role, setRole, token, setToken, handleSessionExpired }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;