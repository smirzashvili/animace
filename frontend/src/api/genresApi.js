import axios from 'axios';

const url = 'http://localhost:5000/api/genres';

export const fetchGenres = () => axios.get(url);

export const fetchGenre = async (name) => {
    return await axios.get(`${url}/${name}`)
}
