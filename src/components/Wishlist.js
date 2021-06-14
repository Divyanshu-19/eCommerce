import React from 'react'
import { useUserData } from '../context/dataContext'
import Header from "./Header";

function Wishlist() {
    const {dispatch, userState} = useUserData();

    function removeFromWishlist(wish){
        for(let i=0; i<userState.wishlist.length; i++){
            if(userState.wishlist[i]._id===wish._id){
                return dispatch({type:"removeFromWishlist", payload:i});
            }
        }
    }

    function addToCart(wish){
        removeFromWishlist(wish);
        let i=0
        for(i=0; i<userState.cart.length; i++){
            if(userState.cart[i]._id===wish._id){
                return;
            }
        }
        return dispatch({type:"addToCart", payload:wish});
    }

    return (
        <>
            <Header />
            <div className="maindisplay">
            {
                userState.wishlist.map(wish => {
                    return(
                    <div key={wish._id}>
                        <div className="card">
                            <img src={wish.image} alt="" style={{maxHeight: "25rem"}} />
                            <div className="remove" onClick={() => removeFromWishlist(wish)}>X</div>
                            <h2>{wish.name}</h2>
                            <p>{wish.description[0]}<br /> {wish.description[1]}</p>
                            <button className="btn round primary-btn" onClick={() => addToCart(wish)}>
                                Add To Cart
                            </button>
                        </div>
                    </div>
                    )
                })
            }
            </div>
        </>
    )
}

export default Wishlist
