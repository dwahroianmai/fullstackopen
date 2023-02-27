import { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

const Countries = ({ found, show, click }) => {
  return (
    <div className="countries">
      {found.map((found, index) => {
        return (
          <div>
            <div className="country">
              <p key={index}>{found.name.common}</p>
              <button type="submit" onClick={() => click(index)}>
                {show[index] ? "hide" : "show"}
              </button>
            </div>
            <Info country={found} show={show[index]} />
          </div>
        );
      })}
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
  console.log(show);
  if (!show) {
    return null;
  }
  console.log(country);
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h2>languages: </h2>
      <ul>
        {typeof country.languages === "object" &&
          Object.values(country.languages).map((val, index) => (
            <li key={index}>{val}</li>
          ))}
      </ul>
      <img src={country.flags.png} alt="flag"></img>
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [found, setFound] = useState([]);
  const [hint, setHint] = useState(null);
  const [shown, setShown] = useState({});

  const toggleShown = (index) => {
    setShown((before) => ({ ...before, [index]: !before[index] }));
    console.log(shown[index]);
  };

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
      <Countries found={found} show={shown} click={toggleShown} />
    </div>
  );
};

export default App;
