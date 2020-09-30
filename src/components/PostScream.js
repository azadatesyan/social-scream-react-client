import React, { useState } from 'react';

import { postScream } from '../redux/actions/dataActions';

import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import TooltipBtn from '../util/TooltipBtn';

import { useSelector, useDispatch } from 'react-redux';

const PostScream = () => {
    const dispatch = useDispatch();
    const content = useSelector(state => state);
    const { ui: { loading, errors } } = content;

    const [open, setOpen] = useState(false);
    const [screamText, setScreamText] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handlePostScream = () => {
        dispatch(postScream({text: screamText}));
    };

    const loadingBtn = 
        <Button disabled color="primary">
            <CircularProgress size={20} />
        </Button>;

    const defaultBtn =
        <Button onClick={handlePostScream} color="primary">
            Publish
        </Button>;

    return (
        <div>
            <TooltipBtn tipText="Post a scream" onClick={handleClickOpen}>
                <AddIcon style={{color: 'white'}} />
            </TooltipBtn>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <DialogTitle id="form-dialog-title">Post a new scream</DialogTitle>
                    <TooltipBtn tipText="Close" onClick={handleClose}>
                        <CloseIcon />
                    </TooltipBtn>
                </div>
                <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="scream"
                    label="Scream"
                    type="text"
                    helperText={errors.postScream}
                    error={errors.postScream ? true : false}
                    fullWidth
                    value={screamText}
                    onChange={e => {setScreamText(e.target.value)}}
                />
                </DialogContent>
                <DialogActions>
                    {loading ? loadingBtn : defaultBtn}
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default PostScream;