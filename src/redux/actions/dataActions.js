import { SET_SCREAMS, LIKE_SCREAM, UNLIKE_SCREAM, LOADING_DATA } from '../reducers/types';

export const getScreams = () => async (dispatch) => {
    dispatch({type: LOADING_DATA});

    try {
        const res = await fetch('https://europe-west1-socialape-6b91a.cloudfunctions.net/api/screams');
        const data = await res.json();
        res.ok && dispatch({
            type: SET_SCREAMS,
            payload: data
        });
    } catch (err) {
        console.log(err);
    }
};

export const likeScream = (screamId) => async (dispatch) => {
    const userToken = localStorage.getItem('FBIdToken');
    console.log('dispatched like event');
    try {
        const res = await fetch(`https://europe-west1-socialape-6b91a.cloudfunctions.net/api/screams/${screamId}/like`, {
            method: "GET",
            headers: {
                'Authorization': userToken
            }
        });
        const data = await res.json();
        !data.error && dispatch({
            type: LIKE_SCREAM,
            payload: data
        });
    } catch (err) {
        console.log(err);
    }
};

export const unlikeScream = (screamId) => async (dispatch) => {
    const userToken = localStorage.getItem('FBIdToken');
    try {
        const res = await fetch(`https://europe-west1-socialape-6b91a.cloudfunctions.net/api/screams/${screamId}/unlike`, {
            method: "GET",
            headers: {
                'Authorization': userToken
            }
        });
        const data = await res.json();
        !data.error && dispatch({
            type: UNLIKE_SCREAM,
            payload: data.screamData
        });
    } catch (err) {
        console.log(err);
    }
};