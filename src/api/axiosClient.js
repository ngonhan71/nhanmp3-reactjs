import axios from 'axios'

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
})


axiosClient.interceptors.response.use((res) => res.data)

export default axiosClient