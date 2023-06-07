import axios from "axios";

export const setSession = (token) => {
  if (token) {
    localStorage.setItem("jwt_access_token", token);
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  } else {
    localStorage.removeItem("jwt_access_token");
    delete axios.defaults.headers.common["Authorization"];
  }
};
export const getAccessToken = () => {
  return window.localStorage.getItem("jwt_access_token");
};


//Using Axios interceptor if you receive a 403 error remove session;
axios.interceptors.response.use(response => {
  return response;
}, error => {
 if (error.response.status === 403) {
    setSession(null);
    location.reload();    
 }
 return error;
});