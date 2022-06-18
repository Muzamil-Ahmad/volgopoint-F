/* eslint-disable */
import { placeOrder,trackOrder } from "../../api/order";

export const placeOrderAction =  (type, value) => {
    return async(dispatch) => {
        const data = await placeOrder(value);
        if(data.result === "success"){
            dispatch({ type: type, value: data.data });
        }
    };
};

export const clearCode =  (type, value) => {
    return async(dispatch) => {
        dispatch({ type: type });
    };
};

export const getMyPlacedOrders = (type) => {
    return async(dispatch) => {
        dispatch({ type: type });
    };
};

export const trackOrderAction = (type, value) => {
    return async(dispatch) => {
        const data = await trackOrder(value);
        dispatch({ type: type, value:data });
    };
};