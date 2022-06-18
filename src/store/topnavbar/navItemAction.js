/* eslint-disable */
import { getNavItemAction } from '../../api/home';

export const navItemAction = (type) => {
    return async(dispatch) => {
      const data = await getNavItemAction();
      dispatch({ type: type, value: data.data.data });
    };
};
/* eslint-enable */
