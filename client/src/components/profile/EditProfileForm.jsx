import { Link } from "react-router-dom";
import { BsArrowLeftShort } from "react-icons/bs";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const EditProfileForm = () => {
  const [username, setUsername] = useState({ username: "" });

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/api/users/me");
        setUsername(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const updateUserInfo = (e) => {
    setUsername({
      ...username,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("/api/users/me", username);
      toast.success("Profile updated");
      setUsername(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Link to="/">
        <BsArrowLeftShort></BsArrowLeftShort>Home
      </Link>
      <div>
        <h1>Edit Profile</h1>
        <form onSubmit={updateProfile}>
          <label htmlFor="username">
            Username
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              value={username.username}
              onChange={updateUserInfo}
            />
          </label>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};
