import { Link } from "react-router-dom";
import Logout from "./Logout";

const AdminHeader = () => {
  return (
    <>
      <div className="Header">
        <div className="headerLink">
          <Link to="/admin">
            {" "}
            <h2>Admin Panel </h2>
          </Link>{" "}
          <Link to="/allbook"> Library</Link>
          <Link to="/userDetails">Users</Link>
          <Link to="/issuedbook">Return Book</Link>
          <Link to="/history">Book history</Link>
        </div>
        <div className="Headerlogout">
          <Logout />
        </div>
      </div>
    </>
  );
};

export default AdminHeader;
