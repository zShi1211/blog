import axios from '../request'

export const getOneArticle = async id => {
  return axios.get(`/article/${id}`)
}

export const getManyArticle = async (page = 1, limit = 5, key = "") => {
  return axios.get(`/article?page=${page}&limit=${limit}&key=${key}`)
}

export const getComment = async (id, condition = { page: 1, limit: 10 }) => {
  return axios.get(`/article/${id}/comment?page=${condition.page}&limit=${condition.limit}`)
}

export const addComment = async (id, body) => {
  return axios.post(`/article/${id}/comment`, body)
}

export const addChildComment = async (id, body) => {
  return axios.post(`/article/${id}/childComment`, body)
}

export const addArtcile = async body => {
  console.log(axios)
  return axios.post(`/article`, body)
}

export const removeArticle = async id => {
  return axios.delete(`/article/${id}`)
}

export const updateArticle = async (id, body) => {
  return axios.put(`/article/${id}`, body)
}

export const removeComment = async id => {
  return axios.delete(`/article/${id}/comment`)
}

export const removeChildComment = async id => {
  return axios.delete(`/article/${id}/childComment`)
}
