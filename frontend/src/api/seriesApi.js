import axios from 'axios';

const url = 'http://localhost:5000/api/series';

export const fetchSeries = (pageNumber) => axios.get(`${url}?page=${pageNumber}`);

export const fetchSerie = async (name) => {
    return await axios.get(`${url}/${name}`)
}