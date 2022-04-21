import axios from 'axios';

const url = 'http://localhost:5000/api/authors';

export const fetchAuthor = async (name) => {
    return await axios.get(`${url}/${name}`)
}
