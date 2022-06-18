/* eslint-disable */
// react
import React, { useState } from 'react';

// third-party
import { Helmet } from 'react-helmet-async';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';

// application
import PageHeader from '../shared/PageHeader';

// data stubs
import theme from '../../data/theme'; 
import { TRACK_ORDER } from '../../store/order/orderActionTypes';
import { trackOrderAction } from '../../store/order/orderActions';

function ShopPageTrackOrder({trackOrder,OrderInfo}) {
    const [ status,setStatus ] = useState(0);
    let labelColor=(status==0)?"":"text-warning";
    // setStatus(false);
    const formik = useFormik({
        initialValues: {
            trackOrderID: '',
            trackOrderEmail: '',
        },
        validationSchema: Yup.object({
            trackOrderEmail: Yup.string()
                .email('Email is invalid')
                .required('Email is required'),
           trackOrderID: Yup.string()
                .required('Order ID is required'),
        }),
        onSubmit: (values) => {
            // setIsLoading(true);
            trackOrder(values);
            setTimeout(() => {
                setStatus(0);
            }, 5000);
            setStatus(1);
        },
    });
    // if(OrderInfo['result']=='success'){
    //      setStatus(1);
    // }
    const breadcrumb = [
        { title: 'Home', url: '' },
        { title: 'Track Order', url: '' },
    ];

    return (
        <React.Fragment>
            <Helmet>
                <title>{`Track Order — ${theme.name}`}</title>
            </Helmet>

            <PageHeader breadcrumb={breadcrumb} />

            <div className="block">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-5 col-lg-6 col-md-8">
                            <div className="card flex-grow-1 mb-0 mt-lg-4 mt-md-3 mt-2">
                                <div className="card-body">
                                    <div className="card-title text-center"><h1 className="pt-lg-0 pt-2">Track Order</h1></div>
                                    <p className={"mb-4 pt-2 "+labelColor}>
                                    {(status==0)?"Please enter your OrderID and valid E-mail ID":OrderInfo['orderStatus']}
                                   </p>
                                    <form onSubmit={formik.handleSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="track-order-id">Order ID</label>
                                            <input 
                                                id="trackOrderID" 
                                                type="text"
                                                name="trackOrderID" 
                                                onChange={formik.handleChange} 
                                                onBlur={formik.handleBlur} 
                                                className="form-control" 
                                                placeholder="Order ID" 
                                            />
                                            {formik.touched.trackOrderID && formik.errors.trackOrderID ? (
                                            <p className="error">
                                                {formik.errors.trackOrderID}
                                            </p>
                                            ) : null}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="track-email">Email address</label>
                                            <input
                                                id="trackOrderEmail" 
                                                type="email"
                                                name="trackOrderEmail" 
                                                className="form-control" 
                                                placeholder="Email address" 
                                                onChange={formik.handleChange} 
                                                onBlur={formik.handleBlur}
                                             />
                                             {formik.touched.trackOrderEmail && formik.errors.trackOrderEmail ? (
                                            <p className="error">
                                                {formik.errors.trackOrderEmail}
                                            </p>
                                            ) : null}
                                        </div>
                                        <div className="pt-3">
                                            <button type="submit" className="btn btn-primary btn-lg btn-block">Track</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
const mapStateToProps = (state) => {
    return ({
        OrderInfo : state.order.trackOrderInfo,
    });
}

const mapDispatchToProps = (dispatch) => ({
    trackOrder: (data) => dispatch(trackOrderAction(TRACK_ORDER, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPageTrackOrder);
/* eslint-enable */
