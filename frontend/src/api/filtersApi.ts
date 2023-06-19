import axios from 'axios';

const url = '/api/filters';

export const search = (data: {type: string, keyword: string}) => {
   return axios.get(`${url}/?s=${data.keyword}&type=${data.type}`)
}

export const filterPosts = (data: {name:string, type:string}) => {
    return axios.post(`${url}/filter-posts`, data)
}

export const filterMedia = (data: {name:string, type:string}) => {
    return axios.post(`${url}/filter-media`, data)
}

export const filterRelatedPosts = (data: {name: string}) => {
    return axios.post(`${url}/filter-related-posts`, data)
}

export const filterRelatedMedia = (data: {name: string}) => {
    return axios.post(`${url}/filter-related-media`, data)
}
