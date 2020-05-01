import React, { useState, useEffect } from 'react';
import personsServices from './services/persons';
import './App.css';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import PersonList from './components/PersonList';
import './index.css';

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [nameSearch, setNameSearch] = useState('');
  const [personsShown, setPersonsShown] = useState(persons);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personsServices.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const nameExists = (personList, name) =>
    personList.some((person) => person.name === name);

  const handleNameSubmission = (event) => {
    event.preventDefault();
    if (nameExists(persons, newName)) {
      // window.alert(`${newName} is already added`);
      updatePerson(newName);
    } else {
      addNewPerson();
    }
  };

  const updatePerson = (name) => {
    if (window.confirm('Do you want to overwrite this number?')) {
      const foundPerson = persons.find((person) => person.name === name);
      const foundPersonID = foundPerson.id;
      const updatedPerson = { ...foundPerson, number: newNumber };

      personsServices
        .update(foundPersonID, updatedPerson)
        .then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id === foundPersonID ? returnedPerson : person
            )
          );
        })
        .catch((error) => {
          setPersons(persons);
          setMessage('fail');
        });
    }
  };

  const addNewPerson = () => {
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    // Axios.post('http://localhost:6001/persons', newPerson).then((response) => {
    //   setPersons(persons.concat(response.data));
    // });
    personsServices.create(newPerson).then((returnedPersons) => {
      setPersons(persons.concat(returnedPersons));
      setMessage('success');
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    });
    setNewName('');
    setNewNumber('');
  };

  const handleNameSearch = (event) => {
    const nameToSearch = event.target.value;

    setNameSearch(nameToSearch);
    const personsToShow = persons.filter((person) =>
      person.name.toLowerCase().includes(nameToSearch.toLowerCase())
    );
    setPersonsShown(personsToShow);
  };

  const filterPersons = () => {
    if (nameSearch === '') {
      return persons;
    } else {
      return persons.filter((person) =>
        person.name.toLowerCase().includes(nameSearch.toLowerCase())
      );
    }
  };

  const handleDelete = (personId) => {
    if (window.confirm('Do you want to delete this record?')) {
      personsServices.deletePerson(personId).then(() => {
        const newList = persons.filter((person) => person.id !== personId);
        setPersons(newList);
      });
    }
  };

  const Notification = ({ message }) => {
    if (message === 'success') {
      return (
        <div className="success">
          You have successfully added to the phonebook
        </div>
      );
    }

    if (message === 'fail') {
      return (
        <div className="fail">
          {newName} has already been removed from the server
        </div>
      );
    } else {
      return null;
    }
  };
  return (
    <div>
      <Notification message={message} />
      <h1>Phonebook</h1>
      <Filter nameSearch={nameSearch} handleNameSearch={handleNameSearch} />
      <PersonForm
        handleNameSubmission={handleNameSubmission}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <PersonList list={filterPersons()} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
