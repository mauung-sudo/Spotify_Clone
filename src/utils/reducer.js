import { reducerCases } from "./Constants";

export const initialState = {
  token: null,
  playlist: [],
  userInfo: null,
  selectedPlaylistId: "7lkK4JetCQXMhJXyxwUWyp",
  selectedPlaylist: null,
  currentlyPlaying: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case reducerCases.SET_TOKEN: {
      return {
        ...state,
        token: action.token,
      };
    }
    case reducerCases.SET_PLAYLISTS: {
      return {
        ...state,
        playlist: action.playlist,
      };
    }
    case reducerCases.SET_USER: {
      return {
        ...state,
        userInfo: action.userInfo,
      };
    }

    case reducerCases.SET_PLAYLIST: {
      return {
        ...state,
        selectedPlaylist: action.selectedPlaylist,
      };
    }

    case reducerCases.SET_PLAYING: {
      return {
        ...state,
        currentlyPlaying: action.currentlyPlaying,
      };
    }

    default:
      return state;
  }
};

export default reducer;
