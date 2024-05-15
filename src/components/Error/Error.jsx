import { Alert } from '@mui/material'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { error_message } from '../../Utils/store'

const Error = () => {
    const error = useRecoilValue(error_message);

    return (
        <>
            <Alert severity='error'>{error}</Alert>
        </>
    )
}

export default Error