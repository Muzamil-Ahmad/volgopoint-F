/* eslint-disable */
// react
import React from 'react';

// third-party
import { Helmet } from 'react-helmet-async';
// formik
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';

import { CONTACT } from '../../store/contact/contactActionTypes';

import { contactAction } from '../../store/contact/contactAction';
// application
import PageHeader from '../shared/PageHeader';

// blocks
import BlockMap from '../blocks/BlockMap';
// data stubs
import theme from '../../data/theme';
/* eslint-disable */
function SitePageContactUs({sendEmail,messageOutput}) {
    const messageOutput2 = useRef(messageOutput);
   
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            subject: '',
            message:'',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Email is invalid')
                .required('Email is required'),
            subject: Yup.string()
                .required('Subject is required'),
            name: Yup.string()
                .required('Name is required'),
            message: Yup.string()
                .min(8, 'Message must be at least 8 characters')
                .required('Message is required'),
        }),
        onSubmit: (values) => {
            sendEmail(values);
        },
    });
    const breadcrumb = [
        { title: 'Home', url: '' },
        { title: 'Contact Us', url: '' },
    ];
    
    return (
    <React.Fragment>
            <Helmet>
                <title>{`Contact Us — ${theme.name}`}</title>
            </Helmet>

            <BlockMap />

            <PageHeader header="Contact Us" breadcrumb={breadcrumb} />

            <div className="block">
                <div className="container">
                    <div className="card mb-0">
                        <div className="card-body contact-us">
                            <div className="contact-us__container">
                                <div className="row">
                                    <div className="col-12 col-lg-6 pb-4 pb-lg-0">
                                        <h4 className="contact-us__header card-title">Our Address</h4>

                                        <div className="contact-us__address">
                                            <p>
                                                113 Barnum street Westbabylon New York-11704
                                                <br />
                                                Email: support@brothercart.us
                                                <br />
                                                Phone Number: +1(855) 241 1209, +1(855) 241 1209
                                            </p>

                                           

                                            <p>

                                                <strong>Comment</strong>
                                                <br />
                                                BrotherCart is one of the leading company in providing quality products.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="col-12 col-lg-6">
                                        <h4 className="contact-us__header card-title">Leave us a Message</h4>
                                        <form onSubmit={formik.handleSubmit}>
                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="form-name">Your Name</label>
                                                    <input type="text" name="name" id="form-name" className="form-control" placeholder="Your Name" onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur} />
                                                         {formik.touched.name && formik.errors.name ? (
                                                        <p className="error">
                                                            {formik.errors.name}
                                                        </p>
                                                    ) : null}
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="form-email">Email</label>
                                                    <input
                                                        type="email"
                                                        id="form-email"
                                                        name="email"
                                                        className="form-control"
                                                        placeholder="Email Address"
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
                                                    <label htmlFor="form-subject">Subject</label>
                                                    <input
                                                        type="text"
                                                        id="form-subject"
                                                        name="subject"
                                                        className="form-control"
                                                        placeholder="Subject"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                    />
                                                     {formik.touched.subject && formik.errors.subject ? (
                                                        <p className="error">
                                                            {formik.errors.subject}
                                                        </p>
                                                    ) : null}
                                                </div>
                                            
                                                <div className="form-group">
                                                   <label htmlFor="form-message">Message</label>
                                                   <textarea id="form-message" name="message" className="form-control" rows="4" onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}/>
                                                         {formik.touched.message && formik.errors.message ? (
                                                        <p className="error">
                                                            {formik.errors.message}
                                                        </p>
                                                    ) : null}
                                                </div>
                                            <button type="submit" className="btn btn-primary">Send Message</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </React.Fragment>
    );
}
const mapStateToProps = (state) => ({
    messageOutput: state.contact.message && state.contact.message !== null ? state.contact.message : 'No message  sent!',
});
const mapDispatchToProps = (dispatch) => ({
    sendEmail: (data) => dispatch(contactAction(CONTACT, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SitePageContactUs);

/* eslint-enable */
