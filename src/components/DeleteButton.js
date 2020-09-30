import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { deleteScream } from '../redux/actions/dataActions';

import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TooltipBtn from '../util/TooltipBtn';
import DeleteIcon from '@material-ui/icons/DeleteOutline';

const DeleteButton = ({ screamId }) => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };
  
    const handleDelete = () => {
        dispatch(deleteScream(screamId));
        handleClose();
    };

    return (
        <div>
            <TooltipBtn tipText="Delete scream" padding={8} onClick={handleClickOpen}>
                <DeleteIcon style={{color: "red"}} />
            </TooltipBtn>
            <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">
                Are you sure you want to delete this scream?
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    This will permanently delete your scream and it cannot be undone
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                Cancel
                </Button>
                <Button onClick={handleDelete} color="secondary">
                Delete
                </Button>
            </DialogActions>
            </Dialog>
        </div>
    );
};

export default DeleteButton;