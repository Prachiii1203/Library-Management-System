import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AllBooks = () => {
  const [allBooks, setAllBooks] = useState([]);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");
  const nav = useNavigate();

  const fetchallBooks = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/book?page=1&limit=10`, { headers: { Authorization: `Bearer ${token}` } });

      setAllBooks(res.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchallBooks();
  }, []);

  const IssueBookBtn = (id) => {
    localStorage.setItem("issueBookId", id);
    nav("/issueBook");
  };

  return (
    <div className="LibraryBook">
      <div>
        <h1>Library</h1>
      </div>
      <div className="libBooks">
        <table>
          <thead>
            <tr>
              <th>Book Name</th>
              <th>Author</th>
              <th>Total Books</th>
              <th>Available Copies</th>
              <th>Available to issue</th>
              <th>Issue Book</th>
            </tr>
          </thead>
          <tbody>
            {allBooks.map((book) => (
              <tr key={book._id}>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{book.totalCopies}</td>
                <td>
                  {book.copies.map((copy) => (
                    <p key={copy._id}>
                      {copy.serialNumber} {copy.isAvailable ? "Available" : "Not Available"}
                      {/* "✅" : "❌" */}
                    </p>
                  ))}
                </td>
                <td>{book.currentAvailability ? "Available" : "Not Available"}</td>
                <td>
                  <button disabled={!book.currentAvailability} onClick={() => IssueBookBtn(book._id)}>
                    Issue Book
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBooks;
