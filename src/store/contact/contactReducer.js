/* eslint-disable */
import * as contactTypes from './contactActionTypes';

const initalState={
    message: "",
     result: "",
     status: "",
}

const contactReducer = (state = initalState, action) => {
   console.log("action here is", action);
    switch ( action.type ) {
        case contactTypes.CONTACT: 
            return { ...state,result:action.value.result, message:action.value.message, status:action.value.status};
        default: return state;
    }
}

export default contactReducer;
/* eslint-enable */
