/* eslint-disable */
import { getProduct,getProductReviewAction } from '../../api/product';

export const singleProductAction = (type, values) => {
    return async(dispatch) => {
      const data = await getProduct(values);
      dispatch({ type: type, value: data });
    };
};

export const productAction = (type, values) => {
    return async(dispatch) => {
        const data = await getProducts(values);
        dispatch({ type: type, value: data.data });
    };
};

export const productReviewAction = (type, values) => {
    return async(dispatch) => {
        const data = await getProductReviewAction(values);
        dispatch({ type: type, value: data });
    };
};

