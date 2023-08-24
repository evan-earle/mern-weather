import styles from "./Forecast.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import {
  faCloud,
  faSun,
  faSnowflake,
  faCloudShowersHeavy,
  faCloudBolt,
} from "@fortawesome/free-solid-svg-icons";

export const Forecast = (props) => {
  const [forecastDates, setForecastDates] = useState("");
  const [forecastIcons, setForecastIcons] = useState("");

  const convertIcons = () => {
    const descriptions = props.forecastIcon;
    for (let i = 0; i <= descriptions.length; i++) {
      switch (true) {
        case descriptions[i] === "Clear":
          descriptions[i] = faSun;
          break;
        case descriptions[i] === "Clouds":
          descriptions[i] = faCloud;
          break;
        case descriptions[i] === "Rain":
          descriptions[i] = faCloudShowersHeavy;
          break;
        case descriptions[i] === "Snow":
          descriptions[i] = faSnowflake;
          break;
        case descriptions[i] === "Thunderstorm":
          descriptions[i] = faCloudBolt;
          break;
      }
    }
    setForecastIcons(descriptions);
  };

  const convertDate = () => {
    if (props.forecastDate) {
      const newDate = props.forecastDate.map((date) =>
        new Date(date * 1000).toString().split(" ").slice(0, 3).join(" ")
      );

      setForecastDates(newDate);
    }
  };

  useEffect(() => {
    convertIcons();
  }, [props.forecastIcon]);

  useEffect(() => {
    convertDate();
  }, [props.forecastDate]);

  const WeatherCard = ({
    forecastTemp,
    forecastDates,
    forecastDescription,
    forecastIcons,
  }) => {
    return (
      <div className={styles.weatherCard}>
        <div>{forecastDates}</div>
        <div className={styles.icon}>
          <FontAwesomeIcon
            icon={forecastIcons}
            style={{
              color:
                forecastIcons === faSun
                  ? "orange"
                  : forecastIcons === faSnowflake
                  ? "#A0E3F6"
                  : forecastIcons === faCloudShowersHeavy
                  ? "#002242"
                  : null,
            }}
          />
        </div>
        <div>{forecastTemp}˚C</div>
        <div className={styles.forecastDescription}>{forecastDescription}</div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.forecastHeader}>
        <h3>Forecast</h3>
      </div>
      <div className={styles.forecast}>
        <WeatherCard
          forecastTemp={props.forecastTemp[0]}
          forecastDates={forecastDates[0]}
          forecastDescription={props.forecastDescription[0]}
          forecastIcons={forecastIcons[0]}
        />

        <WeatherCard
          forecastTemp={props.forecastTemp[1]}
          forecastDates={forecastDates[1]}
          forecastDescription={props.forecastDescription[1]}
          forecastIcons={forecastIcons[1]}
        />

        <WeatherCard
          forecastTemp={props.forecastTemp[2]}
          forecastDates={forecastDates[2]}
          forecastDescription={props.forecastDescription[2]}
          forecastIcons={forecastIcons[2]}
        />
        <WeatherCard
          forecastTemp={props.forecastTemp[3]}
          forecastDates={forecastDates[3]}
          forecastDescription={props.forecastDescription[3]}
          forecastIcons={forecastIcons[3]}
        />
        <WeatherCard
          forecastTemp={props.forecastTemp[4]}
          forecastDates={forecastDates[4]}
          forecastDescription={props.forecastDescription[4]}
          forecastIcons={forecastIcons[4]}
        />
      </div>
    </div>
  );
};
