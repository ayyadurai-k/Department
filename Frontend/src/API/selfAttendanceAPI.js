import React from 'react'
import axios from 'axios'

const instance = axios.create({
    withCredentials: true,
    baseURL:'http://localhost:3001'    
})

const selfAttendance = async() => {
    await instance.post('/staff/self-attendance');
    
}

export default selfAttendance;