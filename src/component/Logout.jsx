// import React from "react";

import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
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
