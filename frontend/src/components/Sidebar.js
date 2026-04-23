import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <h2>🎓 ResolveX</h2>

      <button onClick={() => navigate("/dashboard")}>Dashboard</button>
      <button onClick={() => navigate("/login")}>Logout</button>
    </div>
  );
}