import axios from "axios";
import { useEffect, useState } from "react";

const AllUser = () => {
  const [allUser, setAlluser] = useState([]);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const fetchAllUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user?page=1&limit=10`);

      console.log(res.data);
      setAlluser(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  console.log(`${BASE_URL}/user`);

  useEffect(() => fetchAllUser, []);
  return (
    <div>
      {allUser.map((user) => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p> : {user.userName}</p>
          <p> : {user.email}</p>
          <p> : {user.password}</p>
          <p> : {user.contact}</p>
        </div>
      ))}
    </div>
  );
};

export default AllUser;
