import axios from '../request'

export const getManyDebrisWord = async (page, limit) => {
    return await axios.get(`/debrisWord?page=${page}&limit=${limit}`)
}