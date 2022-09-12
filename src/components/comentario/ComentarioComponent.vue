<template>
  <div class="comentario">
    <v-avatar size="30px" style="float: left; margin-right: 5px">
      <img src="/img/users/default.jpg" alt="Foto de perfil">
    </v-avatar>
    <span style="float: left; font-weight: bold">Karlos Warney</span>
    <br/>
    <br/>
    <p>
      {{$props.texto}}
    </p>
    <div style="text-align: left">
      <v-btn dark icon><v-icon color="red">mdi-heart</v-icon></v-btn>
      <v-btn dark icon><v-icon>mdi-heart-outline</v-icon></v-btn>
      <v-btn dark icon><v-icon>mdi-comment-quote</v-icon></v-btn>
      <v-btn dark icon><v-icon>mdi-comment-eye</v-icon></v-btn>
    </div>
  </div>
</template>

<script>
import {userGetInfoPublic} from "@/plugins/axios";

export default {
  name: "ComentarioComponent",
  data: () => ({
    autorDados: {
      nome: '',
      foto: null
    }
  }),
  props: {
    id: {
      type: String,
      required: true
    },
    autor: {
      type: String,
      required: true
    },
    curtidas: {
      type: Array,
      required: true
    },
    respostas: {
      type: Array,
      required: true
    },
    texto: {
      type: String,
      required: true
    }
  },
  mounted() {
    if(this.$props.autor === this.$store.state.auth.user._id){
      this.autorDados.nome = this.$store.state.auth.user.nome;
      this.autorDados.foto = this.$store.state.auth.user.foto;
    }else{
      userGetInfoPublic(this.$props.autor).then((value) => {
        this.autorDados = value.data.user;
      });
    }
  }
}
</script>

<style scoped>
.comentario {
  border-radius: 10px;
  padding: 4px;
  background-color: rgb(63, 63, 63);
  margin-top: 5px;
}

span {
  margin-top: 5px;
}

p {
  text-align: left;
  padding: 2px 6px;
}
</style>