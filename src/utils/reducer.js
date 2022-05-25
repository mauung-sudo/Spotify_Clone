import { reducerCases } from "./Constants";

export const initialState = {
    token: null,
    playlist:[],
};

const reducer = (state, action) => {
    switch (action.type) {
        case reducerCases.SET_TOKEN : {
            return {
                ...state,
                token: action.token,
            }
        }
        case reducerCases.SET_PLAYLISTS : {
            return{
                ...state,
                playlist: action.playlist,
            }
        }
        default:
            return state;
    }
}

export default reducer;