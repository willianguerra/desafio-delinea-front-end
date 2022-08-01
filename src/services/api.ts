import axios from 'axios';

export const api = axios.create({
  baseURL: "https://desafio-delinea-backend.herokuapp.com/",
});