<template>
  <v-card dark class="semelhante-box" :style="this.$vuetify.breakpoint.name === 'xs' ? 'width: 90%' : ''">
    <v-img width="100%" :src="'/img/anime/' + this.$props.foto" @click="semelhanteClick()"/>
    <v-card-subtitle style="text-align: center"><h4>{{this.$props.nome}}</h4></v-card-subtitle>
    <v-card-actions><v-btn @click="semelhanteClick()" dark style="margin: auto"><v-icon>mdi-plus</v-icon> Mais Detalhes</v-btn></v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "SemelhanteBox",
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
  methods: {
    semelhanteClick(){
      this.$router.push({name: 'Anime', params: {id: this.$props.id}});
    }
  }
}
</script>

<style scoped>
.semelhante-box {
  width: 17%;
  margin: 10px;
  transition: 150ms;
}

.semelhante-box h4 {
  cursor: default;
}

.semelhante-box:hover {
  transform: scale(1.1);
}
</style>