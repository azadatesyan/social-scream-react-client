import React, { useEffect } from 'react';

// Redux imports
import { useSelector, useDispatch } from 'react-redux';
import { getScreams } from "../redux/actions/dataActions";
import { getUserData } from '../redux/actions/userActions';
import { CLEAR_DATA_USER } from '../redux/store/types';

// MUI imports
import Grid from '@material-ui/core/Grid';
import Scream from '../components/Scream';
import Profile from '../components/Profile';

const Home = () => {
    // Redux init
    const dispatch = useDispatch();
    const content = useSelector(state => state);
    const { data: { screams, loading }, user } = content;
    
    // On component mounted, dispatch request to get screams
    useEffect(() => {
        dispatch(getScreams());
        dispatch({type: CLEAR_DATA_USER});
        dispatch(getUserData());
    }, [dispatch]);

    const screamsData = loading ? <p>Loading screams...</p> : screams.map(scream => <Scream key={scream.screamId} data={scream} />) ;
    const profileData = loading ? <p>Loading profile...</p> : <Profile currentUser user={user} />;
    return (
        <Grid container spacing={2}>
            <Grid item sm={8} xs={12}>
                {screamsData}
            </Grid>
            <Grid item sm={4} xs={12}>
                {profileData}
            </Grid>
        </Grid>
    );
}

export default Home;