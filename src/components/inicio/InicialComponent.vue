<template>
  <v-container fill-height fluid>
    <v-layout align-center style="display: block">
      <DestaquesComponent class="slider" :style="sliderMargin"/>
      <h1 :style="tituloStyle" style="color: #ffffff; margin-top: 50px; text-align: left; margin-left: 50px">Ultimos Lançamentos</h1>
      <div class="temporada-sizer">
        <v-btn
            @click="lancamentoPlus()"
            dark
            style="float: right; margin-right: 2.5%"
        >
          <v-icon>mdi-plus</v-icon>
          Ver Mais
        </v-btn>
        <div class="temporada d-flex flex-row mb-6">
          <LancamentoComponent v-for="(episodio, i) in episodios" :key="i" :id="episodio.anime._id"
                               :nome="episodio.anime.nome"
                               :numero="episodio.numero"
                               :thumb="episodio.thumb"
                               :temporada="episodio.temporada"/>
        </div>
      </div>
      <v-main class="timeline" :style="esquerdaStyle">
        <div class="post">
          <div style="width: 60%; float: right">
            <NewPostComponent/>
            <PostUserComponent/>
            <PostUserComponent/>
            <PostUserComponent/>
            <PostUserComponent/>
            <PostUserComponent/>
            <PostUserComponent/>
            <PostUserComponent/>
            <PostUserComponent/>
            <PostUserComponent/>
            <PostUserComponent/>
          </div>
        </div>
      </v-main>
      <div class="main-direita" :style="direitaStyle">
        <div class="mais-votados">
          <MaisAcessadosComponent/>
        </div>
        <div class="mais-votados">
          <TopUsuarios/>
        </div>
        <div class="mais-votados">
          <AnimesMaisVotados/>
        </div>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
import DestaquesComponent from "@/components/inicio/DestaquesComponent";
import LancamentoComponent from "@/components/inicio/LancamentoComponent";
import MaisAcessadosComponent from "@/components/inicio/MaisAcessadosComponent";
import TopUsuarios from "@/components/inicio/TopUsuarios";
import {getLancamentos} from "@/plugins/axios";
import AnimesMaisVotados from "@/components/inicio/AnimesMaisVotados";
import NewPostComponent from "@/components/postagem/NewPostComponent";
import PostUserComponent from "@/components/postagem/PostUserComponent";

export default {
  name: "InicialComponent",
  components: {
    PostUserComponent,
    NewPostComponent,
    AnimesMaisVotados,
    TopUsuarios, MaisAcessadosComponent, LancamentoComponent, DestaquesComponent},
  data: () => ({
    episodios: [
      {
        _id: '',
        thumb: '',
        numero: 0,
        temporada: 0,
        anime: {
          _id: '',
          nome: ''
        }
      }
    ]
  }),
  computed: {
    esquerdaStyle(){
      switch (this.$vuetify.breakpoint.name){
        case "xs": return 'width: 93%; margin: auto;';
        case "sm": return 'width: 50%; margin: auto;';
        case "md": return '';
        case "lg": return '';
        case "xl": return '';
        default: return '';
      }
    },
    direitaStyle(){
      switch (this.$vuetify.breakpoint.name){
        case "xs": return 'display: none !important; float: none;';
        case "sm": return 'width: 50%; margin-top: 38px';
        case "md": return '';
        case "lg": return '';
        case "xl": return '';
        default: return '';
      }
    },
    tituloStyle(){
      switch (this.$vuetify.breakpoint.name){
        case "xs": return 'font-size: 25px;';
        case "sm": return 'font-size: 25px;';
        case "md": return '';
        case "lg": return '';
        case "xl": return '';
        default: return '';
      }
    },
    sliderMargin(){
      switch (this.$vuetify.breakpoint.name){
        case "xs": return 'margin-bottom: -70px;';
        case "sm": return '';
        case "md": return '';
        case "lg": return 'margin-bottom: -190px;';
        case "xl": return 'margin-bottom: -120px;';
        default: return 'margin-bottom: -120px;';
      }
    }
  },
  methods: {
    lancamentoPlus(){
      this.$router.push({name: 'Lançamentos', params: {pagina: '1'}});
    },
    async listLancamentos(){
      await getLancamentos().then((value) => {
        this.episodios = value.data.episodios;
      });
    }
  },
  mounted() {
    this.listLancamentos();
  }
}
</script>

<style scoped>
.timeline {
  display: inline;
  float: left;
  width: 70%;
}

.main-direita {
  float: right;
  display: block !important;
  width: 30%;
}

.timeline h1 {
  color: #FFFFFF;
  text-align: left;
  margin-left: 50px;
  float: left;
}

.temporada-sizer {
  width: 100%;
  margin-bottom: -50px;
}

.temporada {
  width: 95%;
  margin: auto;
  background-color: #34343499;
  overflow-x: auto;
  position: relative;
}

.mais-votados {
  width: 100%;
  padding: 22px;
  margin-top: 30px;
}

.post {
  width: 100%;
  float: left;
  padding: 12px;
  margin-left: 13px;
}
</style>