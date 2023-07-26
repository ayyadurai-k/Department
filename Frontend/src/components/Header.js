import React, { useState } from "react";
import { Link } from 'react-router-dom'
//images
import logo from '../assets/logo.png';
import useSelect from "../hooks/useSelect";


const Header = () => {
    const [open, setOpen] = useState(false);
    const { select, setSelect } = useSelect();

    //handle toggle event
    function toggleMenu() {
        if (open) {
            setOpen(false);
        }
        else {
            setOpen(true);
        }

    }

    

    return (
        <nav className="sticky w-full top-0 z-20">
            <div className="flex justify-between bg-black p-1 ">
                <img src={logo} alt="Logo" className="w-14 ml-5"></img>
                <div className="my-auto mr-5 md:hidden">
                    <button onClick={toggleMenu}>
                        {!open && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-amber-400 ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
                        </svg>}
                        {open && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-amber-400">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>}
                    </button>
                </div>
                <ul className="md:flex my-auto hidden ">
                    <li className="" onClick={()=>{setSelect(1)}}><Link to={'/'} className={`link ${select===1 && 'text-white '}`}>Home</Link></li>
                    <li className="" onClick={()=>{setSelect(2)}}><Link to={'/staff'} className={`link ${select===2 && 'text-white '}`}>Staff</Link></li>
                    <li className="" onClick={()=>{setSelect(3)}}><Link to={'/student'} className={`link ${select===3 && 'text-white '}`}>Student</Link></li>
                    <li className="" onClick={()=>{setSelect(4)}}><Link to={'/contact'} className={`link ${select===4 && 'text-white '}`}>Contact</Link></li>
                    <li className="" onClick={()=>{setSelect(5)}}><Link to={'/about'} className={`link ${select===5 && 'text-white '}`}>About</Link></li>
                </ul>
            </div>
            {open && <div className="md:hidden ">
                <ul className="flex flex-col bg-yellow-500 p-1" onClick={()=>setOpen(false)} >
                    <li className="mobilemenu "><Link to={'/'} className="p-1">Home</Link></li>
                    <li className="mobilemenu "><Link to={'/staff'} className="p-1">Staff</Link></li>
                    <li className="mobilemenu "><Link to={'/student'} className="p-1">Student</Link></li>
                    <li className="mobilemenu "><Link to={'/contact'} className="p-1">Contact</Link></li>
                    <li className="mobilemenu "><Link to={'/about'} className="p-1">About</Link></li>
                </ul>
            </div>}
        </nav>
    )
};

export default Header;
