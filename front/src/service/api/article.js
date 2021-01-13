import axios from '../request'

export const getOneArticle = async id => {
    return axios.get(`/article/${id}`)
}

export const getManyArticle = async (page = 1, limit = 5, key = "") => {
    return axios.get(`/article?page=${page}&limit=${limit}&key=${key}`)
}

export const updateArticleInfo = async (id,type) =>{
    return axios.put(`/article/${id}/info`, {
        type
    })
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