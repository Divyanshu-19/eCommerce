import React from 'react'
import { Navigate } from "react-router-dom";
import { useUserData } from '../context/dataContext';
import { useLocation, useNavigate } from "react-router-dom";

function Login() {
    const { userState, dispatch } = useUserData();
    const {state} = useLocation();
    const navigate = useNavigate();
    console.log(userState.login);
    console.log(state);
    function handleOnClick(){
        dispatch({type:"changeLogin"});
        navigate(state.from);
    }

    return (
        <div>
            Login
            <button onClick={handleOnClick}>click to login</button>
        </div>
    )
}

export default Login
