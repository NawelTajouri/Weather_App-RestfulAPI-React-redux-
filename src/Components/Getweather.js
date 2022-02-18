import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../actions/fetchWeather";
import WeatherInfo from "../reducers/weatherReducer";
import WeatherCard from "./WeatherCard";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card, Form } from "react-bootstrap";
import "./Getweather.css";
import RainDay from "./rra.jpg";
import sun from "./sunshine.jpg";
import cloudDay from "./daycloud.jpg";
import nday from "./cloudyday.jpg";
import RainNight from "./rainn.jpg";
import Clear from "./nights.jpg";
import cloudyNight from "./nightclouds.jpg";
import night from "./athernight.jpg";

const Getweather = () => {
  const [city, setCity] = useState("Tunisia");
  const [days, setDays] = useState(3);
  const [aqi, setAqi] = useState("");
  const [alerts, setAlerts] = useState("");
  const [arrcurrent, setArrcurrent] = useState([]);
  const [arrforecast, setArrforecat] = useState([]);
  const [arrlocation, setArrlocation] = useState([]);
  console.log(city);
  const weatherSelector = useSelector((state) => state.weatherinfo);
  const dispatch = useDispatch();
  const getWeatherInfoAction = (city, days, aqi, alerts) =>
    dispatch(fetchWeather(city, days, aqi, alerts));

  useEffect(() => {
    getWeatherInfoAction("Tunisia", 1, "yes", "no");
  }, []);
  const getWeatherInfo = (e) => {
    e.preventDefault();
    if (city == "") {
      console.log("no city to search for");
    } else {
      getWeatherInfoAction(city, days, aqi, alerts);
      console.log(weatherSelector);
      setArrcurrent(weatherSelector.current);
      setArrlocation(weatherSelector.location);
      setArrforecat(weatherSelector.forecast.forecastday);
    }
  };

  let details = "";
  if (weatherSelector) {
    const day = arrcurrent.is_day;
    const test = weatherSelector.current.condition.text;

    details = (
      <div>
        <Card style={{ width: "20rem" }}>
          {/* <div className="header" style={{backgroundColor: (text.includes("rain") && day == "1")? "grey" : (text.includes("Sunny") && day == "1") ? "yellow" : (day == "1") ? "red" : (text.includes("rain") && day == "0") ? "black" : (text.includes("Clear") && day == "0") ? "blue" : "green"}}> */}
          <div
            className="header"
            style={{
              backgroundImage:
                test.includes("rain") && day == "1"
                  ? `url(${RainDay})`
                  : test.includes("Sunny") && day == "1"
                  ? `url(${sun})`
                  : test.includes("cloudy") && day == "1"
                  ? `url(${cloudDay})`
                  
                   :test.includes("rain") && day == "0"
                  ? `url(${RainNight})`
                  : test.includes("Clear") && day == "0"
                  ? `url(${Clear})`
                  : test.includes("cloudy") && day == "0"
                  ? `url(${cloudyNight})`
                  : day == "0"
                  ?`url(${night})`
                  : `url(${nday})`,
                  
                  
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
             

            }}
          >
            <div className="head">
              <div className="head-info">
                <div className="info_temp">
                  <p>{weatherSelector.location.country} </p>
                  <p>{weatherSelector.current.temp_c}°</p>
                  <p>{weatherSelector.current.condition.text}</p>
                </div>
              </div>
            </div>

            {/* <div className="wave"></div> */}
          </div>

          <Card.Body className="body_info">
            <div className="location_logo">
            <Card.Title>{weatherSelector.location.name} </Card.Title>
            <div className="info_log">
              <img src={weatherSelector.current.condition.icon} />
            </div>
            <p>{weatherSelector.current.last_updated[11]}{weatherSelector.current.last_updated[12]}{weatherSelector.current.last_updated[13]}{weatherSelector.current.last_updated[14]}{weatherSelector.current.last_updated[15]}</p>
            </div>
            <div className="Low_High">
            <p>L {weatherSelector.forecast.forecastday[0].day.mintemp_c}°</p>
            <p>H {weatherSelector.forecast.forecastday[0].day.maxtemp_c}°</p>
            </div>
            <div className="rise_set">
            <p>Sunrise {weatherSelector.forecast.forecastday[0].astro.sunrise}</p>
            <p>Sunset {weatherSelector.forecast.forecastday[0].astro.sunset}</p>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  } else {
    details = <p>You need To type a city</p>;
  }

  return (
    <div>
      <div className="current">
        <div className="form">
      <Form onSubmit={getWeatherInfo}>
        <Form.Group className="mb-6" size="sm" controlId="formBasicEmail">
          <Form.Label>Place</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Place"
            name="name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={{width:"30%"}}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Number of </Form.Label>
          <Form.Control
            type="number"
            placeholder="number"
            name="name"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            style={{width:"30%"}}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Check Weather
        </Button>
      </Form>
      </div>
      <div className="details">{details}</div>
      </div>
      <div className="weatherApp">
        {arrforecast.map((i) => (
          <WeatherCard arr={i} weatherSelector={weatherSelector} />
        ))}
      </div>
    </div>
  );
};

export default Getweather;
