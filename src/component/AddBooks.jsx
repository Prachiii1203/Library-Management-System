import axios from "axios";
import { useState } from "react";
import { validateCopies, validateName } from "./Validation";

const AddBooks = () => {
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
    backend: ""
  });
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");
  const saveData = (e) => {
    const k = e.target.name;
    const val = e.target.value;

    setnewBook((formData) => ({ ...formData, [k]: val }));

    console.log(newBook);

    setnewBook((prev) => ({ ...prev, [k]: val, }));

    if (k === "name") {
      setErrors((prev) => ({ ...prev, name: validateName(val), }));
    }

    if (k === "author") {
      setErrors((prev) => ({ ...prev, author: validateName(val), }));
    }

    if (k === "totalCopies") {
      setErrors((prev) => ({ ...prev, totalCopies: val <= 0 ? "Total copies must be greater than 0" : "", }));
    }

    if (k === "copies") {
      setErrors((prev) => ({ ...prev, copies: validateCopies(val, newBook.totalCopies), }));
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
        alert(res.data.message);
        setnewBook({
          name: "",
          author: "",
          totalCopies: "",
          copies: "",
        });
      }
    } catch (e) {
      console.log(e);
      setErrors((prev) => ({ ...prev, backend: e.response?.data?.message || "Something went wrong", }));
    };
  }
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
          <input type="number" name="totalCopies" onKeyDown={(e) => {
            if (e.key === "e" || e.key === "E" || e.key === "+" || e.key === "-" || e.key === "*") {
              e.preventDefault();
            }
          }} value={newBook.totalCopies} onChange={saveData} />
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
          <p>{errors.backend}</p>
        </div>
        <button onClick={submitData}>Add Book</button>
      </form>
    </div>
  );
};


export default AddBooks;
