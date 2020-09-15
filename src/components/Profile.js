import React from 'react';

// MUI imports
import { makeStyles } from '@material-ui/core/styles/';
import { Paper, Avatar } from '@material-ui/core/';

import { useSelector, useDispatch } from 'react-redux';

// JSS styling to match Material-UI's official doc
const useStyles = makeStyles({
    avatar: {
        margin: '5px auto'

    }
});

// The component
const Profile = () => {
    // Redux init
    const content = useSelector(state => state);
    const dispatch = useDispatch();

    // Get state & props
    const { user: {authenticated}, ui: {loading} } = content;
    const classes = useStyles();

    return (
        <Paper>
            <Avatar className={classes.avatar} alt="User picture" src="" />
        </Paper>
    )
}

export default Profile;