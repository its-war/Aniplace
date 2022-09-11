<template>
  <v-card dark rounded style="margin-bottom: 30px">
    <v-card-title>
      <v-avatar size="50px" style="margin-right: 3px">
        <img :src="'/img/users/' + getFotoAutor()" :alt="'Foto de perfil de ' + $props.autor.nome"/>
      </v-avatar>
      <h3 style="font-size: 16px">{{$props.autor.nome}}</h3>
    </v-card-title>
    <v-card-subtitle style="text-align: left; margin-left: 53px; margin-top: -30px">há 10 min</v-card-subtitle>
    <v-menu offset-y v-if="$store.state.auth.user._id === $props.autor._id">
      <template v-slot:activator="{on, attrs}">
        <v-btn dark icon style="position: absolute; top: 0; right: 0" v-on="on" v-bind="attrs"><v-icon>mdi-dots-vertical</v-icon></v-btn>
      </template>
      <v-list dark>
        <v-list-item>
          <v-list-item-title><v-icon>mdi-pencil</v-icon> Editar</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title><v-icon>mdi-delete</v-icon> Excluir</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-card-subtitle v-if="$props.compartilhado">
      Compartilhado de <span style="color: #FFFFFF; font-weight: bold">Fulano</span>
    </v-card-subtitle>
    <v-card-text>
      <p style="text-align: left" v-if="$props.texto.length > 0">
        {{$props.texto}}
      </p>
      <div v-if="$props.imagem.length > 0" class="img-post">
        <img :src="'http://localhost/img/posts/' + $props.imagem" alt="Imagem do post"/>
      </div>
    </v-card-text>
    <v-card-actions>

      <v-btn @click="descurtir()" dark v-if="getCurtida"><v-icon color="red">mdi-heart</v-icon></v-btn>
      <v-btn @click="curtir()" dark v-else><v-icon>mdi-heart-outline</v-icon></v-btn>

      <v-btn dark><v-icon>mdi-comment-text-outline</v-icon></v-btn>
      <v-btn dark><v-icon>mdi-share-variant-outline</v-icon></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {curtirPost, descurtirPost} from "@/plugins/axios";

export default {
  name: "PostUserComponent",
  props: {
    id: {
      type: String,
      required: true
    },
    texto: {
      type: String,
      default: ''
    },
    imagem: {
      type: String,
      default: ''
    },
    registro: {
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
    comentarios: {
      type: Array,
      required: true
    },
    compartilhamentos: {
      type: Number,
      required: true
    },
    compartilhado: {
      type: Boolean,
      required: true
    },
    origem: {
      default: ''
    }
  },
  mounted() {
    if(this.$props.compartilhado){
      this.$props.texto = this.$props.origem.texto;
      this.$props.imagem = this.$props.origem.imagem;
    }
  },
  methods: {
    getFotoAutor(){
      if(this.$props.autor.foto){
        return this.$props.autor.foto;
      }else{
        return 'default.jpg';
      }
    },
    curtir(){
      curtirPost(this.$props.id).then((value) => {
        if(!value.data.erro){
          if(value.data.curtida){
            this.$props.curtidas.unshift(this.$store.state.auth.user._id);
          }
        }
      });
    },
    descurtir(){
      descurtirPost(this.$props.id).then((value) => {
        if(value.data.descurtir){
          for(let i = 0; i < this.$props.curtidas.length; i++){
            if(this.$props.curtidas[i] === this.$store.state.auth.user._id){
              this.$props.curtidas.splice(i, 1);
            }
          }
        }
      });
    }
  },
  computed: {
    getCurtida(){
      for(let i = 0; i < this.$props.curtidas.length; i++){
        if(this.$props.curtidas[i] === this.$store.state.auth.user._id){
          return true;
        }
      }
      return false;
    }
  }
}
</script>

<style scoped>
.img-post {
  width: 100%;
  padding: 20px;
}

.img-post img {
  width: 100%;
}
</style>