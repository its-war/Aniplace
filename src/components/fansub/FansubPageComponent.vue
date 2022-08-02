<template>
  <v-container fill-height fluid>
    <div class="anime-cover" style="background: url(/img/anime/cover/wallhaven-v9vxel.png) center center fixed;"></div>
    <div class="anime-cover-sheet"></div>
  </v-container>
</template>

<script>
export default {
  name: "FansubPageComponent"
}
</script>

<style scoped lang="scss">
$cover-height: 600px;

.anime-cover {
  background-size: cover;
  height: $cover-height;
  width: 100%;
}

.anime-cover-sheet {
  background-color: #000000d6;
  position: absolute;
  width: 100%;
  height: $cover-height;
  top: 0;
}
</style>