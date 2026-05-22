import { Link } from "react-router-dom";
import Logout from "./Logout";

const UserDashboard = () => {
  return (
    <>
      <div className="Header">
        <div className="headerLink">
          {" "}
          <Link to="/home">
            <h2>Welcome {} !! </h2>
          </Link>
          <Link to="/home">Library</Link>
          <Link to="/transaction">My Transaction</Link>
        </div>
        <div className="Headerlogout">
          <Logout />
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
