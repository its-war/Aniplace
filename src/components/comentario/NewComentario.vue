<template>
  <v-form>
    <v-avatar size="50px" style="float: left; margin-right: 5px">
      <img :src="getFoto" alt="Foto de perfil">
    </v-avatar>
    <v-textarea
      label="Deixe seu comentário..."
      rows="1"
      ref="textarea"
      :loading="loading"
      :disabled="loading"
      auto-grow
      v-model="comentario"
      v-on:keydown.enter.prevent="comentar()"
    ></v-textarea>
  </v-form>
</template>

<script>
import {newComentario} from "@/plugins/axios";

export default {
  name: "NewComentario",
  data: () => ({
    comentario: '',
    loading: false
  }),
  methods: {
    comentar(){
      if(this.comentario.length > 0){
        this.loading = true;
        newComentario(this.$props.id, this.comentario, this.$props.tipo).then((value) => {
          if(value.data.comentario){
            value.data.comentario.autor = {
              _id: this.$store.state.auth.user._id,
              nome: this.$store.state.auth.user.nome,
              foto: this.$store.state.auth.user.foto
            }
            this.$emit('newComentario', value.data.comentario);
            this.comentario = '';
            this.$refs.textarea.blur();
          }
        }).finally(() => {
          this.loading = false;
        });
      }
    }
  },
  props: {
    id: {
      type: String,
      required: true
    },
    tipo: {
      type: Number,
      required: true
    }
  },
  computed: {
    getFoto(){
      if(this.$store.state.auth.user){
        return this.$store.state.auth.user.foto!==null?this.$imgServer+'/img/users/'+this.$store.state.auth.user.foto:this.$imgUserDefault;
      }else{
        return this.$imgUserDefault;
      }
    }
  }
}
</script>

<style scoped>

</style>