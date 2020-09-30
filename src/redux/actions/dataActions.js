import { SET_SCREAMS, LIKE_SCREAM, UNLIKE_SCREAM, LOADING_DATA, DELETE_SCREAM, POST_SCREAM, LOADING_UI, STOP_LOADING_UI, SET_ERRORS } from '../reducers/types';

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

export const deleteScream = (screamId) => async (dispatch) => {
    const userToken = localStorage.getItem('FBIdToken');
    try {
        const res = await fetch(`https://europe-west1-socialape-6b91a.cloudfunctions.net/api/screams/${screamId}`, {
            method: "DELETE",
            headers: {
                'Authorization': userToken
            }
        });
        const data = await res.json();
        !data.error && data.msg && dispatch({
            type: DELETE_SCREAM,
            payload: screamId
        });
    } catch (err) {
        console.log(err);
    }
};

export const postScream = (text) => async (dispatch) => {
    const userToken = localStorage.getItem('FBIdToken');
    console.log(text);
    dispatch({type: LOADING_UI});
    try {
        const res = await fetch('https://europe-west1-socialape-6b91a.cloudfunctions.net/api/screams/new', {
            method: 'POST',
            headers: {
                'Authorization': userToken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(text)
        });
        const data = await res.json();
        if (res.ok && !data.errorCode) {
            dispatch({
                type: POST_SCREAM,
                payload: data
            });
            dispatch({
                type: STOP_LOADING_UI
            });
        } else {
            console.log(data);
            dispatch({
                type:SET_ERRORS,
                payload: data
            });
        }
    } catch (err) {
        console.log(err);
        dispatch({
            type:SET_ERRORS,
            payload: {postScream: err.toString()}
        });
    }
};