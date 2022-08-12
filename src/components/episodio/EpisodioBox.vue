<template>
  <div class="episodio-border" :style="episodioBorderStyle">
    <div class="episodio-box" :style="this.$vuetify.breakpoint.name === 'xs' ? 'width: 100%' : ''">
      <h3 @click="assistir()">Episódio {{this.$props.numero}}</h3>
      <img :src="'/img/episodios/' + this.$props.thumb" :alt="'Thumb do episodio' + this.$props.numero"/>
      <v-tooltip top color="error">
        <template v-slot:activator="{on,attrs}">
          <v-btn color="white" @click="assistir()" icon v-bind="attrs" v-on="on"><v-icon>mdi-play</v-icon></v-btn>
        </template>
        <span>Assistir</span>
      </v-tooltip>
      <v-tooltip top color="error">
        <template v-slot:activator="{on,attrs}">
          <v-btn color="white" icon v-bind="attrs" v-on="on"><v-icon>mdi-download</v-icon></v-btn>
        </template>
        <span>Baixar Episódio</span>
      </v-tooltip>
      <v-tooltip top color="error">
        <template v-slot:activator="{on,attrs}">
          <v-btn color="white" icon v-bind="attrs" v-on="on"><v-icon>mdi-comment-text-outline</v-icon></v-btn>
        </template>
        <span>Comentar</span>
      </v-tooltip>
    </div>
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
      this.$router.push({name: 'Episódio', params: {id: this.$props.idAnime, temporada: this.$props.temporada.toString(), numero: this.$props.numero.toString()}})
    }
  },
  computed: {
    episodioBorderStyle(){
      switch (this.$vuetify.breakpoint.name){
        case "xs": return 'width: 100%';
        case "sm": {
          if(this.$vuetify.breakpoint.width >= 800){
            return 'width: 33.3%'
          }else{
            return 'width: 50%'
          }
        }
        case "md": return 'width: 25%';
        case "lg": return 'width: 16.6%';
        case "xl": return 'width: 16.6%';
        default: return 'width: 16.6%';
      }
    }
  }
}
</script>

<style scoped>
.episodio-border {
  width: 16.6%;
  padding: 10px;
}

.episodio-box {
  width: 100%;
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
  border-radius: 10px;
}

.episodio-box button {
  margin: 2px 0;
}

.episodio-box h3 {
  cursor: pointer;
}
</style>