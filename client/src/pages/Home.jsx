import { Navbar } from "../components/nav/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";

export const Home = () => {
  const [mainCity, setMainCity] = useState("");
  const [favouriteCityOne, setFavouriteCityOne] = useState("");
  const [favouriteCityTwo, setFavouriteCityTwo] = useState("");
  const [favouriteCityThree, setFavouriteCityThree] = useState("");
  const [search, setSearch] = useState("");
  const [toggle, setToggle] = useState(false);
  const [name, setName] = useState("");

  const getCitiesFromDb = async () => {
    try {
      // call db and check what cities are favourited
      const profile = await axios.get(`/api/weather`);
      console.log(profile);

      const city = profile.data.mainCity;

      getCity(city);
      setMainCity(profile.data.mainCity);
      // setFavouriteCityOne(profile.data.favouriteCityOne);
      // setFavouriteCityTwo(profile.data.favouriteCityTwo);
      // setFavouriteCityThree(profile.data.favouriteCityThree);
    } catch (err) {
      console.log(err);
    }
  };

  const getCity = async (city) => {
    setToggle(false);
    const weather = await axios.get(`/api/weather/${city}`);
    console.log(weather);
  };

  const getWeather = async (e) => {
    setToggle(true);
    e.preventDefault();

    const weather = await axios.get(`/api/weather/${search}`);
    console.log(weather);
    setName(weather.data.name)
  };

 

  useEffect(() => {
    getCitiesFromDb();
  }, []);

  return (
    <div>
      <button type="button" onClick={getCitiesFromDb}>
        {mainCity}
      </button>
      <form onSubmit={getWeather}>
        <input
          type="text"
           onChange={(e) => setSearch(e.target.value)}
         
          value={search}
        />
        <button type="submit">Search</button>
      </form>
      <Navbar />

      {!toggle ? <h1>{mainCity}</h1> : <h1>{name}</h1>}

      {/*
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


// data.main.temp
// data.list[0].main.temp
// data.list[0].weather[0].description
// data.list[0].weather[0].icon

// data.list[8].main.temp
// data.list[8].weather[0].description
// data.list[8].weather[0].icon

// data.list[16].main.temp
// data.list[16].weather[0].description
// data.list[16].weather[0].icon

// data.list[24].main.temp
// data.list[24].weather[0].description
// data.list[24].weather[0].icon

// data.list[32].main.temp
// data.list[32].weather[0].description
// data.list[32].weather[0].icon