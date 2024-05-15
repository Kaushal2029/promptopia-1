import { FaPlus, FaCircleUser } from "react-icons/fa6";
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <>
            <div className='flex items-center justify-end gap-3 px-5 py-4'>
                <Link to="/create-post" className='flex items-center gap-2 px-3 py-1 text-lg text-white rounded-full bg-slate-600 hover:bg-slate-700'>
                    Create Post
                    <FaPlus />
                </Link>
                <button className='p-1 text-4xl rounded-full text-slate-600 hover:text-slate-700 focus:text-slate-700 focus:ring-2 focus:ring-blue-600'>
                    <FaCircleUser />
                </button>
            </div>
        </>
    )
}

export default Navbar