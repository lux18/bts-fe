import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios untuk pengiriman permintaan HTTP

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Username dan password harus diisi");
      return;
    }

    try {
      const response = await axios.post("/login", {
        username,
        password,
      });

      localStorage.setItem("token", response.data.data.token);
      navigate("/");
    } catch (error) {
      setError("Username atau password salah");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <div className="card p-3 px-4 w-100" style={{ maxWidth: "400px" }}>
        <h1>BTS To Do List</h1>
        <p>Silahkan login untuk memulai</p>

        {error && <div className="alert alert-danger">{error}</div>}

        <input
          className="form-control mb-3"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="form-control mb-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin} className="btn btn-primary w-100 mb-3">
          Login
        </button>

        <button
          onClick={() => navigate("/register")}
          className="btn btn-secondary w-100"
        >
          Daftar
        </button>
      </div>
    </div>
  );
}

export default Login;
