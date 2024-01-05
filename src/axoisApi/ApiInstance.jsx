import axios from "axios";

const API = axios.create({
  baseURL: "https://fastapi-todo.vercel.app",
  timeout: 20000,
  headers: { "X-Custom-Header": "foobar" },
});
// const instance2 = axios.create({
//   baseURL: "https://jsonplaceholder.typicode.com",
//   timeout: 20000,
//   headers: { "X-Custom-Header": "foobar" },
// });
// Add a request interceptor
API.interceptors.request.use(
  function (config) {
    console.log("req");
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
API.interceptors.response.use(
  function (response) {
    console.log("res");
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
export  { API };
