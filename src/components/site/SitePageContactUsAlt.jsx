// react
import React from 'react';

// third-party
import { Helmet } from 'react-helmet-async';

// application
import PageHeader from '../shared/PageHeader';

// data stubs
import theme from '../../data/theme';

function SitePageContactUsAlt() {
    const breadcrumb = [
        { title: 'Home', url: '' },
        { title: 'Contact Us', url: '' },
    ];

    return (
        <React.Fragment>
            <Helmet>
                <title>{`Contact Us Alt — ${theme.name}`}</title>
            </Helmet>

            <PageHeader header="Contact Us" breadcrumb={breadcrumb} />

            <div className="block">
                <div className="container">
                    <div className="card mb-0 contact-us">
                        <div className="contact-us__map">
                            <iframe
                                title="Google Map"
                                src="https://maps.google.com/maps?q=Holbrook-Palmer%20Park&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
                                frameBorder="0"
                                scrolling="no"
                                marginHeight="0"
                                marginWidth="0"
                            />
                        </div>
                        <div className="card-body">
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
                                                <strong>Opening Hours</strong>
                                                <br />
                                                Mon-Sat 10:00am - 7:00pm
                                            </p>

                                            <p>

                                                <strong>Comment</strong>
                                                <br />
                                                Lorem ipsum dolor sit amet, consectetur adipiscing
                                                elit. Curabitur suscipit suscipit mi, non tempor
                                                nulla finibus eget. Lorem ipsum dolor sit amet,
                                                consectetur adipiscing elit.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="col-12 col-lg-6">
                                        <h4 className="contact-us__header card-title">Leave us a Message</h4>

                                        <form>
                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="form-name">Your Name</label>
                                                    <input type="text" id="form-name" className="form-control" placeholder="Your Name" />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="form-email">Email</label>
                                                    <input
                                                        type="email"
                                                        id="form-email"
                                                        className="form-control"
                                                        placeholder="Email Address"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="form-subject">Subject</label>
                                                <input type="text" id="form-subject" className="form-control" placeholder="Subject" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="form-message">Message</label>
                                                <textarea id="form-message" className="form-control" rows="4" />
                                            </div>
                                            <button type="submit" className="btn btn-primary">Send Message</button>
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

export default SitePageContactUsAlt;
