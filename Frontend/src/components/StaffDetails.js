import React, { useEffect, useState } from 'react'

const StaffDetails = () => {
    const sNo = 1
    
    const [staffs, setStaffs] = useState([])
    
    useEffect(() => {
        async function api() {
            
        }api()
    }, [])
    
    
  return (
    <main className="bg-gray-300  w-full p-2 h-screen mb-10">
                <section className="bg-white w-11/12  border border-black mx-auto rounded-xl p-5 mt-5 ">
                    <h1 className="font-bold text-black text-2xl center">Class Name</h1>
                    <div className='hidden md:block'>
                        <table className="w-full mt-5 ">
                            <thead className="bg-blue-500 border-b-2 rounded border-gray-600 text-xl">
                                <tr className="">
                                    <th className="p-3">Email</th>
                                    <th className="p-3">Name</th>
                                    <th className="p-3">DOB</th>
                                    <th className="p-3">Gender</th>

                                </tr>
                            </thead>
                            <tbody className="text-center font-bold divide-y divide-gray-800">
                                        
                                        <tr className={`${sNo % 2 === 0 && 'bg-blue-300'}`} >
                                            <td className='p-2 '>Hi</td>
                                            <td className='p-2 '>Byee</td>
                                            <td className='p-2 '>Oii</td>
                                            <td className='p-2 '>Haii</td>
                                        </tr>
                                    


                            </tbody>
                        </table>
                    </div>
                    <div className='md:hidden'>
                        
                            
                                
                                    <div className='bg-blue-400  rounded-2xl shadow- mt-2' key={1}>
                                        <div className='flex flex-col md:flex'>
                                            <div className='w-full md:w-1/4 py-3 flex bg-blue-500 rounded-t-2xl'>
                                                <h1 className='m-auto  text-center font-bold text-lg'>1</h1>
                                            </div>
                                            <div className='w-full md:w-3/4 flex p-5'>
                                                <div className='my-auto '>
                                                    <h1 className='font-bold text-xl'>hii</h1>
                                                    <h1 className='font-bold text-gray-700'>byee</h1>
                                                    <h1 className='font-bold text-gray-700'>oii</h1>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                
                        
                        


                    </div>
                </section>
            </main>
  )
}

export default StaffDetails