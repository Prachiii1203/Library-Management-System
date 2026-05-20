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

function App() {
   return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
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
