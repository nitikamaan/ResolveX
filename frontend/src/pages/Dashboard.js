import { useEffect, useState } from "react";
import API from "../api";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [course, setCourse] = useState("");
  const [pass, setPass] = useState({
    oldPassword: "",
    newPassword: ""
  });
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");


  // ================= LOAD USER =================
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!token) {
          window.location.href = "/login";
          return;
        }

        const res = await API.get("/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUser(res.data);
        setCourse(res.data.course || "");

      } catch (err) {
        console.log("ME ERROR:", err);
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    };

    fetchUser();
  }, [token]);


  // ================= UPDATE COURSE =================
  const updateCourse = async () => {
    try {
      await API.put(
        "/update-course",
        { course },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Course Updated Successfully");

      // update UI instantly
      setUser((prev) => ({
        ...prev,
        course: course
      }));

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
        "/update-password",
        {
          oldPassword: pass.oldPassword,
          newPassword: pass.newPassword
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Password Updated Successfully");

      setPass({
        oldPassword: "",
        newPassword: ""
      });

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

      {error && <p className="error">{error}</p>}

      {/* ================= USER INFO ================= */}
      <h3>Name: {user?.name}</h3>
      <h3>Email: {user?.email}</h3>
      <h3>Course: {user?.course}</h3>

      <hr />

      {/* ================= UPDATE COURSE ================= */}
      <h4>Update Course</h4>

      <input
        placeholder="New Course"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
      />

      <button onClick={updateCourse}>
        Update Course
      </button>

      <hr />

      {/* ================= UPDATE PASSWORD ================= */}
      <h4>Update Password</h4>

      <input
        type="password"
        placeholder="Old Password"
        value={pass.oldPassword}
        onChange={(e) =>
          setPass({ ...pass, oldPassword: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="New Password"
        value={pass.newPassword}
        onChange={(e) =>
          setPass({ ...pass, newPassword: e.target.value })
        }
      />

      <button onClick={updatePassword}>
        Update Password
      </button>

      <hr />

      {/* ================= LOGOUT ================= */}
      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
}