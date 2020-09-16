import React from 'react';
import dayjs from 'dayjs';

// MUI imports
import { makeStyles } from '@material-ui/core/styles/';
import { Paper, Avatar, Typography, Link, Button } from '@material-ui/core/';
import RoomIcon from '@material-ui/icons/Room';
import LinkIcon from '@material-ui/icons/Link';
import ScheduleIcon from '@material-ui/icons/Schedule';

import { useSelector, useDispatch } from 'react-redux';

// JSS styling to match Material-UI's official doc
const useStyles = makeStyles({
    avatar: {
        margin: '0px auto',
        height: '150px',
        width: '150px'
    },
    paper: {
        padding: '20px'
    },
    textDiv: {
        marginTop: '10px',
        display: 'flex',
        justifyContent: 'center'
    }
});

// The component
const Profile = () => {
    // Redux init
    const content = useSelector(state => state);
    const dispatch = useDispatch();

    // Get state & props
    const { user: { credentials: { username, profilePicture, bio, location, website, createdAt }, authenticated }, ui: { loading } } = content;
    const classes = useStyles();

    // DayJS parsing of createdAt
    const accountCreationDate = createdAt && (`Joined ${dayjs(createdAt._seconds * 1000).format('MMM YYYY')}`);
    
    // Fully loaded profile markup
    const loggedProfile = (
        <Paper className={classes.paper}>
            <Avatar className={classes.avatar} alt="User picture" src={profilePicture} />
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
                <RoomIcon />
                <span>
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
        </Paper>
    );

    // Fully loaded profile markup
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
                onClick={() => {window.location.href = '/login'}}>
                    Login
                </Button>
                <Button
                variant="contained"
                color="secondary"
                style={{margin: "0 10px"}}
                onClick={() => {window.location.href = '/signup'}}>
                    Signup
                </Button>
            </div>
        </Paper>
    );

    return (
        !loading && (authenticated ? loggedProfile : notLoggedProfile)
    )
}

export default Profile;