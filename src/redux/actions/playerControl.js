export const addSongs = (songs) => {
    return  {
        type: 'ADD_SONGS',
        payload: songs
    }
}

export const updateCurrentSong = (song) => {
    return  {
        type: 'UPDATE_CURRENT_SONG',
        payload: song
    }
}


export const updateCurrentAlbum = (album) => {
    return  {
        type: 'UPDATE_CURRENT_ALBUM',
        payload: album
    }
}

export const updateIsPaused = (value) => {
    return  {
        type: 'UPDATE_IS_PAUSED',
        payload: value
    }
}

export const updateIsPlaying = (value) => {
    return  {
        type: 'UPDATE_IS_PLAYING',
        payload: value
    }
}

export const addLyris = (lyrics) => {
    return  {
        type: 'ADD_LYRICS',
        payload: lyrics
    }
}




