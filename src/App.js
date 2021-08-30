import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationStyle, setNotificationStyle] = useState({});

  const isFiltered = (person) =>
    person.name.toLowerCase().includes(filter.toLowerCase());

  const filteredPersons = persons.filter(isFiltered);

  const getPersons = () => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  };

  useEffect(getPersons, []);

  const handlePersonSubmit = (event) => {
    event.preventDefault();

    const addedPerson = persons.find((person) => person.name === newName);
    const newPersonObject = {
      name: newName,
      number: newNumber,
    };

    if (
      addedPerson &&
      window.confirm(
        `${addedPerson.name} is already added to phonebook, replace the old number with new one?`
      )
    ) {
      updatePerson(addedPerson, newPersonObject);
    } else if (!addedPerson) {
      addPerson(newPersonObject);
    }
  };

  const addPerson = (person) => {
    personService
      .create(person)
      .then((newPerson) => {
        setPersons(persons.concat(newPerson));
        setNewName('');
        setNewNumber('');

        const message = `Added ${newPerson.name}`;
        handleNotification(message, 'green');
      })
      .catch((error) => {
        handleNotification(error.response.data.error, 'red');
      });
  };

  const updatePerson = (oldPerson, newPerson) => {
    personService
      .update(oldPerson.id, newPerson)
      .then((updatedPerson) =>
        setPersons(
          persons.map((person) =>
            person.id !== oldPerson.id ? person : updatedPerson
          )
        )
      )
      .catch((error) => {
        handleNotification(error.response.data.error, 'red');
      });
  };

  const removePerson = (id) => {
    if (
      window.confirm(
        `Delete ${persons.find((person) => person.id === id).name}?`
      )
    ) {
      personService
        .remove(id)
        .then(() => setPersons(persons.filter((n) => n.id !== id)));
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleNotification = (message, color) => {
    setNotificationMessage(message);
    setNotificationStyle({
      color,
    });
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} style={notificationStyle} />

      <Filter value={filter} onChange={handleFilterChange} />

      <h3>Add new</h3>

      <PersonForm
        handleSubmit={handlePersonSubmit}
        personName={newName}
        personNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons persons={filteredPersons} remove={removePerson} />
    </div>
  );
};

export default App;
