import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Alexa Tomilov", id: "Alexa Tomilov" },
  ]);
  const [newName, setNewName] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const addNewName = (event) => {
    event.preventDefault();
    const name = {
      name: newName,
      id: newName,
    };

    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === name.name) {
        alert(`${newName} is already added to phonebook`);
        setNewName("");
        return;
      }
    }
    setPersons(persons.concat(name));
    setNewName("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit" onClick={addNewName}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.id}>{person.name}</p>
      ))}
    </div>
  );
};

export default App;
