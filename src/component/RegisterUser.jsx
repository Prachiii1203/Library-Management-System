import axios from "axios";
import { useState } from "react";
import { validateBookAuthor, validateBtn, validateEmail, validateName, validateNumber, validatePassword, validatePhone } from "./Validation";

const Register = () => {
  const [newUser, setNewUser] = useState({ name: " ", userName: "", email: "", password: "", contact: "" });
  const [errors, setErrors] = useState({ name: " ", userName: "", email: "", password: "", contact: "" });
  const [backend, setBackend] = useState("");

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");
  const saveData = (e) => {
    const k = e.target.name;
    const val = e.target.value;

    setNewUser((formData) => ({ ...formData, [k]: val }));

    if (k === "name") {
      setErrors((prev) => ({ ...prev, name: validateName(val) }));
    }

    if (k === "userName") {
      setErrors((prev) => ({ ...prev, userName: validateBookAuthor(val) }));
    }

    if (k === "email") {
      setErrors((prev) => ({ ...prev, email: validateEmail(val) }));
    }

    if (k === "password") {
      setErrors((prev) => ({ ...prev, password: validatePassword(val) }));
    }

    if (k === "contact") {
      setErrors((prev) => ({ ...prev, contact: validatePhone(val) }));
    }
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
       if (res.data.message === "User created successfully") {
        setNewUser({ name: " ", userName: "", email: "", password: "", contact: "" });
      }
      setBackend("");
    } catch (e) {
      console.log(e.response?.data?.message);
      setBackend(e.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="form">
      <h1>Add User</h1>
      <form action="" method="post">
        <div>
          <label htmlFor="">Enter Name : </label>
          <input type="text" name="name" value={newUser.name} onChange={saveData} />
          <div className="errorMsg">
            <p>{errors.name}</p>
          </div>
        </div>
        <div>
          <label htmlFor="">Enter Usaername : </label>
          <input type="text" name="userName" value={newUser.userName} onChange={saveData} />
          <div className="errorMsg">
            <p>{errors.userName}</p>
          </div>
        </div>{" "}
        <div>
          <label htmlFor="">Enter Email : </label>
          <input type="email" name="email" value={newUser.email} onChange={saveData} />
          <div className="errorMsg">
            <p>{errors.email}</p>
          </div>
        </div>{" "}
        <div>
          <label htmlFor="">Enter Password : </label>
          <input type="password" name="password" value={newUser.password} onChange={saveData} />
          <div className="errorMsg">
            <p>{errors.password}</p>
          </div>
        </div>{" "}
        <div>
          <label htmlFor="">Enter Contact : </label>
          <input type="number" name="contact" onKeyDown={validateNumber} value={newUser.contact} onChange={saveData} />
          <div className="errorMsg">
            <p>{errors.contact}</p>
          </div>
        </div>
        <div className="errorMsg">
          <p>{backend}</p>
        </div>
        <button onClick={submitData} disabled={!validateBtn(errors, newUser)}>
          Add user
        </button>
      </form>
    </div>
  );
};

export default Register;
