import axios from 'axios'

const instance = axios.create({
    withCredentials: true,
    baseURL:'http://localhost:3001'    
})

export const selfAttendance = async() => {
    await instance.post('/staff/self-attendance');
    
}

export const selfAttendanceReport = async (month,url) => {
    return await instance.get(`${url}${month}`)
}

