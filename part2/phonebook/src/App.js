import { useState, useEffect } from "react";
import Search from "./components/Search";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import services from "./services/persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Alexa Tomilov", number: "+71231234565", id: "Alexa Tomilov" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    services.getContacts().then((people) => setPersons(people));
  }, []);

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
      id: persons.length + 1,
    };

    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === contact.name) {
        if (
          window.confirm(
            `${newName} is already added to phonebook, replace the old number with a new one?`
          )
        ) {
          contact.id = persons[i].id;
          axios
            .put(`http://localhost:3001/persons/${persons[i].id}`, contact)
            .then((response) =>
              setPersons(
                persons.map((person) =>
                  person.id !== response.data.id ? person : response.data
                )
              )
            );
        }
        setNewName("");
        setNewNumber("");
        return;
      }
    }

    services
      .newContact(contact)
      .then((person) => setPersons(persons.concat(person)));

    setNewName("");
    setNewNumber("");
  };

  const removePerson = (name, id) => {
    if (window.confirm(`Delete ${name} from phonebook?`)) {
      axios
        .delete(`http://localhost:3001/persons/${id}`)
        .then(() => setPersons(persons.filter((person) => person.id !== id)));
    }
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
      <Persons people={contactsToShow} f={removePerson} />
    </div>
  );
};

export default App;
