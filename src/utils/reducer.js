import { reducerCases } from "./Constants";

export const initialState = {
  token: null,
  playlist: [],
  userInfo: null,
  selectedPlaylistId: "7lkK4JetCQXMhJXyxwUWyp",
  selectedPlaylist: null,
  currentlyPlaying: null,
  playerState: false,
  currentTrackLyrics: null,
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

    case reducerCases.SET_PLAYER_STATE: {
      return {
        ...state,
        playerState: action.playerState,
      };
    }

    case reducerCases.SET_LYRICS: {
      return {
        ...state,
        currentTrackLyrics: action.currentTrackLyrics,
      };
    }

    default:
      return state;
  }

};

export default reducer;
