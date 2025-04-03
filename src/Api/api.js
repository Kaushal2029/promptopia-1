import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:8000/api/user/",
  baseURL: "https://promptopia.pythonanywhere.com/api/",
  withCredentials: true,
});

export default api;
