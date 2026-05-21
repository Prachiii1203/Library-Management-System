import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AllBooks from "./AllBooks";
import { BookContext } from "./BookContext";

const AdminDashboard = () => {
  const [dashData, setDashData] = useState({});
  const { books, BASE_URL, token } = useContext(BookContext);
  const getDashBoardData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/book/dashboard`, { headers: { Authorization: `Bearer ${token}` } });
      setDashData(res.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getDashBoardData();
  }, []);

  return (
    <div>
      <div className="adminCard">
        <div>
          <h2>Total Issued</h2>
          <p>{dashData.totalIssued}</p>
        </div>
        <div>
          <h2>Today Issued</h2>
          <p>{dashData.todaysIssued}</p>
        </div>
        <div>
          <h2>Due Today</h2>
          <p>{dashData.todaysDue}</p>
        </div>
        <div>
          <h2>Due Missed</h2>
          <p>{dashData.dueMissed}</p>
        </div>
        <div>
          <h2>Total Book</h2>
          <p>{books.length}</p>
        </div>
        
      </div>
      <div>
        <AllBooks showIssueBtn={false} />
      </div>
    </div>
  );
};

export default AdminDashboard;
