import axios from 'axios'

const instance = axios.create({
    withCredentials: true,
    baseURL:'http://localhost:3001'    
})

export const getStudents = async(dept,year,onlyReg) => {
    if(onlyReg){
        return await instance.get(`/staff/attendance/${dept}/${year}`)
    }
    else{
        return await instance.get(`/staff/class/${dept}/${year}`)
    }
}


