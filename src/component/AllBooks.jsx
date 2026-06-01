import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookContext } from "./BookContext";

const AllBooks = ({ showIssueBtn }) => {
  const { books: allbooks } = useContext(BookContext);
  const nav = useNavigate();
  const [books, setBooks] = useState(allbooks);

  const IssueBookBtn = (id, name) => {
     const data = { bookId: id, bookname: name };
    nav("/issueBook", { state: data });
  };

  const searchData = (e) => {
    const value = e.target.value.toLowerCase();

    if (value === "") {
      return setBooks(allbooks);
    }
    const filteredBooks = allbooks.filter((book) => book.name.toLowerCase().includes(value));

    setBooks(filteredBooks);
  };

  useEffect(() => {
    setBooks(allbooks);
  }, [allbooks]);
  return (
    <div className="LibraryBook">
      <div>
        <h1>Library</h1>
      </div>
      {showIssueBtn && (
        <>
          <div>
            <button onClick={() => nav("/add-book")}>+ Add Book</button>
          </div>
          <div>
            <input type="text" onChange={searchData} />
          </div>
        </>
      )}
      <div className="libBooks">
        <table>
          <thead>
            <tr>
              <th>Book Name</th>
              <th>Author</th>
              <th>Total Books</th>
              <th>Copies Details</th>

              {showIssueBtn && (
                <>
                  <th>Available to issue</th>
                  <th>Issue Book</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{book.totalCopies}</td>
                {showIssueBtn && (
                  <td>
                    {book.copies.map((copy) => (
                      <p key={copy._id}>
                        {copy.serialNumber} {copy.isAvailable ? "Available" : "Not Available"}
                        {/* "✅" : "❌" */}
                      </p>
                    ))}
                  </td>
                )}
                <td>{book.currentAvailability ? "Available" : "Not Available"}</td>
                {showIssueBtn && (
                  <td>
                    <button disabled={!book.currentAvailability} onClick={() => IssueBookBtn(book._id, book.name)}>
                      Issue Book
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBooks;
