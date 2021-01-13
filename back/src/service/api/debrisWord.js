import axios from '../request'

export const getOneDebrisWord = async id => {
  return await axios.get(`/debrisWord/${id}`)
}

export const getManyDebrisWord = async (page, limit) => {
  return await axios.get(`/debrisWord?page=${page}&limit=${limit}`)
}

export const addDebrisWord = async body => {
  return await axios.post('/debrisWord', body)
}

export const removeDebrisWord = async id => {
  return await axios.delete(`/debrisWord/${id}`)
}

export const updateDebrisWord = async (id, body) => {
  return await axios.put(`/debrisWord/${id}`, body)
}
