import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';
// axios.defaults.withCredentials = true;

const baseURL = import.meta.env.VITE_BASE_URL;
const apiClient = axios.create({
  baseURL,
  timeout: 10000,
});

export default apiClient;
