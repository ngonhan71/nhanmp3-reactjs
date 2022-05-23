const initialState = {
    playlists: []
  };
  const playlistsReducer = (state = initialState, action) => {
    switch (action.type) {
  
      case "ADD_PLAYLIST": {
        console.log({
            ...state,
            playlists: [...state.playlists, action.payload]
        })
        return {
            ...state,
            playlists: [...state.playlists, action.payload]
        };
      }

  
      default: {
        return state;
      }
    }
  };
  
  export default playlistsReducer;
  