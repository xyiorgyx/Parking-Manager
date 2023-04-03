import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER_CAR } from "../../utils/mutations";
import { QUERY_USER } from "../../utils/queries";
import Auth from "../../utils/Auth";

function CarForm() {
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
          owner: Auth.getProfile(data.username),
        },
      });

      setFormState({
        ...formState,
        license_plate: "",
        make: "",
        model: "",
        color: "",
      });

      window.location.replace("/me");
    } catch (err) {
      console.error(err);
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({ ...formState, [name]: value });
  };

  return (
    <div>
      {Auth.loggedIn() ? (
        <form
          onSubmit={handleFormSubmit}
          action="#"
          className=" max-w-lg flex flex-col mx-auto md:h-screen lg:py-0 p-6"
        >
          <h2 className="p-6 text-white">Vehicle Information</h2>
          <div className=" border p-6">
            <div className="w-full md:w-1/2 px-4 mb-2 md:mb-0">
              <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
                Car Model
              </label>
              <input
                value={formState.model}
                name="carModel"
                onChange={handleChange}
                type="text"
                placeholder="Car Model"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3">
              Car Make
            </label>
            <input
              value={formState.make}
              name="carMake"
              onChange={handleChange}
              type="text"
              placeholder="Car Make"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3">
              Car Color
            </label>

            <input
              value={formState.color}
              name="carColor"
              onChange={handleChange}
              type="text"
              placeholder="Car Color"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3">
              License Number
            </label>
            <input
              value={formState.license_plate}
              name="carLicense"
              onChange={handleChange}
              type="text"
              placeholder="Car License"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 p-6">
            <button
              type="submit"
              placeholder="Car License"
              className="appearance-none block w-full  bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              Submit
            </button>
          </div>
          {error && (
            <div className="col-12 my-3 bg-danger text-white p-3">
              {error.message}
            </div>
          )}
        </form>
      ) : (
        <p>
          You need to be logged in to share your thoughts. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
}

export default CarForm;
