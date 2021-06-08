import axios from 'axios';
import { BASE_URL } from 'Constants';
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';
// axios.defaults.withCredentials = true;

const baseURL = BASE_URL;
const apiClient = axios.create({
  baseURL,
  timeout: 10000,
});

export default apiClient;
