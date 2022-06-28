import { reducerCases } from "./Constants";

export const initialState = {
  token: null,
  playlist: [],
  userInfo: null,
  selectedPlaylistId: "7lkK4JetCQXMhJXyxwUWyp",
  selectedPlaylist: null,
  currentlyPlaying: null,
  snackBarState: false,
  currentTrackLyrics: null,
  selectedLanguage: 'default',
  speedDialActions: [
    {
      innerText: "EN",
      name: "English",
    },
    {
      innerText: "RO",
      name: "Romanized",
    },
    {
      innerText: "JP",
      name: "Japanese",
    },
    {
      innerText: "DE",
      name: "Default",
    },
  ]


  
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

    case reducerCases.SET_SNACKBAR_STATE: {
      return {
        ...state,
        snackBarState: action.snackBarState,
      };
    }

    case reducerCases.SET_LYRICS: {
      return {
        ...state,
        currentTrackLyrics: action.currentTrackLyrics,
      };
    }
     case reducerCases.SELECTED_LANGUAGE: {
       return {
         ...state,
         selectedLanguage: action.selectedLanguage,
       }
     }

    default:
      return state;
  }

};

export default reducer;
