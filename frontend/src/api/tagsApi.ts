import axios from 'axios';

const url = '/api/tags';

export const fetchTags = () => {
    axios.get(url)
}


// export const fetchTag = async (name) => {
//         return await axios.get(`${url}/${name}`)
// }
