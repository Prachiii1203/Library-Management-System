import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { toast } from "react-toastify";

const AllUser = () => {
  const { users, page, setPage, totalpage, setFetchAgain } = useContext(UserContext);

  const nav = useNavigate();

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");

  const deleteUser = async (id) => {
    if (window.confirm("You sure you want to delete User?")) {
      try {
        const res = await axios.delete(`${BASE_URL}/user/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        if (res.data.message === "User deleted successfully") {
          alert(res.data.message);
        }
        setFetchAgain((pre) => !pre);
      } catch (e) {
        console.log(e);
        if (e.response?.status === 401) {
          toast.error("Session expires.Please Login Again");
          nav("/");
        }
      }
    }
  };

  return (
    <div className="allUser">
      <div>
        <h1>Users</h1>
      </div>
      <div className="adduserbtn">
        <button onClick={() => nav("/adduser")}>+ Add User</button>
      </div>
      <div className="userDetails">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>{user.contact}</td>
                <td>
                  <button onClick={() => deleteUser(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="navigateBtn">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <button onClick={() => setPage(page + 1)} disabled={page === totalpage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default AllUser;
