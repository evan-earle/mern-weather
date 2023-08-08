import express from "express";

import {
  getWeather,
  getProfile,
  setMainCity,
  setFavouriteOne,
  setFavouriteTwo,
  setFavouriteThree,
} from "../controllers/weather.js";

const router = express.Router();

router.get("/", getProfile);
router.put("/main/:mainCity", setMainCity);
router.put("/one/:city", setFavouriteOne);
router.put("/two/:city", setFavouriteTwo);
router.put("/three/:city", setFavouriteThree);
router.get("/:city", getWeather);

export default router;
