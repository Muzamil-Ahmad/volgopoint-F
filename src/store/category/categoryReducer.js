/* eslint-disable */
import * as actionTypes from './categoryActionTypes';

const initalState={
    category: null,
    error: true,
    search: null,
}

const categoryReducer = ( state = initalState, action ) => {
    switch ( action.type ) {
        case actionTypes.GET_CATEGORIES: 
            return { ...state, category:action.value, error:false};
        default: return state;
    }
}
export default categoryReducer
/* eslint-enable */
