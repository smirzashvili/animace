import axios from 'axios';

const url = 'http://localhost:5000/api/tags';

export const fetchTags = () => {
    axios.get(url)
}


// export const fetchTag = async (name) => {
//         return await axios.get(`${url}/${name}`)
// }
