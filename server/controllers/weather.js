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
    await Weather.findOneAndUpdate({
      favouriteCityOne: req.body.favouriteCityOne,
    });

    return res.status(200).json("Favourite city one set");
  } catch (err) {
    return next(err);
  }
};

export const setFavouriteTwo = async (req, res, next) => {
  try {
    await Weather.findOneAndUpdate({
      favouriteCityTwo: req.body.favouriteCityTwo,
    });

    return res.status(200).json("Favourite city two set");
  } catch (err) {
    return next(err);
  }
};

export const setFavouriteThree = async (req, res, next) => {
  try {
    await Weather.findOneAndUpdate({
      favouriteCityThree: req.body.favouriteCityThree,
    });

    return res.status(200).json("Favourite city three set");
  } catch (err) {
    return next(err);
  }
};

export const getWeather = async (req, res, next) => {
  const city = req.params.city;
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.API_KEY}&units=metric`
      );
    return res.status(200).json(response.data);
  } catch (err) {
    return next(err);
  }
};
//  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&units=metric`