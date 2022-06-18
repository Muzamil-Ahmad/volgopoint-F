/* eslint-disable */
import * as actionTypes from './popularProductActionTypes.js';
const initalState={
    products: null,
    error: true,
}

const popularProductReducer = ( state = initalState, action ) => {
    switch ( action.type ) {
        case actionTypes.GET_PRODUCTS: 
            return { ...state, products:action.value, error:false};
        default: return state;
    }
}
export default popularProductReducer

/* eslint-enable */
