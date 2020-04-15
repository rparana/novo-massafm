window.podcasts = {
    updatePodcasts() {
        const base = this.reloadPlayer;
        document.querySelectorAll(".podcast-item-player .controls").forEach(function(element) {
            //element.addEventListener('click', tabClick)
            const url = element.querySelector('.track').getAttribute("url");
            const title = element.querySelector('.track').getAttribute("title")
            var audioTmp = new Audio(element.querySelector('.track').getAttribute("url"))
            let showTime = element.querySelector('.total-duration')
            const tempo = (time) => {
                let minutes = Math.floor(time / 60);
                const seconds = Math.floor(time % 60);
                minutes = seconds > 30 ? minutes++ : minutes;
                return `${("0" + minutes).slice(-2)} min`;
            }
            audioTmp.onloadeddata = () => {
                showTime.innerText = tempo(audioTmp.duration);
            };
            //const btnPlay = element.querySelector('.btn-play')
            //btnPlay.onclick = () => this.playPodCast()
        });
        return;
    }
};