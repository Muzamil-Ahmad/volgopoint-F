/* eslint-disable */
import axios from 'axios';
import { apiUrl, authAxios } from '../config/config';

export  async function addProductToCart(slug, quan) {
  try { 
    let data = {slug, quan};
    // console.log(data)
    const response =  await authAxios.post(apiUrl + "order/add-to-cart", data);
    if(response.status=== 201){
      return response.data;
    }
  } catch (error) {
    if (error.response.status === 409) {
      return error.response.data;
    }
  }
}

export  async function getCartItems() {
  try {
    const response =  await authAxios.get(apiUrl + "order/get-orders-from-cart");
    // console.log(response);
    return response.data;
  } catch (error) {
  }
}

export  async function removeCartItem(id) {
  try {
    const response =  await authAxios.delete(apiUrl + "order/remove-from-cart/" + id);
    return response.data;
  } catch (error) {
  }
}

export  async function placeOrder() {
  try {
    const response =  await authAxios.post(apiUrl + "buyer/orders");
    return response.data;
  } catch (error) {
  }
}

export  async function changeProductQuan(id, quantity) {
  try {
    let obj = {id, quantity};
    const response =  await authAxios.post(apiUrl + "order/change-product-quantity", obj);
    if(response.status === 201){
      return response;
    }
  } catch (error) {
    if (error.response.status === 409) {
      return error.response.data;
    }
  }
}