<template>
  <v-container fill-height fluid>
    <h3 class="page-title" :style="esquerdaStyle">Visualizando todos os títulos com animações (Animes, Filmes e OVA's)</h3>
    <v-layout class="animes-page" :style="this.$vuetify.breakpoint.name === 'xs' ? 'padding: 10px !important;' : ''">
      <div class="esquerda" :style="esquerdaStyle">
        <v-card dark class="form-filtro">
          <v-card-title :style="tituloStyle">Nome</v-card-title>
          <v-text-field v-on:keyup.enter="find()" filled label="Filtrar por nome" v-model="search"></v-text-field>
          <v-btn style="margin-right: 2px; margin-left: 2px" v-show="conditions.nome.length > 0 || generosSelecionados.length > 0 || conditions.letra !== '' || conditions.ano > 1" dark :x-small="this.$vuetify.breakpoint.name === 'sm'" @click="limparBusca()">Resetar Filtros</v-btn>
          <v-btn :x-small="this.$vuetify.breakpoint.name === 'sm'" dark @click="find()">Buscar</v-btn>

          <v-card-title class="tituloBusca" :style="tituloStyle">
            Ano de <br v-if="this.$vuetify.breakpoint.name === 'sm'"/><br v-if="this.$vuetify.breakpoint.name === 'md'"/> Lançamento
          </v-card-title>
          <v-select @change="setAno()"
              v-model="anoSelecionado"
              :items="anos"
              dark
              filled
              dense
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
          <v-btn-toggle color="red" v-model="btnGroup" class="d-inline-block">
            <v-btn dark @click="filtroPorLetra('#')">#</v-btn>
            <v-btn dark @click="filtroPorLetra('a')">A</v-btn>
            <v-btn dark @click="filtroPorLetra('b')">B</v-btn>
            <v-btn dark @click="filtroPorLetra('c')">C</v-btn>
            <v-btn dark @click="filtroPorLetra('d')">D</v-btn>
            <v-btn dark @click="filtroPorLetra('e')">E</v-btn>
            <v-btn dark @click="filtroPorLetra('f')">F</v-btn>
            <v-btn dark @click="filtroPorLetra('g')">G</v-btn>
            <v-btn dark @click="filtroPorLetra('h')">H</v-btn>
            <v-btn dark @click="filtroPorLetra('i')">I</v-btn>
            <v-btn dark @click="filtroPorLetra('j')">J</v-btn>
            <v-btn dark @click="filtroPorLetra('k')">K</v-btn>
            <v-btn dark @click="filtroPorLetra('l')">L</v-btn>
            <v-btn dark @click="filtroPorLetra('m')">M</v-btn>
            <v-btn dark @click="filtroPorLetra('n')">N</v-btn>
            <v-btn dark @click="filtroPorLetra('o')">O</v-btn>
            <v-btn dark @click="filtroPorLetra('p')">P</v-btn>
            <v-btn dark @click="filtroPorLetra('q')">Q</v-btn>
            <v-btn dark @click="filtroPorLetra('r')">R</v-btn>
            <v-btn dark @click="filtroPorLetra('s')">S</v-btn>
            <v-btn dark @click="filtroPorLetra('t')">T</v-btn>
            <v-btn dark @click="filtroPorLetra('u')">U</v-btn>
            <v-btn dark @click="filtroPorLetra('v')">V</v-btn>
            <v-btn dark @click="filtroPorLetra('w')">W</v-btn>
            <v-btn dark @click="filtroPorLetra('x')">X</v-btn>
            <v-btn dark @click="filtroPorLetra('y')">Y</v-btn>
            <v-btn dark @click="filtroPorLetra('z')">Z</v-btn>
          </v-btn-toggle>
          <v-btn v-show="btnGroup !== null" dark @click="letraClear()">Resetar</v-btn>
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
import {listarAnimes, listarGeneros, getMenorAno} from "@/plugins/axios";
import {mapActions} from "vuex";
import {getAno} from "@/plugins/datahora";

export default {
  name: "AnimesPageComponent",
  data: () => ({
    anos: [],
    anoSelecionado: 1,
    generos: [
      {_id: '', nome: ''}
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
    paginaAtual: 1,
    btnGroup: null,
    conditions: {
      nome: '',
      ano: 1,
      letra: ''
    },
    letraSelecionada: '',
    showClear: false,
    search: '',
    right: false
  }),
  watch: {
    paginaAtual: {
      handler: async function(){
        this.list();
      }
    },
    conditions: {
      handler: function(){
        if(!this.right){
          this.buscar();
        }
      },
      deep: true
    },
    generosSelecionados: {
      handler: function(newValue, oldValue){
        if(this.generosSelecionados.length > 0){
          this.buscar();
        }else{
          if(newValue.length !== oldValue.length){
            this.buscar();
          }
        }
      }
    }
  },
  methods: {
    ...mapActions('main', ['ActionSetAnimes']),
    filtroPorLetra(letra){
      if(this.conditions.letra === letra){
        this.letraClear();
      }else{
        this.conditions.letra = letra;
      }
    },
    letraClear(){
      this.btnGroup = null;
      this.conditions.letra = '';
    },
    list(){
      listarAnimes(this.paginaAtual, this.conditions, this.generosSelecionados).then((value) => {
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
    },
    getGeneros(){
      listarGeneros().then((value) => {
        this.generos = value.data.generos;
        this.generosSelecionados = [];
      });
    },
    limparBusca(){
      this.left = true;
      this.conditions.nome = '';
      this.search = '';
      this.conditions.letra = '';
      this.anoSelecionado = 1;
      this.conditions.ano = 1;
      this.btnGroup = null;
      if(this.generosSelecionados.length > 0){
        this.right = true;
        this.generosSelecionados = [];
      }
    },
    setAno(){
      this.conditions.ano = this.anoSelecionado;
    },
    find(){
      this.conditions.nome = this.search;
    },
    buscar(){
      if(this.paginaAtual === 1){
        this.list();
      }else{
        this.paginaAtual = 1;
        this.$router.push({name: 'Animes', params: {pagina: this.paginaAtual.toString()}});
      }
    },
    populateAnos(){
      getMenorAno().then((value) => {
        for(let i = value.data.menorAno; i <= getAno() + 1; i++){
          this.anos.push(i);
        }
      });
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
    this.populateAnos();
    this.getGeneros();
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