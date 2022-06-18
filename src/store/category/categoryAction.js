/* eslint-disable */
import { getCategories } from '../../api/home';

export const categoryAction = (type, values) => {
    return async(dispatch) => {
      const data = await getCategories();
      dispatch({ type: type, value: data });
    };
};

/* eslint-enable */
