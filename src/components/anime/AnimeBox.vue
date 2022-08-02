<template>
  <div class="anime-box" :style="animeBoxStyle" @click="animeClick()">
    <img :title="this.$props.nome" :src="'/img/anime/' + this.$props.foto" alt="imagem do anime"/>
    <div class="nome">
      <span :title="this.$props.nome">{{this.$props.nome}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "AnimeBox",
  props: {
    id: {
      type: String,
      required: true
    },
    nome: {
      type: String,
      required: true
    },
    foto: {
      type: String,
      required: true
    }
  },
  computed: {
    animeBoxStyle(){
      switch (this.$vuetify.breakpoint.name){
        case "xs":
          return {
            'min-width': '250px',
            margin: 'auto'
          }
        case "sm":{
          if(this.$vuetify.breakpoint.width > 700){
            return {
              margin: 'auto',
              'width': '50%',
              'max-width': '280px'
            }
          }else{
            return {
              margin: 'auto',
              'min-width': '50%'
            }
          }
        }
        default: return '';
      }
    }
  },
  methods: {
    animeClick(){
      this.$router.push({name: 'Anime', params: {id: this.$props.id}});
    }
  }
}
</script>

<style scoped>
.anime-box {
  width: 25%;
  padding: 15px;
  transition: 300ms;
}

.anime-box img {
  width: 100%;
  height: 300px;
  border-top-left-radius: 5%;
  border-top-right-radius: 5%;
  cursor: pointer;
}

.anime-box .nome {
  background-color: rgba(65, 65, 65, 0.98);
  width: 100%;
  padding: 5px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  cursor: pointer;
}

.anime-box:hover {
  transform: scale(1.2);
  background-color: #F44336;
}
</style>