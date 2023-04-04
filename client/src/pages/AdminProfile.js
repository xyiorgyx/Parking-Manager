import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import Auth from '../utils/Auth';
import Lotcards from '../components/lotCards';

const Profile = () => {
  const { profileId } = useParams();

  const { loading, data } = useQuery(
    profileId ? QUERY_USER : QUERY_ME,
    {
      variables: { profileId: profileId },
    }
  );

  const userData = data?.me || data?.user || {};

  if (Auth.loggedIn() && Auth.getProfile().data._id === profileId) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-6">
      {userData ? (
        <div>
          <h2>{userData.name}'s Profile</h2>
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

                    <dl class="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                      <div class="flex flex-col pb-3">
                        <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                          Email address
                        </dt>
                        <dd class="text-lg font-semibold">{userData.email}</dd>
                      </div>
                      <div class="flex flex-col py-3">
                        <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                          User Name
                        </dt>
                        <dd class="text-lg font-semibold">{userData.username}</dd>
                      </div>
                      <div class="flex flex-col pt-3">
                        <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                          Phone number
                        </dt>
                        <dd class="text-lg font-semibold">
                          {userData.phoneNumber}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </section>
              </div>
            </div>
          </div>
          <Lotcards /> {/* Use the Lotcards component */}
        </div>
      ) : (
        <h4>
          You need to be logged in to see your profile page. Use the navigation
          links above to sign up or log in!
        </h4>
      )
      }
    </div>
  );

}
export default Profile;