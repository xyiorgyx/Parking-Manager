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
    <>
      <main className="bg-gray-50 dark:bg-gray-900 p-6  ">
        <form
          onSubmit={handleFormSubmit}
          action="#"
          className="p-6 max-w-lg flex flex-col  mx-auto md:h-screen lg:py-0"
        >
          <div className="bg-gray-200  ">
            <h2 className="p-6 text-center">Vehicle Information</h2>
            <div className=" border p-6">
              <div className="">
                <div className="w-full md:w-1/2 px-4 mb-2 md:mb-0">
                  <label className="block uppercase tracking-wide  text-xs font-bold mb-2">
                    Car Model
                  </label>
                  <input
                    value={formState.model}
                    name="model"
                    onChange={handleChange}
                    type="text"
                    placeholder="Car Model"
                    className="appearance-none block w-full bg-black text-gray-700 border border-gray-900 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    required=""
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3">
                  Car Make
                </label>
                <input
                  value={formState.make}
                  name="make"
                  onChange={handleChange}
                  type="text"
                  placeholder="Car Make"
                  className="appearance-none block w-full bg-black text-gray-700 border border-gray-900 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  required=""
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3">
                  Car Color
                </label>

                <input
                  value={formState.color}
                  name="color"
                  onChange={handleChange}
                  type="text"
                  placeholder="Car Color"
                  className="appearance-none block w-full bg-black text-gray-700 border border-gray-900 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  required=""
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3">
                  License Number
                </label>
                <input
                  value={formState.license_plate}
                  name="license_plate"
                  onChange={handleChange}
                  type="text"
                  placeholder="Car License"
                  required=""
                  className="appearance-none block w-full bg-black text-gray-700 border border-gray-900 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 ">
                <button
                  type="submit"
                  className="appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </>
  );
}

export default CarForm;