import { SET_USER, SET_UNAUTHENTICATED, SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from '../reducers/types';

export const loginUser = (userCredentials, history) => async (dispatch) => {
    // Dispatch the 'Loading' action
    dispatch({ type: LOADING_UI });

    // Handle the actual login request
    try {
        const res = await fetch('https://europe-west1-socialape-6b91a.cloudfunctions.net/api/login', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userCredentials)
        });
        const responseData = await res.json();
        if(res.ok){
            localStorage.setItem('FBIdToken', `Bearer ${responseData.userToken}`);
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push('/');
        } else {
            dispatch({
                type: SET_ERRORS,
                payload: responseData
            });
        }
    } catch (err) {
        dispatch({
            type: SET_ERRORS,
            payload: err.code
        });
    }
};

export const signupUser = (userCredentials, history) => async (dispatch) => {
    // Dispatch the 'Loading' action
    dispatch({ type: LOADING_UI });

    // Handle the actual signup request
    try {
        const res = await fetch('https://europe-west1-socialape-6b91a.cloudfunctions.net/api/signup', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userCredentials)
        });
        const responseData = await res.json();
        if(res.ok){
            console.log(responseData);
            localStorage.setItem('FBIdToken', `Bearer ${responseData.token}`);
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push('/');
        } else {
            console.log(responseData);
            dispatch({
                type: SET_ERRORS,
                payload: responseData
            });
        }
    } catch (err) {
        console.log(err);
        dispatch({
            type: SET_ERRORS,
            payload: err.code
        });
    }
};

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    dispatch({ type: SET_UNAUTHENTICATED });
};

export const getUserData = () => async (dispatch) => {
    const userToken = localStorage.getItem('FBIdToken');
    try {
        const res = await fetch('https://europe-west1-socialape-6b91a.cloudfunctions.net/api/user', {
            method: "GET",
            headers: {
                'Authorization': userToken
            }
        });
        const data = await res.json();
        dispatch({
            type: SET_USER,
            payload: data 
        });               
    } catch (err) {
        dispatch({
            type: SET_ERRORS,
            payload: 'Error while loading screams'
        });
    }
};