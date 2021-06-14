import "./Home.css";
import React from 'react';
import {Link} from "react-router-dom";
import Header from '../Header';

function Home() {
    return (
        <div>
            <Header />
            <div className="home_container">
                <img src="https://av.sc.com/in/content/images/in-latest-electronic-gadgets-by-availing-PL-Banner.jpg" alt="Main Banner" style={{width: "100%"}} />
                <div className="home_heading">GadgetX</div>
            </div>
            
            <Link to="/products" className="home_products">Products -&gt;</Link> ||
            {/* <Link to="/wishlist">Wishlist</Link> ||
            <Link to="/cart">Cart</Link> || */}
        </div>
    )
}

export default Home
