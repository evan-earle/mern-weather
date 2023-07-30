import { Navbar } from "../components/nav/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";

export const Home = () => {
  const getWeather = () => {
    console.log("homepage");
  };

  getWeather();

  return (
    <div>
      <Navbar />
      Home
    </div>
  );
};
