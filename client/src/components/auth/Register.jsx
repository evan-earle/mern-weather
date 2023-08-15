import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import clearDay from "../../assets/clearday.jpg";

export const Register = ({ authType }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/auth/register", {
        username,
        password,
      });
      toast.success("Registered");
      authType("signin");
    } catch (err) {
      console.log(err);
      if (err.response.data.message === "User already exists") {
        toast.error("User already exists");
      } else {
        toast.error("Registration failed");
      }
    }
  };

  return (
    <div className="Auth-form-container">
      <img
        src={clearDay}
        alt="sunny"
        className="animate__animated animate__fadeInLeft"
      />
      <form
        className="Auth-form animate__animated animate__fadeInRight"
        onSubmit={onSubmit}
      >
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={() => authType("signin")}>
              Sign In
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
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
