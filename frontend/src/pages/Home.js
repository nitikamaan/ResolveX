import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "100px"
      }}
    >
      <h1>Welcome to Student Portal</h1>

      <p>Please choose an option</p>

      <button
        onClick={() => navigate("/login")}
        style={{ margin: "10px", padding: "10px 20px" }}
      >
        Login
      </button>

      <button
        onClick={() => navigate("/register")}
        style={{ margin: "10px", padding: "10px 20px" }}
      >
        Register
      </button>
    </div>
  );
}