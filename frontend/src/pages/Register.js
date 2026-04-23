import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "https://resolvex-hiyn.onrender.com";

export default function Register() {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const register = async () => {
    await axios.post(`${API}/api/register`, data);
    navigate("/login");
  };

  return (
    <div className="auth">
      <div className="card">
        <h2>Register</h2>

        <input placeholder="Name"
          onChange={e => setData({ ...data, name: e.target.value })}
        />

        <input placeholder="Email"
          onChange={e => setData({ ...data, email: e.target.value })}
        />

        <input type="password" placeholder="Password"
          onChange={e => setData({ ...data, password: e.target.value })}
        />

        <button onClick={register}>Create Account</button>
      </div>
    </div>
  );
}