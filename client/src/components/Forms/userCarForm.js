import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from 'react-router-dom';
import { ADD_USER_CAR } from "../../utils/mutations";
import { QUERY_USER } from "../../utils/queries";
import { Auth } from "../../utils/Auth";

function carForm() {

  const [formState, setFormState] = useState({
    license_plate: "",
    make: "",
    model: "",
    color: "",
  });

  const [addUserCar, { error }] = useMutation(ADD_USER_CAR, {
    update(cache, { data: { addUserCar } }) {
      try {
        const { newCar } = cache.readQuery({
          query: QUERY_USER,
        });
        cache.writeQuery({
          query: QUERY_USER,
          data: { user: { cars: [addUserCar, ...newCar] } },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await addUserCar({
        variables: {
          ...formState,
          owner: Auth.getProfile().data.username,
        },
      });

      setFormState({
        license_plate: "",
        make: "",
        model: "",
        color: "",
      });
    } catch (err) {
      console.error(err);
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({ ...formState, [name]: value });
    setOwner({ value });
  };

  return (
    <div>
      {Auth.loggedIn() ? (
        <form class="m-10 w-1/2 bg-transparent" onSubmit={handleFormSubmit}>
          <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="floating_Car_Model"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="Car's make"
              required
              onChange={handleChange}
              value={formState.make}
            />
            <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              {" "}
              Make
            </label>
          </div>
          </div>
          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="floating_last_name"
                id="floating_last_name"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder="Car's model"
                required
                onChange={handleChange}
                value={formState.model}
              />
              <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Model
              </label>
            </div>
          </div>
          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 w-full mb-6 group">
              <input
                type="tel"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                name="floating_phone"
                id="floating_phone"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder="Car's color "
                required
                onChange={handleChange}
                value={formState.color}
              />
              <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                {" "}
                Color
              </label>
            </div>
          </div>
          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="floating_company"
                id="floating_company"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder="Car's license plate "
                required
                onChange={handleChange}
                value={formState.license_plate}
              />
              <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                {" "}
                License Plate
              </label>
            </div>
          </div>
          <div>
            <button
              type="submit"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add Car
            </button>
          </div>
          {error && <div>{error.message}</div>}
        </form>
      ) : (
        <p>
          You need to be logged in to add a car to your profile. Please
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default carForm;
