/* eslint-disable */
import { getCarousal } from '../../api/home';

export const carousalAction = (type) => {
    return async(dispatch) => {
      const data = await getCarousal();
      dispatch({ type: type, value: data });
    };
};

  /* eslint-enable */
