<template>
  <v-card dark class="animes-view d-flex flex-wrap">
    <AnimeBox v-for="(anime, i) in this.$store.state.main.animes" :key="i" :id="anime._id" :nome="anime.nome" :foto="anime.foto"/>
  </v-card>
</template>

<script>
import AnimeBox from "@/components/anime/AnimeBox";

export default {
  name: "AnimesComponent",
  components: {AnimeBox}
}
</script>

<style scoped>
.animes-view {
  width: 100%;
  z-index: 1;
}
</style>