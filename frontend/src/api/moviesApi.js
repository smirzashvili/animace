import axios from 'axios';

const url = 'http://localhost:5000/api/movies';

export const fetchMovies = (pageNumber) => axios.get(`${url}?page=${pageNumber}`);

export const fetchMovie = async (name) => {
    return await axios.get(`${url}/${name}`)
}
