import React from 'react';
import { Route, Navigate } from "react-router-dom";
import { useUserData } from "../context/dataContext";

function PrivateRoute({element, path, ...props}) {
    const {userState} = useUserData();
    return userState.login?<Route element={element} {...props} />:<Navigate state={{from:path}} replace to="/login" />;
}

export default PrivateRoute
