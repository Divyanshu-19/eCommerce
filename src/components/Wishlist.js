import React from 'react'
import uuid from "react-uuid";
import { useUserData } from '../context/dataContext'

function Wishlist() {
    const {dispatch, userState} = useUserData();

    function removeFromWishlist(wish){
        for(let i=0; i<userState.wishlist.length; i++){
            if(userState.wishlist[i].id===wish.id){
                return dispatch({type:"removeFromWishlist", payload:i});
            }
        }
    }

    function addToCart(wish){
        removeFromWishlist(wish);
        let i=0
        for(i=0; i<userState.cart.length; i++){
            if(userState.cart[i].id===wish.id){
                return;
            }
        }
        return dispatch({type:"addToCart", payload:wish});
    }

    return (
        <>
            {
                userState.wishlist.map(wish => {
                    return(
                    <div key={uuid()}>
                        <div className="card">
                            <img src={wish.image} alt="" />
                            <div class="remove" onClick={() => removeFromWishlist(wish)}>X</div>
                            <h2>{wish.name}</h2>
                            <p>Here you can place the content of the card</p>
                            <button className="btn round primary-btn" onClick={() => addToCart(wish)}>
                                Add To Cart
                            </button>
                        </div>
                    </div>
                    )
                })
            }
        </>
    )
}

export default Wishlist
