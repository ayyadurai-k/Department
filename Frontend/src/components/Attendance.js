import React, { useState } from "react";
import students from "../data/students.json";
import Loader from './Loader';
const Attendance = () => {
    const [absent, setAbsent] = useState({
        
    })

    const handleChange = (e) => {
        const { name, checked } = e.target;
        if (checked) {
            setAbsent((preAbsent) => {
                return {
                    ...preAbsent,
                    [name] : true
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
            {/* <Loader /> */}
            <main className="p-5 lg:p-8 lg:px-20 w-10/12 mx-auto mb-10">
                <section className="">
                    <div className="flex justify-between">
                        <h1 className="font-bold text-xl md:text-2xl uppercase md:tracking-wide">
                            Attendance
                        </h1>
                        <label className="text-black bg-amber-600 px-3 py-1 font-extrabold rounded-lg">
                            01/06/2004
                        </label>
                    </div>
                    <div className=" mt-2 rounded-xl bg-gradient-to-r p-3 from-emerald-400 to-cyan-400 ">
                        <h1 className="font-bold m text-black text-center text-lg md:text-xl">
                            B.Sc IT 3rd Year
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
            </main>
        </>
    );
};

export default Attendance;
