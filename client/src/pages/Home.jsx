import { Navbar } from "../components/nav/Navbar";
import { useState } from "react";
import axios from "axios";

export const Home = () => {
  const [main, setMain] = useState("");

  // const data = await axios.get(`/api/weather/${search}`);
  //       console.log(data);

  return (
    <div>
      <Navbar />
      Home
    </div>
  );
};
