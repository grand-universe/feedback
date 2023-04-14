import axios from "axios";
axios.defaults.timeout = 1000000;

axios.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return Promise.resolve(response.data);
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    if (error.response.data.data.status > 500) {
      console.error(
        "服务器开小差了，请稍后再试！" + error.response.data.data.status
      );
    }
    return Promise.reject(error);
  }
);

export default axios;
