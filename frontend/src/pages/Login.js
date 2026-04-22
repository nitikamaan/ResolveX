import { useState } from "react";
import API from "../api";

export default function Login() {
  const [data, setData] = useState({});
  const [error, setError] = useState("");

  const submit = async () => {
    try {
      const res = await API.post("/login", data);
      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.response?.data);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}

      <input placeholder="Email" onChange={e=>setData({...data,email:e.target.value})}/>
      <input type="password" placeholder="Password" onChange={e=>setData({...data,password:e.target.value})}/>

      <button onClick={submit}>Login</button>
    </div>
  );
}