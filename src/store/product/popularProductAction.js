/* eslint-disable */
import { getPopularProducts } from '../../api/home';

export const popularProductsAction = (type,options) => {
    return async(dispatch) => {
      const data = await getPopularProducts(options);
      dispatch({ type: type, value: data.data.data });
    };
};

/* eslint-enable */
