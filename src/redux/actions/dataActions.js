import { SET_SCREAMS, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM, POST_SCREAM, LOADING_DATA } from '../reducers/types';

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