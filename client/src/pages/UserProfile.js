import { React, useState } from "react";
import Auth from "../utils/Auth";
import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_ME, QUERY_CARS } from "../utils/queries";
import { Navigate, useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Link } from 'react-router-dom';
import { DELETE_USER_CAR } from "../utils/mutations";
import background from "../Images/background.jpg"
import texture from "../Images/texture_1.jpg"
const UserProfilePage = () => {

  const { loading, data } = useQuery(QUERY_ME);

  const userData = data?.me || {};


  const [deleteUserCar, { error }] = useMutation(DELETE_USER_CAR, {
    update(cache, { data: { deleteUserCar } }) {
      try {
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: deleteUserCar },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  /*if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }*/

  if (loading) return <p>Loading...</p>;



  if (!userData?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  };

  const handleDeleteCar = async (carId) => {
    try {
      const { data } = await deleteUserCar({
        variables: { carId },
      });
    } catch (err) {
      console.error(err);
    }

  }





  console.log(userData);


  return (
    <div style={{ backgroundImage: `url(${background})` }} className="flex bg-cover bg-center bg-no-repeat place-content-center bg-gray-50 dark:bg-gray-900 p-6 h-fit ">
      {userData ? (
        <div className="w-full md:w-2/3 sm:w-full lg:w-2/5 space-y-4">

          <div style={{ backgroundImage: `url(${texture})` }} className="flex-col  bg-cover pb-3 px-3 place-content-center text-center rounded-lg  bg-white dark:shadow-white dark:border dark:border-white border-2 bg-contain bg-center ">
            <h1 className="dark:bg-black bg-gray-800 px-0 font-bold rounded-lg text-center text-white uppercase ">
              Welcome {userData.name}!
              {/* <div className='p-2'>
          {Auth.loggedIn() ? (
              <button className="btn border p-2 bg-blue-500 btn-lg btn-light  text-sm font-bold text-center  uppercase text-white m-2 ">
                <Link to="/updateInfo"> Update Info</Link>
              </button>
          ) : (
            <div></div>
          )}
        </div> */}
            </h1>
            {/* User Infomation */}
            <h1 className="text-center w-full p-3 text-blue-500 font-bold uppercase">Basic Info
              <div className='p-2'>
                {Auth.loggedIn() ? (
                  <button className="btn border p-2 bg-blue-500 btn-lg btn-light  text-sm font-bold text-center  uppercase text-white m-2 ">
                    <Link to="/updateInfo"> Update Info</Link>
                  </button>
                ) : (
                  <div></div>
                )}
              </div>
            </h1>
            <div className=" flex  flex-col text-center w-full rounded-lg bg-white rounded-lg shadow-lg dark:shadow-white dark:shadow dark:bg-gray-800 dark:border dark:border-white border-2 ">

              <dl className=" text-gray-900 divide-y divide-black dark:text-white dark:divide-white">
                <div className=" pb-3">
                  <dt className="mb-1 text-gray-500 md:text-lg dark:text-white">
                    Email address
                  </dt>
                  <dd className="text-lg dark:text-gray-400 font-semibold">{userData.email}</dd>
                </div>
                <div className=" py-3">
                  <dt className="mb-1 text-gray-500 md:text-lg dark:text-white">
                    User Name
                  </dt>
                  <dd className="text-lg dark:text-gray-400 font-semibold">{userData.username}</dd>
                </div>
                <div className=" pt-3">
                  <dt className="mb-1 text-gray-500 md:text-lg dark:text-white">
                    Phone number
                  </dt>
                  <dd className="text-lg dark:text-gray-400 font-semibold">
                    {userData.phoneNumber}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          {/* Vehicle Info  */}
          <div style={{ backgroundImage: `url(${texture})` }}  className="flex-col p-3 place-content-center text-center rounded-lg bg-gray-800 dark:bg-gray-800 bg-white dark:shadow-white dark:border dark:border-white border-2 bg-cover bg-center bg-no-repeat">
            <h2 className="text-center font-bold text-xl text-blue-500 p-2">Vehicle Info
              <div >
                {Auth.loggedIn() ? (
                  <button className="btn border p-2 bg-blue-500 btn-lg btn-light  text-sm font-bold text-center  uppercase text-white m-2 ">
                    <Link to="/carForm"> Add Car</Link>
                  </button>
                ) : (
                  <div></div>
                )}
              </div>
            </h2>
            <div className="-m-2 flex flex-wrap">
              {userData.cars.map(car => (
                <div key={car._id} className="m-4 w-1/3 p-2  bg-white mx-auto  rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border dark:border-white border-2 dark:shadow-white shadow text-center">

                  <dl className="max-w-md  text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                    <div className=" pb-3">
                      <dt className="mb-1  text-gray-500 md:text-lg dark:text-white">
                        Vehicle Make
                      </dt>
                      <dd className="text-lg  dark:text-gray-400 font-semibold">{car.make}</dd>
                    </div>
                    <div className="flex flex-col py-3">
                      <dt className="mb-1 text-gray-500 md:text-lg dark:text-white">
                        Vehicle Model
                      </dt>
                      <dd className="text-lg  dark:text-gray-400 font-semibold">{car.model}</dd>
                    </div>
                    <div className="flex flex-col pt-3">
                      <dt className="mb-1 text-gray-500 md:text-lg dark:text-white">
                        License Plate
                      </dt>
                      <dd className="text-lg  dark:text-gray-400 font-semibold">
                        {car.license_plate}
                      </dd>
                    </div>

                    <button className="btn border p-2 bg-red-500 btn-lg btn-light  text-xs font-bold text-center rounded-lg  uppercase text-white m-2 " onClick={() => handleDeleteCar(car._id)}>Delete</button>
                  </dl>
                </div>))}
            </div>
          </div>
          <div className="h-400px invisible"></div>
        </div>
        
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );

}

export default UserProfilePage;