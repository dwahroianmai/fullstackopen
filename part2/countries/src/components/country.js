const Country = ({ info }) => {
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
    </div>
  );
};

export default Country;
