import { useContext, useState } from "react";
import { TransactionContext } from "./TransactionContext";
import dayjs from "dayjs";

const UserProfile = () => {
  const { transaction, page, setPage, totalpage } = useContext(TransactionContext);

  const [role, setRole] = useState(localStorage.getItem("role"));

  return (
    <div>
      <div className="allUser">
        <div>
          <h1>Transaction</h1>
        </div>

        {transaction.length >= 0 ? (
          <div className="userDetails">
            <table>
              <thead>
                <tr>
                  {role === "ADMIN" && <th>UserId</th>}
                  <th>Book</th>
                  <th>Book Status</th>
                  <th>Issue Date</th>
                  <th>Due Date</th>
                </tr>
              </thead>
              <tbody>
                {transaction.map((ut) => (
                  <tr key={ut._id}>
                    {role === "ADMIN" && <td>{ut.user.userName}</td>}
                    <td>{ut.book.name}</td>
                    <td>{ut.transactionType}</td>
                    <td>{dayjs(ut.createdAt).format("DD-MM-YYYY HH:mm")}</td>
                    <td>{ut.dueDate !== null ? dayjs(ut.dueDate).format("DD-MM-YYYY HH:mm") : "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>No Transaction Yet</div>
        )}
        <div className="navigateBtn">
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>
            Previous
          </button>
          <button onClick={() => setPage(page + 1)} disabled={page === totalpage}>
            Next
          </button>
        </div>
        <p>Page {page} </p>
      </div>
    </div>
  );
};

export default UserProfile;
