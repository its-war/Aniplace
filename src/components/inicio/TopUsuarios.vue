<template>
  <v-card class="v-card-topusers" dark height="350px">
    <v-subheader>Top {{this.$store.state.main.topUsers.length}} Usuários</v-subheader>
    <div style="overflow-y: auto; height: 100%">
      <v-list>
        <v-list-item v-for="(user, i) in this.$store.state.main.topUsers" :key="i" :title="user.nome">
          <v-list-item-icon>{{i + 1}}º</v-list-item-icon>
          <v-btn @click="addAmigo(user._id)" v-if="user._id !== getIdUser" dark icon :title="'Adicionar ' + user.nome + ' à sua lista de amigos'"><v-icon>mdi-account-plus</v-icon></v-btn>
          <v-list-item-title :style="tituloStyle">
            {{user.nome}}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </div>
  </v-card>
</template>

<script>
import {mapActions} from "vuex";
import {solicitarAmizade} from "@/plugins/axios";

export default {
  name: "TopUsuarios",
  computed: {
    tituloStyle(){
      switch (this.$vuetify.breakpoint.name){
        case "sm": return 'font-size: 12px !important;';
        case "md": return '';
        case "lg": return '';
        case "xl": return '';
        default: return '';
      }
    },
    getIdUser(){
      return this.$store.state.auth.user._id;
    }
  },
  methods: {
    ...mapActions('main', ['ActionListarTopUsers']),
    topUsers(){
      this.ActionListarTopUsers();
    },
    addAmigo(id){
      solicitarAmizade(id).then((value) => {
        console.log(value.data);
      });
    }
  },
  mounted() {
    this.topUsers();
  }
}
</script>

<style scoped>
.v-card-topusers {
  width: 80%;
}
</style>