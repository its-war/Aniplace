<template>
  <div class="episodio-box" :style="this.$vuetify.breakpoint.name === 'xs' ? 'width: 100%' : ''">
    <h3 @click="assistir()">Episódio {{this.$props.numero}}</h3>
    <img :src="'/img/episodios/' + this.$props.thumb" :alt="'Thumb do episodio' + this.$props.numero"/>
    <v-btn @click="assistir()"><v-icon>mdi-play-box</v-icon> Assistir</v-btn>
    <v-btn><v-icon>mdi-download</v-icon> Baixar</v-btn>
  </div>
</template>

<script>
export default {
  name: "EpisodioBox",
  props: {
    idAnime: {
      type: String,
      required: true
    },
    temporada: {
      type: Number,
      required: true
    },
    numero: {
      type: Number,
      required: true
    },
    thumb: {
      type: String,
      required: true
    }
  },
  methods: {
    assistir(){
      this.$router.push({name: 'Episódio', params: {id: this.$props.idAnime, temporada: this.$props.temporada, numero: this.$props.numero}})
    }
  }
}
</script>

<style scoped>
.episodio-box {
  width: 15%;
  margin: 10px;
  padding: 10px;
  text-align: center;
  background-color: #343434;
  border: solid 2px #343434;
  border-radius: 10px;
  transition: 150ms;
}

.episodio-box:hover {
  background-color: transparent;
  border: solid 2px #ff4a3b;
  transform: scale(1.1);
}

.episodio-box img {
  width: 100%;
}

.episodio-box button {
  margin: 2px 0;
  width: 100%;
}

.episodio-box h3 {
  cursor: pointer;
}
</style>