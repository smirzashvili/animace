import axios from 'axios';

const url = 'http://localhost:5000/api/actors';

export const fetchActors = () => axios.get(url);

export const fetchActor = async (name) => {
    console.log(name)
    return await axios.get(`${url}/${name}`,)
}
