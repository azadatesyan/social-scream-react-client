import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Scream from '../components/Scream';

const Home = () => {
    // Initial state with no screams
    const [ screams, setScreams ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true);

    // On component mounted, start API request to get screams
    useEffect(() => {
        // To be able to cancel and clean the request if component unmounts
        const controller = new AbortController();
        const signal = controller.signal;

        const getScreams = async () => {
            try {
                setIsLoading(true);
                const res = await fetch('https://europe-west1-socialape-6b91a.cloudfunctions.net/api/screams', { signal });
                const data = await res.json();
                setScreams(data);
                setIsLoading(false);
                console.log(data);
                return;                
            } catch (err) {
                setScreams([{text: 'Error while loading screams'}]);
                setIsLoading(false);
                console.log(err);
            }
        };

        getScreams();

        return () => {
            controller.abort();
        }
    }, []);

    const screamsData = isLoading ? <p>Loading screams...</p> : screams.map(scream => <Scream key={scream.screamId} data={scream} />) ;
    return (
        <Grid container spacing={2}>
            <Grid item sm={8} xs={12}>
                {screamsData}
            </Grid>
            <Grid item sm={4} xs={12}>
                <p>Profile</p>
            </Grid>
        </Grid>
    );
}

export default Home;