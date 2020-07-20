import Axios from "axios";
import { MyStore } from "../..";
import Swal from 'sweetalert2';
import { history } from "../history/history";

let axios = Axios.create({
  baseURL: "https://f2l-admin.herokuapp.com/",
  headers: { "Content-Type": "application/json" },
});

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  //get token  
  let token = JSON.parse(localStorage.getItem("admin_token"));
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    if(!error.response) {
      localStorage.clear();
      // history.push("/login");
      history.push('/login');
      MyStore.dispatch({
        type: "USER_LOG_OUT",
      });
    }
    else if (error.response.status === 401) {
      // alert(error.response);
      Swal.fire({
        title: 'Tài khoản của bạn đã hết hạn đăng nhập',
        text: 'Vui lòng đăng nhập lại',
        icon: "warning",
        confirmButtonText: 'OK'
      });
      localStorage.clear();
      // history.push("/login");
      history.push('/login');
      MyStore.dispatch({
        type: "USER_LOG_OUT",
      });
      
    }
    return Promise.reject(error);
  }
);

export default axios;
