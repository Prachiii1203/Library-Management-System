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
import { useContext, useEffect, useState } from "react";
import LoginHeader from "./component/LoginHeader";
import AllIssuedBook from "./component/AllIssuedBook";
import AdminDashboard from "./component/AdminDashboard";
import { AuthContext } from "./component/AuthContext";

function App() {
  const { role } = useContext(AuthContext);
  const location = useLocation();

  return (
    <div>
      {location.pathname === "/" ? <LoginHeader /> : role === "ADMIN" ? <AdminHeader /> : <UserDashboard />}
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<ProtectedRoute role="ADMIN"><Outlet /></ProtectedRoute>}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/issueBook" element={<IssueBooks />} />
          <Route path="/userDetails" element={<AllUser />} />
          <Route path="/add-book" element={<AddBooks />} />
          <Route path="/allbook" element={<AllBooks showIssueBtn={true} />} />
          <Route path="/adduser" element={<Register />} />
          <Route path="/issuedbook" element={<AllIssuedBook />} />
        </Route>
      </Routes>


      {/* <Route
            path="/library"
            element={
              <ProtectedRoute role="USER">
                <Library />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transaction"
            element={
              <ProtectedRoute role="USER">
                <Transaction />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute role="USER">
                <Profile />
              </ProtectedRoute>
            }
          /> */}
    </div >
  );
}

export default App;
