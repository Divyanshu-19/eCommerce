import React from 'react'
import { useParams } from 'react-router';
import uuid from 'react-uuid';
import { useUserData } from '../context/dataContext';

function ProductDetail() {
    const {productId} = useParams();
    console.log(productId);

    const {userState} = useUserData();

    function matchProduct(productId, products){
        return products.find(product => productId===product._id);
    }
    const product = matchProduct(productId, userState.showProducts)//product to show
    return (
        <div>
            <img src={product.image} alt={product.name}/>
            <h1>
                {product.name}
            </h1>
            <strong>Rating</strong>: {product.rating}<br />
            <strong>price</strong>: Rs <del>{product.price}</del><strong> {product.discountedPrice}</strong>
            <br /><br />
            <h3>Offers:</h3>
            {product.offer.map(item => {
                return(
                    <div key={uuid()}>-> {item}</div>
                )
            })}
            <br /><br />
            <h3>Description:</h3>
            {product.description.map(item => {
                return(
                    <div key={uuid()}>-> {item}</div>
                )
            })}
        </div>
    )
}

export default ProductDetail;
