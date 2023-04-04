
import Auth from '../../utils/Auth';
import Login from '../../pages/Login';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className=" bg-info bg-gray-700 dark:bg-gray-700 text-dark flex items-end p-3">
        <Link className=" ltr flex mb-1 text-2xl font-semibold text-gray-900  dark:text-white " to="/">
            <img class="w-8 h-8 mr-0 " src="https://seeklogo.com/images/T/traffic-signs-logo-7823141A70-seeklogo.com.png" alt="logo" />
            arking Manager
            <hr className="block  h-0.5 mx-auto my-5 bg-[#370043] border-[#370043]"></hr>
        </Link>
        <p className="m-0" style={{ fontSize: '1.75rem', fontWeight: '700' }}>
         
        </p>
        <div className='flex flex-row p-1'>
          {Auth.loggedIn() ? (
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full" onClick={logout}>
                Logout
              </button>
          ) : (
            <div></div>
          )}
        </div>
        <div className='flex flex-row p-1'>
          {Auth.loggedIn() ? (
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
                <Link to="/me"> Profile</Link>
              </button>
          ) : (
            <div></div>
          )}
        </div>
    </header>
  );
};

export default Header;