import audios from "./data.js";
import { path, secondsToMinutes } from "./utils.js";
import elements from "./playerElements.js";

export default {
    audioData: [],
    currentAudio: {},
    currentPlaying: 0,
    isPlaying: false,
    minimized: true,
    isClosed: true,
    start() {
        elements.get.call(this);
        this.update();
    },
    reload(b) {
        this.audio.pause();
        if (typeof(b) == "object") {
            if (this.playPausePodCast != null) this.playPausePodCast.onclick = null;
            this.playPausePodCast = b;
        }
        this.update();
        this.play();

    },
    play() {
        this.isClosed ? this.maxPlayer() : '';
        // check if context is in suspended state (autoplay policy)
        this.isPlaying = true;
        this.audio.play();
        this.updateBgVolume();
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
        this.updateBgVolume();
    },

    setSeek(value) {
        this.audio.currentTime = value;
    },

    timeUpdate() {
        this.currentDuration.innerText = secondsToMinutes(this.audio.currentTime);
        if (this.currentAudio.live) {
            this.seekbar.value = 100;
            this.seekbar.disabled = true;
        } else {
            this.seekbar.value = this.audio.currentTime;
            this.seekbar.disabled = false;
        }
        this.updateBgSeekbar()
    },
    updateBgSeekbar() {
        var perc = this.seekbar.value / this.seekbar.max * 100
        this.seekbar.style = `background: linear-gradient(to right, #6318af 0%, #b50091 ${perc}%, #606060 ${perc}%, #606060 100%);`
    },
    updateBgVolume() {
        var perc = this.volume.value / this.volume.max * 100
        this.volume.style = `background: linear-gradient(to right, #6318af 0%, #b50091 ${perc}%, #606060 ${perc}%, #606060 100%);`
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
        this.updateBgVolume();
        this.audio.onloadeddata = () => {
            elements.actions.call(this);
        };
        if (this.currentAudio.autoplay === 'true') {
            this.play();
        }
    },

    restart() {
        this.currentPlaying = 0;
        this.update();
    },
    maxPlayer() {
        this.minimized = false;
        this.isClosed = false;
        this.playerSection.classList.remove('hide');
        this.playerSection.classList.remove('minimized');
        this.btnMinMaxPlayer.classList.remove('mdi-chevron-up');
        this.btnMinMaxPlayer.classList.add('mdi-chevron-down');
        this.btnClosePlayer.classList.remove('mdi-dock-window');
        this.btnClosePlayer.classList.add('mdi-close');
    },
    minPlayer() {
        this.minimized = true;
        this.playerSection.classList.add('minimized');
        this.btnMinMaxPlayer.classList.remove('mdi-chevron-down');
        this.btnMinMaxPlayer.classList.add('mdi-chevron-up');
        this.btnClosePlayer.classList.remove('mdi-dock-window');
        this.btnClosePlayer.classList.add('mdi-close');
    },
    togglePlayerSize() {
        this.minimized ? this.maxPlayer() : this.minPlayer();
    },
    close() {
        this.pause();
        this.minimized = true;
        this.isClosed = !this.isClosed;
        this.playerSection.classList.add('minimized');
        this.playerSection.classList.toggle('hide');
        this.btnClosePlayer.classList.toggle('mdi-dock-window');
        this.btnClosePlayer.classList.toggle('mdi-close');
        this.btnMinMaxPlayer.classList.remove('mdi-chevron-down');
        this.btnMinMaxPlayer.classList.add('mdi-chevron-up');
    },
    loadPlayer() {
        elements.get.call(this);
        elements.actions.call(this);
        if (this.isPlaying) {
            this.minimized = !this.minimized;
            this.togglePlayerSize();
            this.playPause.classList.remove('mdi-play-circle-outline')
            this.playPause.classList.add('mdi-pause-circle-outline')
        }
    }
};