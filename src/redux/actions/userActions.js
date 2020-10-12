import { SET_USER, SET_UNAUTHENTICATED, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, LOADING_USER } from '../store/types';

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

export const logoutUser = () => async (dispatch) => {
    const userToken = localStorage.getItem('FBIdToken');
    try {
        const res = await fetch('https://europe-west1-socialape-6b91a.cloudfunctions.net/api/logout', {
            method: "GET",
            headers: {
                'Authorization': userToken
            }
        });
        const data = await res.json();
        if (res.ok && !data.error) {
            localStorage.removeItem('FBIdToken');
            dispatch({ type: SET_UNAUTHENTICATED });
        } else {
            console.log('Error while logging out');
            console.log(data);
        }
    } catch (err) {
        console.log(err);
    }
};

export const getUserData = () => async (dispatch) => {
    const userToken = localStorage.getItem('FBIdToken');
    dispatch({type: LOADING_USER});
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
            payload: 'Error while loading user data'
        });
    }
};

export const uploadImage = (formData) => async (dispatch) => {
    try {
        const userToken = localStorage.getItem('FBIdToken');
        dispatch({type: LOADING_USER});
        const res = await fetch('https://europe-west1-socialape-6b91a.cloudfunctions.net/api/user/image', {
            method: 'POST',
            headers: {
                'Authorization': userToken
            },
            body: formData
        });
        const data = await res.json();
        data.message && dispatch(getUserData());
    } catch (err) {
        console.log(err);
    }
};

export const editUser = (userDetails) => async (dispatch) => {
    try {
        const userToken = localStorage.getItem('FBIdToken');
        dispatch({ type: LOADING_USER });
        const res = await fetch('https://europe-west1-socialape-6b91a.cloudfunctions.net/api/user', {
            method: 'POST',
            headers: {
                'Authorization': userToken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userDetails)
        });
        const data = await res.json();
        if (data.message) {
            dispatch(getUserData());
        } else {
            console.log('An error happened');
        }
    } catch (err) {
        console.log(err);
    }
};