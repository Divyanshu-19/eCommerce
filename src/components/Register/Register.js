import './Register.css';
import React, {useState} from 'react'
import { useUserData } from '../../context/dataContext';
import { useLocation, useNavigate, Link, Navigate } from "react-router-dom";
import axios from 'axios';

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { userState, dispatch } = useUserData();
    const navigate = useNavigate();
    
    async function handleOnClick(){
        if(password==="" || confirmPassword==="" || email==="" || address===""){
            setErrorMessage("Field cannot be left empty")
            setTimeout(() => setErrorMessage(""),5000);
            return;
        }
        if(password===confirmPassword){
            const {data: {success}} = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/`,{
                emailId: email,
                password: password
            });
            if(success===true){
                dispatch({type:"changeLogin"});
                navigate("/products") 
            }
            else{
                setErrorMessage("Either the email already exist or there is some problem in the server. Please try again later.")
                setTimeout(() => setErrorMessage(""),5000);
            }
        }
        else{
            setErrorMessage("Password and Confirm Password do not match")
            setTimeout(() => setErrorMessage(""),5000);
        }
        
        
    }

    return (
        <div className="center">
            <h1>SignUp</h1>
            <div className="form">
                <div className="txt_field">
                    <input type="text" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    <span></span>
                    <label>Email</label>
                </div>
                <div className="txt_field">
                    <input type="text" required value={address} onChange={(e) => setAddress(e.target.value)} />
                    <span></span>
                    <label>Address</label>
                </div>
                <div className="txt_field">
                    <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    <span></span>
                    <label>Password</label>
                </div>
                <div className="txt_field">
                    <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    <span></span>
                    <label>Confirm Password</label>
                </div>

                <button className="login-btn" onClick={handleOnClick}>Register</button>

                <div className="signup_link">Already Regsiterd? <Link to="/login">Login</Link></div>
                <h4 style={{color: 'red'}}>{errorMessage}</h4>
            </div>
        </div>
        
    )
}

export default Register
