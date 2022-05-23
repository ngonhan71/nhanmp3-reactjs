import axiosClient from "./axiosClient"

const songApi = {

    getStreaming: (id) => {
        const url = `streaming/${id}`
        return axiosClient.get(url)
    },
    getSong: (id) => {
        const url = `bai-hat/${id}`
        return axiosClient.get(url)
    },
    getRecommend: (id) => {
        const url = `recommend-song/${id}`
        return axiosClient.get(url)
    },
    getLyric: (id) => {
        const url = `lyric/${id}`
        return axiosClient.get(url)
    }

}

export default songApi