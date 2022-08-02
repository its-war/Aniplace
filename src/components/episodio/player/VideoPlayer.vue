<template>
  <div class="player">
    <div class="player__sizer">
      <video>
        <source type="video/mp4" src="/video/hj588khjg5g665hj456hjh5.mkv">
      </video>
    </div>
  </div>
</template>

<script>
export default {
  name: "VideoPlayer"
}
</script>

<style scoped lang="scss">
.player {
  width: 100%;

  video {
    position: absolute;
    width: 100%;
    height: auto;
    left: 0;
    top: 0;
  }

  &__sizer {
    position: relative;
    width: 100%;
    padding-top: 56.25%;
    outline: 1px solid red;
  }
}
</style>