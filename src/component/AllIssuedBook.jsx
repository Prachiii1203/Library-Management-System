import axios from "axios";
import { useContext } from "react";
import { BookContext } from "./BookContext";
import { TransactionContext } from "./TransactionContext";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";

const AllIssuedBook = () => {
  const { books: allIssuedBook, BASE_URL, token, setFetchAgain } = useContext(BookContext);
  const { setFetchAgain: setTransactionfetch } = useContext(TransactionContext);
  const { handleSessionExpired } = useContext(AuthContext);

  const returnedBook = async (id, serialNumber) => {
    try {
      if (window.confirm("Book Returned Confirm ?")) {
        await axios.post(`${BASE_URL}/book/return/${id}`, { serialNumber }, { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } });
        setFetchAgain((pre) => !pre);
        setTransactionfetch((pre) => !pre);
        toast.success("Book Returned !!");
      }
      return;
    } catch (e) {
      console.log(e);
      if (e?.response?.status === 401) {
        handleSessionExpired();
      }
    }
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
            {allIssuedBook.map((book) =>
              book.copies.map(
                (copy) =>
                  !copy.isAvailable && (
                    <tr key={`${book._id}-${copy.serialNumber}`}>
                      <td>{book.name}</td>
                      <td>{copy.serialNumber}</td>
                      <td>
                        <button onClick={() => returnedBook(book._id, copy.serialNumber)}>Return</button>
                      </td>
                    </tr>
                  ),
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllIssuedBook;
