import axios from '../request'

export const getHome = async () => {
    return axios.get('/home')
}