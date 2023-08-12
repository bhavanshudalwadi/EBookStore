import React, { useContext } from 'react'
import { Backdrop } from '@mui/material';
import alertContext from '../contexts/alert/alertContext';

const Loader = () => {
    const { showProgress } = useContext(alertContext);

    return (
        <Backdrop
            sx={{zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={showProgress}
        >
            <img src='/l.gif' alt='loading...' style={{width: 120, height: 120}}/>
        </Backdrop>
    )
}

export default Loader;