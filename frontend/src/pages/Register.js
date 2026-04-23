import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "https://resolvex-hiyn.onrender.com";

export default function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const register = async () => {
    // 🔥 Basic validation
    if (!data.name || !data.email || !data.password) {
      return alert("Please fill all fields");
    }

    try {
      const res = await axios.post(`${API}/api/register`, data);

      console.log("REGISTER SUCCESS:", res.data);

      alert("Registered Successfully ✅");

      navigate("/login");
    } catch (err) {
      console.log("REGISTER ERROR:", err.response?.data);

      alert(err.response?.data?.msg || "Registration failed ❌");
    }
  };

  return (
    <div className="auth">
      <div className="card">
        <h2>Register</h2>

        <input
          placeholder="Name"
          value={data.name}
          onChange={e => setData({ ...data, name: e.target.value })}
        />

        <input
          placeholder="Email"
          value={data.email}
          onChange={e => setData({ ...data, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={e => setData({ ...data, password: e.target.value })}
        />

        <button onClick={register}>Create Account</button>
      </div>
    </div>
  );
}