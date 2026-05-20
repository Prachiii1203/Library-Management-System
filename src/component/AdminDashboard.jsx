import { Link } from "react-router-dom";
import AllUser from "./AllUser";
import Logout from "./Logout";
import ProtectedRoute from "./ProtectedRoute";

const AdminDashboard = () => {
  return (
    <div>
      <Logout />
      <Link to="/userDetails">Alluser</Link>
      AdminDashboard
    </div>
  );
};

export default AdminDashboard;
