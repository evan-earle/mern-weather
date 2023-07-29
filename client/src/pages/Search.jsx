import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/nav/Navbar";
import { useState } from "react";

export const Search = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={onSubmit}>
        Search for location:
        <input type="text" onChange={(e) => setSearch(e.target.value)} />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};
