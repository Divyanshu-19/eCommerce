import React from 'react'
import { useUserData } from '../context/dataContext';

import { Link } from "react-router-dom";

function Header(){
    const {userState} = useUserData();
    return (
        <div className="row">
            <div className="navigation strech dark">
                <div className="navigation__left-section ">
        
                    <div>
                        <span className="material-icons">
                            menu
                        </span>
                    </div>
                    <Link to="/products" className="react-link link"><h1>Titleee</h1></Link>
                </div>
                <div className="navigation__right-section">
    
                    <Link to="/wishlist" className="react-link">
                        <span className="badge">
                            <i className="material-icons md-30">favorite_border</i>
                            <span>{userState.wishlist.length?userState.wishlist.length:""}</span>
                        </span>
                    </Link>
            
                    <Link to="/cart" className="react-link">
                        <span className="badge">
                            <i className="material-icons md-30 ">shopping_cart</i>
                            <span>{userState.cart.length?userState.cart.length:""}</span>
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Header;