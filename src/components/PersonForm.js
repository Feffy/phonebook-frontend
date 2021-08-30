import React from 'react';

const PersonForm = ({
  handleSubmit,
  personName,
  personNumber,
  handleNameChange,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={personName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={personNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
