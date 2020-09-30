import { SET_SCREAMS, LIKE_SCREAM, UNLIKE_SCREAM, LOADING_DATA, DELETE_SCREAM, POST_SCREAM } from '../reducers/types';

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

        case LIKE_SCREAM:
        case UNLIKE_SCREAM:
            let index = state.screams.findIndex(scream => scream.screamId === action.payload.screamId);
            state.screams[index] = action.payload;

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
    
        default:
            return state;
    }
};

export default reducer;