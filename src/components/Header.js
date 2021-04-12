import React from 'react'
import { useUserData } from '../context/dataContext';

export function Header({route, setRoute}){
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
                    <div onClick={() => setRoute("products")}><h1>Titleee</h1></div>
                </div>
                <div className="navigation__right-section  ">
                    <div onClick={() => setRoute("wishlist")}>
                        <span className="badge">
                            <i className="material-icons md-30">favorite_border</i>
                            <span>{userState.wishlist.length?userState.wishlist.length:""}</span>
                        </span>
                    </div>
                    <div onClick={() => setRoute("cart")}>
                        <span className="badge">
                            <i className="material-icons md-30 ">shopping_cart</i>
                            <span>{userState.cart.length?userState.cart.length:""}</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
