import playerControlReducer from "./playerControl";
import homeReducer from "./home";
import playlistsReducer from "./playlists.js";
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    playerControl: playerControlReducer,
    home: homeReducer,
    playlists: playlistsReducer
})

export default rootReducer