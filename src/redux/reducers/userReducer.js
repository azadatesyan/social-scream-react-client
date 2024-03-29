import { SET_AUTHENTICATED, SET_UNAUTHENTICATED, SET_USER, LOADING_USER, LIKE_SCREAM, UNLIKE_SCREAM } from '../store/types';

const initialState = {
    authenticated: false,
    credentials: {},
    likes: [],
    notifications: [],
    loading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true,
            };

        case SET_UNAUTHENTICATED:
            return initialState;
    
        case SET_USER:
            return {
                authenticated: true,
                loading: false,
                ...action.payload
            }

        case LOADING_USER:
            return {
                ...state,
                loading: true
            }

        case LIKE_SCREAM:
            return {
                ...state,
                likes: [
                    ...state.likes,
                    {
                        username: state.credentials.username,
                        screamId: action.payload.screamId
                    }
                ]
            }

        case UNLIKE_SCREAM:
            console.log('Unlike scream number');
            console.log(action.payload.screamId);
            console.log('Removing state like number ' + state.likes);
            let likes = state.likes.filter(like => like.screamId !== action.payload.screamId);
            return {
                ...state,
                likes
            }
            
        default:
            return state;
    }
}

export default reducer;