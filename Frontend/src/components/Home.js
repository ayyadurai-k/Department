import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Helmet ,HelmetProvider} from 'react-helmet-async';
//images
import college from '../assets/Clg-3.png';
import quote from '../assets/quote.png';
import dayorder from '../assets/dayorder.png';

const Home = () => {

    //date
    const date = new Date();

    const [today, setToday] = useState({
        date: '',
        month: '',
        year : ''
    })

    useEffect(() => {
        const timer = setInterval(() => {
            setToday({
                date: date.getDate(),
                month: date.toLocaleString('default',{month : 'short'}).toUpperCase(),
                year : date.getFullYear()
            },1000)
        })

        return function cleanup() {
            clearInterval(timer);
        }
    })

    //for animation
     // if day order equal to 1
    const [dayOrder, setDayOrder] = useState(1);
    useEffect(() => {
        setDayOrder(4); 
    },[])
    return (
        <>
            <HelmetProvider>
            <Helmet>
                <title>The Madura College</title>
            </Helmet>
            <main className='bg-yellow-600 mt-5 m-5 rounded-2xl  p-5 md:p-10 mb-10'>
                <div className='grid md:grid-cols-2 gap-5'>
                    <div className=' p-5 md:p-10 '>
                        <div className=' w-full'>
                            <h1 className='text-2xl md:text-4xl font-bold text-center md:text-left w-full'>The Madura College</h1>
                            <p className='font-semibold text-lg md:text-xl text-center md:text-left'>Department Of IT & CS</p>
                        </div>
                        <p className='mt-3 text-center md:text-left mx-auto md:mx-0 w-4/5 font-semibold text-gray-900 capitalize'>The Madura College established in 1856, is one of the oldest academic institutions in Madurai, India. It is an autonomous arts and science college affiliated to the Madurai Kamaraj University.</p>
                        <div className='mt-8 ml-3 flex justify-center md:justify-start'>
                            <Link className='font-bold m-2 bg-white px-3 py-2 rounded-xl'>Staff</Link>
                            <Link className='font-bold m-2 bg-white px-3 py-2 rounded-xl'>Student</Link>
                        </div>
                    </div>
                    <div className=' md:flex py-auto hidden'>
                        <img src={college} alt='College' className='mb-5 min-w-[350px]   md:mt-10 lg:mt-0'></img>
                    </div>
                </div>
            </main>
            <section className='bg-orange-400   rounded-2xl  p-5  mb-10 w-3/4 mx-auto md:m-5'>
                <div className='grid grid-cols-3 md:grid-cols-4 gap-2'>
                    <div className='  hidden md:block'>
                        <img src={quote} className='w-36 mx-auto' alt='Quote'></img>
                    </div>
                    <div className='col-span-3 '>
                        <h1 className='text-4xl font-bold text-center md:text-left'>Quote </h1>
                        <p className='text-gray-900 mt-3 ml-5 text-center md:text-left font-semibold'>“Success usually comes to those who are too busy to be looking for it.” - Henry David Thoreau</p>
                    </div>
                </div>
            </section>

            {/* day order */}
            <section className='bg-purple-400    rounded-2xl  p-5 mb-28 w-3/4 mx-auto md:mx-5 md:ml-auto  '>
                <div className='flex space-x-5 mx-auto'>
                    <div className=' w-full md:w-3/4 flex flex-wrap md:flex-nowrap space-x-5'>
                        <div className=' w-full md:w-1/2 px-5'>
                            <h1 className='font-bold text-3xl text-center '>Today</h1>
                            <div className=' mt-4  p-10 mx-auto bg-white rounded-2xl '>
                                <div className=''>
                                    <h3 className='  w-full mt-1 bg-purple-400 rounded-xl px-1 py-0.5 pl-3 font-bold shadow-xl text-center pr-3'>{ today.date}</h3>
                                    <h3 className='  w-1/2 mt-1 mx-auto bg-purple-400 rounded-xl  py-0.5 pl-3 font-bold shadow-xl text-center pr-5'>{ today.month}</h3>
                                    <h3 className='  w-full mt-1 bg-purple-400 rounded-xl pr-5 py-0.5 pl-3 font-bold shadow-xl text-center'>{ today.year}</h3>
                                </div>
         
                            </div>
                        </div>
                        <div className='w-full  md:w-1/2 mt-2 md:mt-0' style={{ marginLeft: '0px'}}>
                        <h1 className='font-bold text-3xl text-center '>Day Order</h1>
                            <div className=' mt-2  p-8 bg-white rounded-2xl '>
                                <div className='grid grid-cols-3 gap-5   place-items-center'>
                                    <div className={`dayorder ${dayOrder===1 ? 'bg-purple-500 animate-bounce' : 'bg-purple-200'}`}>1</div>
                                    <div className={`dayorder ${dayOrder===2 ? 'bg-purple-500 animate-bounce' : 'bg-purple-200'}`}>2</div>
                                    <div className={`dayorder ${dayOrder===3 ? 'bg-purple-500 animate-bounce' : 'bg-purple-200'}`}>3</div>
                                    <div className={`dayorder ${dayOrder===4 ? 'bg-purple-500 animate-bounce' : 'bg-purple-200'}`}>4</div>
                                    <div className={`dayorder ${dayOrder===5 ? 'bg-purple-500 animate-bounce' : 'bg-purple-200'}`}>5</div>
                                    <div className={`dayorder ${dayOrder===6 ? 'bg-purple-500 animate-bounce' : 'bg-purple-200'}`}>6</div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div className='w-1/4 hidden md:block '>
                        <img src={dayorder} alt='Dayorder' className='w-44 mx-auto mt-10  '></img>
                    </div>
                </div>
            </section>
           </HelmetProvider>
        </>
    )
}

export default Home