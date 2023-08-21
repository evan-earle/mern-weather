import { Navbar } from "../components/nav/Navbar";
import { Favourites } from "../components/weather/Favourites";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentConditions } from "../components/weather/CurrentConditions";
import { Forecast } from "../components/weather/Forecast";
import toast from "react-hot-toast";
import axios from "axios";
import styles from "./Home.module.css";

import imgs from "../assets/images";

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
      getWeather(mainCity);
      setMainCity(profile.data.mainCity);
      setFavouriteCityOne(profile.data.favouriteCityOne);
      setFavouriteCityTwo(profile.data.favouriteCityTwo);
      setFavouriteCityThree(profile.data.favouriteCityThree);
    } catch (err) {
      console.log(err);
    }
  };

  const getWeather = async (city) => {
    try {
      const weather = await axios.get(`/api/weather/${city}`);
      console.log(weather);

      setCity(weather.data[0].name);
      setCurrentTemp(weather.data[0].main.temp);
      setMinTemp(weather.data[0].main.temp_min);
      setMaxTemp(weather.data[0].main.temp_max);
      setDescription(weather.data[0].weather[0].description);
      setDate(weather.data[1].list[5].dt);
    } catch (err) {
      console.log(err);
      if (err.response.status === 404 || err.response.status === 500) {
        toast.error("City not found");
      }
    }
  };

  const setFavouriteCity = async (type) => {
    try {
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
    } catch (err) {
      console.log(err);
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
      <Navbar search={getWeather} />
      <Favourites
        mainCity={mainCity}
        getMainCity={getCitiesFromDb}
        setMainCity={() => setFavouriteCity("main")}
        favouriteOne={favouriteCityOne}
        getFavouriteOne={() => getWeather(favouriteCityOne)}
        setFavouriteOne={() => setFavouriteCity("one")}
        favouriteTwo={favouriteCityTwo}
        getFavouriteTwo={() => getWeather(favouriteCityTwo)}
        setFavouriteTwo={() => setFavouriteCity("two")}
        favouriteThree={favouriteCityThree}
        getFavouriteThree={() => getWeather(favouriteCityThree)}
        setFavouriteThree={() => setFavouriteCity("three")}
      />
      <div className={styles.weatherContainer}>
        <div className={styles.weatherConditions}>
          <CurrentConditions
            city={city}
            currentTemp={currentTemp}
            minTemp={minTemp}
            maxTemp={maxTemp}
            description={description}
            date={date}
          />
          <Forecast />
        </div>
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
