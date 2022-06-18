/* eslint-disable */
// react
import React from 'react';
import { Markup } from 'interweave';

function ProductTabDescription({...props}) {
    return (
        <div className="typography">
            <h3>Product Full Description</h3>
            <Markup content={props.data.product.product_cart_description} />
        </div>
    );
}

export default ProductTabDescription;
/* eslint-enable */
