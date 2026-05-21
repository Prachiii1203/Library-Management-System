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
          {/* <Link to="/add-book">Add Books</Link> */}
          {/* <Link to="/adduser">Add User</Link> */}
          <Link to="/userDetails">Users</Link>
          <Link to="/issuedbook">Issued Book</Link>
        </div>
        <div className="Headerlogout">
          <Logout />
        </div>
      </div>
    </>
  );
};

export default AdminHeader;
