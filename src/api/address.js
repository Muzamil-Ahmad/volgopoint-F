/* eslint-disable */
import axios from 'axios';
import { apiUrl, authAxios } from '../config/config';

export  async function getDefaultAddressInfo() {
    try { 
        const response =  await authAxios.get(apiUrl + "buyer/defaultAddress");
        if(response.status=== 200){
            return response.data;
        }
    } catch (error) {
        if (error.response.status === 409) {
            return error.response.data;
        }
    }
}