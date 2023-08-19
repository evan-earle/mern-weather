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

  return (
    <div>
      {location.pathname === "/" && (
        <div>
          <div className={styles.maincities}>
            <div>
              <button
                className={styles.favouriteCity}
                type="submit"
                onClick={getMainCity}
              >
                {mainCity.charAt(0).toUpperCase() +
                  mainCity.slice(1).toLowerCase()}
              </button>
            </div>

            <div className={styles.mainFavourite}>
              <button
                className={`${styles.favouriteButton}`}
                type="button"
                onClick={setMainCity}
              >
                <FontAwesomeIcon icon={faHeart} className={styles.faHeart} />
              </button>
            </div>
          </div>
          <div className={styles.favourites}>
            <div>
              <button
                className={`${styles.favouriteCity}`}
                type="submit"
                onClick={getFavouriteOne}
              >
                {!favouriteOne
                  ? "Set favourite"
                  : favouriteOne.charAt(0).toUpperCase() +
                    favouriteOne.slice(1).toLowerCase()}
              </button>
            </div>

            <div>
              <button
                className={`${styles.favouriteButton} `}
                type="button"
                onClick={setFavouriteOne}
              >
                <FontAwesomeIcon icon={faHeart} className={styles.faHeart} />
              </button>
            </div>

            <div>
              <button
                className={`${styles.favouriteCity}`}
                type="submit"
                onClick={getFavouriteTwo}
              >
                {!favouriteTwo
                  ? "Set favourite"
                  : favouriteTwo.charAt(0).toUpperCase() +
                    favouriteTwo.slice(1).toLowerCase()}
              </button>
            </div>

            <div>
              <button
                className={`${styles.favouriteButton} `}
                type="button"
                onClick={setFavouriteTwo}
              >
                <FontAwesomeIcon icon={faHeart} className={styles.faHeart} />
              </button>
            </div>

            <div>
              <button
                className={`${styles.favouriteCity} `}
                type="submit"
                onClick={getFavouriteThree}
              >
                {!favouriteThree
                  ? "Set favourite"
                  : favouriteThree.charAt(0).toUpperCase() +
                    favouriteThree.slice(1).toLowerCase()}
              </button>
            </div>

            <div>
              <button
                className={`${styles.favouriteButton} `}
                type="button"
                onClick={setFavouriteThree}
              >
                <FontAwesomeIcon icon={faHeart} className={styles.faHeart} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
