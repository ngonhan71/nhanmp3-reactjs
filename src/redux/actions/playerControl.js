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

export const updateIndexSong = (index) => {
    return  {
        type: 'UPDATE_INDEX_SONG',
        payload: index
    }
}

export const updateIsPaused = (value) => {
    return  {
        type: 'UPDATE_IS_PAUSED',
        payload: value
    }
}



