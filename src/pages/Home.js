import React, { useEffect } from 'react';

// Redux imports
import { useSelector, useDispatch } from 'react-redux';
import { getScreams } from "../redux/actions/dataActions";

// MUI imports
import Grid from '@material-ui/core/Grid';
import Scream from '../components/Scream';
import Profile from '../components/Profile';

const Home = () => {
    // Redux init
    const dispatch = useDispatch();
    const content = useSelector(state => state);
    const { data: { screams, loading } } = content;
    
    // On component mounted, dispatch request to get screams
    useEffect(() => {
        dispatch(getScreams());
    }, [dispatch]);

    const screamsData = loading ? <p>Loading screams...</p> : screams.map(scream => <Scream key={scream.screamId} data={scream} />) ;
    return (
        <Grid container spacing={2}>
            <Grid item sm={8} xs={12}>
                {screamsData}
            </Grid>
            <Grid item sm={4} xs={12}>
                <Profile />
            </Grid>
        </Grid>
    );
}

export default Home;