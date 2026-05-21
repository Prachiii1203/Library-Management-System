import { Link } from "react-router-dom";
import Logout from "./Logout";

const UserDashboard = () => {
  return (
    <>
      <div className="Header">
        <div className="headerLink">
          {" "}
          <Link to="/admin">
            {" "}
            <h2>Welcome User !! </h2>
          </Link>
          <Link> Profile</Link>
        </div>
        <div className="Headerlogout">
          <Logout />
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
