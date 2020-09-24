import React from 'react';
import { useHistory } from 'react-router-dom';
import dayjs from 'dayjs';

// MUI imports
import { makeStyles } from '@material-ui/core/styles/';
import { Paper, Avatar, Typography, Link, Button, Zoom, Tooltip } from '@material-ui/core/';
import RoomIcon from '@material-ui/icons/Room';
import LinkIcon from '@material-ui/icons/Link';
import ScheduleIcon from '@material-ui/icons/Schedule';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import TooltipBtn from '../util/TooltipBtn';

// Redux stuff
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser, uploadImage } from '../redux/actions/userActions';
import EditProfile from './EditProfile';

// JSS styling to match Material-UI's official doc
const useStyles = makeStyles({
    avatar: {
        position: 'relative',
        margin: '0px auto',
        height: '150px',
        width: '150px',
        '&:hover': {
            background: 'rgba(0,0,0,0.8)'
        }
    },
    profileWrapper: {
        width: '50%',
        margin: '0 auto',
        position: 'relative',
        cursor: 'pointer',
    },
    logoWrapper: {
        position: 'absolute',
        top: '0',
        left: '0',
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent:'center',
        '&:hover svg': {
            display: 'block'
        }
    },
    flexBetween: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    addPhotoIcon: {
        color: 'white',
        display: 'none'
    },
    paper: {
        padding: '20px'
    },
    textDiv: {
        marginTop: '10px',
        display: 'flex',
        justifyContent: 'center'
    },
    svgAlign: {
        verticalAlign: 'middle',
        display: 'inline-block'
    }
});

// The component
const Profile = () => {
    // Redux init
    const content = useSelector(state => state);
    const dispatch = useDispatch();
    const history = useHistory();

    // Get state & props
    const { user: { credentials: { username, profilePicture, bio, location, website, createdAt }, authenticated, loading }} = content;
    const classes = useStyles();

    // Event handlers
    const handleImageChange = (e) => {
        const imageToUpload = e.target.files[0];
        const formData = new FormData();
        formData.append('image', imageToUpload, imageToUpload.name);
        dispatch(uploadImage(formData));
    };

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    // DayJS parsing of createdAt
    const accountCreationDate = createdAt && (`Joined ${dayjs(createdAt._seconds * 1000).format('MMM YYYY')}`);
    
    // Authenticated profile markup
    const loggedProfile = (
        <Paper className={classes.paper}>
            <input type="file" id="file" style={{visibility: "hidden"}} onChange={handleImageChange}/>
            <div className={classes.profileWrapper}>
                <Avatar className={classes.avatar} alt="User picture" src={profilePicture} />
                <div className={classes.logoWrapper}>
                    <Tooltip TransitionComponent={Zoom} title="Change picture">
                        <Button onClick={() => {document.getElementById('file').click()}}>
                            <AddAPhotoIcon className={classes.addPhotoIcon} />
                        </Button>
                    </Tooltip>
                </div>
            </div>

            <div className={classes.textDiv}>
                <Typography
                variant="h5"
                color="primary">
                    <Link href={`/users/${username}`}>
                        @{username}
                    </Link>
                </Typography>
            </div>

            {bio && (<div className={classes.textDiv}>
                <Typography variant="body2">
                    {bio}
                </Typography>
            </div>)}

            {location && (<div className={classes.textDiv}>
                <RoomIcon className={classes.svgAlign} />
                <span className={classes.svgAlign} >
                    {location}
                </span>
            </div>)}
            
            {website && (<div className={classes.textDiv}>
                <LinkIcon style={{marginRight: '5px'}} />
                <span>
                    <Link color='primary' href={website}>{website}</Link>
                </span>
            </div>)}
            
            <div className={classes.textDiv}>
                <ScheduleIcon style={{marginRight: '5px'}} />
                <span>
                    {accountCreationDate}
                </span>
            </div>

            <div className={classes.flexBetween}>
                <TooltipBtn onClick={handleLogout} tipText="Logout">
                    <KeyboardReturnIcon color="primary" />
                </TooltipBtn>
                <EditProfile />
            </div>
        </Paper>
    );

    // Unauthenticated profile markup
    const notLoggedProfile = (
        <Paper className={classes.paper}>
            <Typography className={classes.textDiv}>
                No profile found, please login or signup
            </Typography>
            <div className={classes.textDiv}>
                <Button
                variant="contained"
                color="primary"
                style={{margin: "0 10px"}}
                onClick={() => {history.push('/login')}}>
                    Login
                </Button>
                <Button
                variant="contained"
                color="secondary"
                style={{margin: "0 10px"}}
                onClick={() => {history.push('/signup')}}>
                    Signup
                </Button>
            </div>
        </Paper>
    );

    const loadingProfile = (
        <Typography variant="h5">
            Loading...
        </Typography>
    );

    return (
        loading ? loadingProfile : (authenticated ? loggedProfile : notLoggedProfile)
    )
}

export default Profile;