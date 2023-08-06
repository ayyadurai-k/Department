import axios from 'axios'

const instance = axios.create({
    withCredentials: true,
    baseURL:'http://localhost:3001'    
})

// const checkClassObject ={
//     it1: '2023ITC',
//     it2: '2022ITC',
//     it3: '2021ITC',
//     cs1: '2023CSC',
//     cs2: '2022CSC',
//     cs3: '2021CSC',
// }

// const checkClass=(dept,year,student)=>{
    
// }

export const postAttendanceData =async(dept,year,absent)=>{
    console.log(year);
    return await instance.post(`/staff/attendance/${dept}/${year}`,absent)
}