import axios from "axios";
import { useContext, useState } from "react";
import { validateBookAuthor, validateBtn, validateCopies, validateNumber } from "./Validation";
import { BookContext } from "./BookContext";
import { toast } from "react-toastify";

const AddBooks = () => {
  const { setFetchAgain, BASE_URL, token } = useContext(BookContext);
  const [newBook, setnewBook] = useState({
    name: "",
    author: "",
    totalCopies: 1,
    copies: [""],
  });
  const [errors, setErrors] = useState({
    name: "",
    author: "",
    copies: "",
  });

  const saveData = (e) => {
    const k = e.target.name;
    const val = e.target.value;

    setnewBook((formData) => ({ ...formData, [k]: val }));

    if (k === "name") {
      setErrors((prev) => ({ ...prev, name: validateBookAuthor(val) }));
    }

    if (k === "author") {
      setErrors((prev) => ({ ...prev, author: validateBookAuthor(val) }));
    }
  };

  const submitData = async (e) => {
    e.preventDefault();
    if (errors.name || errors.author || errors.copies) {
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/book`, newBook, {
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
          totalCopies: 1,
          copies: [""],
        });
      }
      setFetchAgain((p) => !p);
    } catch (e) {
      console.log(e);
      toast.error(e.response?.data?.message || "Something went wrong");
    }
  };

  const handleCopyChange = (index, value) => {
    const updatedCopies = [...newBook.copies];
    updatedCopies[index] = value;
    x;

    setnewBook((prev) => ({ ...prev, copies: updatedCopies }));
    setErrors((prev) => ({ ...prev, copies: validateCopies(newBook.copies, value) }));
  };

  const addCopyField = () => {
    setnewBook((prev) => ({ ...prev, copies: [...prev.copies, ""], totalCopies: prev.totalCopies + 1 }));
  };

  const removeSno = (sno) => {
    const updatedCopies = newBook.copies.filter((_, i) => i !== sno);

    setnewBook((prev) => ({
      ...prev,
      copies: updatedCopies,
      totalCopies: updatedCopies.length,
    }));
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
          Total Copies <input type="number" name="totalCopies" placeholder="" onKeyDown={validateNumber} value={newBook.totalCopies} onChange={saveData} readOnly />
          <button type="button" onClick={addCopyField}>
            +
          </button>
        </div>{" "}
        <div>
          <label htmlFor="">Enter Copies serial no : </label>
          {newBook.copies.map((copy, index) => (
            <div className="serialRow" key={index}>
              <input type="text" value={copy} placeholder={`Serial No ${index + 1}`} onChange={(e) => handleCopyChange(index, e.target.value)} />
              <button type="button" onClick={() => removeSno(index)} disabled={newBook.copies.length === 1}>
                -
              </button>
            </div>
          ))}
          <div className="errorMsg">
            <p>{errors.copies}</p>
          </div>
        </div>
        <button type="submit" onClick={submitData} disabled={!validateBtn(errors, newBook)}>
          {" "}
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBooks;
