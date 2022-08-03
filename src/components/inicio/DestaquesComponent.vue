<template>
  <v-carousel dark continuous :height="slideStyle" cycle :show-arrows="false" hide-delimiters>
    <v-carousel-item eager v-for="(destaque, i) in destaques" :key="i">
      <v-img :height="imgHeight" :src="'/img/destaques/' + destaque.foto" eager/>
      <div class="slide-destaques" :style="slideDestaqueStyle">
        <div class="destaque-info" :style="destaquePadding">
          <h1 :style="destaqueInfoStyle">{{destaque.anime.nome}}</h1>
          <h3 :style="destaqueInfoStyle">
              <span v-for="(genero, j) in destaque.anime.generos"
                    :key="j">
                {{genero.nome}} <span class="genero-spacer" v-if="j !== destaque.anime.generos.length - 1">—</span>
              </span>
          </h3>
          <p :style="destaqueInfoStyle">
            <span v-show="nota[i] !== null">{{nota[i]}} <v-icon class="yellow--text" style="padding-bottom: 5px !important;">mdi-star</v-icon></span>
            <span v-show="nota[i] === null">Sem Nota</span>
          </p>
          <v-btn :x-small="btnStyle" icon dark><v-icon color="red">mdi-heart-outline</v-icon></v-btn>
          <v-btn @click="animePage(destaque.anime._id)" :x-small="btnStyle" icon dark><v-icon>mdi-redo</v-icon></v-btn>
        </div>
      </div>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import {listarDestaques, getRanking} from "@/plugins/axios";

export default {
  name: "DestaquesComponent",
  data: () => ({
    destaques: [],
    nota: []
  }),
  methods: {
    start(){
      listarDestaques().then((value) => {
        this.destaques = value.data.destaques;
        this.getNota()
      });
    },
    animePage(id){
      this.$router.push({name: 'Anime', params: {id: id}});
    },
    async getNota(){
      for(let i = 0; i < this.destaques.length; i++){
        await getRanking(this.destaques[i].anime._id).then((value) => {
          this.nota.push(value.data.nota);
        });
      }
    }
  },
  created() {
    this.start();
  },
  computed: {
    slideStyle(){
      switch (this.$vuetify.breakpoint.name){
        case "xs": return 450;
        case "sm": return 350;
        case "md": return 550;
        case "lg": return 800;
        case "xl": return 800;
        default: return 800;
      }
    },
    slideDestaqueStyle(){
      switch (this.$vuetify.breakpoint.name){
        case "xs": return {
          bottom: '0 !important',
          position: 'relative',
          'z-index': 20
        }
        case "sm": return {
          position: 'relative',
        };
        case "md": return '';
        case "lg": return '';
        case "xl": return '';
        default: return '';
      }
    },
    destaqueInfoStyle(){
      switch (this.$vuetify.breakpoint.name){
        case "xs": return {
          'font-size': '15px !important'
        }
        case "sm": return {
          'font-size': '15px !important'
        }
        case "md": return '';
        case "lg": return '';
        case "xl": return '';
        default: return '';
      }
    },
    imgHeight(){
      switch (this.$vuetify.breakpoint.name){
        case "xs": return '50%';
        case "sm": return 350;
        case "md": return 550;
        case "lg": return '80%';
        case "xl": return '80%';
        default: return '80%';
      }
    },
    destaquePadding(){
      switch (this.$vuetify.breakpoint.name){
        case "xs": return 'padding: 10px';
        case "sm": return 'margin-top: -50px';
        case "md": return '';
        case "lg": return '';
        case "xl": return '';
        default: return '';
      }
    },
    btnStyle(){
      switch (this.$vuetify.breakpoint.name){
        case "xs": return false;
        case "sm": return true;
        case "md": return false;
        case "lg": return false;
        case "xl": return false;
        default: return false;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.slide-destaques {
  width: 100%;
  bottom: 30%;
  position: absolute;
}

.destaque-info {
  color: #FFFFFF;
  text-shadow: 0 0 5px black;
  background-color: rgba(102, 102, 102, 0.65);
  padding: 15px 0;
}

.destaque-info h3 span.genero-spacer {
  margin: 3px;
}

.v-btn {
  margin: 3px;
}
</style>