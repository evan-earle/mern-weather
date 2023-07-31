import { Navbar } from "../components/nav/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";

export const Home = () => {
  useEffect(() => {
    getProfile();
  }, []);

  const [mainCity, setMainCity] = useState();
  const [favouriteCityOne, setFavouriteCityOne] = useState();
  const [favouriteCityTwo, setFavouriteCityTwo] = useState();
  const [favouriteCityThree, setFavouriteCityThree] = useState();
  const [search, setSearch] = useState();

  const getProfile = async () => {
    try {
      const profile = await axios.get(`/api/weather`);
      console.log(profile);

      setMainCity(profile.data.mainCity);
      console.log(mainCity);
      setFavouriteCityOne(profile.data.favouriteCityOne);
      setFavouriteCityTwo(profile.data.favouriteCityTwo);
      setFavouriteCityThree(profile.data.favouriteCityThree);
    } catch (err) {
      console.log(err);
    }
  };

  const getWeather = async () => {
    const weather = await axios.get(`/api/weather/${mainCity}`);
    console.log(weather);
  };

  return (
    <div>
      <button type="button" onClick={getProfile}>
        {mainCity}
      </button>
      <form onSubmit={getProfile}>
        <input type="text" onChange={(e) => setMainCity(e.target.value)} />
        <button type="submit">Search</button>
      </form>
      <Navbar />

      <h1>{mainCity}</h1>

      <button type="button" onClick={getProfile}>
        {favouriteCityOne}
      </button>
      <button type="button" onClick={getProfile}>
        {favouriteCityTwo}
      </button>
      <button type="button" onClick={getProfile}>
        {favouriteCityThree}
      </button>
    </div>
  );
};
