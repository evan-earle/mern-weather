import { Navbar } from "../components/nav/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";

export const Home = () => {
  const [mainCity, setMainCity] = useState("");
  const [favouriteCityOne, setFavouriteCityOne] = useState();
  const [favouriteCityTwo, setFavouriteCityTwo] = useState();
  const [favouriteCityThree, setFavouriteCityThree] = useState();
  const [search, setSearch] = useState();

  const getProfile = async () => {
    try {
      // call db and check what cities are favourited
      const profile = await axios.get(`/api/weather`);
      console.log(profile);

      const weather = await axios.get(`/api/weather/${profile.data.mainCity}`);
      console.log(weather);

      setMainCity(profile.data.mainCity);
      setFavouriteCityOne(profile.data.favouriteCityOne);
      setFavouriteCityTwo(profile.data.favouriteCityTwo);
      setFavouriteCityThree(profile.data.favouriteCityThree);
    } catch (err) {
      console.log(err);
    }
  };

  // const getWeather = async () => {
  //   console.log(mainCity);
  //   const weather = await axios.get(`/api/weather/${mainCity}`);
  //   console.log(weather);
  // };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      <button type="button" onClick={getProfile}>
        {mainCity}
      </button>
      <form onSubmit={getProfile}>
        <input
          type="text"
          onChange={(e) => setMainCity(e.target.value)}
          value={mainCity}
        />
        <button type="submit">Search</button>
      </form>
      <Navbar />
      {/*
       <h1>{mainCity}</h1>

       <button type="button" onClick={getProfile}>
         {favouriteCityOne}
       </button>
       <button type="button" onClick={getProfile}>
        {favouriteCityTwo}
       </button>
       <button type="button" onClick={getProfile}>
         {favouriteCityThree}
       </button>  */}
    </div>
  );
};
