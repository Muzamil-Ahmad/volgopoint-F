/* eslint-disable */
import * as actionTypes from './productActionTypes';

const initalState={
    products: null,
    product: null,
    reviews:null,
    error: true,
    carousalProducts: null,
}

const productReducer = ( state = initalState, action ) => {
    switch ( action.type ) {
        // case actionTypes.GET_PRODUCTS:
        //     return { ...state, products:action.value, error:false, carousalProducts:null};
        case actionTypes.GET_SINGLE_PRODUCT_FOR_BUYER:
            return { ...state, product:action.value, error:false};
        case actionTypes.GET_PRODUCT_REVIEWS_FOR_BUYER:
            return { ...state, reviews:action.value, error:false};
        // case actionTypes.GET_CAROUSAL_PRODUCTS:
        //     return { ...state, carousalProducts:action.value,products:null};
        default: return state;
    }
}

export default productReducer