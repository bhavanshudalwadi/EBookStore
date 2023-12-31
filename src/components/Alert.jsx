import React, { useContext, useEffect, useMemo } from 'react'
import { IconButton, Slide, Snackbar } from '@mui/material';
import alertContext from '../contexts/alert/alertContext';
import MuiAlert from '@mui/material/Alert';

const AlertComponent = React.forwardRef(function AlertComponent(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}

const Alert = () => {
    const { showAlert, setShowAlert } = useContext(alertContext);

    const severity = useMemo(() => {
        let msg = showAlert.toLowerCase();
        if(msg === '') {
            return '';
        }else if(msg.includes('not') || msg.includes('error') || msg.includes('exists') || msg.includes('already')) {
            return 'error';
        }else if(msg.includes('successfully') || msg.includes('added') || msg.includes('welcome')) {
            return 'success';
        }
        return 'info';
    }, [showAlert])
    
    return (
        <Snackbar
            open={showAlert.length !== 0}
            onClose={() => setShowAlert('')}
            TransitionComponent={TransitionUp}
            autoHideDuration={2000}
            sx={{minWidth: '280px'}}
        >
            <AlertComponent onClose={() => setShowAlert('')} severity={severity} sx={{ width: '100%' }}>
                <span className='fs-6 fw-bold'>{showAlert}</span>
            </AlertComponent>
        </Snackbar>
    )
}

export default Alert;