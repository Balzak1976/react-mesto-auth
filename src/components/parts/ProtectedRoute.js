import React from 'react';
import { Navigate } from "react-router-dom";
import { ROOT_URL } from '../../utils/settings';

const ProtectedRouteElement = ({ component: Component, ...props  }) => {
  return (
    props.loggedIn ? <Component {...props} /> : <Navigate to={`${ROOT_URL}sign-in`} replace/>
)}

export default ProtectedRouteElement;