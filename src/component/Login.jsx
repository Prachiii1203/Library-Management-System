import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { validateBtn, validateEmail, validatePassword } from "./Validation";
import { UserContext } from "./UserContext";
import { toast } from "react-toastify";

const Login = () => {
  const { users, BASE_URL } = useContext(UserContext);
  const { setRole, setToken, setSessionExpired } = useContext(AuthContext);
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
      setErrors((prev) => ({ ...prev, email: validateEmail(val) }));
    }

    if (k === "password") {
      setErrors((prev) => ({ ...prev, password: validatePassword(val) }));
    }
  };

  const submitData = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/auth/sign-in`, loginform);
      const data = response.data.data;
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("role", data.role);
      setRole(data.role);
      setToken(data.accessToken);
      setSessionExpired(false);
      if (data.role === "ADMIN") {
        navigate("/admin");
      } else {
        // const user = users.find((u) => u.email === loginform?.email);
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
      setLoginform({ email: "", password: "" });
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
            <p>{errors.password}</p>
          </div>
        </div>
        <button onClick={submitData} disabled={!validateBtn(errors, loginform)}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
