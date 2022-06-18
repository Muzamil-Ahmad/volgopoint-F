/* eslint-disable */
import * as actionTypes from './navItemActionTypes.js';

const initalState={
    items: null,
    error: true
}

const navReducer = ( state = initalState, action ) => {
    switch ( action.type ) {
        case actionTypes.GET_NAV_ITEMS: 
            return { ...state, items:action.value, error:false};
        default: return state;
    }
}
export default navReducer

/* eslint-enable */
