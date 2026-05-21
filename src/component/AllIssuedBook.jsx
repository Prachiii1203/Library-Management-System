import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AllIssuedBook = () => {
  const [allIssuedBook, setAllIssuedBook] = useState([]);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");
  const nav = useNavigate();

  const fetchallBooks = async () => {
    try {
      // transaction?page=1&limit=10`, { headers: { Authorization: `Bearer ${token}` } });
      //   setAllIssuedBook(res.data.data.transactions);
      const res = await axios.get(`${BASE_URL}/book`, { headers: { Authorization: `Bearer ${token}` } });
      setAllIssuedBook(res.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchallBooks();
  }, []);

  // book returned succesfully!
  const returnedBook = async (id, serialNumber) => {
    const res = await axios.post(`${BASE_URL}/book/return/${id}`, { serialNumber }, { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } });
    if (res.data.message === "book returned succesfully!") {
      alert(res.data.message);
    }
    nav("/admin");
  };

  return (
    <div className="LibraryBook">
      <div>
        <h1>Issued Books</h1>
      </div>
      <div className="libBooks">
        <table>
          <thead>
            <tr>
              <th>Book Name</th>
              <th>Serial No</th>
              <th>Return </th>
            </tr>
          </thead>
          <tbody>
            {allIssuedBook.map((book) => (
              <>
                {book.copies.map((copy) => (
                  <>
                    {!copy.isAvailable && (
                      <tr key={book._id}>
                        <td>{book.name}</td>
                        <td>{copy.serialNumber}</td>
                        <td>
                          <button onClick={() => returnedBook(book._id, copy.serialNumber)}>Return</button>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllIssuedBook;
