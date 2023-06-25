import { useEffect, useState } from "react";
import "../styles.css";
import axios from "axios";

const Country = ({ info }) => {
  const api_key = process.env.REACT_APP_API_KEY;
  const [lat, setLat] = useState(info["capitalInfo"]["latlng"][0]);
  const [lng, setLng] = useState(info["capitalInfo"]["latlng"][1]);
  const [weather, setWeather] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}&units=metric`
      )
      .then((res) => {
        setWeather(res["data"]);
        setLoaded(true);
        console.log(res["data"]);
      })
      .catch((err) => console.log(err));
  }, [api_key, lat, lng]);

  return (
    <div>
      <h2>{info["name"]["common"]}</h2>
      <p>Capital: {info["capital"]}</p>
      <p>Area: {info["area"]}</p>
      <h3>Languages: </h3>
      <ul>
        {Object.values(info["languages"]).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={info["flags"]["png"]} alt={info["flags"]["alt"]} />
      <h2>Weather in {info["capital"]}</h2>
      {loaded && (
        <>
          <p>Temperature: {weather["main"]["temp"]} Celsius</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather["weather"][0]["icon"]}@2x.png`}
            alt="weather icon"
          />
          <p>Wind: {weather["wind"]["speed"]} m/s</p>
        </>
      )}
    </div>
  );
};

export default Country;
