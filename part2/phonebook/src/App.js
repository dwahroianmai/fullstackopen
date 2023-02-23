import { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/Search";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Alexa Tomilov", number: "+71231234565", id: "Alexa Tomilov" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data));
  }, []);

  console.log(persons);

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
      <Search val={search} onchange={handleSearch} />
      <h2>add a new contact</h2>
      <PersonForm
        nameVal={newName}
        nameChange={handleNameChange}
        numVal={newNumber}
        numChange={handleNumberChange}
        click={addNewContact}
      />
      <h2>Numbers</h2>
      <Persons people={contactsToShow} />
    </div>
  );
};

export default App;
