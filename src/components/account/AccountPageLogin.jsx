/* eslint-disable */
// react
import React,{useEffect} from 'react';

// third-party
import { Helmet } from 'react-helmet-async';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { LOGIN, SIGNUP, CLEAR_MSG } from '../../store/auth/authActionTypes';
//  store/auth/authActionTypes"
import { loginAction, registerAction,clearAction } from '../../store/auth/authAction';

// application
import PageHeader from '../shared/PageHeader';
import { Check9x7Svg } from '../../svg';

// data stubs
import theme from '../../data/theme';

function AccountPageLogin({
    setLogin,
    setRegister,
    loginInfo,
    authError,
    signup,
    clearMsg,
}) {
    if (loginInfo !== null) {
        return <Redirect to="/" />;
    }
    useEffect(() => {
        clearMsg();

        return () => {
            
        }
    }, [])

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
        onSubmit: (values) => {
            // setIsLoading(true);
            setLogin(values);
        },
    });
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const formik1 = useFormik({
        initialValues: {
            name: '',
            email: '',
            phonenumber: '',
            password: '',
            confirmpassword: '',
        },
        validationSchema: Yup.object({
            name: Yup.string('Name is invalid')
                .min(4, 'name must be at least 4 characters')
                .required('Name is required'),
            email: Yup.string()
                .email('Email is invalid')
                .required('Email is required'),
            phonenumber: Yup.string().required('phone number is required').min(8, 'phone no must be at least 8 digits').matches(phoneRegExp, 'Phone number is not valid'),
            password: Yup.string()
                .min(8, 'Password must be at least 8 characters')
                .required('Password is required'),
            confirmpassword: Yup.string().required('Password confirmation is required')
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
        }),
        onSubmit: (values, {resetForm}) => {
            // setIsLoading(true);
            setRegister(values);
            resetForm();
        },
    });

    const breadcrumb = [
        { title: 'Home', url: '' },
        { title: 'My Account', url: '' },
    ];

    return (
        <React.Fragment>
            <Helmet>
                <title>{`Login — ${theme.name}`}</title>
            </Helmet>

            <PageHeader header="My Account" breadcrumb={breadcrumb} />

            <div className="block">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 d-flex">
                            <div className="card flex-grow-1 mb-md-0">
                                <div className="card-body">
                                    <h3 className="card-title">Login</h3>
                                    {authError ? <p className="error">Wrong Username or Password :(</p> : ''}
                                    <form onSubmit={formik.handleSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="login-email">Email address</label>
                                            <input
                                                id="login-email"
                                                type="email"
                                                name="email"
                                                className="form-control"
                                                placeholder="Enter email"
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
                                            <label htmlFor="login-password">Password</label>
                                            <input
                                                id="login-password"
                                                type="password"
                                                className="form-control"
                                                placeholder="Password"
                                                name="password"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.password && formik.errors.password ? (
                                            <p className="error">
                                                {formik.errors.password}
                                            </p>
                                            ) : null}
                                            <small className="form-text text-muted">
                                                <Link to="/">Forgotten Password</Link>
                                            </small>
                                        </div>
                                        <div className="form-group">
                                            <div className="form-check">
                                                <span className="form-check-input input-check">
                                                    <span className="input-check__body">
                                                        <input
                                                            id="login-remember"
                                                            type="checkbox"
                                                            className="input-check__input"
                                                        />
                                                        <span className="input-check__box" />
                                                        <Check9x7Svg className="input-check__icon" />
                                                    </span>
                                                </span>
                                                <label className="form-check-label" htmlFor="login-remember">
                                                    Remember Me
                                                </label>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-primary mt-2 mt-md-3 mt-lg-4">
                                            Login
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 d-flex mt-4 mt-md-0">
                            <div className="card flex-grow-1 mb-0">
                                <div className="card-body">
                                    <h3 className="card-title">Register</h3>
                                    {signup ? <p className="error">Account Created :)</p> : ''}
                                    <form onSubmit={formik1.handleSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="register-name">Name</label>
                                            <input
                                                id="register-name"
                                                type="name"
                                                className="form-control"
                                                name="name"
                                                placeholder="Enter name"
                                                onChange={formik1.handleChange}
                                                onBlur={formik1.handleBlur}
                                            />
                                            {formik1.touched.name && formik1.errors.name ? (
                                            <p className="error">
                                                {formik1.errors.name}
                                            </p>
                                            ) : null}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="register-email">Email address</label>
                                            <input
                                                id="register-email"
                                                type="email"
                                                className="form-control"
                                                name="email"
                                                placeholder="Enter email"
                                                onChange={formik1.handleChange}
                                                onBlur={formik1.handleBlur}
                                            />
                                            {formik1.touched.email && formik1.errors.email ? (
                                            <p className="error">
                                                {formik1.errors.email}
                                            </p>
                                            ) : null}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="register-phonenumber">Phone no</label>
                                            <input
                                                id="register-phonenumber"
                                                type="phonenumber"
                                                className="form-control"
                                                name="phonenumber"
                                                placeholder="Enter phone number"
                                                onChange={formik1.handleChange}
                                                onBlur={formik1.handleBlur}
                                            />
                                            {formik1.touched.phonenumber && formik1.errors.phonenumber ? (
                                            <p className="error">
                                                {formik1.errors.phonenumber}
                                            </p>
                                            ) : null}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="register-password">Password</label>
                                            <input
                                                id="register-password"
                                                type="password"
                                                className="form-control"
                                                name="password"
                                                placeholder="Password"
                                                onChange={formik1.handleChange}
                                                onBlur={formik1.handleBlur}
                                            />
                                            {formik1.touched.password && formik1.errors.password ? (
                                            <p className="error">
                                                {formik1.errors.password}
                                            </p>
                                            ) : null}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="register-confirm">Repeat Password</label>
                                            <input
                                                id="register-confirm"
                                                type="password"
                                                className="form-control"
                                                name="confirmpassword"
                                                placeholder="Password"
                                                onChange={formik1.handleChange}
                                                onBlur={formik1.handleBlur}
                                            />
                                            {formik1.touched.confirmpassword && formik1.errors.confirmpassword ? (
                                            <p className="error">
                                                {formik1.errors.confirmpassword}
                                            </p>
                                            ) : null}
                                        </div>
                                        <button type="submit" className="btn btn-primary mt-2 mt-md-3 mt-lg-4">
                                            Register
                                        </button>
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
        loginInfo: state.auth.login,
        authError: state.auth.error,
        signup: state.auth.signup
    });
}

const mapDispatchToProps = (dispatch) => ({
    setLogin: (data) => dispatch(loginAction(LOGIN, data)),
    setRegister: (data) => dispatch(registerAction(SIGNUP, data)),
    clearMsg: () => dispatch(clearAction(CLEAR_MSG)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountPageLogin);
/* eslint-enable */
