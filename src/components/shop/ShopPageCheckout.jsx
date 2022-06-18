// react
import React, { Component } from 'react';
/* eslint-disable */
// third-party
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { Link, Redirect } from 'react-router-dom';

// application
import Collapse from '../shared/Collapse';
import Currency from '../shared/Currency';
import PageHeader from '../shared/PageHeader';
import { Check9x7Svg } from '../../svg';

// data stubs
import payments from '../../data/shopPayments';
import theme from '../../data/theme';

import { getDefaultAddressTrueFalse } from '../../store/address';
import { placeOrderAction, clearCode } from '../../store/order';
// import { getDefaultAddressTrueFalse } from '../../store/address';
import { GET_DEFAULT_ADDRESS_TRUE_FALSE } from '../../store/address/addressActionTypes';
import { PLACE_ORDER, CLEAR_ORDER } from '../../store/order/orderActionTypes';

class ShopPageCheckout extends Component {
    payments = payments;

    constructor(props) {
        super(props);

        this.state = {
            payment: 'bank',
            formValues: {
                name: "",
                street: "",
                address: "",
                city: "",
                state: "",
                country: "",
                zip: "",
              },
            formErrors: {
                name: "",
                street: "",
                address: "",
                city: "",
                state: "",
                country: "",
                zip: "",
            },
            formValidity: {
                name: false,
                street: false,
                address: false,
                city: false,
                state: false,
                country: false,
                zip: false,
            },
            isSubmitting: false,
            isdisabled: false
        };
    }
    
    componentDidMount = () => {
        const { getDefaultAddressTrueFalse } = this.props;
        getDefaultAddressTrueFalse(GET_DEFAULT_ADDRESS_TRUE_FALSE);
    }

    componentWillUnmount = () => {
        // const { clearCode } = this.props;
        // clearCode(CLEAR_ORDER);
    }

    handleChange = ({ target }) => {
        const { formValues } = this.state;
        formValues[target.name] = target.value;
        this.setState({ formValues });
        this.handleValidation(target);
    };

    handleValidation = target => {
        const { name, value } = target;
        const fieldValidationErrors = this.state.formErrors;
        const validity = this.state.formValidity;
        const isName = name === "name";
        const isStreet = name === "street";
        const isAddress = name === "address";
        const isCity = name === "city";
        const isState = name === "state";
        const isCountry = name === "country";
        const isZip = name === "zip";
        // const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    
        validity[name] = value.length > 0;
        fieldValidationErrors[name] = validity[name]
            ? ""
            : `${name} is required and cannot be empty`;
        
        if (validity[name]) {
                if (isName) {
                validity[name] = value.length >= 3;
                fieldValidationErrors[name] = validity[name]
                    ? ""
                    : `${name} should be 3 characters minimum`;
        }
        if (isStreet) {
            validity[name] = value.length >= 8;
            fieldValidationErrors[name] = validity[name]
                ? ""
                : `${name} should be 3 characters minimum`;
        }
        if (isAddress) {
            validity[name] = value.length >= 8;
            fieldValidationErrors[name] = validity[name]
                ? ""
                : `${name} should be 3 characters minimum`;
        }
        if (isCity) {
            validity[name] = value.length >= 8;
            fieldValidationErrors[name] = validity[name]
                ? ""
                : `${name} should be 3 characters minimum`;
        }
        if (isState) {
            validity[name] = value.length >= 8;
            fieldValidationErrors[name] = validity[name]
                ? ""
                : `${name} should be 3 characters minimum`;
        }
        if (isCountry) {
            validity[name] = value.length >= 8;
            fieldValidationErrors[name] = validity[name]
                ? ""
                : `${name} should be 3 characters minimum`;
        }
        if (isZip) {
            validity[name] = value.length >= 6;
            fieldValidationErrors[name] = validity[name]
                ? ""
                : `${name} should be 3 characters minimum`;
        }
    }
    
        this.setState({
            formErrors: fieldValidationErrors,
            formValidity: validity
        });
    };
    
    handleDefaultAddress = (event) => {
        if(event.target.checked){
            this.setState({isdisabled : true})
        }else{
            this.setState({isdisabled : false})
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({ isSubmitting: true });
        const { formValues, formValidity } = this.state;
        if (Object.values(formValidity).every(Boolean)) {
            // alert("Form is validated! Submitting the form...");
            // this.setState({ isSubmitting: false });
            const { placeOrderAction } = this.props;
            console.log(formValues)
            placeOrderAction(PLACE_ORDER, formValues);
        } else {
            for (let key in formValues) {
                let target = {
                    name: key,
                    value: formValues[key]
                };
                this.handleValidation(target);
            }
        this.setState({ isSubmitting: false });
        }
    };

    handlePaymentChange = (event) => {
        if (event.target.checked) {
            this.setState({ payment: event.target.value });
        }
    };

    placeOrder = () =>{
        const { placeOrderAction } = this.props;
        this.setState({ isSubmitting: true });
        placeOrderAction(PLACE_ORDER);
    }

    renderTotals() {
        const { cart } = this.props;

        if (cart.extraLines.length <= 0) {
            return null;
        }

        const extraLines = cart.extraLines.map((extraLine, index) => (
            <tr key={index}>
                <th>{extraLine.title}</th>
                <td><Currency value={extraLine.price} /></td>
            </tr>
        ));

        return (
            <React.Fragment>
                <tbody className="checkout__totals-subtotals">
                    <tr>
                        <th>Subtotal</th>
                        <td><Currency value={cart.subtotal} /></td>
                    </tr>
                    {extraLines}
                </tbody>
            </React.Fragment>
        );
    }

    renderCart() {
        const { cart } = this.props;

        const items = cart.items && cart.items.map((item) => (
            <tr key={item.id}>
                <td>{`${item.product.name} × ${item.quantity}`}</td>
                <td><Currency value={item.total} /></td>
            </tr>
        ));

        return (
            <table className="checkout__totals">
                <thead className="checkout__totals-header">
                    <tr>
                        <th>Product</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody className="checkout__totals-products">
                    {items}
                </tbody>
                {this.renderTotals()}
                <tfoot className="checkout__totals-footer">
                    <tr>
                        <th>Total</th>
                        <td><Currency value={cart.total} /></td>
                    </tr>
                </tfoot>
            </table>
        );
    }

    renderPaymentsList() {
        const { payment: currentPayment } = this.state;

        const payments = this.payments.map((payment) => {
            const renderPayment = ({ setItemRef, setContentRef }) => (
                <li className="payment-methods__item" ref={setItemRef}>
                    <label className="payment-methods__item-header">
                        <span className="payment-methods__item-radio input-radio">
                            <span className="input-radio__body">
                                <input
                                    type="radio"
                                    className="input-radio__input"
                                    name="checkout_payment_method"
                                    value={payment.key}
                                    // checked={currentPayment === payment.key}
                                    defaultChecked
                                    // onChange={this.handlePaymentChange}
                                />
                                <span className="input-radio__circle" />
                            </span>
                        </span>
                        <span className="payment-methods__item-title">{payment.title}</span>
                    </label>
                    <div className="payment-methods__item-container" ref={setContentRef}>
                        <div className="payment-methods__item-description text-muted">{payment.description}</div>
                    </div>
                </li>
            );

            return (
                <Collapse
                    key={payment.key}
                    open={currentPayment === payment.key}
                    toggleClass="payment-methods__item--active"
                    render={renderPayment}
                />
            );
        });

        return (
            <div className="payment-methods">
                <ul className="payment-methods__list">
                    {payments}
                </ul>
            </div>
        );
    }

    render() {
        
        //next line added by sami
        const { formValues, formErrors, isSubmitting } = this.state;
        ////
        const { cart } = this.props;
        const { address } = this.props;
        // console.log(this.props.order.order_code);
        if(this.props.order && this.props.order.order_code){
            return <Redirect to="checkout/success" />
        }

        if (cart.items && cart.items.length < 1) {
            return <Redirect to="cart" />;
        }

        const breadcrumb = [
            { title: 'Home', url: '' },
            { title: 'Shopping Cart', url: '/shop/cart' },
            { title: 'Checkout', url: '' },
        ];

        // const spinner = '<div class="spinner-border text-warning" role="status"><span class="sr-only">Loading...</span></div>';
        
        return (
            <React.Fragment>
                <Helmet>
                    <title>{`Checkout — ${theme.name}`}</title>
                </Helmet>

                <PageHeader header="Checkout" breadcrumb={breadcrumb} />

                <div className="checkout block">
                    <div className="container">
                        <form onSubmit={this.handleSubmit}>
                        <div className="row">
                            {
                            localStorage.getItem('userToken') ? 
                                <div className="col-12 mb-3">
                                    <div className="alert alert-primary alert-lg">
                                        Returning customer?
                                        {' '}
                                        <Link to="/account/login">Click here to login</Link>
                                    </div>
                                </div>
                            :
                                ''
                            }
                              
                            <div className="col-12 col-lg-6 col-xl-7">
                                <div className="card mb-lg-0">
                                    <div className="card-body">
                                        <h3 className="card-title">Billing details</h3>
                                        <div className="form-row">
                                            {
                                            address.defaultAddress 
                                            ? 
                                                <div className="form-group">
                                                    <div className="form-check">
                                                        <span className="form-check-input input-check">
                                                            <span className="input-check__body">
                                                                <input className="input-check__input" type="checkbox" id="checkout-default-address" onChange={this.handleDefaultAddress}/>
                                                                <span className="input-check__box" />
                                                                <Check9x7Svg className="input-check__icon" />
                                                            </span>
                                                        </span>
                                                        
                                                        <label className="form-check-label" htmlFor="checkout-default-address">
                                                            Ship to Default Address from <Link to="/account/addresses">Address'es</Link>?
                                                        </label>
                                                    </div>
                                                </div>
                                            :
                                            ''
                                            }
                                            {/* <div className="form-group col-md-6">
                                                <label htmlFor="checkout-first-name">First Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="checkout-first-name"
                                                    placeholder="First Name"
                                                />
                                            </div> */}
                                            <div className="form-group col-md-12">
                                                <label htmlFor="checkout-first-name">Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="checkout-first-name"
                                                    placeholder="Name"
                                                    name="name"
                                                    onChange={this.handleChange}
                                                    value={formValues.name}
                                                    disabled={this.state.isdisabled}
                                                />
                                                <div style={{color:"red"}}>{formErrors.name}</div>
                                            </div>
                                            {/* <div className="form-group col-md-6">
                                                <label htmlFor="checkout-last-name">Last Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="checkout-last-name"
                                                    placeholder="Last Name"
                                                />
                                            </div> */}
                                        </div>

                                        {/* <div className="form-group">
                                            <label htmlFor="checkout-company-name">
                                                Company Name
                                                {' '}
                                                <span className="text-muted">(Optional)</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="checkout-company-name"
                                                placeholder="Company Name"
                                            />
                                        </div> */}
                                        
                                        <div className="form-group">
                                            <label htmlFor="checkout-street-address">Street Address</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="checkout-street-address"
                                                placeholder="Street Address"
                                                name="street"
                                                onChange={this.handleChange}
                                                value={formValues.street}
                                                disabled={this.state.isdisabled}
                                            />
                                            <div style={{color:"red"}}>{formErrors.street}</div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="checkout-address">
                                                Apartment, suite, unit etc.
                                                {' '}
                                                {/* <span className="text-muted">(Optional)</span> */}
                                            </label>
                                            <input type="text" className="form-control" id="checkout-address" name="address" onChange={this.handleChange}
                                                    value={formValues.address} disabled={this.state.isdisabled} placeholder="Address"/>
                                            <div style={{color:"red"}}>{formErrors.address}</div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="checkout-city">Town / City</label>
                                            <input type="text" className="form-control" id="checkout-city" name="city" onChange={this.handleChange}
                                                    value={formValues.city} disabled={this.state.isdisabled} placeholder="City"/>
                                            <div style={{color:"red"}}>{formErrors.city}</div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="checkout-state">State</label>
                                            <input type="text" className="form-control" id="checkout-state" name="state" onChange={this.handleChange}
                                                    value={formValues.state} disabled={this.state.isdisabled} placeholder="State"/>
                                            <div style={{color:"red"}}>{formErrors.state}</div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="checkout-country">Country</label>
                                            <select id="checkout-country" className="form-control" name="country" onChange={this.handleChange}
                                                    value={formValues.country} disabled={this.state.isdisabled}>
                                                <option>Select a country...</option>
                                                <option>United States</option>
                                                {/* <option>Russia</option>
                                                <option>Italy</option>
                                                <option>France</option>
                                                <option>Ukraine</option>
                                                <option>Germany</option>
                                                <option>Australia</option> */}
                                            </select>
                                            <div style={{color:"red"}}>{formErrors.country}</div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="checkout-postcode">Postcode / ZIP</label>
                                            <input type="text" className="form-control" id="checkout-postcode" name="zip" onChange={this.handleChange}
                                                    value={formValues.zip} disabled={this.state.isdisabled} placeholder="Zip"/>
                                            <div style={{color:"red"}}>{formErrors.zip}</div>
                                        </div>

                                        {/* <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label htmlFor="checkout-email">Email address</label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="checkout-email"
                                                    placeholder="Email address"
                                                />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="checkout-phone">Phone</label>
                                                <input type="text" className="form-control" id="checkout-phone" placeholder="Phone" />
                                            </div>
                                        </div> */}

                                        {/* <div className="form-group">
                                            <div className="form-check">
                                                <span className="form-check-input input-check">
                                                    <span className="input-check__body">
                                                        <input className="input-check__input" type="checkbox" id="checkout-create-account" />
                                                        <span className="input-check__box" />
                                                        <Check9x7Svg className="input-check__icon" />
                                                    </span>
                                                </span>
                                                <label className="form-check-label" htmlFor="checkout-create-account">
                                                    Create an account?
                                                </label>
                                            </div>
                                        </div> */}
                                    </div>
                                    {/* <div className="card-divider" />
                                    <div className="card-body">
                                        <h3 className="card-title">Shipping Details</h3>

                                        <div className="form-group">
                                            <div className="form-check">
                                                <span className="form-check-input input-check">
                                                    <span className="input-check__body">
                                                        <input className="input-check__input" type="checkbox" id="checkout-different-address" />
                                                        <span className="input-check__box" />
                                                        <Check9x7Svg className="input-check__icon" />
                                                    </span>
                                                </span>
                                                <label className="form-check-label" htmlFor="checkout-different-address">
                                                    Ship to a different address?
                                                </label>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="checkout-comment">
                                                Order notes
                                                {' '}
                                                <span className="text-muted">(Optional)</span>
                                            </label>
                                            <textarea id="checkout-comment" className="form-control" rows="4" />
                                        </div>
                                    </div> */}
                                </div>
                            </div>

                            <div className="col-12 col-lg-6 col-xl-5 mt-4 mt-lg-0">
                                <div className="card mb-0">
                                    <div className="card-body">
                                        <h3 className="card-title">Your Order</h3>

                                        {this.renderCart()}

                                        {this.renderPaymentsList()}

                                        <div className="checkout__agree form-group">
                                            <div className="form-check">
                                                <span className="form-check-input input-check">
                                                    <span className="input-check__body">
                                                        <input className="input-check__input" type="checkbox" id="checkout-terms" defaultChecked/>
                                                        <span className="input-check__box" />
                                                        <Check9x7Svg className="input-check__icon" />
                                                    </span>
                                                </span>
                                                <label className="form-check-label" htmlFor="checkout-terms">
                                                    I have read and agree to the website
                                                    <Link to="site/terms"> terms and conditions</Link>
                                                    *
                                                </label>
                                            </div>
                                        </div>

                                        {this.state.isdisabled 
                                        ? 
                                        <button type="button" className="btn btn-primary btn-xl btn-block"onClick={()=>{this.placeOrder()}}>
                                            {isSubmitting ? <span><div className="spinner-border text-warning spinner-border-xl" role="status" aria-hidden="true"><span className="sr-only"></span></div> Please wait...</span> : "Place Order"}</button>
                                        :
                                        <button type="submit" className="btn btn-primary btn-xl btn-block">
                                            {isSubmitting ? <span><div className="spinner-border text-warning spinner-border-xl" role="status" aria-hidden="true"><span className="sr-only"></span></div> Please wait...</span> : "Place Order"}</button>    
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    cart: state.cart,
    address:state.address,
    order:state.order.orderPlaced,
    // order_code:state.order.orderPlaced.order_code,
    // return {
    //    }
});

const mapDispatchToProps = {
    getDefaultAddressTrueFalse,
    placeOrderAction,
    clearCode,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopPageCheckout);
