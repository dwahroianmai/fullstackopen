import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Alexa Tomilov", number: "+71231234565", id: "Alexa Tomilov" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const contactsToShow = !search
    ? persons
    : persons.filter((contact) =>
        contact.name.toLowerCase().includes(search.toLowerCase())
      );

  const addNewContact = (event) => {
    event.preventDefault();
    const contact = {
      name: newName,
      number: newNumber,
      id: newName,
    };

    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === contact.name) {
        alert(`${newName} is already added to phonebook`);
        setNewName("");
        setNewNumber("");
        return;
      }
    }
    setPersons(persons.concat(contact));
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        search for a contact: <input value={search} onChange={handleSearch} />
      </div>
      <h2>add a new contact</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit" onClick={addNewContact}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {contactsToShow.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default App;
