import axios from 'axios'

const axiosClient = axios.create({
  // baseURL: process.env.REACT_APP_SERVER_URL,
  baseURL: "http://localhost:5000/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
})


axiosClient.interceptors.response.use((res) => res.data)

export default axiosClient