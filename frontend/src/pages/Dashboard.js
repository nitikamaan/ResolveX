import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const API = "https://resolvex-hiyn.onrender.com";

export default function Dashboard() {
  const [grievances, setGrievances] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Academic"
  });
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  if (!token) window.location.href = "/login";

  const headers = { Authorization: token };

  const fetchData = async () => {
    const res = await axios.get(`${API}/api/grievances`, { headers });
    setGrievances(res.data);
  };

  const addGrievance = async () => {
    await axios.post(`${API}/api/grievances`, form, { headers });
    fetchData();
  };

  const deleteGrievance = async (id) => {
    await axios.delete(`${API}/api/grievances/${id}`, { headers });
    fetchData();
  };

  const updateStatus = async (id) => {
    await axios.put(`${API}/api/grievances/${id}`, {
      status: "Resolved"
    }, { headers });

    fetchData();
  };

  const searchGrievance = async () => {
    const res = await axios.get(
      `${API}/api/grievances/search?title=${search}`,
      { headers }
    );
    setGrievances(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <h2>Dashboard</h2>

      <button onClick={() => {
        localStorage.removeItem("token");
        window.location.href = "/";
      }}>
        Logout
      </button>

      <hr />

      <input placeholder="Search"
        onChange={e => setSearch(e.target.value)}
      />
      <button onClick={searchGrievance}>Search</button>

      <h3>Submit Grievance</h3>

      <input placeholder="Title"
        onChange={e => setForm({ ...form, title: e.target.value })}
      />

      <input placeholder="Description"
        onChange={e => setForm({ ...form, description: e.target.value })}
      />

      <select onChange={e => setForm({ ...form, category: e.target.value })}>
        <option>Academic</option>
        <option>Hostel</option>
        <option>Transport</option>
        <option>Other</option>
      </select>

      <button onClick={addGrievance}>Submit</button>

      <h3>All Grievances</h3>

      {grievances.map(g => (
        <div className="card" key={g._id}>
          <h4>{g.title}</h4>
          <p>{g.description}</p>
          <p>{g.category}</p>
          <p>Status: {g.status}</p>

          <button onClick={() => updateStatus(g._id)}>Resolve</button>
          <button onClick={() => deleteGrievance(g._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}