import { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
// import { Navigate, useNavigate } from "react-router-dom";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalpage, setTotalPage] = useState(0);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [fetchAgain, setFetchAgain] = useState(false);
  const { role, token, handleSessionExpired } = useContext(AuthContext);

  const fetchUsers = async () => {
    if (!token) return;

    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/user?page=${page}&limit=10`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data.data.users);
      setTotalPage(res.data.data.pagination.totalPages);
    } catch (e) {
      console.log(e);
      if (e.response?.status === 401) {
        // console.log("user 401");
        handleSessionExpired();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (role === "ADMIN") {
      fetchUsers();
    }
  }, [page, fetchAgain, token]);

  return <UserContext.Provider value={{ users, setUsers, fetchUsers, page, setPage, loading, totalpage, BASE_URL, token, setFetchAgain }}>{children}</UserContext.Provider>;
};

export default UserProvider;
