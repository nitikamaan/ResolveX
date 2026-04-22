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
    console.log("SUBMIT RUNNING", data); // 🔥 debug

    try {
      if (!data.name || !data.email || !data.password) {
        setError("All fields are required");
        return;
      }

      const res = await API.post("/register", data);

      alert("Registered Successfully!");
      setError("");

      // Clear form
      setData({
        name: "",
        email: "",
        password: "",
        course: ""
      });

    } catch (err) {
      console.log("ERROR:", err); // 🔥 debug
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>

      {error && <p className="error">{error}</p>}

      {/* ✅ FORM FIX */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <input
          placeholder="Name"
          value={data.name}
          onChange={(e) =>
            setData({ ...data, name: e.target.value })
          }
        />

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

        <input
          placeholder="Course"
          value={data.course}
          onChange={(e) =>
            setData({ ...data, course: e.target.value })
          }
        />

        {/* ✅ BUTTON FIX */}
        <button
          type="submit"
          style={{ position: "relative", zIndex: 1000 }}
        >
          Register
        </button>
      </form>
    </div>
  );
}