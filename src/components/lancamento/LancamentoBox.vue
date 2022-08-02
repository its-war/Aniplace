<template>
  <div class="lancamento-box" :style="widthLancamento">
    <div class="conteudo">
      <h1>Episódio {{this.$props.numero}}</h1>
      <img :src="'/img/episodios/' + this.$props.thumb" alt=""/>
      <h2>{{this.$props.nome}}</h2>
      <v-btn dark icon @click="assistirClick()"><v-icon>mdi-play</v-icon></v-btn>
      <v-btn dark icon><v-icon>mdi-download</v-icon></v-btn><br/>
      <v-btn dark icon color="red"><v-icon>mdi-heart-outline</v-icon></v-btn>
      <v-btn dark icon><v-icon>mdi-comment-text-outline</v-icon></v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "LancamentoBox",
  props: {
    id: {
      type: String,
      required: true
    },
    nome: {
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
    assistirClick(){
      this.$router.push({
        name: 'Episódio',
        params: {
          id: this.$props.id,
          temporada: this.$props.temporada,
          numero: this.$props.numero
        }});
    }
  },
  computed: {
    widthLancamento(){
      switch (this.$vuetify.breakpoint.name){
        case "xs": return 'width: 50%';
        case "sm": return 'width: 25%';
        case "md": return 'width: 25%';
        case "lg": return 'width: 20%';
        case "xl": return 'width: 20%';
        default: return 'width: 20%';
      }
    }
  }
}
</script>

<style scoped>
.lancamento-box {
  padding: 5px;
}

.conteudo {
  background-color: rgb(20, 20, 20);
  border: solid 2px rgb(20,20,20);
  padding: 15px;
  width: 100%;
  transition: 300ms;
  border-radius: 10px;
}

.lancamento-box img {
  width: 100%;
}

h1, h2 {
  color: #FFFFFF;
}

h1 {
  font-size: 20px;
}

h2 {
  font-size: 15px;
}

.conteudo:hover {
  border: solid 2px rgb(194, 9, 9);
  transform: scale(1.15);
}
</style>