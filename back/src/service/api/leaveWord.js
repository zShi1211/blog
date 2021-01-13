import axios from '../request'

export const getLeavaWord = async (page = 1, limit = 10) => {
  return axios.get(`/leavaWord?page=${page}&limit=${limit}`)
}

export const addLeavaWord = async (body) => {
  return axios.post(`/leavaWord`, body)
}

export const addChildLeavaWord = async (id, body) => {
  return axios.post(`/leavaWord/${id}`, body)
}

export const removeLeavaWord = async id => {
  return axios.delete(`/leavaWord/${id}`)
}

export const removeChildLeavaWord = async id => {
  return axios.delete(`/leavaWord/${id}/comment`)
}
