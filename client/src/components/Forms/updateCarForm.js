import React, { useReducer, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { reducer } from '../../utils/reducers';
import { useQuery } from '@apollo/client';

import { useAppContext } from '../../utils/GlobalState';
import { UPDATE_CAR} from '../../utils/actions';

/*import { QUERY_CARS } from '../../utils/queries';

function UpdateCar () {
const initialState = useApp();
const [state, dispatch] = useReducer(reducer, initialState);

const handleChange = (event) => {
  dispatch({
    type: UPDATE_CAR,
    value: event.target.value,
  });
}
import React, { useState } from "react";
//import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { UPDATE_USER_CAR } from "../../utils/mutations";
import { QUERY_CARS , QUERY_ME} from "../../utils/queries"
import Auth from "../../utils/Auth";

const UpdateCar = () => {

    const [carState, setCarState] = useState({ 
      license_plate: "",
      make: "",
      model: "",
      color: "",
      owner: Auth.getProfile().data.username,
     });
  
    const [updateUserCar, { error, date }] = useMutation(UPDATE_USER_CAR, {
      update(cache, { data: { updateUserCar } }) {
        try {
          const { cars } = cache.readQuery({
            query: QUERY_CARS,
          });
          console.log({ cars });
          cache.writQuery ({
            query: QUERY_CARS,
            data: { cars: [...cars, updateUserCar]  },
          });
          console.log('hellobro');
          const { me } = cache.readQuery({
            query: QUERY_ME,
          });
          console.log({ me });
          cache.writQuery({
            query: QUERY_ME,
            data: { me: { cars: [...me.cars, updateUserCar] } },
          });
          console.log({cars});
        } catch (e) {
          console.error(e);
        }
      },
    });
 

    const handleChange = (event) => {
        const{ name, value } = event.target;
        setCarState(prevState => ({
            ...prevState, [name]:value
        }));
    };
console.log('hello');

    const handleFormSubmit = async(event)=>
    {
        event.preventDefault();
        try {
            const {data} = await updateUserCar({
                variables: {
                    ...carState
                }
            });
        } catch (e) {
            console.error(e);
          }
          setCarState({
            license_plate: "",
            make: "",
            model: "",
            color: "",
            owner: Auth.getProfile().data.username
          });
        };
console.log('helloworld');
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
                    value={carState.model}
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
                  value={carState.make}
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
                  value={carState.color}
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
                  value={carState.license_plate}
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


export default UpdateCar;
*/