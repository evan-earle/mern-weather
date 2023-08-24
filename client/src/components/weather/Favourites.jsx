import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import styles from "./Favourites.module.css";

export const Favourites = ({
  mainCity,
  getMainCity,
  setMainCity,
  favouriteOne,
  getFavouriteOne,
  setFavouriteOne,
  favouriteTwo,
  getFavouriteTwo,
  setFavouriteTwo,
  favouriteThree,
  getFavouriteThree,
  setFavouriteThree,
}) => {
  const SetFavouriteButton = ({ setCity }) => {
    return (
      <div>
        <button
          className={`${styles.favouriteButton}`}
          type="button"
          onClick={setCity}
        >
          <FontAwesomeIcon icon={faHeart} className={styles.faHeart} />
        </button>
      </div>
    );
  };

  const GetFavouriteCity = ({ getCity, city }) => {
    !city ? (city = "Set Favourite") : city;
    return (
      <div>
        <button
          className={styles.favouriteCity}
          type="submit"
          onClick={getCity}
        >
          {city}
        </button>
      </div>
    );
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.mainCity}>
          <div className={styles.favouritesName}>
            <GetFavouriteCity
              getCity={getMainCity}
              city={mainCity}
            ></GetFavouriteCity>
          </div>
          <SetFavouriteButton setCity={setMainCity}></SetFavouriteButton>
        </div>

        <div className={styles.favouritesContainer}>
          <div className={styles.favourites}>
            <div className={styles.favouritesName}>
              <GetFavouriteCity
                getCity={getFavouriteOne}
                city={favouriteOne}
              ></GetFavouriteCity>
            </div>
            <SetFavouriteButton setCity={setFavouriteOne}></SetFavouriteButton>
          </div>

          <div className={styles.favourites}>
            <div className={styles.favouritesName}>
              <GetFavouriteCity
                getCity={getFavouriteTwo}
                city={favouriteTwo}
              ></GetFavouriteCity>
            </div>
            <SetFavouriteButton setCity={setFavouriteTwo}></SetFavouriteButton>
          </div>

          <div className={styles.favourites}>
            <div className={styles.favouritesName}>
              <GetFavouriteCity
                getCity={getFavouriteThree}
                city={favouriteThree}
              ></GetFavouriteCity>
            </div>
            <SetFavouriteButton
              setCity={setFavouriteThree}
            ></SetFavouriteButton>
          </div>
        </div>
      </div>
    </div>
  );
};
