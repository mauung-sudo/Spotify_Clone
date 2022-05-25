import { reducerCases } from "./Constants";

export const initialState = {
    token: null,
    playlist:[],
    userInfo:null,
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
        case reducerCases.SET_USER : {
            return {
                ...state,
                userInfo: action.userInfo,
            }
        }
        default:
            return state;
    }
}

export default reducer;