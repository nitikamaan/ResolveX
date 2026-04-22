import { useState } from "react";
import API from "../api";

export default function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    course: ""
  });

  const [error, setError] = useState("");

  const submit = async () => {
    try {
      await API.post("/register", data);
      alert("Registered!");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>

      {error && <p className="error">{error}</p>}

      <input 
        placeholder="Name" 
        onChange={e => setData({ ...data, name: e.target.value })}
      />

      <input 
        placeholder="Email" 
        onChange={e => setData({ ...data, email: e.target.value })}
      />

      <input 
        type="password" 
        placeholder="Password" 
        onChange={e => setData({ ...data, password: e.target.value })}
      />

      <input 
        placeholder="Course" 
        onChange={e => setData({ ...data, course: e.target.value })}
      />

      <button onClick={submit}>Register</button>
    </div>
  );
}