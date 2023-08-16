import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export const Search = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/weather/main/${search}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const firstLogin = await axios.get("/api/weather");
        console.log(firstLogin);
        firstLogin.data === null || firstLogin.data.mainCity === ""
          ? navigate("/search")
          : navigate("/");
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div>
      <form onSubmit={onSubmit}>
        Search for location:
        <input type="text" onChange={(e) => setSearch(e.target.value)} />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};
