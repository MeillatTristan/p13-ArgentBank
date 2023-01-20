import React from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { loginUser } from '../store/actions/userAction';

function Logout(props) {
  const dispatch = useDispatch();
  dispatch(loginUser({
    "token": false,
    "createdAt": false,
    "email": false,
    "firstName": false,
    "id": false,
    "lastName": false,
    "updatedAt": false,
  }));
  localStorage.removeItem('token');
  return <Navigate to="/" /> 
}

export default Logout;