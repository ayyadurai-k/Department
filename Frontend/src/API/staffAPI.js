import axios from 'axios'

const instance = axios.create({
    withCredentials: true,
    baseURL:'http://localhost:3001'    
})

export const getStaffs = async() => {
    return await instance.get()
}