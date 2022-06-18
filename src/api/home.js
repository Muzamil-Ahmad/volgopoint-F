/* eslint-disable */
import axios from 'axios';
import { apiUrl } from '../config/config';

export async function getCarousal(data) {
    try {
      const response =  await axios.get(apiUrl + 'carousals');
      return response.data.data;
    } catch (error) {
    }
}
export async function getCategories(data) {
  try {
    const data =  await axios.get(apiUrl + "buyer/categories");
    return data.data.data;
  } catch (error) {
    if (error.response.status === 401) {
      return error.response.data;
    }
  }
}
export async function getPopularProducts(options = {}) {
  try {
    const data =  await axios.post(apiUrl + "buyer/popularProducts",options);
    return data;
  } catch (error) {
    if (error.response.status === 401) {
      return error.response.data; 
    }
  }
}
export async function getNavItemAction() {
  try {
    const data =  await axios.post(apiUrl + "buyer/getNavItemlist");
    return data;
  } catch (error) {
    if (error.response.status === 401) {
      return error.response.data; 
    }
  }
}
 /* eslint-enable */
