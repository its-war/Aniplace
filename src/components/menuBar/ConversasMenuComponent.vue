<template>
  <v-card dark class="conversas-menu">
    <v-card-title>Conversas Recentes</v-card-title>
    <v-card-text>
      <v-list v-if="hasMensagens">
        <v-list-item
            v-for="(conversa, i) in $props.conversas" :key="i"
            style="overflow: auto" @click="abrirConversa(conversa._id)"
        >
          <v-list-item-avatar size="35px">
            <img v-if="conversa.participantes[0]._id !== $store.state.auth.user._id" :src="'/img/users/' + getFoto(conversa.participantes[0].foto)" alt="Foto de perfil">
            <img v-if="conversa.participantes[1]._id !== $store.state.auth.user._id" :src="'/img/users/' + getFoto(conversa.participantes[1].foto)" alt="Foto de perfil">
          </v-list-item-avatar>
          <v-list-item-title style="text-align: left">
            <span v-if="conversa.participantes[0]._id !== $store.state.auth.user._id">{{conversa.participantes[0].nome}}</span>
            <span v-if="conversa.participantes[1]._id !== $store.state.auth.user._id">{{conversa.participantes[1].nome}}</span>
          </v-list-item-title>
          <v-list-item-action-text v-if="conversa.mensagens.length > 0">{{getLastDate(conversa.mensagens[conversa.mensagens.length - 1].registro)}}</v-list-item-action-text>
        </v-list-item>
      </v-list>
      <p v-if="!hasMensagens">Não há conversas ainda.</p>
    </v-card-text>
  </v-card>
</template>

<script>
import DateControl from "@/plugins/DateControl";

export default {
  name: "ConversasMenuComponent",
  methods: {
    getLastDate(date) {
      return new DateControl(date).getStatus();
    },
    getFoto(foto){
      if(foto){
        return foto;
      }else{
        return 'default.jpg';
      }
    },
    abrirConversa(idConversa){
      this.$emit('abrirConversa', idConversa);
    }
  },
  props: {
    conversas: {
      type: Array,
      required: true
    }
  },
  computed: {
    hasMensagens(){
      for(let i = 0; i < this.$props.conversas.length; i++){
        if(this.$props.conversas[i].mensagens.length > 0){
          return true;
        }
      }
      return false;
    }
  },
}
</script>

<style scoped>
.conversas-menu {
  position: absolute;
  right: 70px;
  top: 50px;
  z-index: 1000;
  width: 400px;
  height: 450px;
}
</style>