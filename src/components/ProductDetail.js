import React from 'react'
import { useParams } from 'react-router';
import { useUserData } from '../context/dataContext';

function ProductDetail() {
    const {productId} = useParams();
    console.log(productId);

    const {userState} = useUserData();

    function matchProduct(productId, products){
        return products.find(product => productId===product.id);
    }
    const product = matchProduct(productId, userState.showProducts)//product to show
    return (
        <div>
            <img src={product.image} alt={product.name} />
            <h1>
                {product.name}
            </h1>
            price: Rs {product.price}
        </div>
    )
}

export default ProductDetail;
