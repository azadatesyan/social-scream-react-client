import { SET_AUTHENTICATED, SET_UNAUTHENTICATED, SET_USER } from '../reducers/types';

const initialState = {
    authenticated: false,
    credentials: {},
    likes: [],
    notifications: []
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
                ...action.payload
            }
            
        default:
            return state;
    }
}

export default reducer;