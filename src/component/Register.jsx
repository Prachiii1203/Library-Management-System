import axios from "axios";
import { useState } from "react";

const Register = () => {
  const [newUser, setNewUser] = useState({ name: " ", userName: "", email: "", password: "", contact: "" });
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");
  const saveData = (e) => {
    const k = e.target.name;
    const val = e.target.value;

    setNewUser((formData) => ({ ...formData, [k]: val }));
   };

  const submitData = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/user`, newUser, {
        headers: {
          "Content-Type": "application/json",  
          Authorization: `Bearer ${token}`,  
        },
        timeout: 5000,  
      });
      console.log(res.data);
      if (res.data.message === "User created successfully") {
        alert(res.data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="form">
      <h1>Add User</h1>
      <form action="" method="post">
        <div>
          <label htmlFor="">Enter Name : </label>
          <input type="text" name="name" value={newUser.name} onChange={saveData} />
        </div>
        <div>
          <label htmlFor="">Enter Usaername : </label>
          <input type="text" name="userName" value={newUser.userName} onChange={saveData} />
        </div>{" "}
        <div>
          <label htmlFor="">Enter Email : </label>
          <input type="email" name="email" value={newUser.email} onChange={saveData} />
        </div>{" "}
        <div>
          <label htmlFor="">Enter Password : </label>
          <input type="password" name="password" value={newUser.password} onChange={saveData} />
        </div>{" "}
        <div>
          <label htmlFor="">Enter Contact : </label>
          <input type="number" name="contact" value={newUser.contact} onChange={saveData} />
        </div>
        <button onClick={submitData}>Add user</button>
      </form>
     </div>
  );
};

export default Register;
