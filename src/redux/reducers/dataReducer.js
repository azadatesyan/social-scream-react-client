import { SET_SCREAMS, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM, POST_SCREAM, LOADING_DATA } from '../reducers/types';

const initialState = {
    screams: [],
    loading: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            };

        case SET_SCREAMS:
            return {
                ...state,
                screams: action.payload,
                loading: false
            };
    
        default:
            return state;
    }
};

export default reducer;