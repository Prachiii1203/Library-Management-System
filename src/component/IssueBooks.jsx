import { useState } from "react";

const IssueBooks = () => {
  const [issueBookData, setIssueBookData] = useState({
    userId: "",
    serialNumber: "",
    dueDate: "",
  });

  return (
    <div className="form">
      <h1>Book Issue Details</h1>
      <form action="">
        <div>
          <label htmlFor="">User</label>
          <select name="userId" id="">
            <option value="">user 1</option>
            <option value="">user 2</option>
          </select>
        </div>
        <div>
          <label htmlFor="">Serial Number</label>
          <select name="serialNumber" id="">
            <option value="">SN 1</option>
            <option value="">SN 2</option>
          </select>
        </div>
        <div>
          <label htmlFor="">Due Date</label>
          <input type="date" name="dueDate" id="" />
        </div>
        <button>Book Issued</button>
      </form>
    </div>
  );
};

export default IssueBooks;
