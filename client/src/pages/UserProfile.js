import React, { useState, useEffect } from 'react';
import Auth from '../utils/Auth';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import { Navigate, useParams } from 'react-router-dom';

function UserProfilePage() {
  useEffect(() => {
    if (Auth.loggedIn()) {
      const userProfile = Auth.getProfile();
      setUser(userProfile);
    } else {
      window.location.href = '/login';
    }
  }, []);
  const { username } = useParams();
  const { loading, error, data } = useQuery(QUERY_USER, {
    variables: { username },
  });
  console.log(error);
  const [user, setUser] = useState({});
  const profile = data?.me || data?.profile || {};
  


  if (loading) return <p>Loading...</p>;
  if(data){
    user=data.user;
  }

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome {user?.name}!</h1>
          <p>Email: {user?.email}</p>
          {/* Display other user details here */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default UserProfilePage;