import { useEffect, useState } from "react";
import axios from "axios";
import Country from "./components/country";

const App = () => {
  const [country, setCountry] = useState("");
  const [instruction, setInstruction] = useState("Please, start typing...");
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [component, setComponent] = useState(null);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((res) => {
        setCountries(res["data"]);
        console.log(res["data"]);
      });
  }, []);

  const handleSearch = (e) => {
    setComponent(null);
    let countryNow = e.target.value;
    setCountry(countryNow);
    let found = countries.filter((c) =>
      c["name"]["common"].toLowerCase().includes(countryNow.toLowerCase())
    );
    setFiltered(found);
    if (countryNow === "") {
      setInstruction("Please, start typing...");
    } else if (found.length > 10) {
      setInstruction("Too many countries, continue typing...");
    } else {
      setInstruction("");
    }
  };

  return (
    <div>
      <h1>Find countries</h1>
      <input type="text" value={country} onChange={handleSearch}></input>
      <p>{instruction}</p>
      {component}
      {filtered.length > 10
        ? null
        : filtered.map((c) => (
            <>
              <h2 key={c["ccn3"]}>{c["name"]["common"]}</h2>
              <button onClick={() => setComponent(<Country info={c} />)}>
                Show more
              </button>
            </>
          ))}
    </div>
  );
};

export default App;
