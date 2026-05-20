import axios from "axios";
import { useEffect, useState } from "react";

const AllUser = () => {
  const [allUser, setAlluser] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(false);
  const [page, setPage] = useState(1);

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");

  const fetchAllUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user?page=${page}&limit=10`, { headers: { Authorization: `Bearer ${token}` } });
      setAlluser(res.data.data.users);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete User")) {
      try {
        const res = await axios.delete(`${BASE_URL}/user/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        if (res.data.message === "User deleted successfully") {
          alert(res.data.message);
        }
        setFetchAgain(!fetchAgain);
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    fetchAllUser();
  }, [fetchAgain, page]);

  return (
    <div className="allUser">
      <div>
        <h1>Users</h1>
      </div>
      <div className="userDetails">
        <table border={1}>
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
            {allUser.map((user) => (
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

        <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
        <button onClick={() => setPage(page + 1)} >Next</button>
      </div>
    </div>
  );
};

export default AllUser;
