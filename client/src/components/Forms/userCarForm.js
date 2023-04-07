import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER_CAR } from "../../utils/mutations";
import { QUERY_CARS } from "../../utils/queries";
import Auth from "../../utils/Auth";
import { QUERY_ME } from "../../utils/queries";
import background from "../../Images/car_background.jpg"
import texture from "../../Images/texture_1.jpg"
const CarForm = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    license_plate: "",
    make: "",
    model: "",
    color: "",
    owner: Auth.getProfile().data.username,
  });
  const [addUserCar, { error, date }] = useMutation(ADD_USER_CAR, {
    update(cache, { data: { addUserCar } }) {
      try {
        const { me } = cache.readQuery({
          query: QUERY_ME,
        });
        console.log({ me });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { cars: [...me.cars, addUserCar] } },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({ ...formState, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUserCar({
        variables: {
          ...formState,
        },
      });
    } catch (e) {
      console.error(e);
    }
    setFormState({
      license_plate: "",
      make: "",
      model: "",
      color: "",
      owner: Auth.getProfile().data.username,
    });
    navigate('/me');
  };
  console.log(formState);
  return (
    <>
      <div style={{ backgroundImage: `url(${background})` }}  className="flex flex-col bg-gray-50 dark:bg-gray-900  h-screen bg-cover bg-center text-white content-center py-6">
      
        <form
          onSubmit={handleFormSubmit}
          action="#"
          className="flex w-full md:w-2/3 sm:w-full lg:w-2/5  flex-col p-3 rounded-lg bg-gray-800 dark:bg-gray-800 bg-white dark:shadow-white dark:border dark:border-white border-2 bg-cover bg-center bg-no-repeat text-center "
          style={{ backgroundImage: `url(${texture})` }}
        >
          <h2 className="p-6 text-center text-xl text-blue-500 font-bold uppercase">Vehicle Information</h2>
          <div className="flex place-content-center  w-full">
            {/* <h2 className="p-6 text-center">Vehicle Information</h2> */}
            <div className="flex-col place-content-center text-center w-full">
              <div className="">
                <div className="">
                  <label className="block uppercase tracking-wide  text-xs font-bold mb-2">
                    Car Model
                  </label>
                  <input
                    value={formState.model}
                    name="model"
                    onChange={handleChange}
                    type="text"
                    placeholder="Car Model"
                    className="appearance-none block w-full   border border-gray-900 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    required=""
                  />
                </div>
              </div>
              <div className="">
                <label className="block uppercase tracking-wide  text-xs font-bold mb-3">
                  Car Make
                </label>
                <input
                  value={formState.make}
                  name="make"
                  onChange={handleChange}
                  type="text"
                  placeholder="Car Make"
                  className="appearance-none block w-full   border border-gray-900 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  required=""
                />
              </div>
              <div className="">
                <label className="block uppercase tracking-wide  text-xs font-bold mb-3">
                  Car Color
                </label>

                <input
                  value={formState.color}
                  name="color"
                  onChange={handleChange}
                  type="text"
                  placeholder="Car Color"
                  className="appearance-none block w-full   border border-gray-900 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  required=""
                />
              </div>
              <div className="">
                <label className="block uppercase tracking-wide  text-xs font-bold mb-3">
                  License Number
                </label>
                <input
                  value={formState.license_plate}
                  name="license_plate"
                  onChange={handleChange}
                  type="text"
                  placeholder="Car License"
                  required=""
                  className="appearance-none block w-full   border border-gray-900 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 ">
                <button
                  type="submit"
                  className="btn border p-2 bg-blue-500 btn-lg btn-light  text-xs font-bold text-center rounded-lg  uppercase text-white m-2"
                >
                  Submit
                </button>
              </div>
            </div>
            
          </div>
        </form>
        <div className="h-400px invisible"></div>
        <div className="h-400px invisible"></div>
        <div className="h-400px invisible"></div>
        <div className="h-400px invisible"></div>
        <div className="h-400px invisible"></div>
      </div>
    </>
  );
};

export default CarForm;