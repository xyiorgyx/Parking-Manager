import React, { useState, useEffect } from "react";
import Auth from "../utils/Auth";
import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import { Navigate, useParams } from "react-router-dom";
import UserCarForm from "../components/Forms/userCarForm";

function UserProfilePage() {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(QUERY_USER, QUERY_ME, {
   variables: {username: userParam},
  });

  const userData = data?.user || data?.me || {};
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

 if (loading) return <p>Loading...</p>;

 
 if (!userData?.username) {
  return (
    <h4>
      You need to be logged in to see this. Use the navigation links above to
      sign up or log in!
    </h4>
  );
}

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-6">
      {userData ? (
        <div className="mx-auto md:h-screen lg:py-0">
          <div className="container bg-gray-500  mx-auto  lg:px-40">
            <div className="">
              <h1 className=" font-bold text-center text-white uppercase ">
                Welcome {userData.name}!
              </h1>
              <section className="p-6">
              {/* <UserCarForm  /> */}
                {/* User Infomation */}
                <h1 className="text-center p-2 text-white uppercase">Basic Info</h1>
                <div className=" border invisible w-full mx-auto md:w-1/2 px-3 mb-6 md:mb-0 p-2 text-center">
                  
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
                <div className=" border invisible w-full mx-auto md:w-1/2 px-3 mb-6 md:mb-0 p-2 text-center">
          
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
              </section>
              <div></div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default UserProfilePage;