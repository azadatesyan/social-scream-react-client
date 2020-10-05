import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';

// MUI Stuff
import { makeStyles } from '@material-ui/core/styles/';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import TooltipBtn from '../util/TooltipBtn';
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from '../CommentForm';
import CommentButton from './CommentButton';

// Redux stuff
import { useSelector, useDispatch } from 'react-redux';
import { getScream, clearErrors } from '../redux/actions/dataActions';

// Other
import dayjs from 'dayjs';

const useStyles = makeStyles({
  profilePicture: {
    width: 200,
    height: 200,
    borderRadius: '50%',
    objectFit: 'cover'
  },
  hrule: {
    border: '0',
    margin: '0.25em'
  }
});

const ScreamDialog = ({ screamId }) => {

    const classes = useStyles();
    const content = useSelector(state => state);
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [oldPath, setOldPath] = useState('');
    const [newPath, setNewPath] = useState('');
    const { ui: { loading, errors }, data: { scream: { userImage, username, likeCount, commentCount, text, createdAt, comments } } } = content;
    
    const handleOpen = () => {
        setOpen(true);
        dispatch(getScream(screamId));
    };
    const handleClose = () => {
        setOpen(false);
    };

    const dialogMarkup = loading ? (
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <CircularProgress size={100} thickness={2} />
      </div>
    ) : (
      <Grid container spacing={2} justify='center' alignContent='center'>
        <Grid item md={5}>
          <img src={userImage} alt="Profile" className={classes.profilePicture} />
        </Grid>
        <Grid item md={7}>
          <Typography
            component={Link}
            color="primary"
            variant="h5"
            to={`/users/${username}`} >
            @{username}
          </Typography>
          <hr className={classes.hrule} />
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
          </Typography>
          <hr className={classes.hrule} />
          <Typography variant="body1">{text}</Typography>
          <LikeButton count={likeCount} screamId={screamId} />
          <CommentButton tipText="comments" count={commentCount} />
        </Grid>
        <Comments comments={comments} />
        <CommentForm screamId={screamId} />
      </Grid>
    );
    return (
      <Fragment>
        <TooltipBtn
          onClick={handleOpen}
          tipText="Expand scream"
          padding={8}>
          <UnfoldMore color="primary" />
        </TooltipBtn>
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth
          maxWidth="sm">
          <TooltipBtn
            tipText="Close"
            onClick={handleClose}
            padding={5}>
            <CloseIcon />
          </TooltipBtn>
          <DialogContent style={loading ? {overflow: "hidden"} : {overflow: "scroll"}}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }

export default ScreamDialog;