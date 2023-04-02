import React, { useState } from 'react';

function lotForm() {
  // Here we set two state variables for firstName and lastName using `useState`
  const [lotName, setLotName] = useState('');
  const [lotSpaces, setLotSpaces] = useState('');

  const handleFormSubmit = (e) => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    e.preventDefault();


    setLotName('');
    setLotSpaces('');
  };

  return (
    <div>
      <p>
        Hello {firstName} {lastName}
      </p>
      <form className="form">
        <input
          value={lotName}
          name="lotName"
          onChange={handleInputChange}
          type="text"
          placeholder="Lot Name"
        />
        <input
          value={lotSpaces}
          name="lotSpaces"
          onChange={handleInputChange}
          type="integer"
          placeholder="Lot Spaces"
        />
        <button type="button" onClick={handleFormSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default lotForm;