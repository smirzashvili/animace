import axios from 'axios';

const url = '/api/categories';

export const fetchCategories = () => axios.get(url);

export const fetchCategory = async (name: string) => {
    return await axios.get(`${url}/${name}`)
}
