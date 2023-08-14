import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import "semantic-ui-css/semantic.min.css";

export const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const { data } = await axios.get("/api/users/me");
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) return null;

  const handleLogout = async () => {
    try {
      await axios.get("/api/auth/logout");
      setUser(null);
      toast.success("Logged out");
      navigate("/auth");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="ui secondary menu">
      <div className="right menu">
        <div className="item">
          <div className="ui icon input">
            <input type="text" placeholder="Search..." />
            <i aria-hidden="true" className="search icon"></i>
          </div>
        </div>
        <span className="item">{user.username}</span>
        <Link className="item" to="/edit-profile">
          Edit Profile
        </Link>
        <a className="item" onClick={handleLogout}>
          Logout
        </a>
      </div>
    </div>
  );
};
