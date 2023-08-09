import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import alertContext from '../contexts/alert/alertContext';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AlertDialog = () => {
    const { showDialog, setShowDialog, setIsOk } = React.useContext(alertContext);

    return (
        <div>
            <Dialog
                open={(showDialog.message).length !== 0}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setShowDialog({message: '', id: -1})}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>Delete {(showDialog.message).split(" ")[0]}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Are you sure you want to delete {showDialog.message}? {/* User called `ankit` */} {/* Category called `horror` */}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button className='me-2' sx={{bgcolor: '#f14d54', width: 100}} onClick={() => setShowDialog({message: '', id: -1})} color='error' variant="contained">Cancel</Button>
                    <Button sx={{bgcolor: '#80bf32', width: 100}} onClick={() => setIsOk(true)} color='success' variant="contained">Ok</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AlertDialog;