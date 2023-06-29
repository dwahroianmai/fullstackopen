import { useState, useEffect } from "react";
import Search from "./components/Search";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import notify from "./components/Notifications";
import services from "./services/persons";
import axios from "axios";
import "./styles.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [addedNotify, setAddedNotify] = useState(null);
  const [error, setError] = useState(null);

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
            .put(
              `https://phonebook-fso-boxj.onrender.com/api/persons/${persons[i].id}`,
              contact
            )
            .then((response) => {
              setPersons(
                persons.map((person) =>
                  person.id !== response.data.id ? person : response.data
                )
              );
              setAddedNotify(
                `${contact.name}'s number was changed successfully.`
              );
              setTimeout(() => {
                setAddedNotify(null);
              }, 5000);
            })
            .catch(() => {
              setError(
                `${contact.name} was already removed from your phonebook, please refresh the page.`
              );
            });
          setTimeout(() => {
            setError(null);
          }, 5000);
        }
        setNewName("");
        setNewNumber("");
        return;
      }
    }

    services
      .newContact(contact)
      .then((person) => setPersons(persons.concat(person)));

    setAddedNotify(`${contact.name} was added to the phonebook.`);
    setTimeout(() => {
      setAddedNotify(null);
    }, 5000);
    setNewName("");
    setNewNumber("");
  };

  const removePerson = (name, id) => {
    if (window.confirm(`Delete ${name} from phonebook?`)) {
      axios
        .delete(`https://phonebook-fso-boxj.onrender.com/api/persons/${id}`)
        .then(() => setPersons(persons.filter((person) => person.id !== id)));
    }
    setAddedNotify(`${name} was deleted from your phonebook.`);
    setTimeout(() => {
      setAddedNotify(null);
    }, 5000);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Search val={search} onchange={handleSearch} />
      <h2>add a new contact</h2>
      <notify.Notification text={addedNotify} />
      <notify.Error text={error} />
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
