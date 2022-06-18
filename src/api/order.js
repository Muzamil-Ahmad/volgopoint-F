/* eslint-disable */
import axios from 'axios';
import { apiUrl, authAxios } from '../config/config';

export  async function placeOrder(data) {
  try {
    // console.log(data);
    const response = await authAxios.post(apiUrl + "buyer/orders", data);
    return response.data;
  } catch (error) {
  }
}

export  async function getMyOrders() {
    try {
      const response =  await authAxios.get(apiUrl + "buyer/myorders");
      return response.data;
    } catch (error) {
    }
  }
  
export  async function cancelOrder(id) {
    try {
      // console.log(id);
      const response =  await authAxios.post(apiUrl + "buyer/cancelorder/", id);
      return response.data;
    } catch (error) {
    }
  }

  export async function trackOrder(orderData) {
    try {
      const response =  await axios.post(apiUrl + "buyer/trackorder", orderData);
      return response.data;
    } catch (error) {
    }
  }