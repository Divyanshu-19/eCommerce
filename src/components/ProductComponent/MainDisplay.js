import React from 'react'
import { useEffect } from 'react';
import axios from "axios";
import {useUserData} from "../../context/dataContext";
import uuid from "react-uuid";
import {Link} from "react-router-dom";

function MainDisplay({ setRoute }) {
    const { setProducts, dispatch, userState } = useUserData();
    useEffect(() => {
        (async function(){
        try{
            const {data: {products: initialProduct}, status} = await axios.get("/api/products")
            if(status===200){
                dispatch({type:"initialProduct", payload: [...initialProduct]});
                setProducts(prevItem => [...prevItem, ...initialProduct]);
            }
        }
        catch(error){
            console.log(error);
        }
        })()
    },[]);

    function handleWishListClick(product){
        for(let i=0; i<userState.wishlist.length; i++){
            if(product.id===userState.wishlist[i].id)
            {
                return dispatch({type:"removeFromWishlist", payload:i})
            }
        }
        return dispatch({type:"addToWishlist", payload:product});
    }

    function isAlreadyInWishlist(id){
        for(let i=0; i<userState.wishlist.length; i++){
            if(id===userState.wishlist[i].id)
            {
                return "favorite";
            }
        }
        return "favorite_border";
    }

    function handleCartClick(product){
        if(!alreadyInCart(product)){
            return dispatch({type:"addToCart", payload:product});
        }
        else{
            return setRoute("cart");
        }
    }

    function alreadyInCart(product){
        for(let i=0; i<userState.cart.length; i++){
            if(product.id===userState.cart[i].id)
            {
                return true;
            }
        }
        return false;
    }

    return (
        <div className="maindisplay">
            {
                userState.showProducts.map(product => {
                    return(
                        <div key={uuid()}>
                            <div className="card">
                                
                                <img src={product.image} alt="" />
                                <i className="material-icons md-30 wishlist" onClick={() => handleWishListClick(product)}>{isAlreadyInWishlist(product.id)}</i>
                                <Link to={`/products/${product.id}`} className="link">
                                <h2>{product.name}</h2>
                                <p>
                                    Rs. {product.price}<br />
                                    in Stock : {product.inStock.toString()} <br />
                                    fast delievery: {product.fastDelivery.toString()}
                                </p>
                                </Link>
                                <p>
                                </p>
                                <button className="btn round primary-btn" onClick={() => handleCartClick(product)}>
                                    {alreadyInCart(product)?<Link to={`/cart`} className="link link-white">Go To Cart</Link>:"Add To Cart"}
                                </button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default MainDisplay
