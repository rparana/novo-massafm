import audios from "./data.js";
import { path, secondsToMinutes } from "./utils.js";
import elements from "./playerElements.js";

export default {
    audioData: [],
    currentAudio: {},
    currentPlaying: 0,
    isPlaying: false,
    start() {
        elements.get.call(this);
        this.update();
    },
    reload(b) {
        console.log(b)
        this.audio.pause();
        if (typeof(b) == "object") {
            if (this.playPausePodCast != null) this.playPausePodCast.onclick = null;
            this.playPausePodCast = b;
        }
        this.update();
        this.play();
    },
    play() {
        // check if context is in suspended state (autoplay policy)
        this.isPlaying = true;
        // if (this.audioCtx.state === 'suspended') {
        //     this.audioCtx.resume().then(() => {
        //         //this.audio.play();
        //         console.log('Playback resumed successfully');
        //     });
        //     //console.log("audio resume.")
        // } else {
        //     this.audio.play();
        // }
        this.audio.play();
        if (this.playPausePodCast !== null) {
            this.playPausePodCast.classList.remove('play')
            this.playPausePodCast.classList.add('pause')
        }
        this.playPause.classList.remove('mdi-play-circle-outline')
        this.playPause.classList.add('mdi-pause-circle-outline')
    },

    pause() {
        this.isPlaying = false;
        this.audio.pause();
        if (this.playPausePodCast !== null) {
            this.playPausePodCast.classList.remove('pause')
            this.playPausePodCast.classList.add('play')
        }
        this.playPause.classList.remove('mdi-pause-circle-outline')
        this.playPause.classList.add('mdi-play-circle-outline')
    },

    togglePlayPause() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    },

    toggleMute() {
        this.audio.muted = !this.audio.muted;
        if (this.audio.muted) {
            this.mute.classList.remove('mdi-volume-high')
            this.mute.classList.add('mdi-volume-off')
        } else {
            this.mute.classList.remove('mdi-volume-off')
            this.mute.classList.add('mdi-volume-high')
        }
    },

    next() {
        this.currentPlaying++;
        if (this.currentPlaying == this.audioData.length) this.restart();
        this.update();
        this.play();
    },

    setVolume(value) {
        this.audio.volume = value / 100;
        this.gainNode.gain.value = value;
    },

    setSeek(value) {
        this.audio.currentTime = value;
    },

    timeUpdate() {
        this.currentDuration.innerText = secondsToMinutes(this.audio.currentTime);
        if (this.currentAudio.live) {
            this.seekbar.value = 100;
            this.seekbar.disabled = true;
        }
    },

    update() {
        this.currentAudio = audios.track();
        this.cover.src = this.currentAudio.cover;
        this.title.innerText = this.currentAudio.title;
        this.artist.innerText = this.currentAudio.artist;
        elements.createAudioElement.call(this, this.currentAudio.file);
        //this.track = this.audioCtx.createMediaElementSource(this.audio);
        // connect our graph
        //this.track.connect(this.gainNode).connect(this.audioCtx.destination);
        this.audio.onloadeddata = () => {
            elements.actions.call(this);
        };
        if (this.currentAudio.autoplay === 'true') {
            //console.log(this.currentAudio.autoplay)
            this.play();
        }
    },

    restart() {
        this.currentPlaying = 0;
        this.update();
    }
};