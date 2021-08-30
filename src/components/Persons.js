import React from 'react';

const Persons = ({ persons, remove }) => {
  return (
    <>
      {persons.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}{' '}
          <button onClick={() => remove(person.id)}>delete</button>
        </div>
      ))}
    </>
  );
};

export default Persons;
