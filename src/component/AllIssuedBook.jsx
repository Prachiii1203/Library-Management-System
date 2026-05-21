import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BookContext } from "./BookContext";

const AllIssuedBook = () => {
  const nav = useNavigate();

  const { books: allIssuedBook, BASE_URL, token, setFetchAgain } = useContext(BookContext);

  const returnedBook = async (id, serialNumber) => {
    const res = await axios.post(`${BASE_URL}/book/return/${id}`, { serialNumber }, { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } });
    if (res.data.message === "book returned succesfully!") {
      alert(res.data.message);
    }
    setFetchAgain((pre) => !pre);
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
