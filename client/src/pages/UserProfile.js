import React from "react";
import Auth from "../utils/Auth";
import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_ME, QUERY_CARS } from "../utils/queries";
import { Navigate, useParams } from "react-router-dom";

import { Link } from 'react-router-dom';

const  UserProfilePage = () => {

  const { loading, data } = useQuery(QUERY_ME);

  const userData = data?.me ||  {};
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





console.log(userData);


  return (
    <main className="bg-gray-50 dark:bg-gray-900 p-6">
         <div >
          {Auth.loggedIn() ? (
              <button className="btn btn-lg btn-light  m-2 ">
                <Link to="/carForm"> Add Car</Link>
              </button>
          ) : (
            <div></div>
          )}
        </div>
        <div className=''>
          {Auth.loggedIn() ? (
              <button className="btn btn-lg btn-light  m-2 ">
                <Link to="/updateInfo"> Update Info</Link>
              </button>
          ) : (
            <div></div>
          )}
        </div>
      <div>
      {userData ? (
        <div className="mx-auto md:h-screen lg:py-0">
          <div className="container  mx-auto  lg:px-40">
            <div className="">
              <h1 className=" font-bold text-center text-white uppercase ">
                Welcome {userData.name}!
              </h1>
              <section className="p-6">
            
                {/* User Infomation */}
                <h1 className="text-center p-2 text-white uppercase">Basic Info</h1>
                <div className=" w-full bg-white  mx-auto rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 text-center">
                  
                  <dl className="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                    <div className="flex flex-col pb-3">
                      <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                        Email address
                      </dt>
                      <dd className="text-lg font-semibold">{userData.email}</dd>
                    </div>
                    <div className="flex flex-col py-3">
                      <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                        User Name
                      </dt>
                      <dd className="text-lg font-semibold">{userData.username}</dd>
                    </div>
                    <div className="flex flex-col pt-3">
                      <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                        Phone number
                      </dt>
                      <dd className="text-lg font-semibold">
                        {userData.phoneNumber}
                      </dd>
                    </div>
                  </dl>
                </div>
                <h2 className="text-center text-white p-6">Vehicle Info</h2>
                {userData.cars.map(car => (
                <div key={car._id} className=" w-full bg-white  mx-auto rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700  text-center">
          
                  <dl className="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                    <div className="flex flex-col pb-3">
                      <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                        Vehicle Make
                      </dt>
                      <dd className="text-lg font-semibold">{car.make}</dd>
                    </div>
                    <div className="flex flex-col py-3">
                      <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                        Vehicle Model
                      </dt>
                      <dd className="text-lg font-semibold">{car.model}</dd>
                    </div>
                    <div className="flex flex-col pt-3">
                      <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                        License Plate
                      </dt>
                      <dd className="text-lg font-semibold">
                        {car.license_plate}
                      </dd>
                    </div>
                    <div className=''>
          {Auth.loggedIn() ? (
              <button className="btn btn-lg btn-light  m-2 ">
                <Link to="/updateCar"> Update Car</Link>
              </button>
          ) : (
            <div></div>
          )}
        </div>
                  </dl>
                </div>))}
              </section>
              <div></div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </main>
  );

}

export default UserProfilePage;