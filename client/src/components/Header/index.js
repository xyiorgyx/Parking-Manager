import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/Auth';


const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className=" bg-info bg-gradient-to-t from-gray-700 to-neutral-900 text-white  flex  p-3">
        <Link className=" ltr flex mb-1 text-2xl font-semibold text-gray-900  dark:text-white " to="/">
            <img className="w-8 h-8 mr-0 " src="https://seeklogo.com/images/T/traffic-signs-logo-7823141A70-seeklogo.com.png" alt="logo" />
            <h1 className="text-white">arking Manager</h1>
            
            <hr className="block  h-0.5 mx-auto my-5 bg-[#370043] border-[#370043]"></hr>
        </Link>
        <p className="m-0" style={{ fontSize: '1.75rem', fontWeight: '700' }}>
         
        </p>
        <div className=' p-1'>
          {Auth.loggedIn() ? (
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full" onClick={logout}>
                Logout
              </button>
          ) : (
            <div></div>
          )}
        </div>
        <div className=' p-1'>
          {Auth.loggedIn() ? (
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
                <Link to="/me"> Profile</Link>
              </button>
          ) : (
            <div></div>
          )}
        </div>
        <div className=' p-1'>
          {Auth.loggedIn() ? (
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
                <Link to="/lotcards"> View Lot</Link>
              </button>
          ) : (
            <div></div>
          )}
        </div>
    </header>
  );
};

export default Header;