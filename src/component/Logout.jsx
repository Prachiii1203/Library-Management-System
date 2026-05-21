import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {

  const { setRole, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    setRole(null);
    setToken(null);
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
