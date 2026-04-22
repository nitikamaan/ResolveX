import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Register() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    course: ""
  });

  const [error, setError] = useState("");

  const submit = async () => {
    console.log("SUBMIT RUNNING", data);

    try {
      if (!data.name || !data.email || !data.password) {
        setError("All fields are required");
        return;
      }

      await API.post("/register", data);

      alert("Registered Successfully!");

      setError("");

      // clear form
      setData({
        name: "",
        email: "",
        password: "",
        course: ""
      });

      // ✅ important UX improvement
      navigate("/login");

    } catch (err) {
      console.log("ERROR:", err);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>

      {error && <p className="error">{error}</p>}

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

        <button type="submit">
          Register
        </button>
      </form>
    </div>
  );
}