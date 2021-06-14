import React from 'react'
import {useUserData} from "../../context/dataContext";


function FilterSort() {

    const {products, dispatch} = useUserData();

    return (
        <div className="filtersort">
            <div className="filter">
                <h3>Filter By:</h3>
                <label forhtml="fast_delievery">
                    <input type="checkbox" 
                           id="fast_delievery" 
                           className="checkbox" 
                           name="filtercheckbox" 
                           onChange={() =>  dispatch({type:"toggleFastDelievery", payload: products}) }/>
                    Fast Delievery
                </label>
                
                <br />
                <label forhtml="out_of_stock">
                    <input type="checkbox" 
                           id="out_of_stock" 
                           className="" 
                           name="filtercheckbox"
                           onChange={() => dispatch({type:"toggleOutOfStock", payload:products}) } />
                    Out of Stock
                </label>
            </div>
            <div className="sort">
                <h3>Sort By:</h3>
                {/* <label forhtml="sort_by_latest" className="radio" >
                    <input type="radio" id="sort_by_latest" className="radio__input" name="sortradio" />
                    <div className="radio__radio"></div>
                    Latest
                </label>
                <br />

                <label forhtml="sort_by_discount" className="radio">
                    <input type="radio" id="sort_by_discount" className="radio__input" name="sortradio" />
                    <div className="radio__radio"></div>
                    Discount
                </label>
                <br /> */}

                <label forhtml="sort_by_hightToLow" className="radio">
                    <input type="radio"
                           id="sort_by_hightToLow" 
                           className="radio__input" 
                           name="sortradio"
                           onChange={() => dispatch({type:"sortBy", payload:"HIGH_TO_LOW"})} />
                    <div className="radio__radio"></div>
                    Price: High to low
                </label>
                <br />

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
            </div>
        </div>
    )
}

export default FilterSort
