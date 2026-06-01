import axios from "axios";
import { useContext, useState } from "react";
import { BookContext } from "./BookContext";
import { UserContext } from "./UserContext";
import Select from "react-select";
import { useLocation, useNavigate } from "react-router-dom";
import { validateBtn } from "./Validation";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { AuthContext } from "./AuthContext";

const IssueBooks = () => {
  const today = dayjs().add(15, "day").format("YYYY-MM-DDTHH:mm");
  const [issueBookData, setIssueBookData] = useState({
    userId: "",
    serialNumber: "",
    dueDate: today,
  });
  const [errors, setErrors] = useState({
    userId: "",
    serialNumber: "",
    dueDate: "",
  });
  // const [backend, setBackend] = useState("");
  const location = useLocation();

  const { users } = useContext(UserContext);
  const { handleSessionExpired } = useContext(AuthContext);

  const allUser = users.map((u) => ({
    value: u._id,
    label: u.userName,
  }));

  const { books: allBook, BASE_URL, token, setFetchAgain } = useContext(BookContext);
  // const navigation = useNavigate();
  const bookId = location.state.bookId;
  const bookname = location.state.bookname;

  const saveData = (e) => {
    const k = e.target.name;
    const val = e.target.value;

    setIssueBookData((bookData) => ({ ...bookData, [k]: val }));
  };

  const submitData = async (e) => {
    e.preventDefault();

    if (!issueBookData.userId) {
      setErrors((err) => ({ ...err, userId: "Please select user" }));
      return;
    }

    if (!issueBookData.serialNumber) {
      setErrors((err) => ({ ...err, serialNumber: "Please select serial number" }));
      return;
    }

    if (dayjs(issueBookData.dueDate).isBefore(dayjs())) {
      setErrors((err) => ({ ...err, dueDate: "Due date cannot be in the past" }));
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/book/issue/${bookId}`, issueBookData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        timeout: 5000,
      });
      if (res.data.message === "book issued succesfully!") {
        setIssueBookData({
          userId: "",
          serialNumber: "",
          dueDate: today,
        });
        toast.success(res.data.message);
      }
      setFetchAgain((p) => !p);
      // navigation("/allbook");
    } catch (e) {
      console.log(e);
      if (e.response?.status === 401) {
        handleSessionExpired();
      }
      toast.error(e.response?.data?.message || "Something went-wrong");
    }
  };

  const customStyles = {
    control: (base) => ({
      ...base,
      border: "1px solid black",
      borderRadius: "8px",
      minHeight: "32px",
      height: "32px",
      overflow: "hidden",
      maxHeight: "32px",
      boxShadow: "none",
    }),

    valueContainer: (provided) => ({
      ...provided,
      height: "32px",
      padding: "0 8px",
      display: "flex",
      alignItems: "center",
      flexWrap: "nowrap",
      overflow: "hidden",
    }),

    input: (provided) => ({
      ...provided,
      margin: "0px",
      padding: "0px",
      color: "black",
      position: "absolute",
    }),

    singleValue: (provided) => ({
      ...provided,
      color: "black",
      position: "static",
      transform: "none",
      maxWidth: "100%",
    }),

    indicatorsContainer: (provided) => ({
      ...provided,
      height: "32px",
    }),

    indicatorSeparator: (provided) => ({
      ...provided,
      display: "none",
    }),

    dropdownIndicator: (provided) => ({
      ...provided,
      padding: "4px",
    }),

    menu: (base) => ({
      ...base,
      width: "250px",
      zIndex: 9999,
    }),

    menuList: (base) => ({
      ...base,
      maxHeight: "100px",
      overflowY: "auto",
      overflowX: "hidden",
    }),

    option: (base) => ({
      ...base,
      textTransform: "capitalize",
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
                isClearable={false}
                value={allUser.find((u) => u.value === issueBookData.userId)}
                placeholder="Search User"
                onChange={(selectedOption) => {
                  setIssueBookData((prev) => ({
                    ...prev,
                    userId: selectedOption.value,
                  }));
                }}
              />{" "}
              <div className="errorMsg">
                <p>{errors.userId}</p>
              </div>
            </div>
            <div>
              <label htmlFor="">Serial Number</label>
              <select name="serialNumber" id="" onChange={saveData}>
                {/* <option value={""} disabled selected>
                  ---Select SerialNumber---
                </option> */}

                {allBook.map(
                  (book) =>
                    book._id === bookId &&
                    book.copies?.map(
                      (bookcopy) =>
                        bookcopy.isAvailable && (
                          <option key={bookcopy.serialNumber} value={bookcopy.serialNumber}>
                            {bookcopy.serialNumber}
                          </option>
                        ),
                    ),
                )}
              </select>
            </div>
            <div>
              <label htmlFor="">Due Date</label>
              <input type="datetime-local" name="dueDate" id="" min={today} onChange={saveData} value={issueBookData.dueDate} />
              <div className="errorMsg">
                <p>{errors.dueDate}</p>
              </div>
            </div>

            <button onClick={submitData} disabled={!validateBtn({}, issueBookData)}>
              Book Issued
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default IssueBooks;
