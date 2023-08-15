import { useNavigate } from "react-router-dom";
import { useState } from "react";
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
