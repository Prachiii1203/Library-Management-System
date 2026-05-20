import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [newUser, setNewUser] = useState({ name: " ", userName: "", email: "", password: "", contact: "" });
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const saveData = (e) => {
    const k = e.target.name;
    const val = e.target.value;

    setNewUser((formData) => ({ ...formData, [k]: val }));
    // console.log(newUser);
  };

  const submitData = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/user`, newUser);
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <form action="">
        <div>
          <label htmlFor="">Enter Name</label>
          <input type="text" name="name" onChange={saveData} />
        </div>
        <div>
          <label htmlFor="">Enter Usaername</label>
          <input type="text" name="userName" onChange={saveData} />
        </div>{" "}
        <div>
          <label htmlFor="">Enter Email</label>
          <input type="email" name="email" onChange={saveData} />
        </div>{" "}
        <div>
          <label htmlFor="">Enter Password</label>
          <input type="password" name="password" onChange={saveData} />
        </div>{" "}
        <div>
          <label htmlFor="">Enter Contact</label>
          <input type="number" name="contact" onChange={saveData} />
        </div>
        <button onClick={submitData}>Register</button>
      </form>
      <p>
        Already Registered ? <Link to="/">Log in here...</Link>
      </p>
    </div>
  );
};

export default Register;
