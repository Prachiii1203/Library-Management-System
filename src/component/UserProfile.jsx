import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

const UserProfile = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { token } = useContext(AuthContext);
  const [userTransaction, setUserTransaction] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const getAllTransaction = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/transaction?page=1&limit=10`, { headers: { Authorization: `Bearer ${token}` } });

      setUserTransaction(res.data.data.transactions);
      setTotalPage(res.data.data.pagination.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTransaction();
  }, [page]);

  return (
    <div>
      <div className="allUser">
        <div>
          <h1>Transaction</h1>
        </div>

        {userTransaction.length < 0 ? (
          <div className="userDetails">
            <table>
              <thead>
                <tr>
                  <th>Book</th>
                  <th>Book Status</th>
                  <th>Issue Date</th>
                  <th>Due Date</th>
                </tr>
              </thead>
              <tbody>
                {userTransaction.map((ut) => (
                  <tr key={ut._id}>
                    <td>{ut.book.name}</td>
                    <td>{ut.transactionType}</td>
                    <td>{ut.createdAt.split("T")[0]}</td>
                    <td>{ut.dueDate !== null ? ut.dueDate.split("T")[0] : "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>No Transaction Yet</div>
        )}
        {userTransaction.length > 10 && (
          <div className="navigateBtn">
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>
              Previous
            </button>
            <button onClick={() => setPage(page + 1)} disabled={page === totalPage}>
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
