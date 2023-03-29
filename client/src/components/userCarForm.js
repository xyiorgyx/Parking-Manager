import React, { useState } from 'react';
import { license_plate, make, model, color } from "../../../server/schemas"

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
    <>
    
      <form class="w-full max-w-lg">
        <div class="flex flex-wrap  w-full ">
          <div class="w-full md:w-1/2 px-4 mb-2 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
              Car Model
            </label>
            <input
              value={model}
              name="carModel"
              onChange={handleInputChange}
              type="text"
              placeholder="Car Model"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" />
          </div>
        </div>
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3" for="grid-city">
          Car Make
        </label>
        <input value={make}
          name="carMake"
          onChange={handleInputChange}
          type="text"
          placeholder="Car Make"
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
      </div>
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3" for="grid-zip">
          Car Color
        </label>

        <input value={color}
          name="carColor"
          onChange={handleInputChange}
          type="text" placeholder="Car Color"
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
      </div>
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3" for="grid-zip">
          License Number
        </label>
        <input value={license_plate} name="carLicense" onChange={handleInputChange} type="text" placeholder="Car License"
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
      </div>
    </form>
    </>
  );
}

export default carForm;
