import axios from 'axios';

const url = 'http://localhost:5000/api/articles';


export const fetchArticles = (pageNumber) => axios.get(`${url}?page=${pageNumber}`);

export const fetchArticlesByAuthor = async (author) => {
    return await axios.get(`${url}/get-info-by-author`, {
        headers: {author: author} 
})}

export const fetchArticle = async (name) => {
    return await axios.get(`${url}/${name}`)
}
