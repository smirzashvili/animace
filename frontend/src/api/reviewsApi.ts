import axios from 'axios';

const url = 'http://localhost:5000/api/reviews';


export const fetchReviews = (pageNumber?: number) => axios.get(`${url}?page=${pageNumber}`);

export const fetchReview = async (name: string) => {
    return await axios.get(`${url}/${name}`)
}
