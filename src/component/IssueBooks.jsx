import axios from "axios";
import { useContext, useState } from "react";
import { BookContext } from "./BookContext";
import { UserContext } from "./UserContext";
import Select from "react-select";
import { useLocation, useNavigate } from "react-router-dom";

const IssueBooks = () => {
  const today = new Date().toISOString().split("T")[0];
  const [issueBookData, setIssueBookData] = useState({
    userId: "",
    serialNumber: "",
    dueDate: today,
  });
  const location = useLocation();

  const { users } = useContext(UserContext);

  const allUser = users.map((u) => ({
    value: u._id,
    label: u.userName,
  }));

  const { books: allBook, BASE_URL, token, setFetchAgain } = useContext(BookContext);
  const navigation = useNavigate();
  const bookId = location.state.bookId;
  const bookname = location.state.bookname;

  const saveData = (e) => {
    const k = e.target.name;
    const val = e.target.value;

    setIssueBookData((bookData) => ({ ...bookData, [k]: val }));
    console.log(k, val);
  };

  const submitData = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/book/issue/${bookId}`, issueBookData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        timeout: 5000,
      });
      console.log(res.data);
      if (res.data.message === "book issued succesfully!") {
        alert(res.data.message);
      }
      setFetchAgain((p) => !p);
      navigation("/allbook");
    } catch (e) {
      console.log(e);
    }
  };

  const customStyles = {
    control: (base) => ({
      ...base,
      border: "1px solid black",
      borderRadius: "8px",
      minHeight: "32px", // 👈 overall height fix
      height: "32px",
      boxShadow: "none",
    }),

    menu: (base) => ({
      ...base,
      width: "250px",
      zIndex: 9999,
    }),

    valueContainer: (provided) => ({
      ...provided,
      height: "32px",
      padding: "0 8px",
    }),

    menuList: (base) => ({
      ...base,
      maxHeight: "100px",
      overflowY: "auto",
      overflowX: "hidden",
    }),

    input: (provided) => ({
      ...provided,
      margin: "0px",
      padding: "0px",
    }),

    option: (base) => ({
      ...base,
      textTransform: "capitalize",
    }),

    indicatorsContainer: (provided) => ({
      ...provided,
      height: "32px",
    }),
  };

  return (
    <div>
      {bookId !== null && (
        <div className="form">
          <h1>Book Issue Details</h1>
          <p>Book : {bookname}</p>
          <form action="">
            <div>
              <label htmlFor="">User</label>
              <Select
                className="DropDownSelect"
                styles={customStyles}
                options={allUser}
                isSearchable
                placeholder="Search User"
                onClick={saveData}
                onChange={(selectedOption) => {
                  setIssueBookData((prev) => ({
                    ...prev,
                    userId: selectedOption.value,
                  }));
                }}
              />{" "}
            </div>
            <div>
              <label htmlFor="">Serial Number</label>
              <select name="serialNumber" id="" onChange={saveData}>
                <option value="" disabled selected>
                  ---select---
                </option>

                {allBook.map((book) => (
                  <>
                    {book._id === bookId && (
                      <>
                        {book.copies && (
                          <>
                            {book.copies.map((bookcopy) => (
                              <>
                                {bookcopy.isAvailable && (
                                  <option value={bookcopy.serialNumber} key={bookcopy._id}>
                                    {bookcopy.serialNumber}
                                  </option>
                                )}
                              </>
                            ))}
                          </>
                        )}
                      </>
                    )}
                  </>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="">Due Date</label>
              <input type="date" name="dueDate" id="" min={today} onChange={saveData} value={issueBookData.dueDate} />
            </div>
            <button onClick={submitData}>Book Issued</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default IssueBooks;
