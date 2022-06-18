/* eslint-disable */
import * as actionTypes from './homeActionTypes.js';

const initalState={
    category: null,
    error: true,
    search: null,
    carousal: null,
    offers: null,
}

const homeReducer = ( state = initalState, action ) => {
    switch ( action.type ) {
        case actionTypes.GET_CAROUSAL_ITEMS: 
            return { ...state, carousal:action.value, error:false};
        default: return state;
    }
}
export default homeReducer

/* eslint-enable */
