import React, { useState } from 'react';

import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import TooltipBtn from '../util/TooltipBtn';

import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/actions/userActions';

const LogoutButton = () => {

    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };
  
      const handleClose = () => {
        setOpen(false);
    };

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    return (
        <div>
            <TooltipBtn onClick={handleClickOpen} tipText="Logout">
                <KeyboardReturnIcon color="primary" />
            </TooltipBtn>
            <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">
                Are you sure you want to logout?
            </DialogTitle>
            <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                Stay logged in
                </Button>
                <Button onClick={handleLogout} color="secondary">
                Logout
                </Button>
            </DialogActions>
            </Dialog>
        </div>
    );
}

export default LogoutButton;
