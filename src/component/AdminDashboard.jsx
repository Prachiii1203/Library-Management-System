import { Link, Outlet } from "react-router-dom";
import Logout from "./Logout";

const AdminDashboard = () => {
  return (
    <>
      <div className="Header">
        <div className="headerLink">
            <h1> Admin Panel</h1>
          <Link to="/allbook"> Library</Link>
          <Link to="/add-book">Add Books</Link>
          <Link to="/register">Add User</Link>
          <Link to="/userDetails">Users</Link>
          {/* <Link>Issue Book</Link> */}
          {/* <Link>Return Book</Link> */}
        </div>
        <div className="Headerlogout">
          <Logout />
        </div>
      </div>
      {/* <Outlet /> */}
    </>
  );
};

export default AdminDashboard;
