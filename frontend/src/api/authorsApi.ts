import axios from 'axios';

const url = '/api/authors';

export const fetchAuthor = async (name: string) => {
    return await axios.get(`${url}/${name}`)
}
