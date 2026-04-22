import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Login() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const submit = async () => {
    console.log("LOGIN CLICKED", data);

    try {
      if (!data.email || !data.password) {
        setError("All fields are required");
        return;
      }

      const res = await API.post("/login", data);

      // Save token
      localStorage.setItem("token", res.data.token);

      alert("Login successful!");

      // ✅ React navigation (IMPORTANT FIX)
      navigate("/dashboard");

    } catch (err) {
      console.log("LOGIN ERROR:", err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>

      {error && <p className="error">{error}</p>}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <input
          placeholder="Email"
          value={data.email}
          onChange={(e) =>
            setData({ ...data, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) =>
            setData({ ...data, password: e.target.value })
          }
        />

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
}