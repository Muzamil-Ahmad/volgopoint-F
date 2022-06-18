/* eslint-disable */
import * as actionTypes from './orderActionTypes';

const initalState={
    orderPlaced: null,
    trackOrderInfo:null,
}

const productReducer = ( state = initalState, action ) => {
    switch ( action.type ) {
        case actionTypes.PLACE_ORDER:
            return { ...state, orderPlaced:action.value };
        case actionTypes.CLEAR_ORDER:
            return { ...state, orderPlaced: null };
        case actionTypes.GET_MY_PLACED_ORDERS:
            return { ...state };
        case actionTypes.TRACK_ORDER:
            return { ...state,trackOrderInfo:action.value };
        default: return state;
    }
}

export default productReducer