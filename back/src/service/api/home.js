import axios from '../request'

export const addHome = async obj => {
  return axios.post('/home', obj)
}

export const updateHome = async obj => {
  return axios.put('/home', obj)
}

export const getHome = async () => {
  return axios.get('/home')
}
