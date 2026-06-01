import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [sessionExpired, setSessionExpired] = useState(false);
  const nav = useNavigate();

  const handleSessionExpired = () => {
    if (sessionExpired) return;

    setSessionExpired(true);
    localStorage.clear();
    setRole(null);
    setToken(null);
    toast.error("Session expired. Please login again.", {
      toastId: "session-expired",
    });
    nav("/");
  };

  return <AuthContext.Provider value={{ role, setRole, token, setToken, handleSessionExpired, setSessionExpired }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
