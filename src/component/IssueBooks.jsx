import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { BookContext } from "./BookContext";
import { UserContext } from "./UserContext";
import Select from "react-select";

const IssueBooks = () => {
  const today = new Date().toISOString().split("T")[0];
  const [issueBookData, setIssueBookData] = useState({
    userId: "",
    serialNumber: "",
    dueDate: today,
  });

  //context data
  const { users } = useContext(UserContext);
  const [searchedUser, setSearchedUser] = useState();

  const allUser = users.map((u) => ({
    value: u._id,
    label: u.userName,
  }));

  const { books: allBook, BASE_URL, token } = useContext(BookContext);
  // const [allBook, setAllBooks] = useState([]);
  // const [user, setUser] = useState([]);

  const bookId = localStorage.getItem("issueBookId");

  // const fetchData = async () => {
  //   try {
  //     const UserRes = await axios.get(`${BASE_URL}/user `, { headers: { Authorization: `Bearer ${token}` } });
  //     setUser(UserRes.data.data.users);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  useEffect(() => {
    setSearchedUser(users);
  }, []);

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
      localStorage.setItem("issueBookId", null);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      {bookId !== null && (
        <div className="form">
          <h1>Book Issue Details</h1>
          <form action="">
            <div>
              <label htmlFor="">User</label>
              {/* <select name="userId" id="" onChange={saveData}>
                <option value="" disabled selected>
                  ---select---
                </option>
                {user.map((u) => (
                  <option value={u._id}>{u.userName}</option>
                ))}
              </select> */}
              {/* here in select drop down userName should display */}
              <Select
                className="DropDownSelect"
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

// users data
// [0 :  {_id: '6a0df7ef03696ee0b7c7e509', userName: 'emily121', name: 'emily', email: 'emily@123.com', contact: 8878566421}
// 1 :  {_id: '6a0df7d203696ee0b7c7e503', userName: 'testUser12', name: ' test user', email: 'testUser@123.com', contact: 9878566421}
// 2 :  {_id: '6a0df79503696ee0b7c7e4fc', userName: 'mike22', name: ' mike', email: 'mike123@gmail.com', contact: 9878566425}]
