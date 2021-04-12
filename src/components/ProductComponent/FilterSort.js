import React, {useEffect, useState} from 'react'
import {useUserData} from "../../context/dataContext";


function FilterSort() {
    const [filterBy, setFilterBy] = useState({fastDelivery: false, outOfStock: false});
    const [sort, setSort] = useState("");
    const {products, dispatch, userState} = useUserData();

    useEffect(() => {
        console.log(filterBy);
        console.log(products);
        if(filterBy.fastDelivery && filterBy.outOfStock){
            const fastAndOutOfStockProduct = products.filter(product => product.fastDelivery && product.inStock);
            console.log(fastAndOutOfStockProduct,"fast and out of stock");
            dispatch({type:"initialProduct", payload: [...fastAndOutOfStockProduct]});
        }
        else if(filterBy.fastDelivery){
            const fastProduct = products.filter(product => product.fastDelivery);
            console.log(fastProduct,"fast product");
            dispatch({type:"initialProduct", payload: [...fastProduct]});

        }
        else if(filterBy.outOfStock){
            const outOfStockProduct = products.filter(product => product.inStock);
            console.log(outOfStockProduct,"outofstock");
            dispatch({type:"initialProduct", payload: [...outOfStockProduct]});
        }
        else{
            dispatch({type:"initialProduct", payload: [...products]});
            console.log("all products");
        }

        if(sort==="lowToHigh"){
            const lowToHighProduct = userState.showProducts;
            lowToHighProduct.sort((a,b) => a.price-b.price);
            dispatch({type:"initialProduct", payload: [...lowToHighProduct]});
        }
        else if(sort==="highToLow"){
            const highToLowProduct = userState.showProducts;
            highToLowProduct.sort((a,b) => b.price-a.price);
            dispatch({type:"initialProduct", payload: [...highToLowProduct]});
        }
    }, [filterBy, sort]);

    return (
        <div className="filtersort">
            <div className="filter">
                <h3>Filter By:</h3>
                <label forhtml="fast_delievery">
                    <input type="checkbox" id="fast_delievery" className="checkbox" name="filtercheckbox" 
                    onChange={() => setFilterBy(prev => {return {...prev, fastDelivery: !prev.fastDelivery} }) }/>
                    Fast Delievery
                </label>
                <br />
                <label forhtml="out_of_stock">
                    <input type="checkbox" id="out_of_stock" className="" name="filtercheckbox"
                    onChange={() => setFilterBy(prev => {return {...prev, outOfStock: !prev.outOfStock} }) } />
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
                    <input type="radio" id="sort_by_hightToLow" className="radio__input" name="sortradio"
                    onChange={() => setSort("highToLow")} />
                    <div className="radio__radio"></div>
                    Price: High to low
                </label>
                <br />

                <label forhtml="sort_by_lowToHigh" className="radio">
                    <input type="radio" id="sort_by_lowToHigh" className="radio__input" name="sortradio"
                    onChange={() => setSort("lowToHigh")} />
                    <div className="radio__radio"></div>
                    Price: low to high
                </label>
            </div>
        </div>
    )
}

export default FilterSort
