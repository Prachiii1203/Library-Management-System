import axios from "axios";
import { useState } from "react";
import { replace, useNavigate } from "react-router-dom";

const Login = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [loginform, setLoginform] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const saveData = (e) => {
    const k = e.target.name;
    const val = e.target.value;

    setLoginform((formData) => ({ ...formData, [k]: val }));
    // console.log(loginform);
  };

  const submitData = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/auth/sign-in`, loginform);
      const data = response.data.data;
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("role", data.role);

      if (data.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (error) {
      console.log(error);
      alert("User Not Exist");
    }
  };
  return (
    <div className="form">
      <h1>LOGIN</h1>
      <form action="">
        <div>
          <label htmlFor="">Enter Email</label>
          <input type="email" name="email" onChange={saveData} />
        </div>
        <div>
          <label htmlFor="">Enter password</label>
          <input type="password" name="password" onChange={saveData} />
        </div>
        <button onClick={submitData}>Login</button>
      </form>
    </div>
  );
};

export default Login;
