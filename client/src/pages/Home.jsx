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
import moment from "moment";

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
  const [mainWeather, setMainWeather] = useState("");
  const [background, setBackground] = useState("");
  const [time, setTime] = useState("");
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
      setMainWeather(weather.data[0].weather[0].main);
      setTime(weather.data[0].timezone);
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

  const backgroundPicker = () => {
    const timezoneInMinutes = time / 60;
    const currentTime = moment().utcOffset(timezoneInMinutes).format("h:mm A");
    const hour = moment(currentTime, "h:mm A").format("HH");

    let isDay = hour >= 7 && hour <= 18 ? true : false;
    console.log(isDay);

    switch (true) {
      case isDay && mainWeather === "Clear":
        console.log("day clear");
        setBackground(`${imgs.clearDay}`);
        break;
      case !isDay && mainWeather === "Clear":
        console.log("night clear");
        setBackground(`${imgs.clearNight}`);
        break;
      case isDay && mainWeather === "Clouds":
        console.log("day clouds");
        setBackground(`${imgs.cloudDay}`);
        break;
      case !isDay && mainWeather === "Clouds":
        console.log("night clouds");
        setBackground(`${imgs.cloudNight}`);
        break;
      case isDay && mainWeather === "Snow":
        console.log("day snow");
        setBackground(`${imgs.snowDay}`);
        break;
      case !isDay && mainWeather === "Snow":
        console.log("night snow");
        setBackground(`${imgs.snowNight}`);
        break;
      case isDay && mainWeather === "Rain":
        console.log("day rain");
        setBackground(`${imgs.rainDay}`);
        break;
      case !isDay && mainWeather === "Rain":
        console.log("night rain");
        setBackground(`${imgs.rainNight}`);
        break;
      case isDay && mainWeather === "Drizzle":
        console.log("day drizzle");
        setBackground(`${imgs.drizzleDay}`);
        break;
      case !isDay && mainWeather === "Drizzle":
        console.log("night drizzle");
        setBackground(`${imgs.drizzleNight}`);
        break;
      case isDay && mainWeather === "Thunderstorm":
        console.log("day thunderstorm");
        setBackground(`${imgs.dayThunderstorm}`);
        break;
      case !isDay && mainWeather === "Thunderstorm":
        console.log("night thunderstorm");
        setBackground(`${imgs.dayThunderstorm}`);
        break;
    }
  };

  useEffect(() => {
    backgroundPicker();
  });

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
      <div
        className={styles.background}
        style={{ background: `url(${background})` }}
      >
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
    </div>
  );
};
