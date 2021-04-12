import { createContext, useContext, useReducer, useState } from "react";
const UserDataContext = createContext();

const initialState = {
    showProducts:[],
    cart: [],
    wishlist: [],
    filterSort: {
        includeOutOfStock: false,
        includeFastDelievery: false,
        sortBy: null
    }
};

const ACTION ={
    ADD_TO_WISHLIST: "addToWishlist",
    REMOVE_FROM_WISHLIST: "removeFromWishlist",
    ADD_TO_CART: "addToCart",
    REMOVE_FROM_CART: "removeFromCart",
    INSERT_QTY_OF_CARTITEM: "insertQtyOfCartitem",
    INCREASE_CARTITEM_QTY: "increaseCartitemQty",
    DECREASE_CARTITEM_QTY: "decreaseCartitemQty",
    INITIAL_PRODUCT: "initialProduct"
}

// Reducer functions

function removeFromCart(state, index){
    console.log(index,"from removeFromCart")
    
    const newState = [...state.cart]
    console.log(newState,"from removeFromCart")
    newState.splice(index, 1);
    return {...state, cart: newState};
}

function increaseCartitemQty(state, payload){
    const {item, index} = payload
    const newState = [...state.cart];
    const newItem = {...item}
    newItem.qty +=1
    newState.splice(index,1, newItem);
    return {...state, cart: newState}
}

function decreaseCartitemQty(state, payload){
    const {item, index} = payload
    const newState = [...state.cart];
    const newItem = {...item}
    newItem.qty -=1
    newState.splice(index,1, newItem);
    return {...state, cart: newState}
}

function insertQtyOfCartitem(state){
    const newCart = [...state.cart]
    const result = newCart.map(function(el) {
        let o = Object.assign({}, el);
        o.qty = 1;
        return o;
    })
    return {...state, cart: result}
}

function initialProduct(state, payload){
    // console.log(payload,"payload")
    const newObj =  {...state, showProducts: [...payload]};
    // console.log(newObj.showProducts,"showProducts");
    return newObj;
}

// All reducer function above

function reducer(state, action){
    switch(action.type){
        case ACTION.ADD_TO_WISHLIST:
            return {...state, wishlist: [...state.wishlist, action.payload]};

        case ACTION.REMOVE_FROM_WISHLIST:
            const newState = [...state.wishlist];
            newState.splice(action.payload,1);
            return {...state, wishlist: newState};
        
        case ACTION.ADD_TO_CART:
            return {...state, cart: [...state.cart, action.payload]};
        case ACTION.INSERT_QTY_OF_CARTITEM:
            return insertQtyOfCartitem(state);
        case ACTION.INCREASE_CARTITEM_QTY:
            return increaseCartitemQty(state, action.payload);
        case ACTION.DECREASE_CARTITEM_QTY:
            return decreaseCartitemQty(state, action.payload);
        case ACTION.REMOVE_FROM_CART:
            return removeFromCart(state, action.payload);
        case ACTION.INITIAL_PRODUCT:
            return initialProduct(state, action.payload);
        default:
            return state;
    }
}

export function UserDataProvider({ children }){

    const [userState, dispatch] = useReducer(reducer, initialState)
    const [products, setProducts] = useState([]);

    return(
        <UserDataContext.Provider value={{userState, dispatch, products, setProducts}}>
            {children}
        </UserDataContext.Provider>
    )
}

export function useUserData(){
    return useContext(UserDataContext);
}