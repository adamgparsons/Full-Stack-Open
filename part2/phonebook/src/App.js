import React, { useState } from 'react';
import './App.css';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import PersonList from './components/PersonList';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Adto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [nameSearch, setNameSearch] = useState('');
  const [personsShown, setPersonsShown] = useState(persons);

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const nameExists = (personList, name) =>
    personList.some((person) => person.name === name);

  const handleNameSubmission = (event) => {
    event.preventDefault();
    if (nameExists(persons, newName)) {
      window.alert(`${newName} is already added`);
    } else {
      addNewPerson();
    }
  };

  const addNewPerson = () => {
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    setNewName('');
    setNewNumber('');
    setPersons(persons.concat(newPerson));
  };

  const handleNameSearch = (event) => {
    const nameToSearch = event.target.value;

    setNameSearch(nameToSearch);
    const personsToShow = persons.filter((person) =>
      person.name.toLowerCase().includes(nameToSearch.toLowerCase())
    );
    setPersonsShown(personsToShow);
    console.log('personsShown', personsShown);
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
  return (
    <div>
      <h2>Phonebook</h2>

      <Filter nameSearch={nameSearch} handleNameSearch={handleNameSearch} />
      <PersonForm
        handleNameSubmission={handleNameSubmission}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <PersonList list={filterPersons()} />
    </div>
  );
};

export default App;
