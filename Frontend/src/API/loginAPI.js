
import axios from 'axios';
// import useLogin from '../hooks/useLogin';

axios.defaults.baseURL = 'http://localhost:3001';

const loginUser = async (data,select) => {
    let result;

    if (select === 1) {
        await axios.post('/staff/login', data,{withCredentials:true}).then((res) => {
            result = res.data;
        }).catch(err => {
            result = err.response.data;
        })
    }
    if (select === 2) {
        await axios.post('/student/login', data,{withCredentials:true}).then((res) => {
            result = res.data;
        }).catch((err) => {
            result = err.response.data;
        })
    }
    return  result; 
}

export default loginUser