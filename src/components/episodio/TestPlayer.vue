<template><div>
  <div class="episodio-page">
    <div class="video">
      <div class="video-box" ref="elementFullScreen">
        <video ref="videoElem" id="videoPlayer">
          <source src="/video/hj588khjg5g665hj456hjh5.mkv" type="video/mp4">
        </video>
        <div class="video-controls">
          <div @click="skipVideo">
            <div class="progressbar">
              <div class="progressbar-line" :style="{width: progressPorcent() + '%'}"></div>
            </div>
          </div>
          <div class="subcontrol">
            <div class="left">
              <v-btn @click="muteToggle" v-if="!isMuted()" dark icon><v-icon>mdi-volume-high</v-icon></v-btn>
              <v-btn @click="muteToggle" v-if="isMuted()" dark icon><v-icon>mdi-volume-off</v-icon></v-btn>
              <div class="volume-control-slider" @click="changeVolume">
                <div class="volume-line" :style="{width: volume() + '%'}"></div>
              </div>
            </div>
            <div class="center">
              <v-btn @click="play" v-if="isPaused()" dark icon><v-icon>mdi-play</v-icon></v-btn>
              <v-btn @click="pause" v-if="!isPaused()" dark icon><v-icon>mdi-pause</v-icon></v-btn>
            </div>
            <div class="right">
                <span class="time">
                  {{formatTime(currentTime())}}
                  <strong>/</strong>
                  {{formatTime(duration())}}
                </span>
              <v-btn v-if="!isFullScreen" @click="toggleFullScreen" dark icon><v-icon>mdi-fullscreen</v-icon></v-btn>
              <v-btn v-if="isFullScreen" @click="toggleFullScreen" dark icon><v-icon>mdi-fullscreen-exit</v-icon></v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="video-info">
      <h2>Zero no Tsukaima — Episódio 06</h2>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "TestPlayer",
  data: () => ({
    isFullScreen: false
  }),
  methods: {
    play(){
      this.$refs.videoElem.play();
    },
    pause(){
      this.$refs.videoElem.pause();
    },
    isPaused(){
      return this.$refs.videoElem ? this.$refs.videoElem.paused : true;
    },
    isMuted(){
      return this.$refs.videoElem ? this.$refs.videoElem.muted : false;
    },
    muteToggle(){
      this.$refs.videoElem.muted = !this.$refs.videoElem.muted;
    },
    currentTime(){
      return this.$refs.videoElem?.currentTime || 0;
    },
    duration(){
      return this.$refs.videoElem?.duration || 0;
    },
    progressPorcent(){
      return (this.currentTime() / this.duration()) * 100;
    },
    formatTime(time){
      if(!time || !parseInt(time)){
        return "00:00"
      }
      let h, m, s;
      m = Math.floor((time / 60) % 60);
      s = Math.floor(time % 60);
      h = Math.floor(time / 60 / 60);
      if(m < 10) m = `0${m}`;
      if(s < 10) s = `0${s}`;
      if(h > 0){
        return h + 'h' + m + ':' + s;
      }else{
        return m + ':' + s;
      }
    },
    skipVideo(event){
      let wrapper_offset = event.currentTarget.getBoundingClientRect().left;
      let clicked_offset = event.clientX - wrapper_offset;

      let width = (clicked_offset / event.currentTarget.getBoundingClientRect().width) * 100;
      this.$refs.videoElem.currentTime = (this.duration() / 100) * width;
    },
    toggleFullScreen(){
      this.$refs.videoElem.requestFullscreen();
      this.isFullScreen = !this.isFullScreen;
      this.$forceUpdate();
    },
    changeVolume(event){
      let wrapper_offset = event.currentTarget.getBoundingClientRect().left;
      let clicked_offset = event.clientX - wrapper_offset;

      let volumeBar = (clicked_offset / event.currentTarget.getBoundingClientRect().width) * 100;
      this.$refs.videoElem.volume = volumeBar / 100;
      window.localStorage.setItem('volumeVideo', (volumeBar / 100).toString());
    },
    volume(){
      return this.$refs.videoElem? this.$refs.videoElem.volume * 100 : 0;
    }
  },
  mounted() {
    let events = [
      'timeupdate',
      'volumechange',
      'seeked',
      'loadedmetadata'
    ];

    events.map(e => {
      this.$refs.videoElem.addEventListener(e, () => {
        this.$forceUpdate();
      });
    });

    this.$refs.videoElem.addEventListener('loadedmetadata', () => {
      this.$refs.videoElem.volume = parseInt(window.localStorage.getItem('volumeVideo') || 1);
      this.$forceUpdate();
    });

    this.$refs.videoElem.addEventListener('click', () => {
      if(this.isPaused()){
        this.play();
      }else{
        this.pause();
      }
    });

    this.$refs.videoElem.addEventListener('dblclick', () => {
      this.toggleFullScreen();
    });

    /*this.$refs.videoElem.addEventListener('mousemove', () => {
      this.$refs.elementFullScreen.style.backgroundColor = 'green';
      setTimeout(() => {
        this.$refs.elementFullScreen.style.background = 'none';
      }, 2000);
    });*/
  }
}
</script>

<style scoped>

</style>