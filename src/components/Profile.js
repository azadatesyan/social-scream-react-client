import React from 'react';
import { Link } from "react-router-dom";

// MUI imports
import { makeStyles } from '@material-ui/core/styles/';
import { Paper, Avatar, Typography } from '@material-ui/core/';

import { useSelector, useDispatch } from 'react-redux';

// JSS styling to match Material-UI's official doc
const useStyles = makeStyles({
    avatar: {
        margin: '0px auto',
        height: '100px',
        width: '100px'
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
    const { user, ui } = content;
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <Avatar className={classes.avatar} alt="User picture" src="" />
            <div className={classes.textDiv}>
                <Typography
                variant="h5"
                component={Link}
                to={`/users/${user.credentials.username}`}
                color="primary">
                    {`@${user.credentials.username}`}
                </Typography>
            </div>
            <div className={classes.textDiv}>
                <Typography variant="body2" gutterBottom>
                    {user.credentials.bio}
                </Typography>
            </div>
        </Paper>
    )
}

export default Profile;