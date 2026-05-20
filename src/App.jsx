import "./App.css";

import { Route, Routes } from "react-router-dom";
import Login from "./component/Login";
import AdminDashboard from "./component/AdminDashboard";
import UserDashboard from "./component/UserDashboard";
import ProtectedRoute from "./component/ProtectedRoute";
import Register from "./component/Register";
import AllUser from "./component/AllUser";
import AddBooks from "./component/AddBooks";
import AllBooks from "./component/AllBooks";
import IssueBooks from "./component/IssueBooks";

function App() {
  return (
    <>
      <AdminDashboard />

      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route element={<ProtectedRoute role={["ADMIN"]} />}>
          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="register" element={<Register />} />
            <Route path="issueBook" element={<IssueBooks />} />
            <Route path="userDetails" element={<AllUser />} />
            <Route path="add-book" element={<AddBooks />} />
            <Route path="allbook" element={<AllBooks />} />
          </Route>
        </Route> */}
        <Route path="/admin" element={<ProtectedRoute role="ADMIN"></ProtectedRoute>} />
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
              <AllBooks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
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
          path="/user"
          element={
            <ProtectedRoute role="USER">
              <UserDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      {/* <button onClick={() => nav(-1)}>Back</button> */}
    </>
  );
}

export default App;
