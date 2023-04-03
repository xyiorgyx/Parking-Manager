import React, { useState, useEffect } from 'react';
import Auth from '../utils/Auth';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import { Navigate, useParams } from 'react-router-dom';

function UserProfilePage() {
  const { loading, data } = useQuery(QUERY_USER)

  const userData = data?.user || {}

  // useEffect(() => {
  //   if (Auth.loggedIn()) {
  //     const userProfile = Auth.getProfile();
  //     setUser(userProfile);
  //   } else {
  //     window.location.href = '/login';
  //   }
  // }, []);






  if (loading) return <p>Loading...</p>;


  return (
    <div>
      {userData ? (
        <div>
          <h1>Welcome {userData.username}!</h1>
          <p>Email: {userData.email}</p>
          {/* Display other user details here */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default UserProfilePage;