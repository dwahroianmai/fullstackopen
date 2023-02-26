import { useState, useEffect } from "react";
import axios from "axios";

const Countries = ({ found }) => {
  if (found.length === 1) {
    return <div></div>;
  }
  return (
    <div>
      {found.map((found, index) => (
        <p key={index}>{found.name.common}</p>
      ))}
    </div>
  );
};

const Hint = ({ text }) => {
  if (text === null) {
    return null;
  }
  return <div>{text}</div>;
};

const Info = ({ country, show }) => {
  if (!show || country.length !== 1) {
    return <div></div>;
  }
  console.log(country);
  return (
    <div>
      <h1>{country[0].name.common}</h1>
      <p>capital {country[0].capital}</p>
      <p>area {country[0].area}</p>
      <h2>languages: </h2>
      <ul>
        {Object.keys(country[0].languages).map((key) => (
          <li key={country[0].name.common}>{country[0].languages[key]}</li>
        ))}
      </ul>
      <img src={country[0].flags.png} alt="flag"></img>
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [found, setFound] = useState([]);
  const [hint, setHint] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => setCountries(response.data));
  }, []);

  console.log(found);

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setFound(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      )
    );
    setShowInfo(true);
    if (found.length > 1) {
      setHint("please enter country's full name");
    } else {
      setHint(null);
    }
  };

  return (
    <div>
      start typing to find the country:
      <input value={search} onChange={handleSearch} />
      <Hint text={hint} />
      <Countries found={found} />
      <Info country={found} show={showInfo} />
    </div>
  );
};

export default App;
