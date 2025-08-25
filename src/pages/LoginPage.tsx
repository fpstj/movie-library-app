import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApplicationContext } from "../context/ApplicationContext";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const context = React.useContext(ApplicationContext);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!context?.webApi) return;
    const result = await context.webApi.login(username, password);
    if (result) {
      context.setUserSession({ name: result.name, email: result.email });
      sessionStorage.setItem(
        "userSession",
        JSON.stringify({ name: result.name, email: result.email })
      );
      navigate("/movies");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center w-100 h-100"
      style={{ minHeight: "100vh", minWidth: "100vw", height: "100vh", width: "100vw" }}
    >
      <div className="card p-4 shadow d-flex flex-column justify-content-center align-items-center" style={{ maxWidth: 400, width: "100%" }}>
        <h2 className="mb-4 text-center">Movie Library Login</h2>
        <form onSubmit={handleLogin} className="w-100">
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="alert alert-danger py-1">{error}</div>}
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
