import axios from 'axios';
// import useLogin from '../hooks/useLogin';

axios.defaults.baseURL="http://localhost:3001"

const logoutAPI = async(select) => {
    if (select === 1) {
        await axios.get('/staff/logout', { withCredentials: true });
    }
    if (select === 2) {
        await axios.get('/student/logout', { withCredentials: true });
    }

}

export default logoutAPI