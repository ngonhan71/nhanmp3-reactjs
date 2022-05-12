const helper = {
    formatTime: (duration) => {
        let hours = Math.floor(duration / 3600);
        let minutes = Math.floor((duration - hours * 3600) / 60);
        let seconds = Math.floor(duration - hours * 3600 - minutes * 60);
    
        hours = hours < 10 ? (hours > 0 ? '0' + hours : 0) : hours;
    
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        return (hours !== 0 ? hours + ':' : '') + minutes + ':' + seconds;
    },
    randomIndex: (length, current = 0) => {

        let indexRandom = -1
        do {
            indexRandom = Math.floor((Math.random() * length))

        } while (indexRandom === current)
        return indexRandom
    }, 
    formatLike: (number) => {
        return  `${(number / 1000000).toFixed(2)}M người yêu thích`
    },
    getNow: () => {
        return new Date().toLocaleDateString()
    }
    
}

export default helper