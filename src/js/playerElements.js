import { secondsToMinutes } from "./utils.js";

export default {
    get() {
        this.cover = document.querySelector("#img-cover");
        this.title = document.querySelector(".player-box .player-info h3");
        this.artist = document.querySelector(".player-box .player-info h5");
        this.playPause = document.querySelector("#play-pause");
        this.playPausePodCast = null;
        this.mute = document.querySelector("#mute");
        this.volume = document.querySelector("#vol-control");
        this.seekbar = document.querySelector("#seekbar");
        this.currentDuration = document.querySelector("#current-duration");
        this.totalDuration = document.querySelector("#total-duration");
    },
    createAudioElement(audio) {
        // for cross browser
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioCtx = new AudioContext();
        this.audio = new Audio(audio);
        this.gainNode = this.audioCtx.createGain();
        //this.audio.crossOrigin = "anonymous";
    },
    actions() {
        //this.audio.onended = () => this.next();
        this.audio.ontimeupdate = () => this.timeUpdate();
        this.playPause.onclick = () => this.togglePlayPause();
        if (this.playPausePodCast !== null) this.playPausePodCast.onclick = () => this.togglePlayPause();
        this.mute.onclick = () => this.toggleMute();
        this.volume.oninput = () => this.setVolume(this.volume.value);
        this.volume.onchange = () => this.setVolume(this.volume.value);
        this.seekbar.oninput = () => this.setSeek(this.seekbar.value);
        this.seekbar.onchange = () => this.setSeek(this.seekbar.value);
        this.seekbar.max = this.audio.duration;
        console.log(this.audio.duration)
        if (this.audio.duration === Infinity) {
            this.totalDuration.innerHTML = '<span class="mdi mdi-infinity"></span>';
        } else {
            this.totalDuration.innerText = secondsToMinutes(this.audio.duration);
        }
    }
};