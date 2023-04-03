import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/Auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className=" bg-info bg-gray-700 dark:bg-gray-700 text-dark  p-3 display-flex align-center">
        <Link className=" ltr flex items-center mb-1 text-2xl font-semibold text-gray-900  dark:text-white " to="/">
            <img class="w-8 h-8 mr-0 " src="https://seeklogo.com/images/T/traffic-signs-logo-7823141A70-seeklogo.com.png" alt="logo" />
            arking Manager
            <hr className="block  h-0.5 mx-auto my-5 bg-[#370043] border-[#370043]"></hr>
        </Link>
        <p className="m-0" style={{ fontSize: '1.75rem', fontWeight: '700' }}>
         
        </p>
        <div className='align-end'>
          {Auth.loggedIn() ? (
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
          ) : (
            <div></div>
          )}
        </div>
    </header>
  );
};

export default Header;