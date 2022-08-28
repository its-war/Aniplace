<template>
  <v-card dark height="350px" class="v-card-mais-votados">
    <v-subheader>Animes com Melhores Pontuações</v-subheader>
    <div style="overflow-y: auto; height: 100%">
      <v-list>
        <v-list-item v-for="(anime, i) in animes" :key="i" @click="animeClick(anime._id)" :title="anime.nome">
          <v-list-item-icon>{{anime.nota.toFixed(2)}}<v-icon color="yellow">mdi-star</v-icon></v-list-item-icon>
          <v-list-item-title :style="tituloStyle">
            {{anime.nome}}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </div>
  </v-card>
</template>

<script>
import {animesMaiorPontuacao} from "@/plugins/axios";

export default {
  name: "AnimesMaisVotados",
  computed: {
    tituloStyle(){
      switch (this.$vuetify.breakpoint.name){
        case "sm": return 'font-size: 12px !important;';
        case "md": return '';
        case "lg": return '';
        case "xl": return '';
        default: return '';
      }
    }
  },
  data: () => ({
    animes: [
      {
        _id: '',
        nome: '',
        nota: 0
      }
    ]
  }),
  async mounted() {
    await animesMaiorPontuacao().then((value) => {
      this.animes = value.data.animes;
    });
  },
  methods: {
    animeClick(id){
      this.$router.push({name: 'Anime', params: {id: id}})
    }
  }
}
</script>

<style scoped>
.v-card-mais-votados {
  width: 80%;
}
</style>