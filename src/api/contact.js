/* eslint-disable */
import axios from 'axios';
import { apiUrl, authAxios } from '../config/config';

export default async function contact(data) {
    try {
		return await axios.post(apiUrl + 'auth/contact', data);
	} catch (error) {
		if (error.response.status === 401) {
		return error.response.data;
		}
	}
}


/* eslint-enable */
