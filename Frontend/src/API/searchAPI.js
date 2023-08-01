import axios from 'axios'

const instance = axios.create({
    withCredentials: true,
    baseURL:'http://localhost:3001'    
})

export const searchStudent = async (regNo) => {
    console.log(regNo);
   return await instance.get(`/staff/search/student/${regNo}`);
}

