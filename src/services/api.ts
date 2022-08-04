import axios from 'axios';
import { parseCookies } from 'nookies';
const { ["access_token"]: token } = parseCookies();

export const api = axios.create({
  baseURL: "https://desafio-delinea-back-end.herokuapp.com/",
});

export const ApiProducts = axios.create({
  baseURL: "https://desafio-delinea-back-end.herokuapp.com/products/",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const ApiLogin = axios.create({
  baseURL: "https://desafio-delinea-back-end.herokuapp.com/token",
});