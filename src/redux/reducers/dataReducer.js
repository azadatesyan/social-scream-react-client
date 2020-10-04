import { SET_SCREAMS, LIKE_SCREAM, UNLIKE_SCREAM, LOADING_DATA, DELETE_SCREAM, POST_SCREAM, SET_SCREAM, SUBMIT_COMMENT } from '../store/types';

const initialState = {
    screams: [],
    scream: {},
    loading: false
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

        case LIKE_SCREAM:
        case UNLIKE_SCREAM:
            let index = state.screams.findIndex(scream => scream.screamId === action.payload.screamId);
            state.screams[index] = action.payload;
            if (state.scream.screamId === action.payload.screamId) {
                action.payload.comments = state.scream.comments;
                state.scream = action.payload;
            }
            return {
                ...state
            };

        case DELETE_SCREAM:
            let screamId = action.payload;
            let screamDeleted = state.screams.filter(scream => scream.screamId !== screamId);

            return {
                ...state,
                screams: screamDeleted
            };

        case POST_SCREAM:
            return {
                ...state,
                screams: [
                    action.payload,
                    ...state.screams
                ]
            };

        case SET_SCREAM:
            return {
                ...state,
                scream: action.payload
            };

        case SUBMIT_COMMENT:
            state.scream.comments.push(action.payload);
            return {
                ...state
            }
    
        default:
            return state;
    }
};

export default reducer;