import React from 'react'
import { useEffect } from 'react';
import axios from "axios";
import {useUserData} from "../../context/dataContext";
// import uuid from "react-uuid";
import {Link, useNavigate} from "react-router-dom";

function MainDisplay({ setRoute }) {
    const { setProducts, dispatch, userState } = useUserData();
    const navigate = useNavigate()
    useEffect(() => {
        (async function(){
        try{
            const {data: {data}, status} = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/products`)
            console.log(data);
            if(status===200){
                dispatch({type:"initialProduct", payload: [...data]});
                setProducts(prevItem => [...prevItem, ...data]);
            }
        }
        catch(error){
            console.log(error);
        }
        })()
    },[]);

    function handleWishListClick(product){
        for(let i=0; i<userState.wishlist.length; i++){
            if(product._id===userState.wishlist[i]._id)
            {
                return dispatch({type:"removeFromWishlist", payload:i})
            }
        }
        return dispatch({type:"addToWishlist", payload:product});
    }

    function isAlreadyInWishlist(id){
        for(let i=0; i<userState.wishlist.length; i++){
            if(id===userState.wishlist[i]._id)
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
            return navigate("/cart");
        }
    }

    function alreadyInCart(product){
        for(let i=0; i<userState.cart.length; i++){
            if(product._id===userState.cart[i]._id)
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
                        <div key={product._id}>
                            <div className="card">
                                
                                <img src={product.image} alt="" style={{maxHeight: "25rem"}} />
                                <i className="material-icons md-30 wishlist" onClick={() => handleWishListClick(product)}>{isAlreadyInWishlist(product._id)}</i>
                                <Link to={`/products/${product._id}`} className="link">
                                <h2>{product.name}</h2>
                                <p>
                                    Rs. <del>{product.price}</del> {product.discountedPrice}<br />
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
