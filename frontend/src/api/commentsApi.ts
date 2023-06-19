import axios from 'axios';

const url = '/api/comments';

export const addComment = async (data: ICommentApiReq) => {
    return await axios.post(`${url}/add`, data)
}
