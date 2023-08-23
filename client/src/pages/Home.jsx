import { Navbar } from "../components/nav/Navbar";
import { Favourites } from "../components/weather/Favourites";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentConditions } from "../components/weather/CurrentConditions";
import { Forecast } from "../components/weather/Forecast";
import toast from "react-hot-toast";
import axios from "axios";
import styles from "./Home.module.css";
import imgs from "../assets/backgrounds/images";
import moment from "moment";
import {
  faCloudMoon,
  faCloud,
  faMoon,
  faSun,
  faSnowflake,
  faCloudShowersHeavy,
  faCloudSunRain,
  faCloudMoonRain,
  faCloudBolt,
} from "@fortawesome/free-solid-svg-icons";

export const Home = () => {
  const [mainCity, setMainCity] = useState("");
  const [favouriteCityOne, setFavouriteCityOne] = useState("");
  const [favouriteCityTwo, setFavouriteCityTwo] = useState("");
  const [favouriteCityThree, setFavouriteCityThree] = useState("");
  const [city, setCity] = useState("");
  const [currentTemp, setCurrentTemp] = useState("");
  const [minTemp, setMinTemp] = useState("");
  const [maxTemp, setMaxTemp] = useState("");
  const [feelsLike, setFeelsLike] = useState("");
  const [description, setDescription] = useState("");
  const [mainWeather, setMainWeather] = useState("");
  const [background, setBackground] = useState("");
  const [icon, setIcon] = useState("");
  const [iconStyle, setIconStyle] = useState("");
  const [time, setTime] = useState("");
  const [forecastDate, setForecastDate] = useState("");
  const [forecastTemp, setForecastTemp] = useState("");
  const [forecastDescription, setForecastDescription] = useState("");
  const [forecastIcon, setForecastIcon] = useState("");
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
      if (city) {
        const weather = await axios.get(`/api/weather/${city}`);
        console.log(weather);
        setCity(weather.data[0].name);
        setCurrentTemp(Math.round(weather.data[0].main.temp));
        setMinTemp(Math.round(weather.data[0].main.temp_min));
        setMaxTemp(Math.round(weather.data[0].main.temp_max));
        setFeelsLike(Math.round(weather.data[0].main.feels_like));
        setDescription(weather.data[0].weather[0].description);
        setMainWeather(weather.data[0].weather[0].main);
        setTime(weather.data[0].timezone);
        setForecastDate([
          weather.data[1].list[5].dt,
          weather.data[1].list[13].dt,
          weather.data[1].list[21].dt,
          weather.data[1].list[29].dt,
          weather.data[1].list[37].dt,
        ]);
        setForecastTemp([
          Math.round(weather.data[1].list[5].main.temp),
          Math.round(weather.data[1].list[13].main.temp),
          Math.round(weather.data[1].list[21].main.temp),
          Math.round(weather.data[1].list[29].main.temp),
          Math.round(weather.data[1].list[37].main.temp),
        ]);
        setForecastDescription([
          weather.data[1].list[5].weather[0].description,
          weather.data[1].list[13].weather[0].description,
          weather.data[1].list[21].weather[0].description,
          weather.data[1].list[29].weather[0].description,
          weather.data[1].list[37].weather[0].description,
        ]);
        setForecastIcon([
          weather.data[1].list[5].weather[0].main,
          weather.data[1].list[13].weather[0].main,
          weather.data[1].list[21].weather[0].main,
          weather.data[1].list[29].weather[0].main,
          weather.data[1].list[37].weather[0].main,
        ]);
      }
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

  const backgroundIconPicker = () => {
    const timezoneInMinutes = time / 60;
    const currentTime = moment().utcOffset(timezoneInMinutes).format("h:mm A");
    const hour = moment(currentTime, "h:mm A").format("HH");
    const isDay = hour >= 7 && hour <= 18 ? true : false;

    switch (true) {
      case isDay && mainWeather === "Clear":
        setIcon(faSun);
        setIconStyle({ color: "orange" });
        setBackground(`${imgs.clearDay}`);
        break;
      case !isDay && mainWeather === "Clear":
        setBackground(`${imgs.clearNight}`);
        setIcon(faMoon);
        setIconStyle();
        break;
      case isDay && mainWeather === "Clouds":
        setBackground(`${imgs.cloudDay}`);
        setIcon(faCloud);
        setIconStyle();
        break;
      case !isDay && mainWeather === "Clouds":
        setBackground(`${imgs.cloudNight}`);
        setIcon(faCloudMoon);
        setIconStyle();
        break;
      case isDay && mainWeather === "Snow":
        setBackground(`${imgs.snowDay}`);
        setIcon(faSnowflake);
        setIconStyle({ color: "#A0E3F6" });
        break;
      case !isDay && mainWeather === "Snow":
        setBackground(`${imgs.snowNight}`);
        setIcon(faSnowflake);
        setIconStyle({ color: "#A0E3F6" });
        break;
      case isDay && mainWeather === "Rain":
        setBackground(`${imgs.rainDay}`);
        setIcon(faCloudShowersHeavy);
        setIconStyle({ color: "#002242" });
        break;
      case !isDay && mainWeather === "Rain":
        setBackground(`${imgs.rainNight}`);
        setIcon(faCloudShowersHeavy);
        setIconStyle({ color: "#002242" });
        break;
      case isDay && mainWeather === "Drizzle":
        setBackground(`${imgs.drizzleDay}`);
        setIcon(faCloudSunRain);
        break;
      case !isDay && mainWeather === "Drizzle":
        setBackground(`${imgs.drizzleNight}`);
        setIcon(faCloudMoonRain);
        setIconStyle();
        break;
      case isDay && mainWeather === "Thunderstorm":
        setBackground(`${imgs.dayThunderstorm}`);
        setIcon(faCloudBolt);
        setIconStyle();
        break;
      case !isDay && mainWeather === "Thunderstorm":
        setBackground(`${imgs.dayThunderstorm}`);
        setIcon(faCloudBolt);
        setIconStyle();
        break;
    }
  };

  useEffect(() => {
    backgroundIconPicker();
  }, [city]);

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
        style={{ background: `url(${background}` }}
      >
        <div className={styles.weatherContainer}>
          <div className={styles.weatherConditions}>
            <CurrentConditions
              icon={icon}
              iconStyle={iconStyle}
              city={city}
              currentTemp={currentTemp}
              minTemp={minTemp}
              maxTemp={maxTemp}
              description={description}
              feelsLike={feelsLike}
            />
            <Forecast
              forecastTemp={forecastTemp}
              forecastDescription={forecastDescription}
              forecastDate={forecastDate}
              forecastIcon={forecastIcon}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
