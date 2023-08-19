import { useLocation } from "react-router-dom";
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
  const location = useLocation();

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
    return (
      <div>
        <button
          className={styles.favouriteCity}
          type="submit"
          onClick={getCity}
        >
          {city.charAt(0).toUpperCase() + city.slice(1).toLowerCase()}
        </button>
      </div>
    );
  };

  return (
    <div>
      {location.pathname === "/" && (
        <div>
          <div className={styles.maincities}>
            <GetFavouriteCity
              getCity={getMainCity}
              city={mainCity}
            ></GetFavouriteCity>
            <SetFavouriteButton setCity={setMainCity}></SetFavouriteButton>
          </div>
          <div className={styles.favourites}>
            <GetFavouriteCity
              getCity={getFavouriteOne}
              city={favouriteOne}
            ></GetFavouriteCity>
            <SetFavouriteButton setCity={setFavouriteOne}></SetFavouriteButton>
            <GetFavouriteCity
              getCity={getFavouriteTwo}
              city={favouriteTwo}
            ></GetFavouriteCity>
            <SetFavouriteButton setCity={setFavouriteTwo}></SetFavouriteButton>
            <GetFavouriteCity
              getCity={getFavouriteThree}
              city={favouriteThree}
            ></GetFavouriteCity>
            <SetFavouriteButton
              setCity={setFavouriteThree}
            ></SetFavouriteButton>
          </div>
        </div>
      )}
    </div>
  );
};
