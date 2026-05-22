import "./App.css";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import Login from "./component/Login";
import AdminHeader from "./component/AdminHeader";
import UserDashboard from "./component/UserDashboard";
import ProtectedRoute from "./component/ProtectedRoute";
import Register from "./component/Register";
import AllUser from "./component/AllUser";
import AddBooks from "./component/AddBooks";
import AllBooks from "./component/AllBooks";
import IssueBooks from "./component/IssueBooks";
import { useContext } from "react";
import AllIssuedBook from "./component/AllIssuedBook";
import AdminDashboard from "./component/AdminDashboard";
import { AuthContext } from "./component/AuthContext";
import UserLibrary from "./component/UserLibrary";
import UserProfile from "./component/UserProfile";

function App() {
  const { role } = useContext(AuthContext);
  const location = useLocation();

  return (
    <div>
      {location.pathname === "/" ? (
        <div className="Header">
          <h1 className="loginHeaderh1">Library Management System</h1>
        </div>
      ) : role === "ADMIN" ? (
        <AdminHeader />
      ) : (
        <UserDashboard />
      )}
      <Routes>
        <Route path="/" element={<Login />} />

        {/* ADMIN ROUTING */}
        <Route
          element={
            <ProtectedRoute role="ADMIN">
              <Outlet />
            </ProtectedRoute>
          }
        >
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/issueBook" element={<IssueBooks />} />
          <Route path="/userDetails" element={<AllUser />} />
          <Route path="/add-book" element={<AddBooks />} />
          <Route path="/allbook" element={<AllBooks showIssueBtn={true} />} />
          <Route path="/adduser" element={<Register />} />
          <Route path="/issuedbook" element={<AllIssuedBook />} />
        </Route>

        {/* USER ROUTING */}
        <Route
          element={
            <ProtectedRoute role="USER">
              <Outlet />
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<UserLibrary />} />
          <Route path="/transaction" element={<UserProfile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
