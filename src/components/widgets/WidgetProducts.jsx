// react
import React from 'react';

// third-party
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// application
import Currency from '../shared/Currency';
import { url } from '../../services/utils';

function WidgetProducts(props) {
    const { title, products, path } = props;
    const productsList = products.map((product, key) => {
        let image;
        let price;

        if (product.images && product.images.length > 0) {
            image = (
                <div className="widget-products__image">
                    <div className="product-image">
                        <Link to={url.product(product)} className="product-image__body">
                            <img className="product-image__img" src={path + product.images[0]} alt="" />
                        </Link>
                    </div>
                </div>
            );
        }

        if (product.compareAtPrice) {
            price = (
                <React.Fragment>
                    <span className="widget-products__new-price"><Currency value={product.price} /></span>
                    {' '}
                    <span className="widget-products__old-price"><Currency value={product.compareAtPrice} /></span>
                </React.Fragment>
            );
        } else {
            price = <Currency value={product.price} />;
        }

        return (
            <div key={key} className="widget-products__item">
                {image}
                <div className="widget-products__info">
                    <div className="widget-products__name">
                        <Link to={url.product(product)}>{product.name}</Link>
                    </div>
                    <div className="widget-products__prices">
                        {price}
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div className="widget-products widget">
            <h4 className="widget__title">{title}</h4>
            <div className="widget-products__list">
                {productsList}
            </div>
        </div>
    );
}

WidgetProducts.propTypes = {
    /**
     * widget title
     */
    title: PropTypes.node,
    /**
     * array of product objects
     */
    products: PropTypes.array,
};

WidgetProducts.defaultProps = {
    products: [],
};

export default WidgetProducts;
