<template>
  <div class="resposta">
    <div style="width: 100%; text-align: left">
      <v-avatar size="30px" style="margin-right: 5px">
        <img :src="'/img/users/' + getFotoAutor()" alt="Foto de perfil">
      </v-avatar>
      <span style="font-weight: bold">{{$props.autor.nome}}</span>
      <span style="font-size: 12px; display: block; margin-left: 35px; margin-top: -15px">{{getData}}</span>
    </div>
    <v-menu offset-y v-if="$store.state.auth.user._id === $props.autor._id">
      <template v-slot:activator="{on, attrs}">
        <v-btn :loading="deleteLoading" dark icon style="position: absolute; top: 0; right: 0" v-on="on" v-bind="attrs"><v-icon>mdi-dots-vertical</v-icon></v-btn>
      </template>
      <v-list dark>
        <v-list-item @click="deletar()">
          <v-list-item-title><v-icon>mdi-delete</v-icon> Excluir</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <div style="text-align: left; width: 100%; margin-bottom: -5px">
      <p style="margin-bottom: -5px">
        {{$props.texto}}
      </p>
      <v-btn v-if="getCurtida" @click="descurtir()" dark
             :x-small="$props.curtidas.length > 0"
             :icon="$props.curtidas.length < 1"
      ><span v-if="$props.curtidas.length > 0">{{$props.curtidas.length}} </span><v-icon color="red">mdi-heart</v-icon></v-btn>
      <v-btn v-else @click="curtir()" dark icon><span v-if="$props.curtidas.length > 0">{{$props.curtidas.length}} </span><v-icon>mdi-heart-outline</v-icon></v-btn>
    </div>
  </div>
</template>

<script>
import DateControl from "@/plugins/DateControl";
import {curtirComentario, descurtirComentario, deleteComentario} from "@/plugins/axios";

export default {
  name: "RespostaComponent",
  data: () => ({
    deleteLoading: false
  }),
  methods: {
    getFotoAutor(){
      if(this.$props.autor.foto){
        return this.$props.autor.foto;
      }else{
        return 'default.jpg';
      }
    },
    curtir(){
      this.curtirLoading = true;
      curtirComentario(this.$props.id).then((value) => {
        if(value.data.curtiu){
          this.$props.curtidas.unshift({
            _id: this.$store.state.auth.user._id,
            nome: this.$store.state.auth.user.nome,
            foto: this.$store.state.auth.user.foto
          });
        }
      }).finally(() => {
        this.curtirLoading = false;
      });
    },
    descurtir(){
      this.curtirLoading = true;
      descurtirComentario(this.$props.id).then((value) => {
        if(value.data.descurtiu){
          for(let i = 0; i < this.$props.curtidas.length; i++){
            if(this.$props.curtidas[i]._id === this.$store.state.auth.user._id){
              this.$props.curtidas.splice(i, 1);
            }
          }
        }
      }).finally(() => {
        this.curtirLoading = false;
      });
    },
    deletar(){
      this.deleteLoading = true;
      deleteComentario(this.$props.id).then((value) => {
        if(value.data.delete){
          this.$emit('deleteResposta');
        }
      }).finally(() => {
        this.deleteLoading = false;
      });
    }
  },
  props: {
    id: {
      type: String,
      required: true
    },
    autor: {
      type: Object,
      required: true
    },
    curtidas: {
      type: Array,
      required: true
    },
    texto: {
      type: String,
      required: true
    },
    registro: {
      type: String,
      required: true
    }
  },
  computed: {
    getCurtida(){
      for(let i = 0; i < this.$props.curtidas.length; i++){
        if(this.$props.curtidas[i]._id === this.$store.state.auth.user._id){
          return true;
        }
      }
      return false;
    },
    getData(){
      return new DateControl(this.$props.registro).getStatus();
    }
  }
}
</script>

<style scoped>
.resposta {
  margin: 15px 5px;
  padding: 3px 5px 0 15px;
  border-radius: 10px;
  background-color: rgb(88, 88, 88);
  position: relative;
}
</style>