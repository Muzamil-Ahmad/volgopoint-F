/* eslint-disable */
import * as actionTypes from './authActionTypes';

const initalState={
    login: null,
    error: false,
    data: null,
    signup:null,
    message:null,
}

const authReducer = ( state = initalState, action ) => {
    switch ( action.type ) {
        case actionTypes.LOGIN: 
            return { ...state, login:action.value, error:false};
        case actionTypes.LOGOUT:
            return { ...state, login: null, data:action.value, error:false };
        case actionTypes.LOGIN_ERROR:
            return { ...state, login: null, error:true};
        case actionTypes.SIGNUP:
            return { ...state,signup:action.value,error:false};
        case actionTypes.SIGNUP_ERROR:
            return { ...state,message:action.value,error:true};
        case actionTypes.CLEAR_MSG:
            return { ...state,message:null,signup:null, error:false};
        default: return state;
    }
}

export default authReducer
/* eslint-enable */
