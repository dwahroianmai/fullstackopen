const PersonForm = ({ nameVal, nameChange, numVal, numChange, click }) => {
  return (
    <form>
      <div>
        name: <input value={nameVal} onChange={nameChange} />
      </div>
      <div>
        number: <input value={numVal} onChange={numChange} />
      </div>
      <div>
        <button type="submit" onClick={click}>
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
