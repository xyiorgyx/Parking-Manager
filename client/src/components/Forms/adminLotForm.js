import React, { useState } from 'react';

function lotForm() {
  // Here we set two state variables for firstName and lastName using `useState`
  const [lotName, setLotName] = useState('');
  const [lotSpaces, setLotSpaces] = useState('');

  const handleInputChange = (e) => {
    // Getting the value and name of the input which triggered the change
    const { name, value } = e.target;

    // Ternary statement that will call either setFirstName or setLastName based on what field the user is typing in
    return name === 'firstName' ? setFirstName(value) : setLastName(value);
  };

  const handleFormSubmit = (e) => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    e.preventDefault();

    // Alert the user their first and last name, clear the inputs
    alert(`Hello ${firstName} ${lastName}`);
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