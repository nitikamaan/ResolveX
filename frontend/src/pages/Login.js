import { useState } from "react";
import API from "../api";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const submit = async () => {
    console.log("LOGIN CLICKED", data); // 🔥 debug

    try {
      if (!data.email || !data.password) {
        setError("All fields are required");
        return;
      }

      const res = await API.post("/login", data);

      // Save token
      localStorage.setItem("token", res.data.token);

      alert("Login successful!");

      // Redirect
      window.location.href = "/dashboard";

    } catch (err) {
      console.log("LOGIN ERROR:", err); // 🔥 debug
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>

      {error && <p className="error">{error}</p>}

      {/* ✅ FORM FIX */}
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

        {/* ✅ BUTTON FIX */}
        <button
          type="submit"
          style={{ position: "relative", zIndex: 1000 }}
        >
          Login
        </button>
      </form>
    </div>
  );
}