import axios from "axios";
import Weather from "../models/Weather.js";

export const getProfile = async (req, res, next) => {
  try {
    const cities = await Weather.findOne({ user: req.user.id });

    if (!cities) {
      const newWeather = new Weather({
        mainCity: "",
        favouriteCityOne: "",
        favouriteCityTwo: "",
        favouriteCityThree: "",
        user: req.user.id,
      });
      await newWeather.save();
    }
    return res.status(201).json(cities);
  } catch (err) {
    return next(err);
  }
};

export const setMainCity = async (req, res, next) => {
  try {
    const updatedMainCity = await Weather.findOneAndUpdate(
      { user: req.user.id },
      {
        mainCity: req.params.mainCity,
      }
    );
    return res.status(200).json(updatedMainCity);
  } catch (err) {
    return next(err);
  }
};

export const setFavouriteOne = async (req, res, next) => {
  try {
    const updatedFavouriteOne = await Weather.findOneAndUpdate(
      { user: req.user.id },
      {
        favouriteCityOne: req.params.city,
      }
    );

    return res.status(200).json(updatedFavouriteOne);
  } catch (err) {
    return next(err);
  }
};

export const setFavouriteTwo = async (req, res, next) => {
  try {
    const updatedFavouriteTwo = await Weather.findOneAndUpdate(
      { user: req.user.id },
      {
        favouriteCityTwo: req.params.city,
      }
    );

    return res.status(200).json(updatedFavouriteTwo);
  } catch (err) {
    return next(err);
  }
};

export const setFavouriteThree = async (req, res, next) => {
  try {
    const updatedFavouriteThree = await Weather.findOneAndUpdate(
      { user: req.user.id },
      {
        favouriteCityThree: req.params.city,
      }
    );

    return res.status(200).json(updatedFavouriteThree);
  } catch (err) {
    return next(err);
  }
};

export const getWeather = async (req, res, next) => {
  const city = req.params.city;
  try {
    const response = await Promise.all([
      axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&units=metric`
      ),
      axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.API_KEY}&units=metric`
      ),
    ]);

    const data = response.map((response) => response.data);

    return res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
};
