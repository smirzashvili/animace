import axios from 'axios';

const url = 'http://localhost:5000/api/comments';

export const addComment = async (data: ICommentApiReq) => {
    return await axios.post(`${url}/add`, data)
}
