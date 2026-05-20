import axios from "axios";
import { useState } from "react";

const AddBooks = () => {
  const [newBook, setnewBook] = useState({
    name: "",
    author: "",
    totalCopies: null,
    copies: "",
  });
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");
  const saveData = (e) => {
    const k = e.target.name;
    const val = e.target.value;

    setnewBook((formData) => ({ ...formData, [k]: val }));

    console.log(newBook);
  };

  const submitData = async (e) => {
    e.preventDefault();
    const finalBookData = {
      ...newBook,
      copies: newBook.copies.split(","),
    };
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
    }
  };
  return (
    <div className="form">
      <h1>Add User</h1>
      <form action="" method="post">
        <div>
          <label htmlFor="">Enter Book Name : </label>
          <input type="text" name="name" value={newBook.name} onChange={saveData} />
        </div>
        <div>
          <label htmlFor="">Enter Book Author : </label>
          <input type="text" name="author" value={newBook.author} onChange={saveData} />
        </div>{" "}
        <div>
          <label htmlFor="">Enter Total Copies : </label>
          <input type="number" name="totalCopies" value={newBook.totalCopies} onChange={saveData} />
        </div>{" "}
        <div>
          <label htmlFor="">Enter Copies serial no : </label>
          <input type="text" name="copies" value={newBook.copies} onChange={saveData} />{" "}
        </div>
        <small>Add serial number and separte them by comma(,)</small>
        <button onClick={submitData}>Add Book</button>
      </form>
    </div>
  );
};

export default AddBooks;
