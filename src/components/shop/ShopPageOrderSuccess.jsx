/* eslint-disable */
// react
import React,{useState, useEffect} from 'react';

// third-party
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { Link,Redirect } from 'react-router-dom';

// application
import Currency from '../shared/Currency';
import { Check100Svg } from '../../svg';

// data stubs
import order from '../../data/accountOrderDetails';
import theme from '../../data/theme';
import { url } from '../../services/utils';
// import { getMyOrders } from '../../api/order';
import { GET_MY_PLACED_ORDERS } from '../../store/order/orderActionTypes';
import { getMyPlacedOrders } from '../../store/order';
import { apiUrlImageProduct } from '../../config/config'
import { clearCode } from '../../store/order';
import { CLEAR_ORDER } from '../../store/order/orderActionTypes';

function ShopPageOrderSuccess({getMyPlacedOrders,ordersPlaced,clearCode}) {

    useEffect(()=>{
        getMyPlacedOrders(GET_MY_PLACED_ORDERS);

        return ()=>{
            clearCode(CLEAR_ORDER)
          }
    },[]);

    if(!ordersPlaced){
        return <Redirect to="/"/>
    }
    let TotalAmt = 0;
    const items = ordersPlaced && ordersPlaced.ordersPlaced.map((item) => {
        
        // TotalAmt = TotalAmt  + item.product_discounted_price;
        TotalAmt = TotalAmt + ( item.product_discounted_price * item.quantity );
        // console.log(TotalAmt)
        const options = (item.options || []).map((option) => (
            <li className="order-list__options-item">
                <span className="order-list__options-label">
                    {option.label}
                    {': '}
                </span>
                <span className="order-list__options-value">{option.value}</span>
            </li>
        ));

        return (
            <tr>
                <td className="order-list__column-image">
                    <div className="product-image">
                        <Link to={url.product(item)} className="product-image__body">
                            <img className="product-image__img" src={apiUrlImageProduct + item.thumbnail_img} alt={item.thumbnail_img_tag} />
                        </Link>
                    </div>
                </td>
                <td className="order-list__column-product">
                    <Link to={url.product(item)}>{item.name}</Link>
                    {options.length > 0 && (
                        <div className="order-list__options">
                            <ul className="order-list__options-list">
                                {options}
                            </ul>
                        </div>
                    )}
                </td>
                <td className="order-list__column-quantity" data-title="Qty:">{item.quantity}</td>
                <td className="order-list__column-total"><Currency value={item.quantity * item.product_discounted_price} /></td>
            </tr>
        );
    });

    const additionalLines = order && order.additionalLines.map((line) => (
        <tr>
            <th className="order-list__column-label" colSpan="3">{line.label}</th>
            <td className="order-list__column-total"><Currency value={line.total} /></td>
        </tr>
    ));

    return (
        <div className="block order-success">
            <Helmet>
                <title>{`Order Success — ${theme.name}`}</title>
            </Helmet>

            <div className="container">
                <div className="order-success__body">
                    <div className="order-success__header">
                        <Check100Svg className="order-success__icon" />
                        <h1 className="order-success__title">Thank you</h1>
                        <div className="order-success__subtitle">Your order has been received</div>
                        <div className="order-success__actions">
                            <Link to="/" className="btn btn-xs btn-secondary">Go To Homepage</Link>
                        </div>
                    </div>

                    <div className="order-success__meta">
                        <ul className="order-success__meta-list">
                            <li className="order-success__meta-item">
                                <span className="order-success__meta-title">Order number:</span>
                                <span className="order-success__meta-value">{`#${ordersPlaced.order_code}`}</span>
                            </li>
                            <li className="order-success__meta-item">
                                <span className="order-success__meta-title">Created at:</span>
                                <span className="order-success__meta-value">{order.date}</span>
                            </li>
                            <li className="order-success__meta-item">
                                <span className="order-success__meta-title">Total:</span>
                                <span className="order-success__meta-value"><Currency value={TotalAmt} /></span>
                            </li>
                            <li className="order-success__meta-item">
                                <span className="order-success__meta-title">Payment method:</span>
                                <span className="order-success__meta-value">{'Cash on Delivery'}</span>
                            </li>
                        </ul>
                    </div>

                    <div className="card">
                        <div className="order-list">
                            <table>
                                <thead className="order-list__header">
                                    <tr>
                                        <th className="order-list__column-label" colSpan="2">Product</th>
                                        <th className="order-list__column-quantity">Qty</th>
                                        <th className="order-list__column-total">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="order-list__products">
                                    {items}
                                </tbody>
                                {/* {additionalLines.length > 0 && (
                                    <tbody className="order-list__subtotals">
                                        <tr>
                                            <th className="order-list__column-label" colSpan="3">Subtotal</th>
                                            <td className="order-list__column-total"><Currency value={order.subtotal} /></td>
                                        </tr>
                                        {additionalLines}
                                    </tbody>
                                )} */}
                                <tfoot className="order-list__footer">
                                    <tr>
                                        <th className="order-list__column-label" colSpan="3">Total</th>
                                        <td className="order-list__column-total"><Currency value={TotalAmt} /></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>

                    <div className="row mt-3 no-gutters mx-n2">
                        <div className="col-sm-6 col-12 px-2">
                            <div className="card address-card">
                                <div className="address-card__body">
                                    <div className="address-card__badge address-card__badge--muted">
                                        Shipping Address
                                    </div>
                                    <div className="address-card__name">
                                        {`${ordersPlaced.address.name}`}
                                    </div>
                                    <div className="address-card__row">
                                        {ordersPlaced.address.country}
                                        <br />
                                        {`${ordersPlaced.address.pincode}, ${ordersPlaced.address.city}`}
                                        <br />
                                        {`${ordersPlaced.address.address1} ${ordersPlaced.address.address2}`}
                                        <br />
                                        {ordersPlaced.address.state}
                                    </div>
                                    <div className="address-card__row">
                                        <div className="address-card__row-title">Phone Number</div>
                                        <div className="address-card__row-content">{order.shippingAddress.phone}</div>
                                    </div>
                                    {/* <div className="address-card__row">
                                        <div className="address-card__row-title">Email Address</div>
                                        <div className="address-card__row-content">{order.shippingAddress.email}</div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        {/* <div className="col-sm-6 col-12 px-2 mt-sm-0 mt-3">
                            <div className="card address-card">
                                <div className="address-card__body">
                                    <div className="address-card__badge address-card__badge--muted">
                                        Billing Address
                                    </div>
                                    <div className="address-card__name">
                                        {`${order.billingAddress.firstName} ${order.billingAddress.lastName}`}
                                    </div>
                                    <div className="address-card__row">
                                        {order.billingAddress.country}
                                        <br />
                                        {`${order.billingAddress.postcode}, ${order.billingAddress.city}`}
                                        <br />
                                        {order.billingAddress.address}
                                    </div>
                                    <div className="address-card__row">
                                        <div className="address-card__row-title">Phone Number</div>
                                        <div className="address-card__row-content">{order.billingAddress.phone}</div>
                                    </div>
                                    <div className="address-card__row">
                                        <div className="address-card__row-title">Email Address</div>
                                        <div className="address-card__row-content">{order.billingAddress.email}</div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    ordersPlaced : state.order.orderPlaced,
});

const mapDispatchToProps = {
    getMyPlacedOrders,
    clearCode
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopPageOrderSuccess);