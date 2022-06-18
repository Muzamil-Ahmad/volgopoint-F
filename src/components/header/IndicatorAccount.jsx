// react
import React from 'react';

// third-party
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { logoutAction, loginAction } from '../../store/auth/authAction';
import { LOGOUT, LOGIN } from '../../store/auth/authActionTypes';
//  store/auth/authActionTypes"
// application
import Indicator from './Indicator';
import { Person20Svg } from '../../svg';

/* eslint-disable */
function IndicatorAccount({setLogout, logoutInfo, setLogin, authError, loginInfo}) {
    
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Email is invalid')
                .required('Email is required'),
            password: Yup.string()
                .min(8, 'Password must be at least 8 characters')
                .required('Password is required'),
        }),
        onSubmit: (values,props) => {
            // setIsLoading(true);
            setLogin(values);
            props.resetForm();
        },
    });

    const dropdown = (
        <div className="account-menu">
            {localStorage.getItem("user_token") === null ?
            <>
            <form className="account-menu__form" onSubmit={formik.handleSubmit}>
                <div className="account-menu__form-title">Log In to Your Account</div>
                <div className="form-group">
                    <label htmlFor="header-signin-email" className="sr-only">Email address</label>
                    <input
                        id="header-signin-email"
                        type="email"
                        name="email"
                        className="form-control form-control-sm"
                        placeholder="Email address"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email ? (
                    <p className="error">
                        {formik.errors.email}
                    </p>
                    ) : null}
                </div>
                <div className="form-group">
                    <label htmlFor="header-signin-password" className="sr-only">Password</label>
                    <div className="account-menu__form-forgot">
                        <input
                            id="header-signin-password"
                            type="password"
                            name="password"
                            className="form-control form-control-sm"
                            placeholder="Password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <Link to="/account/login" className="account-menu__form-forgot-link">Forgot?</Link>
                    </div>
                    {formik.touched.password && formik.errors.password ? (
                    <p className="error">
                        {formik.errors.password}
                    </p>
                    ) : null}
                </div>
                <div className="form-group account-menu__form-button">
                    <button type="submit" className="btn btn-primary btn-sm">Login</button>
                </div>
                <div className="account-menu__form-link">
                    <Link to="/account/login">Create An Account</Link>
                </div>
            </form> 
            <div className="account-menu__divider" />
            <ul className="account-menu__links">
                <li><Link to="/account/login">Login</Link></li>
            </ul>
            </>
            : <>
            <div className="account-menu__divider" />
            <Link to="/account/dashboard" className="account-menu__user">
                <div className="account-menu__user-avatar">
                    <img src="images/avatars/avatar-3.jpg" alt="" />
                </div>
                <div className="account-menu__user-info">
                    <div className="account-menu__user-name">Helena Garcia</div>
                    <div className="account-menu__user-email">stroyka@example.com</div>
                </div>
            </Link> 
            <div className="account-menu__divider" />
            <ul className="account-menu__links">
                <li><Link to="/account/profile">Edit Profile</Link></li>
                <li><Link to="/account/orders">Order History</Link></li>
                <li><Link to="/account/addresses">Addresses</Link></li>
                <li><Link to="/account/password">Password</Link></li>
            </ul>
            <div className="account-menu__divider" />
            <ul className="account-menu__links">
                <li><Link to="/account/login" onClick={setLogout}>Logout</Link></li>
            </ul></>}
        </div>
    );
    
    return (
        <Indicator url="/account" dropdown={dropdown} icon={<Person20Svg />} />
    );
}

const mapStateToProps = (state, value) => {
    return {
        loginInfo: state.auth.login,
        authError: state.auth.error,
        logoutInfo: state.auth.data,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setLogout: (data) => dispatch(logoutAction(LOGOUT)),
        setLogin: (data) => dispatch(loginAction(LOGIN, data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(IndicatorAccount);
/* eslint-enable */
