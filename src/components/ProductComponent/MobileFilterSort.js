import React, {useState} from 'react';
import {useUserData} from "../../context/dataContext";


function SortList(){
    const {dispatch} = useUserData();

    return(
        <ul class="list">
            <li class="item">
                <label forhtml="sort_by_hightToLow" className="radio">
                    <input type="radio"
                           id="sort_by_hightToLow" 
                           className="radio__input" 
                           name="sortradio"
                           onChange={() => dispatch({type:"sortBy", payload:"HIGH_TO_LOW"})} />
                    <div className="radio__radio"></div>
                    Price: High to low
                </label>
            </li>
            <li class="item">
                <label forhtml="sort_by_lowToHigh" className="radio">
                    <input 
                        type="radio" 
                        id="sort_by_lowToHigh" 
                        className="radio__input" 
                        name="sortradio"
                        onChange={() => dispatch({type:"sortBy", payload:"LOW_TO_HIGH"})} />
                    <div className="radio__radio"></div>
                    Price: low to high
                </label>
            </li>
        </ul>
    )
}

function FilterList(){
    const {products, dispatch} = useUserData();

    return(
        <ul class="list">
            <li class="item">
                <label forhtml="fast_delievery">
                    <input type="checkbox" 
                           id="fast_delievery" 
                           className="checkbox" 
                           name="filtercheckbox" 
                           onChange={() =>  dispatch({type:"toggleFastDelievery", payload: products}) }/>
                    Fast Delievery
                </label>
            </li>
            <li class="item">
                <label forhtml="out_of_stock">
                    <input type="checkbox" 
                           id="out_of_stock" 
                           className="" 
                           name="filtercheckbox"
                           onChange={() => dispatch({type:"toggleOutOfStock", payload:products}) } />
                    Out of Stock
                </label>
            </li>
        </ul>
    )
}

function MobileFilterSort() {
    const [route, setRoute] = useState("");
    console.log(route);
    return (
        <div className="mobile-view">
            <div className="row sortrow">
                <div className="row__sort">
                    <button className="btn strech" onClick={() => setRoute('sort')}>Sort</button>
                </div>
                <div className="row__filter">
                    <button className="btn strech" onClick={() => setRoute('filter')}>Filter</button>
                </div>
            </div>
            {route==="sort" && <SortList />}
            {route==="filter" && <FilterList />}
        </div>
    )
}

export default MobileFilterSort;
