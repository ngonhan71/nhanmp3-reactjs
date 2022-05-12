import playerControlReducer from "./playerControl";
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    playerControl: playerControlReducer,
})

export default rootReducer