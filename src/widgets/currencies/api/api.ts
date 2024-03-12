import axios from "axios";

const BASE_URL = "https://api.cryptorank.io/v1/";

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
});
