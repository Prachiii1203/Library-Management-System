import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const TransactionContext = createContext();

const TransactionProvider = ({ children }) => {
  const [transaction, setTransaction] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalpage, setTotalPage] = useState(0);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [fetchAgain, setFetchAgain] = useState(false);
  const nav = useNavigate();
  const { token, handleSessionExpired } = useContext(AuthContext);

  const fetchTransaction = async () => {
    if (!token) return;

    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/transaction?page=${page}&limit=10`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTransaction(res.data.data.transactions);

      setTotalPage(res.data.data.pagination.totalPages);
    } catch (e) {
      console.log(e);
      if (e.response?.status === 401) {
        console.log("tra 401");
        
        handleSessionExpired();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransaction();
  }, [page, fetchAgain, token]);
  return <TransactionContext.Provider value={{ transaction, setTransaction, fetchTransaction, page, setPage, loading, BASE_URL, totalpage, token, setFetchAgain }}>{children}</TransactionContext.Provider>;
};

export default TransactionProvider;
