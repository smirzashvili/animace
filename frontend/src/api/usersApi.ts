import axios from 'axios';

const url = '/api/users';

const config = {
    headers: { 'Content-Type': 'application/json' },
};

export const fetchUsers = () => axios.get(url);
export const fetchUser = async (token: string) => {
    return await axios.get(`${url}/get-info`, {
        headers: {Authorization: token}
    })
}
export const createUser = (data: ICreateUserApiReq) => {
    return axios.post(url, data, {
        withCredentials: true,
    })
}
export const logInUser = (data: ILogInUserApiReq) => {
    return axios.post(`${url}/login`, data, {
        withCredentials: true,
    })
}
export const logOutUser = () => {
    return axios.get(`${url}/logout`, {
        withCredentials: true,
    })
}
export const editUser = (data: IUser, token: string) => {
    return axios.put(`${url}/edit`, data, {
        headers: {'content-type': 'multipart/form-data', Authorization: token}
    })
}
export const forgetPasswordUser = (data: IForgetPasswordUserApiReq) => {
    return axios.put(`${url}/reset-password`, data)
}
export const resetPasswordUser = (data: IResetPasswordUserApiReq, token: string) => {
    return axios.put(`${url}/reset-password/${token}`, {data, token})
}
export const getToken = () => {
    return axios.post(`${url}/get-token`, null, {
        withCredentials: true,
    })
}



