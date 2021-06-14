import React, {useEffect} from 'react';

import {useUserData} from '../context/dataContext';
import Header from "./Header";

function Cart() {
    const { userState, dispatch } = useUserData();

    useEffect(() => {
        dispatch({type: "insertQtyOfCartitem",});
    },[]);

    function increaseCartQty(item, index){
        dispatch({type: "increaseCartitemQty", payload: {item, index}});
    }

    function decreaseCartQty(item, index){
        if(item.qty===1){
            dispatch({type: "removeFromCart", payload: index})
        }
        else{
            dispatch({type: "decreaseCartitemQty", payload: {item, index}});
        }
        
    }

    function cartToWishlist(item, index){
        dispatch({type: "removeFromCart", payload: index});
        for(let i=0; i<userState.wishlist.length; i++){
            if(item._id===userState.wishlist[i]._id)
            {
                return;
            }
        }
        return dispatch({type:"addToWishlist", payload:item});
    }

    return (
        <>
            <Header />
            {
                userState.cart.map((item, index) => {
                    return(
                        <div className="card-horizontal" key={item._id}>
                            <div className="card-horizontal__information">
                                <img src={item.image} alt="" style={{maxHeight: "30rem"}}></img>
                                <div className="card-horizontal__info">
                                    <h2>{item.name}</h2>
                                    <p>Rs. {item.discountedPrice}</p>
                                    <div className="card-horizontal__qty">
                                        <button className="btn" onClick={() => decreaseCartQty(item, index)}>-</button>
                                            {item.qty}
                                        <button className="btn" onClick={() => increaseCartQty(item, index)}>+</button>
                                    </div>
                                </div>
                            </div>
                            <div className="card-horizontal__button">
                                <button className="btn" onClick={() => dispatch({type: "removeFromCart", payload: index})}>Remove</button>
                                <button className="btn primary-btn" onClick={() => cartToWishlist(item, index)}>Move To Wishlist</button>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default Cart
