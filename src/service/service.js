import axios from "axios"

export const API = axios.create({
  baseURL: 'https://api.itbook.store/1.0/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  params: {
    safesearch: true,
  }
})