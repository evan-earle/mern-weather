import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Auth.css";
import clearDay from "../../assets/clearday.jpg";
import "animate.css";

export const Login = ({ authType }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // animate__animated animate__fadeOutLeft
  // animate__animated animate__fadeOutRight
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/login", {
        username,
        password,
      });
      const firstLogin = await axios.get("/api/weather");
      firstLogin.data === null ? navigate("/search") : navigate("/");

      toast.success("Logged in");
    } catch (err) {
      console.log(err);
      toast.error("Login failed");
    }
  };

  return (
    <div className="Auth-form-container">
      <img
        src={clearDay}
        alt="sunny"
        className="animate__animated animate__fadeInRight"
      />
      <form
        className="Auth-form animate__animated animate__fadeInLeft"
        onSubmit={onSubmit}
      >
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Not registered yet?{" "}
            <span className="link-primary" onClick={() => authType("signup")}>
              Sign Up
            </span>
          </div>
          <div className="form-group mt-3">
            <label htmlFor="username">Username</label>
            <input
              className="form-control mt-1"
              required
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="password">Password</label>
            <input
              className="form-control mt-1"
              required
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button className="btn btn-primary" type="submit">
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
