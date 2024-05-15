import { Button } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';
import notfoundImg from "../../assets/404.webp"

const NotFound = () => {
    return (
        <>
            <div className='flex flex-col items-center justify-center min-h-screen px-4 bg-white'>
                <img src={notfoundImg} alt="404" />
                <div className='grid gap-5 place-items-center'>
                    <h1 className='text-4xl font-bold text-center'>Seems like you are lost!</h1>
                    <Link to="/">
                        <Button variant="contained" size="large">
                            Back to home
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default NotFound