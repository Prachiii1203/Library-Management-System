import "./App.css";

import { Route, Routes } from "react-router-dom";
import Login from "./component/Login";
import AdminDashboard from "./component/AdminDashboard";
import UserDashboard from "./component/UserDashboard";
import ProtectedRoute from "./component/ProtectedRoute";
import Error404 from "./component/Error404";
import Register from "./component/Register";
import AllUser from "./component/AllUser";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/404" element={<Error404 />} />
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
          path="/user"
          element={
            <ProtectedRoute role="USER">
              <UserDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
