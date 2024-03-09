import axios from "axios";

// 创建一个axios实例
const service = axios.create({
  baseURL: "/api",
  timeout: 6000,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
});

service.interceptors.response.use(
  function (response) {
    // console.log(response);
    return response;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }


)

export default service;
