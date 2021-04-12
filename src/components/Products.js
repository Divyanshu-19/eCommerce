import React from 'react'
import FilterSort from "./ProductComponent/FilterSort";
import MainDisplay from './ProductComponent/MainDisplay';
import MobileFilterSort from "./ProductComponent/MobileFilterSort";


function Products({ setRoute }) {
    return (
        <>
            <MobileFilterSort />
            <div className="row">
                <FilterSort />
                <MainDisplay setRoute={setRoute}/>
            </div>
        </>
    )
}

export default Products;