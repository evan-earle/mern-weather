import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="navbar">
      <h1>{user.username}</h1>
      <Link to="/edit-profile">Edit Profile</Link>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};
