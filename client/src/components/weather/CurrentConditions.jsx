import styles from "./CurrentConditions.module.css";

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
