import axios from "axios";

const BASE_URL = "http://api.weatherapi.com/v1/";

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
});
