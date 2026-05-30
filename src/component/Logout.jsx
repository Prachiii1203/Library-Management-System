import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Logout = () => {

  const { setRole, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    setRole(null);
    setToken(null);
    toast.success("Logged out")
    navigate("/");
  };
  return (
    <div>
      <button onClick={logout} className="logoutbtn">
        Logout
      </button>
    </div>
  );
};

export default Logout;
