<template>
  <v-card dark height="350px">
    <v-subheader>Top Animes Mais Acessados</v-subheader>
    <div style="overflow-y: auto; height: 100%">
      <v-list>
        <v-list-item v-for="(anime, i) in animes" :key="i" @click="animeClick(anime._id)">
          <v-list-item-icon>{{i + 1}}º</v-list-item-icon>
          <v-list-item-title :style="tituloStyle">
            {{anime.nome}}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </div>
  </v-card>
</template>

<script>
import {animesMaisAcessados} from "@/plugins/axios";

export default {
  name: "MaisAcessadosComponent",
  data: () => ({
    animes: [
      {
        _id: '',
        nome: ''
      }
    ]
  }),
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
  async mounted() {
    await animesMaisAcessados().then((value) => {
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

</style>