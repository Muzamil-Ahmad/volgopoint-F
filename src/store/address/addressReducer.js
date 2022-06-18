/* eslint-disable */
import * as actionTypes from './addressActionTypes';


const initialState = {
    defaultAddress : false,
};

export default function cartReducer(state = initialState, action) {
    switch (action.type) {
    case actionTypes.GET_DEFAULT_ADDRESS_TRUE_FALSE:
        return {...state, defaultAddress: true }
    case 'NO_DEFAULT_ADDRESS_FOUND':
        return {...state, defaultAddress: false }
    default:
        return state;
    }
}
