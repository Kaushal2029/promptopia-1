import React from 'react'
import { useRecoilValue } from 'recoil'
import { success_message } from '../../Utils/store'
import { Alert } from '@mui/material';

const Success = () => {
    const success = useRecoilValue(success_message);

    return (
        <>
            <Alert severity='success'>{success}</Alert>
        </>
    )
}

export default Success