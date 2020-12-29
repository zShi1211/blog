import axios from 'axios'

const instance = axios.create({
  baseURL: '/api'
})

instance.interceptors.request.use(request => {
  const token = localStorage.getItem('Authorization');
  if (token) {
    request.headers.Authorization = "Bearer " + token;
  }
  return request;
})


instance.interceptors.response.use(response => {
  const token = response.headers.authorization
  if (token) {
    localStorage.setItem('Authorization', token)
  }
  return response.data
})

export default instance;
