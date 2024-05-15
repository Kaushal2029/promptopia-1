import React from 'react'
import { FaCircleUser } from 'react-icons/fa6';

const ProfileCard = ({ profile }) => {
    return (
        <>
            <div className='grid py-10 place-items-center'>
                <div className="w-[95vw] max-w-sm bg-white border border-gray-200 rounded-lg shadow">
                    <div className="flex flex-col items-center py-10">
                        <FaCircleUser className="w-24 h-24 mb-3 rounded-full shadow-lg fill-black/70" />
                        <h5 className="mb-1 text-xl font-medium text-gray-900">{profile}</h5>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileCard