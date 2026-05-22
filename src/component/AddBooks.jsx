import axios from "axios";
import { useContext, useState } from "react";
import { validateBookAuthor, validateBtn, validateCopies, validateNumber } from "./Validation";
import { BookContext } from "./BookContext";

const AddBooks = () => {
  const { setFetchAgain } = useContext(BookContext);
  const [newBook, setnewBook] = useState({
    name: "",
    author: "",
    totalCopies: null,
    copies: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    author: "",
    totalCopies: null,
    copies: "",
  });
  const [backend, setBackend] = useState("");

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");
  const saveData = (e) => {
    const k = e.target.name;
    const val = e.target.value;

    setnewBook((formData) => ({ ...formData, [k]: val }));

    setnewBook((prev) => ({ ...prev, [k]: val }));

    if (k === "name") {
      setErrors((prev) => ({ ...prev, name: validateBookAuthor(val) }));
    }

    if (k === "author") {
      setErrors((prev) => ({ ...prev, author: validateBookAuthor(val) }));
    }

    if (k === "totalCopies") {
      setErrors((prev) => ({ ...prev, totalCopies: val <= 0 ? "Total copies must be greater than 0" : "" }));
    }

    if (k === "copies") {
      setErrors((prev) => ({ ...prev, copies: validateCopies(val, newBook.totalCopies) }));
    }
  };

  const submitData = async (e) => {
    e.preventDefault();
    const finalBookData = {
      ...newBook,
      copies: newBook.copies.split(","),
    };

    if (errors.name || errors.author || errors.totalCopies || errors.copies) {
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/book`, finalBookData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        timeout: 5000,
      });

      if (res.data.message === "Book created succesfully!") {
        setnewBook({
          name: "",
          author: "",
          totalCopies: "",
          copies: "",
        });
      }
      setFetchAgain((p) => !p);
      setBackend("");
    } catch (e) {
      console.log(e);
      setBackend(e.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="form">
      <h1>Add Books</h1>
      <form action="" method="post">
        <div>
          <label htmlFor="">Enter Book Name : </label>
          <input type="text" name="name" value={newBook.name} onChange={saveData} />
          <div className="errorMsg">
            <p>{errors.name}</p>
          </div>
        </div>
        <div>
          <label htmlFor="">Enter Book Author : </label>
          <input type="text" name="author" value={newBook.author} onChange={saveData} />
          <div className="errorMsg">
            <p>{errors.author}</p>
          </div>
        </div>{" "}
        <div>
          <label htmlFor="">Enter Total Copies : </label>
          <input type="number" name="totalCopies" onKeyDown={validateNumber} value={newBook.totalCopies} onChange={saveData} />
          <div className="errorMsg">
            <p>{errors.totalCopies}</p>
          </div>
        </div>{" "}
        <div>
          <label htmlFor="">Enter Copies serial no : </label>
          <input type="text" name="copies" value={newBook.copies} onChange={saveData} />{" "}
          <div className="errorMsg">
            <p>{errors.copies}</p>
          </div>
        </div>
        <small>Add serial number and separte them by comma(,)</small>
        <div className="errorMsg">
          <p>{backend}</p>
        </div>
        <button onClick={submitData} disabled={!validateBtn(errors,newBook)}> Add Book</button>
      </form>
    </div>
  );
};

export default AddBooks;
