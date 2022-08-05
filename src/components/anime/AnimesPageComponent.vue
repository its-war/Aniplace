<template>
  <v-container fill-height fluid>
    <h3 class="page-title" :style="esquerdaStyle">Visualizando todos os títulos com animações (Animes, Filmes e OVA's)</h3>
    <v-layout class="animes-page" :style="this.$vuetify.breakpoint.name === 'xs' ? 'padding: 10px !important;' : ''">
      <div class="esquerda" :style="esquerdaStyle">
        <v-card dark class="form-filtro">
          <v-card-title :style="tituloStyle">Nome</v-card-title>
          <v-text-field clearable filled label="Filtrar por nome"></v-text-field>
          <v-btn :x-small="this.$vuetify.breakpoint.name === 'sm'" dark>Buscar</v-btn>

          <v-card-title class="tituloBusca" :style="tituloStyle">
            Ano de <br v-if="this.$vuetify.breakpoint.name === 'sm'"/><br v-if="this.$vuetify.breakpoint.name === 'md'"/> Lançamento
          </v-card-title>
          <v-select
              v-model="anosSelecionados"
              item-text="ano"
              item-value="id"
              :items="anos"
              dark
              filled
              dense
              multiple
              chips
              deletable-chips
              placeholder="Selecionar ano"></v-select>

          <v-card-title :style="tituloStyle">
            Filtrar <br v-if="this.$vuetify.breakpoint.name === 'sm'"/><br v-if="this.$vuetify.breakpoint.name === 'md'"/>por Gêneros
          </v-card-title>
          <div class="text-left checkbox-generos">
            <v-checkbox
                v-model="generosSelecionados"
                v-for="(genero, i) in generos"
                :key="i" :value="genero._id"
                :label="genero.nome.toString()"></v-checkbox>
          </div>
        </v-card>
      </div>
      <div class="direita" :style="direitaStyle">
        <v-card dark class="d-flex flex-wrap btn-letra">
          <v-btn dark @click="filtroPorLetra('a')">#</v-btn>
          <v-btn dark @click="filtroPorLetra('a')">A</v-btn>
          <v-btn dark @click="filtroPorLetra('a')">B</v-btn>
          <v-btn dark @click="filtroPorLetra('a')">C</v-btn>
          <v-btn dark @click="filtroPorLetra('a')">D</v-btn>
          <v-btn dark @click="filtroPorLetra('a')">E</v-btn>
          <v-btn dark @click="filtroPorLetra('a')">F</v-btn>
          <v-btn dark @click="filtroPorLetra('a')">G</v-btn>
          <v-btn dark @click="filtroPorLetra('a')">H</v-btn>
          <v-btn dark @click="filtroPorLetra('a')">I</v-btn>
          <v-btn dark @click="filtroPorLetra('a')">J</v-btn>
          <v-btn dark @click="filtroPorLetra('a')">K</v-btn>
          <v-btn dark @click="filtroPorLetra('a')">L</v-btn>
          <v-btn dark @click="filtroPorLetra('a')">M</v-btn>
          <v-btn dark @click="filtroPorLetra('a')">N</v-btn>
          <v-btn dark @click="filtroPorLetra('a')">O</v-btn>
          <v-btn dark @click="filtroPorLetra('a')">P</v-btn>
          <v-btn dark @click="filtroPorLetra('a')">Q</v-btn>
          <v-btn dark @click="filtroPorLetra('a')">R</v-btn>
          <v-btn dark @click="filtroPorLetra('a')">S</v-btn>
          <v-btn dark @click="filtroPorLetra('a')">T</v-btn>
          <v-btn dark @click="filtroPorLetra('a')">U</v-btn>
          <v-btn dark @click="filtroPorLetra('a')">V</v-btn>
          <v-btn dark @click="filtroPorLetra('a')">W</v-btn>
          <v-btn dark @click="filtroPorLetra('a')">X</v-btn>
          <v-btn dark @click="filtroPorLetra('a')">Y</v-btn>
          <v-btn dark @click="filtroPorLetra('a')">Z</v-btn>
        </v-card>
        <v-card dark class="btn-letra" :style="this.$vuetify.breakpoint.name === 'xs' ? '' : 'display: none'">
          <v-text-field dark filled clearable label="Nome"></v-text-field>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn dark>Buscar</v-btn>
          </v-card-actions>
        </v-card>

        <router-view/>

        <v-card dark style="margin-top: 20px">
          <v-pagination @input="paginationNavigation()" color="red" v-model="paginaAtual" :length="paginator.totalPaginas" total-visible="7"></v-pagination>
        </v-card>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
import {listarAnimes} from "@/plugins/axios";
import {mapActions} from "vuex";

export default {
  name: "AnimesPageComponent",
  data: () => ({
    anos: [
      {ano: 1998, id: 127},
      {ano: 1999, id: 126},
      {ano: 2000, id: 125},
      {ano: 2001, id: 124},
    ],
    anosSelecionados: [],
    generos: [
      {nome: 1998, _id: 127},
      {nome: 1999, _id: 126},
      {nome: 2000, _id: 125},
      {nome: 2001, _id: 124},
    ],
    generosSelecionados: [],
    boardShow: true,
    paginator: {
      totalAnimes: 0,
      limit: 10,
      totalPaginas: 0,
      paginaAtual: 1,
      slNo: 1,
      temAnterior: false,
      temProximo: false,
      anterior: null,
      proximo: null
    },
    paginaAtual: 1
  }),
  watch: {
    paginaAtual: {
      handler: async function(){
        this.list();
      }
    }
  },
  methods: {
    ...mapActions('main', ['ActionSetAnimes']),
    filtroPorLetra(letra){
      console.log(letra);
    },
    list(){
      listarAnimes(this.paginaAtual).then((value) => {
        if(value){
          this.ActionSetAnimes(value.data.animes);
          this.paginator = value.data.paginator;
        }
      });
    },
    async paginationNavigation(){
      if(this.paginaAtual !== parseInt(this.$route.params.pagina)){
        await this.$router.push({name: 'Animes', params: {pagina: this.paginaAtual.toString()}});
      }
    }
  },
  computed: {
    esquerdaStyle() {
      //alert(this.$vuetify.breakpoint.width);
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return {
            visibility: 'hidden',
            display: 'none'
          }
        case "sm":
          return {
            visibility: 'visible',
            width: '25%',
            'font-size': '15px !important'
          }
        default: return 'content: ""';
      }
    },
    direitaStyle(){
      switch (this.$vuetify.breakpoint.name){
        case "xs": return 'float: none !important; margin: auto;';
        case "sm": return 'max-width: 75%';
        case "md": return 'content :""';
        case "lg": return 'content :""';
        case "xl": return 'content :""';
        default: return 'content :""';
      }
    },
    tituloStyle(){
      switch (this.$vuetify.breakpoint.name){
        case "xs": return '';
        case "sm": return 'font-size: 12px !important;';
        case "md": return '';
        case "lg": return '';
        case "xl": return '';
        default: return '';
      }
    }
  },
  mounted() {
    if(this.paginaAtual === parseInt(this.$route.params.pagina)){
      this.list();
    }else{
      this.paginaAtual = parseInt(this.$route.params.pagina);
    }
  }
}
</script>

<style scoped>
.page-title {
  font-family: Roboto, sans-serif;
  font-weight: normal;
  margin-left: 20px;
  color: #FFFFFF;
  margin-top: 20px;
  margin-bottom: -20px;
}

.animes-page {
  padding: 20px;
}

.esquerda {
  float: left;
  width: 20%;
  visibility: visible;
}

.tituloBusca {
  margin-top: 55px;
}

.direita {
  float: right;
  width: 78%;
  margin: 0 10px auto auto;
}

.form-filtro {
  width: 100%;
  padding: 15px;
}

.form-filtro button {
  float: right;
}

.checkbox-generos {
  padding: 5px;
  width: 100%;
}

.btn-letra {
  width: 100%;
  padding: 15px;
  margin-bottom: 15px;
}

.btn-letra button {
  margin: 5px;
}
</style>