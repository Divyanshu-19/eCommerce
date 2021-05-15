import React from 'react'
import FilterSort from "./ProductComponent/FilterSort";
import MainDisplay from './ProductComponent/MainDisplay';
import MobileFilterSort from "./ProductComponent/MobileFilterSort";
import Header from "./Header";


function Products() {
    return (
        <>
            <Header />
            <MobileFilterSort />
            <div className="row">
                <FilterSort />
                <MainDisplay/>
            </div>
        </>
    )
}

export default Products;