<template>
  <v-card dark height="350px">
    <v-subheader>Top Animes</v-subheader>
    <div style="overflow-y: auto; height: 100%">
      <v-list>
        <v-list-item>
          <v-list-item-icon>01º</v-list-item-icon>
          <v-list-item-title :style="tituloStyle">
            Darling in The FranXX
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>02º</v-list-item-icon>
          <v-list-item-title :style="tituloStyle">
            Darling in The FranXX
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>03º</v-list-item-icon>
          <v-list-item-title :style="tituloStyle">
            Darling in The FranXX
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>04º</v-list-item-icon>
          <v-list-item-title :style="tituloStyle">
            Darling in The FranXX
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>05º</v-list-item-icon>
          <v-list-item-title :style="tituloStyle">
            Darling in The FranXX
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>06º</v-list-item-icon>
          <v-list-item-title :style="tituloStyle">
            Darling in The FranXX
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>07º</v-list-item-icon>
          <v-list-item-title :style="tituloStyle">
            Darling in The FranXX
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>08º</v-list-item-icon>
          <v-list-item-title :style="tituloStyle">
            Darling in The FranXX
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>09º</v-list-item-icon>
          <v-list-item-title :style="tituloStyle">
            Darling in The FranXX
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>10º</v-list-item-icon>
          <v-list-item-title :style="tituloStyle">
            Darling in The FranXX
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "MaisVotadosComponent",
  computed: {
    tituloStyle(){
      switch (this.$vuetify.breakpoint.name){
        case "sm": return 'font-size: 12px !important;';
        case "md": return '';
        case "lg": return '';
        case "xl": return '';
        default: return '';
      }
    }
  }
}
</script>

<style scoped>

</style>