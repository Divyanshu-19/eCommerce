import './Login.css';
import React, {useState} from 'react'
// import { Navigate } from "react-router-dom";
import { useUserData } from '../../context/dataContext';
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { userState, dispatch } = useUserData();
    const {state} = useLocation();
    const navigate = useNavigate();


    async function handleOnClick(){
        console.log(email, password, process.env.REACT_APP_BACKEND_URL);
        try {
            const { data: {data} } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/`);
            const response = data.find(credential => credential.emailId===email && credential.password === password);
            if(response){
                dispatch({type:"changeLogin"});
                navigate(state.from);
            }
            else{
                setErrorMessage("The Email Or Password Is Wrong Please Try Again");
                setTimeout(() => setErrorMessage(""), 5000);
            }
            
        } catch (error) {
            console.error(error);
        }
        
    }

    return (
        <div className="center">
            <h1>Login</h1>
            <div className="form">
                <div className="txt_field">
                    <input type="text" required value={email} onChange={e => setEmail(e.target.value)} />
                    <span></span>
                    <label>Email</label>
                </div>
                <div className="txt_field">
                    <input type="password" required value={password} onChange={e => setPassword(e.target.value)}/>
                    <span></span>
                    <label>Password</label>
                </div>
                <button className="login-btn" onClick={handleOnClick}>Login</button>
                <div className="signup_link">Not a member? <Link to="/register">Signup</Link></div>
                <div>for testing use email: admin@gmail.com, password: admin</div><br />
                <h4 style={{color: 'red'}}>{errorMessage}</h4>
            </div>
            
        </div>
        
    )
}

export default Login
