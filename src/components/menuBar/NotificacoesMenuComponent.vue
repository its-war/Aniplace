<template>
  <v-card dark class="menu-painel-navbar">
    <v-card-title>
      Notificações
      <v-spacer/>
      <v-btn text small @click="lerTudo">Ler tudo</v-btn>
    </v-card-title>
    <v-card-text>
      <v-list>
        <div v-for="(n, i) in $props.notifications" :key="i">
          <v-list-item v-if="n.action === 1" :style="n.status === 0 ? 'background-color: rgb(60,60,60)' : ''">
            <v-list-item-avatar size="50px">
              <img :src="getFotoNotification(n.de.foto)" alt=""/>
            </v-list-item-avatar>
            <v-list-item-content style="text-align: left">
              {{n.de.nome}} aceitou sua solicitação de amizade.
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "NotificacoesMenuComponent",
  props: {
    notifications: {
      type: Array,
      required: true
    }
  },
  methods: {
    getFotoNotification(foto){
      if(foto){
        return this.$imgServer + '/img/users/' + foto;
      }else{
        return this.$imgUserDefault;
      }
    },
    lerTudo(){
      this.$emit('lerTudo');
    }
  },
  mounted() {
    console.log(this.$props.notifications);
  }
}
</script>

<style scoped>

</style>