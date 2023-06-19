import axios from 'axios';

const url = '/api/movies';

export const fetchMovies = (pageNumber?: number) => axios.get(`${url}?page=${pageNumber}`);

export const fetchMovie = async (name: string) => {
    return await axios.get(`${url}/${name}`)
}
