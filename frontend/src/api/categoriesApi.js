import axios from 'axios';

const url = 'http://localhost:5000/api/categories';

export const fetchCategories = () => axios.get(url);

export const fetchCategory = async (name) => {
    return await axios.get(`${url}/${name}`)
}
