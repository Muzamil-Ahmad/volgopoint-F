/* eslint-disable */
import { getDefaultAddressInfo } from '../../api/address';

//new code for adding an item to cart added by Sami Ullah
export const getDefaultAddressTrueFalse = (type) => {
    return async(dispatch) => {
        const data = await getDefaultAddressInfo();
        if(data.user_id){
            dispatch({ type: type });
        }else{
            dispatch({ type: "NO_DEFAULT_ADDRESS_FOUND"});
        }
    };
};