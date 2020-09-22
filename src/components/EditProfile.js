import React, { useState } from 'react';

// MUI imports
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import TooltipBtn from '../util/TooltipBtn';

// Redux imports
import { useSelector, useDispatch } from 'react-redux' ;
import { editUser } from '../redux/actions/userActions';

const EditProfile = () => {

    const content = useSelector(state => state);
    const dispatch = useDispatch();

    const { user: { credentials: { bio, location, website } } } = content;

    const [open, setOpen] = useState(false);
    const [controlledBio, setControlledBio] = useState(bio);
    const [controlledWebsite, setControlledWebsite] = useState(website);
    const [controlledLocation, setControlledLocation] = useState(location);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        const userDetails = {
            bio: controlledBio,
            location: controlledLocation,
            website: controlledWebsite
        };
        dispatch(editUser(userDetails));
        handleClose();
    };

    return (
        <div>
          <TooltipBtn onClick={handleClickOpen} tipText="Edit details">
              <EditIcon color="primary" />
          </TooltipBtn>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edit your details</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To subscribe to this website, please enter your email address here. We will send updates
                occasionally.
              </DialogContentText>
              <TextField
                margin="dense"
                id="bio"
                label="Bio"
                type="text"
                fullWidth
                multiline
                rows={2}
                value={controlledBio}
                onChange={e => {setControlledBio(e.target.value)}}
              />
            <TextField
                margin="dense"
                id="website"
                label="Website"
                type="text"
                fullWidth
                value={controlledWebsite}
                onChange={e => {setControlledWebsite(e.target.value)}}
              />
            <TextField
                margin="dense"
                id="location"
                label="Location"
                type="text"
                fullWidth
                value={controlledLocation}
                onChange={e => {setControlledLocation(e.target.value)}}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleSubmit} color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
};

export default EditProfile;