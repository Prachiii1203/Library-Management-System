import { useContext } from "react";
import { BookContext } from "./BookContext";
import { useLocation } from "react-router-dom";

const UserLibrary = () => {
  const { books } = useContext(BookContext);
  const loc = useLocation();
  const uname = loc.state;
   
  localStorage.setItem("user", uname);
  return (
    <div className="userLibrary">
      <div className="userLibraryHeader">
        <h1>Library</h1>
      </div>

      <div className="libraryCard">
        {books.map((book) => (
          <div key={book._id} className="bookCard">
            <h2>{book.name}</h2>
            <p>{book.author}</p>
            <small>{book.currentAvailability ? "Available" : "Not Available"} to issue</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserLibrary;
