import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import styles from "./Navbar.module.css";
import { FaBars, FaTimes } from "react-icons/fa";

export const Navbar = ({ search }) => {
  const [user, setUser] = useState(null);
  const [navSearch, setNavSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

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

  const submitSearch = (e) => {
    e.preventDefault();
    search(navSearch);
    setNavSearch("");
  };

  return (
    <header>
      <nav ref={navRef}>
        {!location.pathname === "/search" ||
          location.pathname === "/edit-profile" || (
            <form onSubmit={submitSearch}>
              <div className="ui icon input">
                <input
                  type="text"
                  placeholder="Enter city"
                  onChange={(e) => setNavSearch(e.target.value)}
                  value={navSearch}
                  onSubmit={submitSearch}
                />
                <i aria-hidden="true" className="search icon"></i>
              </div>
            </form>
          )}

        <a>{user.username}</a>

        {location.pathname === "/" ? (
          <Link to="/edit-profile">
            <a>Edit Profile</a>
          </Link>
        ) : (
          <Link to="/">Home</Link>
        )}
        <a onClick={handleLogout}>Logout</a>

        <button
          className={`${styles["nav-btn"]} ${styles["nav-close-btn"]}`}
          onClick={showNavbar}
        >
          <FaTimes />
        </button>
      </nav>
      <button className={styles["nav-btn"]} onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
};
