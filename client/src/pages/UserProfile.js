import {React,useState} from "react";
import Auth from "../utils/Auth";
import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_ME, QUERY_CARS } from "../utils/queries";
import { Navigate, useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Link } from 'react-router-dom';
import { DELETE_USER_CAR } from "../utils/mutations";

const  UserProfilePage = () => {

  const { loading, data } = useQuery(QUERY_ME);
  
  const userData = data?.me ||  {};

  
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

const handleDeleteCar =async (carId) => {
  try{
    const {data} = await deleteUserCar({
      variables: { carId },
    });
  } catch (err) {
    console.error(err);
  }
  
}





console.log(userData);


  return (
    <main className="bg-gray-50 dark:bg-gray-900 p-6">
       
      <div>
      {userData ? (
        <div className="">
          <div className="container p-3 mx-auto flex flex-col   lg:px-40">
            <div className="">
              <h1 className=" font-bold text-center text-white uppercase ">
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
              <section className="p-6">
            
                {/* User Infomation */}
                <h1 className="text-center p-2 text-blue-500 font-bold uppercase">Basic Info 
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
                <div className=" w-full bg-white  mx-auto rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 text-center">
                  
                  <dl className="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                    <div className="flex flex-col pb-3">
                      <dt className="mb-1 text-gray-500 md:text-lg dark:text-white">
                        Email address
                      </dt>
                      <dd className="text-lg dark:text-gray-400 font-semibold">{userData.email}</dd>
                    </div>
                    <div className="flex flex-col py-3">
                      <dt className="mb-1 text-gray-500 md:text-lg dark:text-white">
                        User Name
                      </dt>
                      <dd className="text-lg dark:text-gray-400 font-semibold">{userData.username}</dd>
                    </div>
                    <div className="flex flex-col pt-3">
                      <dt className="mb-1 text-gray-500 md:text-lg dark:text-white">
                        Phone number
                      </dt>
                      <dd className="text-lg dark:text-gray-400 font-semibold">
                        {userData.phoneNumber}
                      </dd>
                    </div>
                  </dl>
                </div>
                </section>
                {/* Vehicle Info  */}
                <h2 className="text-center font-bold text-xl text-blue-500 p-6">Vehicle Info
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
                <section className="flex flex-row">
                {userData.cars.map(car => (
                <div key={car._id} className="  bg-white mx-auto  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700  text-center">
          
                  <dl className="max-w-md  text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                    <div className="flex flex-col pb-3">
                      <dt className="mb-1 px-10 text-gray-500 md:text-lg dark:text-white">
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

                    <div className=''>
          {Auth.loggedIn() ? (
              <button className="btn btn-lg btn-light  m-2 ">
                <Link to="/updateCar"> Update Car</Link>
              </button>
          ) : (
            <div></div>
          )}
        </div>

                    
                    <button className="btn border p-2 bg-red-500 btn-lg btn-light  text-xs font-bold text-center rounded-lg  uppercase text-white m-2" onClick={() => handleDeleteCar(car._id)}>Delete</button>

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
