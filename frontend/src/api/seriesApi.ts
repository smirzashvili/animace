import axios from 'axios';

const url = '/api/series';

export const fetchSeries = (pageNumber?: number) => axios.get(`${url}?page=${pageNumber}`);

export const fetchSerie = async (name: string) => {
    return await axios.get(`${url}/${name}`)
}