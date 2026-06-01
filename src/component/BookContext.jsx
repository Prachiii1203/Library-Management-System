import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
 
const CreateBookContext = createContext();

const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchAgain, setFetchAgain] = useState(false);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { token, handleSessionExpired } = useContext(AuthContext);
  const fetchBooks = async () => {
    if (!token) return;

    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/book`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks(res.data.data);
    } catch (e) {
      console.log(e);
      if (e.response?.status === 401) {
        // console.log("book 401");
        handleSessionExpired();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [fetchAgain, token]);

  return <BookContext.Provider value={{ books, setBooks, fetchBooks, loading, BASE_URL, token, setFetchAgain }}>{children}</BookContext.Provider>;
};

export default BookProvider;
export const BookContext = CreateBookContext;
