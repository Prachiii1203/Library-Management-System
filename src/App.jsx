import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
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
  const { role } = useContext(AuthContext );
  const location = useLocation();

  return (
    <div>
      {location.pathname === "/" ? <LoginHeader /> : role === "ADMIN" ? <AdminHeader /> : <UserDashboard />}
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route element={<ProtectedRoute role={["ADMIN"]} />}>
          <Route path="/admin" element={<AdminHeader />}>
            <Route path="adduser" element={<Register />} />
            <Route path="issueBook" element={<IssueBooks />} />
            <Route path="userDetails" element={<AllUser />} />
            <Route path="add-book" element={<AddBooks />} />
            <Route path="allbook" element={<AllBooks />} />
          </Route>
        </Route> */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/issueBook"
          element={
            <ProtectedRoute role="ADMIN">
              <IssueBooks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/userDetails"
          element={
            <ProtectedRoute role="ADMIN">
              <AllUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-book"
          element={
            <ProtectedRoute role="ADMIN">
              <AddBooks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/allbook"
          element={
            <ProtectedRoute role="ADMIN">
              <AllBooks showIssueBtn={true} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adduser"
          element={
            <ProtectedRoute role="ADMIN">
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path="/issueBook"
          element={
            <ProtectedRoute role="ADMIN">
              <IssueBooks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/issuedbook"
          element={
            <ProtectedRoute role="ADMIN">
              <AllIssuedBook />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/library"
          element={
            <ProtectedRoute role="USER">
              <AllUser showIssueBtn={true} />
            </ProtectedRoute>
          }
        /> */}
      </Routes>
      {/* <button onClick={() => nav(-1)}>Back</button> */}
    </div>
  );
}

export default App;
