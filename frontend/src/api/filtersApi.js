import axios from 'axios';

const url = 'http://localhost:5000/api/filters';

export const search = (data) => {
   return axios.get(`${url}/?s=${data.keyword}&type=${data.type}`)
}

export const filterPosts = (data) => {
    return axios.post(`${url}/filter-posts`, data)
}

export const filterMedia = (data) => {
    return axios.post(`${url}/filter-media`, data)
}

export const filterRelatedPosts = (data) => {
    return axios.post(`${url}/filter-related-posts`, data)
}

export const filterRelatedMedia = (data) => {
    return axios.post(`${url}/filter-related-media`, data)
}
