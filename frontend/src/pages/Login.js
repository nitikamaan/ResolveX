import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "https://resolvex-hiyn.onrender.com";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${API}/api/login`, data);

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Invalid login");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>

      <input placeholder="Email"
        onChange={e => setData({ ...data, email: e.target.value })}
      />

      <input type="password" placeholder="Password"
        onChange={e => setData({ ...data, password: e.target.value })}
      />

      <button onClick={handleSubmit}>Login</button>
    </div>
  );
}