import React from 'react';
import { withStyles } from '@material-ui/core/styles/';
import { useSelector, useDispatch } from 'react-redux';

// JSS styling to match Material-UI's official doc
const styles = {
    card: {
        display: 'flex',
        marginBottom: 20
    }
};

// The component
const Profile = () => {
    // Redux init
    const content = useSelector(state => state);
    const dispatch = useDispatch();

    // Get state & props
    const { user: {authenticated}, ui: {loading} } = content;

    return (
        authenticated
    )
}

export default withStyles(styles)(Profile);