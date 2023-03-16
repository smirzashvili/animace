import axios from 'axios';

const url = 'http://localhost:5000/api/movies';

export const fetchMovies = (pageNumber?: number) => axios.get(`${url}?page=${pageNumber}`);

export const fetchMovie = async (name: string) => {
    return await axios.get(`${url}/${name}`)
}
