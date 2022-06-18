/* eslint-disable */
import axios from 'axios';
import { apiUrl, authAxios } from '../config/config';

export default async function loginUser(data) {
    try {
		return await axios.post(apiUrl + 'auth/login', data);
	} catch (error) {
		if (error.response.status === 401) {
		return error.response.data;
		}
	}
}

export async function logoutUser() {
  try {
    return await authAxios.get(apiUrl + 'logout');
  } catch (error) {
  }
}

export async function signupUser(data) {
  try {
    return await axios.post(apiUrl + 'auth/signup', data);
  } catch (error) {
    if (error.response.status === 409) {
      return error.response.data;
    }
  }
}
/* eslint-enable */
