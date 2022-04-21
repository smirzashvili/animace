import axios from 'axios';

const url = 'http://localhost:5000/api/reviews';


export const fetchReviews = (pageNumber) => axios.get(`${url}?page=${pageNumber}`);

export const fetchReview = async (name) => {
    return await axios.get(`${url}/${name}`)
}
