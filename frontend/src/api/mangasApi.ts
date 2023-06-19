import axios from 'axios';

const url = '/api/mangas';

export const fetchMangas = (pageNumber?: number) => axios.get(`${url}?page=${pageNumber}`);

export const fetchManga = async (name: string) => {
    return await axios.get(`${url}/${name}`)
}