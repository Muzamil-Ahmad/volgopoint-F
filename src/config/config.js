/* eslint-disable */
import axios from "axios";

// const apiUrl = "http://www.brothercart.us/api/";
// const apiUrlImage = "http://www.brothercart.us/public/img/";
// const apiUrlImageProduct = "http://www.brothercart.us/uploads/";


const apiUrl = "http://localhost:8000/api/";
const apiUrlImage = "http://localhost:8000/img/";
const apiUrlImageProduct = "http://localhost:8000/uploads/";

const config = {
  baseURL: apiUrl,
  // headers: { Authorization: `Bearer ${localStorage.getItem("user_token")}` },
  // headers: {
  //   'Content-Type': 'application/json',
  // },
};

const authAxios = axios.create(config);

authAxios.interceptors.request.use(function (config) {
  config.headers.Authorization =  localStorage.getItem("user_token") ? `Bearer ${localStorage.getItem("user_token")}` : ``;
  return config;
});

export { apiUrl, apiUrlImage, authAxios, apiUrlImageProduct };
/* eslint-enable */
