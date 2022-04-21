import axios from 'axios';

const url = 'http://localhost:5000/api/users';

const config = {
    headers: { 'Content-Type': 'application/json' },
};

export const fetchUsers = () => axios.get(url);
export const fetchUser = async (token) => {
    return await axios.get(`${url}/get-info`, {
        headers: {Authorization: token}
    })
}
export const createUser = (data) => {
    return axios.post(url, data, {
        withCredentials: true,
    })
}
export const logInUser = (data) => {
    return axios.post(`${url}/login`, data, {
        withCredentials: true,
    })
}
export const logOutUser = () => {
    return axios.get(`${url}/logout`, {
        withCredentials: true,
    })
}
export const editUser = (data, token) => {
    return axios.put(`${url}/edit`, data, {
        headers: {'content-type': 'multipart/form-data', Authorization: token}
    })
}
export const forgetPasswordUser = (data) => {
    return axios.put(`${url}/reset-password`, data)
}
export const resetPasswordUser = (data, token) => {
    return axios.put(`${url}/reset-password/${token}`, {data, token})
}
export const getToken = () => {
    return axios.post(`${url}/get-token`, null, {
        withCredentials: true,
    })
}



