import React, { useState } from 'react';
import {license_plate, make, model, color} from ""

function carForm() {
  // Here we set four state variables for carmodel, carmake,carlicense, and carcolor using `useState`
  const [model, setCarModel] = useState('');
  const [make, setCarMake] = useState('');
  const [license_plate, setCarLicensePlate] = useState('');
  const [color, setCarColor] = useState('');

  const handleInputChange = (e) => {
    // Getting the value and name of the input which triggered the change
    const { model, value } = e.target;

    // Ternary statement that will call either setFirstName or setLastName based on what field the user is typing in
    // return name === 'firstName' ? setFirstName(value) : setLastName(value);
  };

  const handleFormSubmit = (e) => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    e.preventDefault();

    // Alert the user their first and last name, clear the inputs
    alert(`Hello ${firstName} ${lastName}`);
    setCarModel('');
    setCarMake('');
    setcarLicense('');
    setCarColor('');
  };

  return (
    <div>
      <p>
        Hello {firstName} {lastName}
      </p>
      <form className="form">
        <input
          value={carModel}
          name="carModel"
          onChange={handleInputChange}
          type="text"
          placeholder="Car Model"
        />
        <input
          value={carMake}
          name="carMake"
          onChange={handleInputChange}
          type="text"
          placeholder="Car Make"
        />
         <input
          value={carLicense}
          name="carLicense"
          onChange={handleInputChange}
          type="text"
          placeholder="Car License"
        />
        <input
          value={carColor}
          name="carColor"
          onChange={handleInputChange}
          type="text"
          placeholder="Car Color"
        />
        <button type="button" onClick={handleFormSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default carForm;
