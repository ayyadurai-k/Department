import React from 'react';

import { Link,  useNavigate } from 'react-router-dom';

//images
import profile from '../../assets/profile.png';

const Profile = () => {

  const navigate = useNavigate();
    return (
        <section className=' mt-5  pb-10 '>
      <h1 className='flex' onClick={()=>{navigate('/login')}}><Link  className='bg-red-500 text-white font-bold px-3 py-2 rounded-lg ml-auto mr-5 hover:bg-red-700' >Logout</Link></h1>

      <div className='bg-purple-400	 rounded-2xl  flex w-11/12 mx-auto mt-3'>
        <div className='w-full   lg:w-1/2 flex p-2'>
          <div className='w-full'>
            <div className=' lg:mt-20 bg-white  p-3 rounded-xl shadow-xl mx-auto w-full mt-5 lg:w-8/12 my-auto '>
              <h1 className='text-3xl font-semibold mt-3 tracking-wider '>Karthikeyan Sir.</h1>
              <h3 className='text-[12px]  font-bold  mt-2 '>2000itcs032@maduracollege.edu.in</h3>
              <h3 className='mt-1 font-bold'>Department Of CS & IT</h3>
              <div className='flex justify-center mt-5'>
                <button className='px-3 py-2 bg-[#8671F0] font-bold  tracking-wide shadow-xl text-md text-white rounded-xl'>Get In</button>
              </div>
            </div>
          </div>
        </div>
        <div className='w-1/2 hidden lg:block p-5'>
          <img src={profile} className='w-3/4 mx-auto' alt='Profile SVG'></img>
        </div>
      </div>
    </section>
    )
}

export default Profile