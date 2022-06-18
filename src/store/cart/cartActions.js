/* eslint-disable */
import { toast } from 'react-toastify';
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_UPDATE_QUANTITIES } from './cartActionTypes';
import {addProductToCart, getCartItems, changeProductQuan, removeCartItem} from '../../api/cart';
import { ADD_PRODUCT_TO_CART_ERROR } from "./cartActionTypes"

export function cartAddItemSuccess(product, options = [], quantity = 1) {
    toast.success(`Product "${product.name}" added to cart!`);

    return {
        type: CART_ADD_ITEM,
        product,
        options,
        quantity,
    };
}

export function cartRemoveItemSuccess(itemId) {
    return {
        type: CART_REMOVE_ITEM,
        itemId,
    };
}

export function cartUpdateQuantitiesSuccess(quantities) {
    return {
        type: CART_UPDATE_QUANTITIES,
        quantities,
    };
}

export function cartAddItem(product, options = [], quantity = 1) {
    // sending request to server, timeout is used as a stub
    return (dispatch) => (
        new Promise((resolve) => {
            setTimeout(() => {
                dispatch(cartAddItemSuccess(product, options, quantity));
                resolve();
            }, 500);
        })
    );
}

export function cartRemoveItem(itemId) {
    // sending request to server, timeout is used as a stub
    return (dispatch) => (
        new Promise((resolve) => {
            setTimeout(() => {
                dispatch(cartRemoveItemSuccess(itemId));
                resolve();
            }, 500);
        })
    );
}

export function cartUpdateQuantities(quantities) {
    // sending request to server, timeout is used as a stub
    return (dispatch) => (
        new Promise((resolve) => {
            setTimeout(() => {
                dispatch(cartUpdateQuantitiesSuccess(quantities));
                resolve();
            }, 500);
        })
    );
}

//new code for adding an item to cart added by Sami Ullah
export const addProductsToCartServer = (type, slug, quan) => {
    return async(dispatch) => {
        const data = await addProductToCart(slug, quan);
        if(data.message !== "Product Already in cart"){
            toast.success("Added to Cart");
            dispatch({ type: type, value: data.count });
        }else{
            toast.warn("Already in Cart");
            dispatch({ type: ADD_PRODUCT_TO_CART_ERROR, value: data.count  });
        }
    };
};

export const cartAction = (type) => {
    return async (dispatch) => {
        const data = await getCartItems();
        if(data !== undefined){
            dispatch({ type: type, value: data });
        }
    };
};

export const removeProductAfterLogin = (type, id) => {
    return async (dispatch) => {
        const data = await removeCartItem(id);
        if(data.message === 'Product deleted'){
            dispatch({ type: type, id: id, });
        }
    };
};

export const placeOrderAction =  (type) => {
    return async(dispatch) => {
        const data = await placeOrder();
        if(data.result === "success"){
            dispatch({ type: type, value: data.data.order_code });
        }
    };
};

export const changeProductQuantityAfterLogin =  (type, item, quan) => {
    return async(dispatch) => {
        const data = await changeProductQuan(item, quan);
        if(data.status === 201){
            dispatch({ type: type, quan:data.data.quantity, id:item, subtotal:data.data.subtotal, total:data.data.total });
        }
    };
  };