/* eslint-disable */
import axios from 'axios';
import { apiUrl, authAxios } from '../config/config';

export  async function getProduct(data) {
    try {
      const response =  await axios.post(apiUrl + "buyer/getProductBySlug/" + data);
      return response.data.data;
    } catch (error) {
    }
  }

  export  async function getProductReviewAction(data) {
    try {
      const response =  await axios.get(apiUrl + "buyer/productReviewsBySlug/" + data);
      return response.data.data;
    } catch (error) {
    }
  }