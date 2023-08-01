import axios from 'axios';
// import useLogin from '../hooks/useLogin';

axios.defaults.baseURL="http://localhost:3001"


const logoutAPI = async (user) => {
    console.log(user);
    if (user.position) {
        await axios.get('/staff/logout', { withCredentials: true });
    }
    if (!user.position) {
        await axios.get('/student/logout', { withCredentials: true });
    }
}

export default logoutAPI