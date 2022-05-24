const initialState = {
  currentSong: "",
  currentAlbum: "",
  isPaused: true,
  isPlaying: false,
  currentIndex: -1,
  songSearch: "",
  pausingToPlayNewSong: false,
  songs: [],
  lyrics: []
};
const playerControlReducer = (state = initialState, action) => {
  switch (action.type) {

    case "ADD_SONGS": {
      return {
        ...state,
        songs: action.payload,
      };
    }

    case "UPDATE_CURRENT_SONG": {
      // console.log({
      //   ...state,
      //   ...action.payload,
      // })
      return {
        ...state,
        ...action.payload,
      };
    }

    case "UPDATE_CURRENT_ALBUM": {
      return {
        ...state,
        currentAlbum: action.payload,
      };
    }


    case "UPDATE_IS_PAUSED": {
      return {
        ...state,
        isPaused: action.payload,
        pausingToPlayNewSong: false
      };
    }

    case "UPDATE_IS_PLAYING": {
      return {
        ...state,
        isPlaying: action.payload,
      };
    }

    case "ADD_LYRICS": {
      console.log({
        ...state,
        lyrics: action.payload,
      })
      return {
        ...state,
        lyrics: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default playerControlReducer;
