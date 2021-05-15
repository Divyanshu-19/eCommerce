import { createContext, useContext, useReducer, useState } from "react";
const UserDataContext = createContext();

const initialState = {
    showProducts:[],
    cart: [],
    wishlist: [],
    filterSort: {
        includeOutOfStock: false,
        includeFastDelievery: false,
        sortBy: ""
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
    INITIAL_PRODUCT: "initialProduct",
    TOGGLE_OUT_OF_STOCK: "toggleOutOfStock",
    TOGGLE_FAST_DELIEVERY: "toggleFastDelievery",
    SORT_BY: "sortBy"
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
    return {...state, showProducts: [...payload]};
}

function toggleFastDelievery(state, products){
    let newProducts;
    if(!state.filterSort.includeFastDelievery && state.filterSort.includeOutOfStock){
        newProducts = products.filter(product => product.fastDelivery && product.inStock);
    }
    else if(!state.filterSort.includeFastDelievery){
        newProducts = products.filter(product => product.fastDelivery);
    }
    else if(state.filterSort.includeOutOfStock){
        newProducts = products.filter(product => product.inStock);
    }
    else{
        newProducts = products;
    }

    if(state.filterSort.sortBy==="HIGH_TO_LOW"){
        console.log('running');
        newProducts.sort((a,b) => b.price-a.price);
    }
    else if(state.filterSort.sortBy==="LOW_TO_HIGH"){
        newProducts.sort((a,b) => a.price-b.price);
    }
    return {
                    ...state,
                    showProducts: newProducts,
                    filterSort:{
                        ...state.filterSort,
                        includeFastDelievery :!state.filterSort.includeFastDelievery
                    }
                };
}

function toggleOutOfStock(state, products){
    let newProducts;
    if(!state.filterSort.includeOutOfStock && state.filterSort.includeFastDelievery){
        newProducts = products.filter(product => product.fastDelivery && product.inStock);
    }
    else if(!state.filterSort.includeOutOfStock){
        newProducts = products.filter(product => product.inStock);
    }
    else if(state.filterSort.includeFastDelievery){
        newProducts = products.filter(product => product.fastDelivery);
    }
    else{
        newProducts = products;
    }

    if(state.filterSort.sortBy==="HIGH_TO_LOW"){
        console.log('running');
        newProducts.sort((a,b) => b.price-a.price);
    }
    else if(state.filterSort.sortBy==="LOW_TO_HIGH"){
        newProducts.sort((a,b) => a.price-b.price);
    }
    return {
                ...state,
                showProducts: newProducts,
                filterSort:{
                    ...state.filterSort,
                    includeOutOfStock :!state.filterSort.includeOutOfStock
                }
            };
}

function sortBy(state, payload){
    if(payload==="HIGH_TO_LOW"){
        return {
                ...state,
                showProducts: state.showProducts.sort((a,b) => b.price-a.price),
                filterSort:{
                    ...state.filterSort,
                    sortBy: payload
                }
            };
    }
    else if(payload==="LOW_TO_HIGH"){
        return {
                ...state,
                showProducts: state.showProducts.sort((a,b) => a.price-b.price),
                filterSort:{
                    ...state.filterSort,
                    sortBy: payload
                }
            };
    }
    return {
                ...state,
                filterSort:{
                    ...state.filterSort,
                    sortBy: payload
                }
            };
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

        case ACTION.TOGGLE_FAST_DELIEVERY:
            return toggleFastDelievery(state, action.payload);
        
        case ACTION.TOGGLE_OUT_OF_STOCK:
            return toggleOutOfStock(state, action.payload)

        case ACTION.SORT_BY:
            return sortBy(state, action.payload);

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