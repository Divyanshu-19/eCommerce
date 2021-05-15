import React from 'react';
import {Link} from "react-router-dom";

function Home() {
    return (
        <div>
            Home
            <br></br>
            <Link to="/products">Products</Link> ||
            <Link to="/wishlist">Wishlist</Link> ||
            <Link to="/cart">Cart</Link> ||
        </div>
    )
}

export default Home
