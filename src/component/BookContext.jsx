import { createContext, useEffect, useState } from "react";
import axios from "axios";

const CreateBookContext = createContext();

const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchAgain, setFetchAgain] = useState(false);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");

  const fetchBooks = async () => {
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [fetchAgain]);

  return <BookContext.Provider value={{ books, setBooks, fetchBooks, loading, BASE_URL, token, setFetchAgain }}>{children}</BookContext.Provider>;
};

export default BookProvider;
export const BookContext = CreateBookContext;
