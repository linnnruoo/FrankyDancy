import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
})

export default axiosInstance
