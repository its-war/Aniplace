<template>
  <v-form style="margin-bottom: -20px">
    <v-avatar size="30px" style="float: left; margin-right: 5px; margin-top: 5px">
      <img src="/img/users/default.jpg" alt=""/>
    </v-avatar>
    <v-textarea
      label="Deixe sua resposta..."
      style="margin-top: 5px"
      rows="1"
      ref="resposta"
      dense
      solo
      :loading="loading"
      :disabled="loading"
      auto-grow
      v-model="resposta"
      v-on:keydown.enter.prevent="responder()"
    ></v-textarea>
  </v-form>
</template>

<script>
import {newComentario} from "@/plugins/axios";

export default {
  name: "NewResposta",
  data: () => ({
    loading: false,
    resposta: ''
  }),
  methods: {
    responder(){
      this.loading = true;
      newComentario(this.$props.idOrigem, this.resposta, 3).then((value) => {
        if(value.data.comentario){
          value.data.comentario.autor = {
            _id: this.$store.state.auth.user._id,
            nome: this.$store.state.auth.user.nome,
            foto: this.$store.state.auth.user.foto
          };
          this.$emit('newResposta', value.data.comentario);
          this.resposta = '';
          this.$refs.resposta.blur();
        }
      }).finally(() => {
        this.loading = false;
      });
    }
  },
  props: {
    idOrigem: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

</style>