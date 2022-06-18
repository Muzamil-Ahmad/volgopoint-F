/* eslint-disable */
// react
import React, { Component } from 'react';

// third-party
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// application
import departmentsAria from '../../services/departmentsArea';
import languages from '../../i18n';
import StroykaSlick from '../shared/StroykaSlick';
import { carousalAction } from '../../store/home';
import { GET_CAROUSAL_ITEMS } from '../../store/home/homeActionTypes';
import { apiUrlImage } from "../../config/config";

const slickSettings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
};

class BlockSlideShow extends Component {
    departmentsAreaRef = null;
    

    media = window.matchMedia('(min-width: 992px)');

    slides = []
       

    componentDidMount() {
        const { getCarousalData } = this.props;
        getCarousalData();
        if (this.media.addEventListener) {
            this.media.addEventListener('change', this.onChangeMedia);
        } else {
            console.log('else');
            // noinspection JSDeprecatedSymbols
            this.media.addListener(this.onChangeMedia);
        }
    }

    componentWillUnmount() {
        departmentsAria.area = null;

        if (this.media.removeEventListener) {
            this.media.removeEventListener('change', this.onChangeMedia);
        } else {
            // noinspection JSDeprecatedSymbols
            this.media.removeListener(this.onChangeMedia);
        }
    }

    onChangeMedia = () => {
        if (this.media.matches) {
            departmentsAria.area = this.departmentsAreaRef;
        }
    };

    setDepartmentsAreaRef = (ref) => {
        this.departmentsAreaRef = ref;

        if (this.media.matches) {
            departmentsAria.area = this.departmentsAreaRef;
        }
    };

    render() {
        const { locale, withDepartments, carousalData } = this.props;
        this.slides=carousalData;
        const { direction } = languages[locale];


        const blockClasses = classNames(
            'block-slideshow block',
            {
                'block-slideshow--layout--full': !withDepartments,
                'block-slideshow--layout--with-departments': withDepartments,
            },
        );

        const layoutClasses = classNames(
            'col-12',
            {
                'col-lg-12': !withDepartments,
                'col-lg-9': withDepartments,
            },
        );

        const slides = this.slides && this.slides.map((slide, index) => {
            const image = (withDepartments ? slide.image_classic : slide.image_full)[direction];

            return (
                <div key={index} className="block-slideshow__slide">
                    <div
                        className="block-slideshow__slide-image block-slideshow__slide-image--desktop"
                        style={{
                            backgroundImage: `url(${apiUrlImage}${image})`,
                        }}
                    />
                    <div
                        className="block-slideshow__slide-image block-slideshow__slide-image--mobile"
                        style={{
                            backgroundImage: `${slide.image_mobile[direction]})`,
                        }}
                    />
                    <div className="block-slideshow__slide-content">
                        <div
                            className="block-slideshow__slide-title"
                            dangerouslySetInnerHTML={{ __html: slide.title }}
                        />
                        <div
                            className="block-slideshow__slide-text"
                            dangerouslySetInnerHTML={{ __html: slide.text }}
                        />
                        <div className="block-slideshow__slide-button">
                            <Link to="/" className="btn btn-primary btn-lg">Shop Now</Link>
                        </div>
                    </div>
                </div>
            );
        });

        return (
            <div className={blockClasses}>
                <div className="container">
                    <div className="row">
                        {withDepartments && (
                            <div className="col-3 d-lg-block d-none" ref={this.setDepartmentsAreaRef} />
                        )}

                        <div className={layoutClasses}>
                            <div className="block-slideshow__body">
                                <StroykaSlick {...slickSettings}>
                                    {slides}
                                </StroykaSlick>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

BlockSlideShow.propTypes = {
    withDepartments: PropTypes.bool,
    /** current locale */
    locale: PropTypes.string,
};

BlockSlideShow.defaultProps = {
    withDepartments: false,
};


const mapStateToProps = (state) => ({
    locale: state.locale,
    carousalData: state.home.carousal
});
const mapDispatchToProps = (dispatch) => {
    return {
       getCarousalData: () => dispatch(carousalAction(GET_CAROUSAL_ITEMS)),
    }
  };

export default connect(mapStateToProps,mapDispatchToProps)(BlockSlideShow);
/* eslint-enable */
