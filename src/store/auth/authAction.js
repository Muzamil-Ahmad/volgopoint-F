/* eslint-disable */
import loginUser, { logoutUser, signupUser } from '../../api/auth';
import { LOGIN_ERROR, SIGNUP_ERROR, RESET_CART_AFTER_LOGOUT } from '../auth/authActionTypes'

export const registerAction = (type, values) => {
  return async (dispatch) => {
    const data = await signupUser(values);
    console.log(data);
      if( data !== null || data !== undefined){
        console.log("dsdas")
        dispatch({ type: type, value: data.data });
      }else{
        dispatch({ type: SIGNUP_ERROR, value: data.message  });
      }
  };
};

export const loginAction = (type, values) => {
  return async (dispatch) => {
    const data = await loginUser(values);
    // console.log("dsadasd",values);
    if(data.message !== "Unauthorized"){
      localStorage.setItem("user_token", data.data.access_token);
      localStorage.setItem("username", data.data.user.name);
      dispatch({ type: type, value: data.data.user });
    }else{
      // return data.message;
      dispatch({ type: LOGIN_ERROR, value: data.message  });
    }
    // localStorage.setItem("user_type", data.data.role.role);
  };
};

export const logoutAction = (type, values) => {
  return async (dispatch) => {
    if(localStorage.getItem("user_token") !==null){
      const data = await logoutUser();
      if(data.status===200){
        localStorage.removeItem("user_token");
        localStorage.removeItem("username");
        let status = true;
        dispatch({ type: type, value : status});
        dispatch({ type: RESET_CART_AFTER_LOGOUT, value : 0});
      }
    }
  };
};

export const clearAction = (type) => {
  return async (dispatch) => {
        dispatch({ type: type });
      }
};
/* eslint-enable */
