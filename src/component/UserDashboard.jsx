import { Link } from "react-router-dom";
import Logout from "./Logout";
import { useContext } from "react";
import { TransactionContext } from "./TransactionContext";

const UserDashboard = () => {
  const { transaction } = useContext(TransactionContext);

  return (
    <>
      <div className="Header">
        <div className="headerLink">
          {" "}
          <Link to="/home">
            <h2>Welcome {transaction?.[0]?.user?.userName || ""} !! </h2>
          </Link>
          <Link to="/home">Library</Link>
          <Link to="/transaction">My Transaction</Link>
        </div>
        <div className="Headerlogout">
          <Logout />
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
