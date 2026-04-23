import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

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

  const fetchData = async () => {
    const res = await axios.get("http://localhost:5000/api/grievances", {
      headers: { Authorization: token }
    });
    setGrievances(res.data);
  };

  const addGrievance = async () => {
    await axios.post("http://localhost:5000/api/grievances", form, {
      headers: { Authorization: token }
    });
    fetchData();
  };

  const deleteGrievance = async (id) => {
    await axios.delete(`http://localhost:5000/api/grievances/${id}`, {
      headers: { Authorization: token }
    });
    fetchData();
  };

  const updateStatus = async (id) => {
    await axios.put(
      `http://localhost:5000/api/grievances/${id}`,
      { status: "Resolved" },
      { headers: { Authorization: token } }
    );
    fetchData();
  };

  const searchGrievance = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/grievances/search?title=${search}`,
      { headers: { Authorization: token } }
    );
    setGrievances(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <h2>Dashboard</h2>

      <input placeholder="Search" onChange={e => setSearch(e.target.value)} />
      <button onClick={searchGrievance}>Search</button>

      <h3>Add Grievance</h3>

      <input placeholder="Title" onChange={e => setForm({...form, title:e.target.value})}/>
      <input placeholder="Description" onChange={e => setForm({...form, description:e.target.value})}/>

      <select onChange={e => setForm({...form, category:e.target.value})}>
        <option>Academic</option>
        <option>Hostel</option>
        <option>Transport</option>
        <option>Other</option>
      </select>

      <button onClick={addGrievance}>Submit</button>

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

      <button className="logout" onClick={() => {
        localStorage.removeItem("token");
        window.location.href = "/";
      }}>
        Logout
      </button>
    </div>
  );
}