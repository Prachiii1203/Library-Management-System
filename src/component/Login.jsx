import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { replace, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { validateEmail, validatePassword } from "./Validation";

const Login = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { setRole, setToken } = useContext(AuthContext);
  const [loginform, setLoginform] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    localStorage.clear();
  }, []);

  const navigate = useNavigate();

  const saveData = (e) => {
    const k = e.target.name;
    const val = e.target.value;

    setLoginform((formData) => ({ ...formData, [k]: val }));

    if (k === "email") {
      setErrors((prev) => ({ ...prev, email: validateEmail(val), }));
    }

    if (k === "password") {
      setErrors((prev) => ({ ...prev, password: validatePassword(val), }));
    }
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
      setRole(data.role);
      setToken(data.accessToken);
    } catch (error) {
      console.log(error);
      alert("User Not Exist");
    }
  };
  return (
    <div className="form" style={{ width: "600px" }}>
      <h1>LOGIN</h1>
      <form action="">
        <div>
          <label htmlFor="">Enter Email</label>
          <input type="email" name="email" onChange={saveData} />
          <div className="errorMsg">
            <p>{errors.email}</p>
          </div>
        </div>
        <div>
          <label htmlFor="">Enter password</label>
          <input type="password" name="password" onChange={saveData} />
          <div className="errorMsg">
            <p >{errors.password}</p>
          </div>
        </div>
        <button onClick={submitData}>Login</button>
      </form>
    </div>
  );
};

export default Login;
