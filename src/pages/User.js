import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Scream from '../components/Scream';
import Profile from '../components/Profile';

import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';


const User = () => {
    const dispatch = useDispatch();
    const content = useSelector(state => state);
    const { data: { user } } = content;
    const { username } = useParams();

    useEffect(() => {
        dispatch(getUserData(username));
    }, [dispatch, username]);

    const screamsData = user.screams ? user.screams.map(scream => <Scream key={scream.screamId} data={scream} />) : 'Loading screams...';
    const userData = user.credentials ? <Profile user={user} /> : 'Loading profile...';
    return (
        <Grid container spacing={2}>
            <Grid item sm={8} xs={12}>
                {screamsData}
            </Grid>
            <Grid item sm={4} xs={12}>
                {userData}
            </Grid>
        </Grid>
    );
};

export default User;