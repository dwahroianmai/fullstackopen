const Search = ({ val, onchange }) => {
  return (
    <div>
      search for a contact: <input value={val} onChange={onchange} />
    </div>
  );
};

export default Search;
