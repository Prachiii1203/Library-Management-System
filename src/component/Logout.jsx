// import React from "react";

import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.setItem("token", null);
    localStorage.setItem("role", null);
    navigate("/");
  };
  return (
    <div>
      <button onClick={logout} className="logoutbtn">Logout</button>
    </div>
  );
};

export default Logout;
