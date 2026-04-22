import { useEffect, useState } from "react";
import API from "../api";

export default function Dashboard() {
  const token = localStorage.getItem("token");

  const [user, setUser] = useState({});
  const [course, setCourse] = useState("");
  const [pass, setPass] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("/me", { headers: { Authorization: token } })
      .then(res => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("token");
        window.location.href = "/login";
      });
  }, []);

  const updateCourse = async () => {
    try {
      await API.put("/update-course", { course }, {
        headers: { Authorization: token }
      });
      alert("Course Updated");
    } catch {
      setError("Error updating course");
    }
  };

  const updatePassword = async () => {
    try {
      await API.put("/update-password", pass, {
        headers: { Authorization: token }
      });
      alert("Password Updated");
    } catch (err) {
      setError(err.response?.data);
    }
  };

  return (
    <div className="container">
      <h2>Dashboard</h2>

      <h3>Name: {user.name}</h3>
      <h3>Email: {user.email}</h3>
      <h3>Course: {user.course}</h3>

      {error && <p className="error">{error}</p>}

      <input placeholder="New Course" onChange={e=>setCourse(e.target.value)}/>
      <button onClick={updateCourse}>Update Course</button>

      <input type="password" placeholder="Old Password"
        onChange={e=>setPass({...pass,oldPassword:e.target.value})}/>
      <input type="password" placeholder="New Password"
        onChange={e=>setPass({...pass,newPassword:e.target.value})}/>
      <button onClick={updatePassword}>Update Password</button>

      <button onClick={()=>{
        localStorage.removeItem("token");
        window.location.href="/login";
      }}>
        Logout
      </button>
    </div>
  );
}