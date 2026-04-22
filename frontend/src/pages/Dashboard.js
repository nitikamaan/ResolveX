import { useEffect, useState } from "react";
import API from "../api";

export default function Dashboard() {
  const token = localStorage.getItem("token");

  const [user, setUser] = useState({});
  const [course, setCourse] = useState("");
  const [pass, setPass] = useState({
    oldPassword: "",
    newPassword: ""
  });
  const [error, setError] = useState("");

  // ================= LOAD USER =================
  useEffect(() => {
    API.get("/me", {
      headers: { Authorization: `Bearer ${token}` } // ✅ FIXED
    })
      .then(res => {
        setUser(res.data);
        setCourse(res.data.course || "");
      })
      .catch(() => {
        localStorage.removeItem("token");
        window.location.href = "/login";
      });
  }, []);

  // ================= UPDATE COURSE =================
  const updateCourse = async () => {
    try {
      await API.put(
        `/user/${user._id}`, // ✅ FIXED ROUTE
        { course },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("Course Updated");
      setError("");
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Error updating course");
    }
  };

  // ================= UPDATE PASSWORD =================
  const updatePassword = async () => {
    try {
      await API.put(
        `/user/${user._id}`, // ✅ using same route
        { password: pass.newPassword },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("Password Updated");
      setError("");
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Error updating password");
    }
  };

  // ================= LOGOUT =================
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="container">
      <h2>Dashboard</h2>

      <h3>Name: {user.name}</h3>
      <h3>Email: {user.email}</h3>
      <h3>Course: {user.course}</h3>

      {error && <p className="error">{error}</p>}

      {/* UPDATE COURSE */}
      <h4>Update Course</h4>
      <input
        placeholder="New Course"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
      />
      <button onClick={updateCourse}>Update Course</button>

      {/* UPDATE PASSWORD */}
      <h4>Update Password</h4>
      <input
        type="password"
        placeholder="New Password"
        onChange={(e) =>
          setPass({ ...pass, newPassword: e.target.value })
        }
      />
      <button onClick={updatePassword}>Update Password</button>

      {/* LOGOUT */}
      <button onClick={logout}>Logout</button>
    </div>
  );
}