<template>
  <v-card dark :width="widthComponent" class="v-card-post">
    <v-card-title class="text-center">Episódio {{this.$props.numero}}</v-card-title>
    <v-img width="100%" :src="'/img/episodios/' + this.$props.thumb"/>
    <v-card-subtitle><p style="height: 80px">{{this.$props.nome}} <span v-show="this.$props.temporada > 1"> — Temporada {{this.$props.numero}}</span></p></v-card-subtitle>
    <v-card-actions>
      <v-btn @click="assistir()" dark icon><v-icon>mdi-play</v-icon></v-btn>
      <v-btn dark icon><v-icon>mdi-heart-outline</v-icon> 22</v-btn>
      <v-btn dark icon><v-icon>mdi-comment-text-outline</v-icon> 34</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "LancamentoComponent",
  props: {
    id: {
      type: String,
      required: true
    },
    nome: {
      type: String,
      required: true
    },
    thumb: {
      type: String,
      required: true
    },
    numero: {
      type: Number,
      required: true
    },
    temporada: {
      type: Number,
      required: true
    }
  },
  computed: {
    widthComponent(){
      switch (this.$vuetify.breakpoint.name){
        case "xs": return '80%';
        case "sm": return '80%';
        case "md": return 550;
        case "lg": return '22%';
        case "xl": return '22%';
        default: return '22%';
      }
    }
  },
  methods: {
    assistir(){
      this.$router.push({name: 'Episódio', params: {id: this.$props.id, temporada: (this.$props.temporada).toString(), numero: (this.$props.numero).toString()}})
    }
  }
}
</script>

<style scoped>
.v-card-post {
  margin: 5px 0 5px 10px;
}
</style>