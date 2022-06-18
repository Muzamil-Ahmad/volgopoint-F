/* eslint-disable */
import contact  from '../../api/contact';
import { LOGIN_ERROR, SIGNUP_ERROR, RESET_CART_AFTER_LOGOUT } from '../auth/authActionTypes'

export const contactAction = (type, values) => {
    console.log("value from contact form",values);
  return async (dispatch) => {
    const data = await contact(values);
    console.log(data);
      if( data !== null || data !== undefined){
          dispatch({ type: type, value: data.data });
      }else{
        dispatch({ type: SIGNUP_ERROR, value: data.message  });
      }
  };
};

/* eslint-enable */
