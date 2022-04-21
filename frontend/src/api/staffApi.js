import axios from 'axios';

const url = 'http://localhost:5000/api/staff';

export const fetchStaff = async (name) => {
    return await axios.get(`${url}/${name}`,)
}
