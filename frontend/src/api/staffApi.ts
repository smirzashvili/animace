import axios from 'axios';

const url = '/api/staff';

export const fetchStaff = async (name: string) => {
    return await axios.get(`${url}/${name}`,)
}
