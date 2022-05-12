const initialState = {
  currentSong: "",
  currentAlnum: "",
  isPaused: true,
  isPlaying: false,
  length: 0,
  currentIndex: -1,
  songSearch: "",
  pausingToPlayNewSong: false,
  songs: []
};
const playerControlReducer = (state = initialState, action) => {
  switch (action.type) {

    case "ADD_SONGS": {
      console.log({
        ...state,
        songs: action.payload,
      })
      return {
        ...state,
        songs: action.payload,
      };
    }

    case "UPDATE_CURRENT_SONG": {
      console.log({
        ...state,
        ...action.payload,
      })
      return {
        ...state,
        ...action.payload,
      };
    }

    case "UPDATE_CURRENT_ALBUM": {
      return {
        ...state,
        currentAlnum: action.payload,
      };
    }

    case "ADD_LENGTH_ALBUM": {
      return {
        ...state,
        length: action.payload,
      };
    }

    case "UPDATE_INDEX_SONG": {
      console.log({
        ...state,
        currentIndex: action.payload,
      })
      return {
        ...state,
        currentIndex: action.payload,
      };
    }

    case "UPDATE_IS_PAUSED": {
      // console.log({
      //   ...state,
      //   isPaused: action.payload,
      //   pausingToPlayNewSong: false
      // })
      return {
        ...state,
        isPaused: action.payload,
        pausingToPlayNewSong: false
      };
    }

    default: {
      return state;
    }
  }
};

export default playerControlReducer;
