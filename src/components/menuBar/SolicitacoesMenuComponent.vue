<template>
  <v-card dark class="menu-painel-navbar">
    <v-card-title>Solicitações de Amizade</v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item v-for="(s, i) in $props.solicitacoes" :key="i">
          <v-list-item-avatar size="50px"><img :src="getFotoSolicitacao(s.user.foto)" alt=""/></v-list-item-avatar>
          <v-list-item-title :title="s.user.nome">{{s.user.nome}}</v-list-item-title>
          <v-list-item-action>
            <v-btn v-if="s.status === 0" @click="aceitarAmizade(s.user._id, i)" icon color="green" :loading="aceitarLoading" :disabled="recusarLoading"><v-icon>mdi-check</v-icon></v-btn>
            <v-btn v-if="s.status === 0" icon color="red" :loading="recusarLoading" :disabled="aceitarLoading"><v-icon>mdi-close</v-icon></v-btn>
            <v-btn v-if="s.status === 1" icon disabled><v-icon>mdi-account-check</v-icon></v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <p v-if="$props.solicitacoes.length <= 0">Não há solicitações.</p>
    </v-card-text>
  </v-card>
</template>

<script>
import {aceitarSolicitacao} from "@/plugins/axios";

export default {
  name: "SolicitacoesMenuComponent",
  props: {
    solicitacoes: {
      type: Array,
      required: true
    }
  },
  methods: {
    getFotoSolicitacao(foto){
      return foto!==null?'/img/users/perfil/'+foto:'/img/users/default.jpg';
    },
    aceitarAmizade(de, i){
      this.aceitarLoading = true;
      aceitarSolicitacao(de).then((value) => {
        if(value.data.amizade) {
          this.$emit('atualizarSolicitacao', i);
        }
        this.aceitarLoading = false;
      });
    },
  },
  data: () => ({
    aceitarLoading: false,
    recusarLoading: false
  })
}
</script>

<style scoped>

</style>