import axios from "axios";
import { useEffect, useState } from "react";
import AllBooks from "./AllBooks";

const AdminDashboard = () => {
  // book/dashboard

  const [dashData, setDashData] = useState({});
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");

  const getDashBoardData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/book/dashboard`, { headers: { Authorization: `Bearer ${token}` } });
      setDashData(res.data.data);
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getDashBoardData();
  }, []);

  //   useEffect(() => {
  //     console.log(dashData);
  //   }, []);
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
          <p>56</p>
        </div>
      </div>
      <div>
        <AllBooks showIssueBtn={false} />
      </div>
    </div>
  );
};

export default AdminDashboard;
