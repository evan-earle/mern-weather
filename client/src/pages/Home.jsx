import { Navbar } from "../components/nav/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import "semantic-ui-css/semantic.min.css";
// import { CurrentConditions } from "../components/weather/CurrentConditions";
// import { Favourites } from "../components/weather/Favourites";
// import { FiveDayForecast } from "../components/weather/FiveDayForecast";

export const Home = () => {
  const [mainCity, setMainCity] = useState("");
  const [favouriteCityOne, setFavouriteCityOne] = useState("");
  const [favouriteCityTwo, setFavouriteCityTwo] = useState("");
  const [favouriteCityThree, setFavouriteCityThree] = useState("");
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [currentTemp, setCurrentTemp] = useState("");
  const [minTemp, setMinTemp] = useState("");
  const [maxTemp, setMaxTemp] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const getCitiesFromDb = async () => {
    try {
      const profile = await axios.get(`/api/weather`);
      console.log(profile);

      const mainCity = profile.data.mainCity;

      getCity(mainCity);

      setMainCity(profile.data.mainCity);
      setFavouriteCityOne(profile.data.favouriteCityOne);
      setFavouriteCityTwo(profile.data.favouriteCityTwo);
      setFavouriteCityThree(profile.data.favouriteCityThree);
    } catch (err) {
      console.log(err);
    }
  };

  const getCity = async (city) => {
    const weather = await axios.get(`/api/weather/${city}`);
    console.log(weather);
    setName(weather.data[0].name);
    setCurrentTemp(weather.data[0].main.temp);
    setMinTemp(weather.data[0].main.temp_min);
    setMaxTemp(weather.data[0].main.temp_max);
    setDescription(weather.data[0].weather[0].description);
    setDate(weather.data[1].list[5].dt);
  };

  const getWeather = async (e) => {
    e.preventDefault();

    const weather = await axios.get(`/api/weather/${search}`);
    console.log(weather);
    setName(weather.data[0].name);
    setCurrentTemp(weather.data[0].main.temp);
    setMinTemp(weather.data[0].main.temp_min);
    setMaxTemp(weather.data[0].main.temp_max);
    setDescription(weather.data[0].weather[0].description);
  };

  const setFavouriteOne = async () => {
    await axios.put(`/api/weather/one/${name}`);
    setFavouriteCityOne(`${name}`);
  };

  const setFavouriteTwo = async () => {
    await axios.put(`/api/weather/two/${name}`);
    setFavouriteCityTwo(`${name}`);
  };

  const setFavouriteThree = async () => {
    await axios.put(`/api/weather/three/${name}`);
    setFavouriteCityThree(name);
  };

  useEffect(() => {
    getCitiesFromDb();
  }, []);

  return (
    <div>
      <Navbar />
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
      <h1>{name}</h1>
      <h1>Current Conditions</h1>
      {currentTemp}
      {minTemp}
      {maxTemp}
      {description}
      weathericon
      <h1>Five Day Forecast</h1>
      {date}
      weathericon
      <h1>Favourites</h1>
      <button type="button" onClick={setFavouriteOne}>
        Set F1
      </button>
      <button id="1" type="button" onClick={() => getCity(favouriteCityOne)}>
        {favouriteCityOne}
      </button>
      <br />
      <button type="button" onClick={setFavouriteTwo}>
        Set F2
      </button>
      <button id="2" type="button" onClick={() => getCity(favouriteCityTwo)}>
        {favouriteCityTwo}
      </button>
      <br />
      <button type="button" onClick={setFavouriteThree}>
        Set F3
      </button>
      <button id="3" type="button" onClick={() => getCity(favouriteCityThree)}>
        {favouriteCityThree}
      </button>
      <br />
    </div>
  );
};

// data.main.temp
// data.list[5].main.temp
// data.list[5].weather[0].description
// data.list[5].weather[0].icon

// data.list[13].main.temp
// data.list[13].weather[0].description
// data.list[13].weather[0].icon

// data.list[21].main.temp
// data.list[21].weather[0].description
// data.list[21].weather[0].icon

// data.list[29].main.temp
// data.list[29].weather[0].description
// data.list[29].weather[0].icon

// data.list[37].main.temp
// data.list[37].weather[0].description
// data.list[37].weather[0].icon
