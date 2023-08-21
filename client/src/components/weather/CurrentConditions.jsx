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
