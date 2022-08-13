<template>
  <v-container fill-height fluid>
    <v-layout align-center style="display: block">
      <DestaquesComponent class="slider" :style="sliderMargin"/>
      <v-main class="timeline" :style="esquerdaStyle">
        <h1 :style="tituloStyle">Ultimos Lançamentos</h1>
        <v-btn
            @click="lancamentoPlus()"
            dark
            style="float: right; margin-top: 4px; margin-right: -13px"
        >
          <v-icon>mdi-plus</v-icon>
          Ver Mais
        </v-btn>
        <div class="temporada d-flex flex-row mb-6">
          <LancamentoComponent anime="Fullmetal Alchemist: Brotherhood"/>
          <LancamentoComponent anime="Gintama"/>
          <LancamentoComponent anime="Gintama Movie 2: Kanketsu-hen - Yorozuya yo Eien Nare"/>
          <LancamentoComponent anime="Shouwa Genroku Rakugo Shinjuu: Sukeroku Futatabi-hen"/>
          <LancamentoComponent anime="shimoneta to lu gainen ga sonzai shinai taiktsu na sekai apenas mais um teste pra ver como fica o espaço"/>
          <LancamentoComponent anime="Code Geass"/>
          <LancamentoComponent anime="Darling in The FranXX"/>
        </div>
        <div class="post">
          <PostagemComponent/>
          <PostagemComponent/>
          <PostagemComponent/>
          <PostagemComponent/>
          <PostagemComponent/>
        </div>
      </v-main>
      <div class="main-direita" :style="direitaStyle">
        <div class="mais-votados">
          <MaisAcessadosComponent/>
        </div>
        <div class="mais-votados">
          <TopUsuarios/>
        </div>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
import DestaquesComponent from "@/components/inicio/DestaquesComponent";
import LancamentoComponent from "@/components/inicio/LancamentoComponent";
import MaisAcessadosComponent from "@/components/inicio/MaisAcessadosComponent";
import PostagemComponent from "@/components/inicio/PostagemComponent";
import TopUsuarios from "@/components/inicio/TopUsuarios";
export default {
  name: "InicialComponent",
  components: {TopUsuarios, PostagemComponent, MaisAcessadosComponent, LancamentoComponent, DestaquesComponent},
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
      this.$router.push({name: 'Lançamentos'});
    }
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

.temporada {
  width: 100%;
  background-color: #34343499;
  overflow-x: auto;
  float: left;
  margin-left: 13px;
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