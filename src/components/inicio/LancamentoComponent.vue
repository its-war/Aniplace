<template>
  <v-card dark :width="widthComponent" class="v-card-post">
    <v-card-title class="text-center">Episódio 1000</v-card-title>
    <v-img width="100%" src="img/destaques/wallhaven-pkj7gm.jpg"/>
    <v-card-subtitle><p style="height: 80px">{{anime}}</p></v-card-subtitle>
    <v-card-actions>
      <v-btn dark icon><v-icon>mdi-play</v-icon></v-btn>
      <v-btn dark icon><v-icon>mdi-heart-outline</v-icon> 22</v-btn>
      <v-btn dark icon><v-icon>mdi-comment-text-outline</v-icon> 34</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "LancamentoComponent",
  props: {
    anime: String
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
  }
}
</script>

<style scoped>
.v-card-post {
  margin: 5px 0 5px 10px;
}
</style>