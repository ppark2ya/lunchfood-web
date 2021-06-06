import axios from 'axios';
import { BASE_URL } from 'Constants';
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';

const baseURL = BASE_URL;
const HttpClient = axios.create({
  baseURL,
  timeout: 10000,
});

export default HttpClient;
