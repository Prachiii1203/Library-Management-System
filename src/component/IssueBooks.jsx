import axios from "axios";
import { useEffect, useState } from "react";

const IssueBooks = () => {
  const today = new Date().toISOString().split("T")[0];
  const [issueBookData, setIssueBookData] = useState({
    userId: "",
    serialNumber: "",
    dueDate: today,
  });
  const [allBook, setAllBooks] = useState([]);
  const [user, setUser] = useState([]);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");
  const bookId = localStorage.getItem("issueBookId");

  const fetchData = async () => {
    try {
      const bookRes = await axios.get(`${BASE_URL}/book`, { headers: { Authorization: `Bearer ${token}` } });
      setAllBooks(bookRes.data.data);
      const UserRes = await axios.get(`${BASE_URL}/user `, { headers: { Authorization: `Bearer ${token}` } });
      setUser(UserRes.data.data.users);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const saveData = (e) => {
    const k = e.target.name;
    const val = e.target.value;

    setIssueBookData((bookData) => ({ ...bookData, [k]: val }));
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
              <select name="userId" id="" onChange={saveData}>
                <option value="" disabled selected>
                  ---select---
                </option>
                {user.map((u) => (
                  <option value={u._id}>{u.userName}</option>
                ))}
              </select>
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
