import axios from 'axios';

const url = 'http://localhost:5000/api/mangas';

export const fetchMangas = (pageNumber?: number) => axios.get(`${url}?page=${pageNumber}`);

export const fetchManga = async (name: string) => {
    return await axios.get(`${url}/${name}`)
}