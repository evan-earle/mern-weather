import styles from "./CurrentConditions.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const CurrentConditions = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.currentConditions}>
        <div className={styles.city}>
          <h1>{props.city}</h1>
        </div>

        <div className={styles.currentConditionsHeader}>
          <h3>Current Conditions</h3>
        </div>

        <div className={styles.weatherConditions}>
          <div className={styles.currentTemperature}>{props.currentTemp}˚C</div>
          <div className={styles.descriptionIcon}>
            <div className={styles.icon}>
              <FontAwesomeIcon icon={props.icon} style={props.iconStyle} />
            </div>
            <div className={styles.description}>{props.description}</div>
          </div>

          <div>
            <div>Feels like: {props.feelsLike}˚C</div>
            <div>Min temp: {props.minTemp}˚C</div>
            <div>Max temp: {props.maxTemp}˚C</div>
          </div>
        </div>
      </div>
    </div>
  );
};
