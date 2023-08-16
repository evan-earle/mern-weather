import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const Navbar = ({ getMainCity, mainCity, search }) => {
  const [user, setUser] = useState(null);
  const [navSearch, setNavSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

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
    <div className="ui secondary menu">
      {location.pathname === "/" && (
        <div className="item">
          <button className="ui button" type="submit" onClick={getMainCity}>
            {mainCity}
          </button>
        </div>
      )}
      <div className="right menu">
        <div className="item">
          {!location.pathname === "/search" ||
            location.pathname === "/edit-profile" || (
              <form onSubmit={submitSearch}>
                <div className="ui icon input">
                  <input
                    type="text"
                    placeholder="Enter city"
                    onChange={(e) => setNavSearch(e.target.value)}
                    value={navSearch}
                  />
                  <i aria-hidden="true" className="search icon"></i>
                </div>
              </form>
            )}
        </div>

        <span className="item">{user.username}</span>
        {location.pathname === "/" ? (
          <Link className="item" to="/edit-profile">
            Edit Profile
          </Link>
        ) : (
          <Link className="item" to="/">
            Home
          </Link>
        )}
        <a className="item" onClick={handleLogout}>
          Logout
        </a>
      </div>
    </div>
  );
};
