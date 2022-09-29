<template>
  <v-card dark rounded style="margin-bottom: 30px">
    <v-progress-linear background-color="#dddddd" color="#ff4a3b" indeterminate :active="comentario.loading"></v-progress-linear>
    <v-card-title>
      <v-avatar size="50px" style="margin-right: 3px">
        <img :src="'/img/users/' + getFotoAutor()" :alt="'Foto de perfil de ' + $props.autor.nome"/>
      </v-avatar>
      <h3 style="font-size: 16px">{{$props.autor.nome}}</h3>
    </v-card-title>
    <v-card-subtitle style="text-align: left; margin-left: 53px; margin-top: -30px">{{getData}}</v-card-subtitle>
    <v-menu offset-y v-if="$store.state.auth.user._id === $props.autor._id">
      <template v-slot:activator="{on, attrs}">
        <v-btn dark icon style="position: absolute; top: 0; right: 0" v-on="on" v-bind="attrs"><v-icon>mdi-dots-vertical</v-icon></v-btn>
      </template>
      <v-list dark>
        <v-list-item @click="deletar()">
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

      <v-btn :loading="curtirLoading" @click="descurtir()" dark v-if="getCurtida"><span v-if="$props.curtidas.length > 0">{{$props.curtidas.length}}</span> <v-icon color="red">mdi-heart</v-icon></v-btn>
      <v-btn :loading="curtirLoading" @click="curtir()" dark v-else><span v-if="$props.curtidas.length > 0">{{$props.curtidas.length}}</span> <v-icon>mdi-heart-outline</v-icon></v-btn>

      <v-tooltip top>
        <template v-slot:activator="{on, attrs}">
          <v-btn @click="comentario.enabled = !comentario.enabled" dark v-on="on" v-bind="attrs" style="margin-left: 8px"><v-icon>mdi-comment-text-outline</v-icon></v-btn>
        </template>
        <span>Exibir/Ocultar comentários</span>
      </v-tooltip>

      <v-btn dark><v-icon>mdi-share-variant-outline</v-icon></v-btn>
    </v-card-actions>
    <v-divider/>
    <v-card-text>
      <NewComentario @newComentario="newComentario" :id="$props.id" :tipo="1"/>
      <ComentarioComponent v-for="(comentario, i) in $props.comentarios" :key="i"
        :id="comentario._id"
        :autor="comentario.autor"
        :texto="comentario.texto"
        :curtidas="comentario.curtidas"
        :respostas="comentario.respostas"
        :registro="comentario.registro"
        @deleteComentario="deleteComentario(i)"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import {curtirPost, descurtirPost, deletePost} from "@/plugins/axios";
import NewComentario from "@/components/comentario/NewComentario";
import ComentarioComponent from "@/components/comentario/ComentarioComponent";
import DateControl from "@/plugins/DateControl";

export default {
  name: "PostUserComponent",
  components: {ComentarioComponent, NewComentario},
  data: () => ({
    curtirLoading: false,
    comentario: {
      enabled: false,
      loading: false
    }
  }),
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
      this.curtirLoading = true;
      curtirPost(this.$props.id).then((value) => {
        if(!value.data.erro){
          if(value.data.curtida){
            this.$props.curtidas.unshift({
              _id: this.$store.state.auth.user._id,
              nome: this.$store.state.auth.user.nome,
              foto: this.$store.state.auth.user.foto
            });
          }
        }
      }).finally(() => {
        this.curtirLoading = false;
      });
    },
    descurtir(){
      this.curtirLoading = true;
      descurtirPost(this.$props.id).then((value) => {
        if(value.data.descurtir){
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
    newComentario(comentario){
      this.$props.comentarios.unshift(comentario);
    },
    deletar(){
      this.comentario.loading = true;
      deletePost(this.$props.id).then((value) => {
        if(value.data.delete){
          this.$emit('deletePost');
        }
      }).finally(() => {
        this.comentario.loading = false;
      });
    },
    deleteComentario(i){
      this.$props.comentarios.splice(i, 1);
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
.img-post {
  width: 100%;
  padding: 20px;
}

.img-post img {
  width: 100%;
}
</style>