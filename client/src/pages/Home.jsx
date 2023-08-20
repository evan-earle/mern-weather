import { Navbar } from "../components/nav/Navbar";
import { Favourites } from "../components/weather/Favourites";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Home.module.css";

export const Home = () => {
  const [mainCity, setMainCity] = useState("");
  const [favouriteCityOne, setFavouriteCityOne] = useState("");
  const [favouriteCityTwo, setFavouriteCityTwo] = useState("");
  const [favouriteCityThree, setFavouriteCityThree] = useState("");
  const [city, setCity] = useState("");
  const [currentTemp, setCurrentTemp] = useState("");
  const [minTemp, setMinTemp] = useState("");
  const [maxTemp, setMaxTemp] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

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
    setCity(weather.data[0].name);
    setCurrentTemp(weather.data[0].main.temp);
    setMinTemp(weather.data[0].main.temp_min);
    setMaxTemp(weather.data[0].main.temp_max);
    setDescription(weather.data[0].weather[0].description);
    setDate(weather.data[1].list[5].dt);
  };

  const setFavouriteCity = async (type) => {
    await axios.put(`/api/weather/${type}/${city}`);
    switch (type) {
      case "main":
        setMainCity(`${city}`);
        break;
      case "one":
        setFavouriteCityOne(`${city}`);
        break;
      case "two":
        setFavouriteCityTwo(`${city}`);
        break;
      case "three":
        setFavouriteCityThree(`${city}`);
        break;
    }
  };

  useEffect(() => {
    getCitiesFromDb();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const firstLogin = await axios.get("/api/weather");
        firstLogin.data === null || firstLogin.data.mainCity === ""
          ? navigate("/search")
          : navigate("/");
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div className={styles.homeContainer}>
      <Navbar search={getCity} />
      <Favourites
        mainCity={mainCity}
        getMainCity={getCitiesFromDb}
        setMainCity={() => setFavouriteCity("main")}
        favouriteOne={favouriteCityOne}
        getFavouriteOne={() => getCity(favouriteCityOne)}
        setFavouriteOne={() => setFavouriteCity("one")}
        favouriteTwo={favouriteCityTwo}
        getFavouriteTwo={() => getCity(favouriteCityTwo)}
        setFavouriteTwo={() => setFavouriteCity("two")}
        favouriteThree={favouriteCityThree}
        getFavouriteThree={() => getCity(favouriteCityThree)}
        setFavouriteThree={() => setFavouriteCity("three")}
      />
      <div>
        <div className={styles.title}>
          <h1 className={styles.cityHeader}>{city}</h1>
        </div>
        <h1>Current Conditions</h1>
        {currentTemp}
        {minTemp}
        {maxTemp}
        {description}
        weathericon
        <h1>Five Day Forecast</h1>
        {date}
        weathericon
      </div>
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
