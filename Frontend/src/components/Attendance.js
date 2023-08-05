import React, { useEffect, useState } from "react";
import Loader from './Loader';
import { getDate } from '../utils/date';
import { getClass } from "../utils/class";
import { useNavigate, useParams } from "react-router-dom";
import { getStudents } from "../API/studentAPI";

const Attendance = () => {
    const { dept, year } = useParams();
    const [students, setStudents] = useState([]);
    const [absent, setAbsent] = useState({})
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    //get department using params;
    

    useEffect(() => {
        if (!dept.toUpperCase() === "CS" || !dept.toUpperCase() === "IT" || !(Number(year) < 4 && Number(year) > 0)) {
            console.log("called");
            
            return setError("No Matched Students Data...!")
         }
        async function api() {    
            try {
                setLoading(true)
                const students = (await getStudents(dept, year)).data.studentsData;
                setStudents(students);
            }
            catch (error) {
               return setError(error.response.data.message)   
            }
            finally {
                setTimeout(()=>{
                    setLoading(false)
                },1000)
            }
        }
        api();
    }, [])

    const handleChange = (e) => {
        const { name, checked } = e.target;
        if (checked) {
            setAbsent((preAbsent) => {
                return {
                    ...preAbsent,
                    [name]: true
                }
            })
        }
        else {
            setAbsent((preAbsent) => {
                const temp = preAbsent;
                delete temp[name]
                return temp;
            })
        }
    }

    const handleSubmit = () => {
        console.log(absent);
    }
    return (

        <>
            {loading && <Loader />}
            {!error && !loading && <main className="p-5 lg:p-8 lg:px-20 w-10/12 mx-auto mb-10">
                <section className="">
                    <div className="flex justify-between">
                        <h1 className="font-bold text-xl md:text-2xl uppercase md:tracking-wide">
                            Attendance
                        </h1>
                        <label className="text-black bg-amber-600 px-3 py-1 font-extrabold rounded-lg">
                            {getDate()}
                        </label>
                    </div>
                    <div className=" mt-2 rounded-xl bg-gradient-to-r p-3 from-emerald-400 to-cyan-400 ">
                        <h1 className="font-bold m text-black text-center text-lg md:text-xl">
                            {getClass(dept, year)}
                        </h1>
                        <div className=" w-11/12 md:w-4/5 mx-auto rounded-lg mt-3">
                            <table className=" w-full ">
                                <thead className="text-white text-xl">
                                    <tr key="head" className="">
                                        <th className="bg-gray-900 p-2 md:p-4 rounded-tl-lg">RegNo</th>
                                        <th className="bg-gray-900 p-2 md:p-4 rounded-tr-lg">Absent</th>
                                    </tr>
                                </thead>

                                <tbody className="text-center">
                                    {students.map((student, index) => {
                                        let sNo = index + 1;
                                        return (
                                            <tr className={`font-bold ${sNo % 2 === 0 && 'bg-black bg-opacity-70 text-white'}`} key={student.regno}>
                                                <td className="p-2 md:p-5">{student.regno}</td>
                                                <td className="p-2 md:p-5">
                                                    <input onChange={handleChange} name={student.regno} type="checkbox" className="content-['X'] focus:ring-red-800 marker: cursor-pointer outline-red-900 w-6 h-6 rounded-full checked:bg-red-700 hover:checked:bg-red-500"></input>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <p className="text-red-600 font-bold text-center my-5">Once Submitted Never Change Recheck Attendance !</p>
                        <div className="flex justify-center m-3 f">

                            <button onClick={handleSubmit} className=" text-white hover:bg-blue-700   bg-gradient-to-r from-blue-600 to-violet-600 px-3 py-2 font-bold rounded-lg">Submit</button>

                        </div>
                    </div>
                </section>
            </main>}
            {error && !loading && <main className='flex justify-center items-center w-full '>
                <section className='my-auto w-full'>
                    <div className='w-full lg:w-1/3 p-5 rounded-lg mx-auto mt-24'>
                        <h1 className='font-bold text-2xl text-center'>Issue</h1>
                        <p className='bg-red-500 rounded-lg p-5 font-bold text-lg text-center my-3'>
                            {error}
                        </p>

                        <div className='flex justify-center'>
                            <button onClick={() => { navigate('/') }} className='font-bold text-md text-center text-gray-800'>Please Go Back </button>
                        </div>
                    </div>
                </section>
            </main>}
        </>
    );
};

export default Attendance;
