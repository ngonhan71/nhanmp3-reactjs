import axiosClient from "./axiosClient"

const homeApi = {

    getHome: (page) => {
        const url = `get-home/${page}`
        return axiosClient.get(url)
    },
    getTop100: () => {
        const url = 'get-top100'
        return axiosClient.get(url)
    },
    getPlaylist: (id) => {
        const url = `playlist/${id}`
        return axiosClient.get(url)
    },
    getStreaming: (id) => {
        const url = `streaming/${id}`
        return axiosClient.get(url)
    },
    getSong: (id) => {
        const url = `bai-hat/${id}`
        return axiosClient.get(url)
    },
    searchAll: (key) => {
        const url = `tim-kiem/tat-ca`
        return axiosClient.get(url, { params: { key } })
    },
    searchSong: ({key, page}) => {
        const url = `tim-kiem/bai-hat`
        return axiosClient.get(url, { params: { key, page } })
    },
    getRecommend: (id) => {
        const url = `recommend-song/${id}`
        return axiosClient.get(url)
    }

}

export default homeApi