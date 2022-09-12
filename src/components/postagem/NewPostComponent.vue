<template>
  <v-card dark style="margin-bottom: 30px; margin-top: -7px" :style="'background-color: ' + this.$props.bgColor">
    <v-form ref="form" style="padding: 20px; margin-bottom: -40px">
      <v-textarea :disabled="loading" label="Escreva uma nova postagem..." rows="2" v-model="texto"
                  dense outlined auto-grow counter="500"></v-textarea>
      <v-file-input style="cursor: pointer" :rules="rules"
                    hint="Formatos permitidos: JPEG, GIF e PNG" persistent-hint
                    prepend-icon="mdi-image"
                    v-model="img"
                    :disabled="loading"
                    @change="imgPreview()"
                    dense outlined label="Anexe uma imagem..."
                    show-size truncate-length="18"
                    @click:clear="clearImg()"
                    accept="image/png, image/jpeg, image/gif"></v-file-input>
    </v-form>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn :loading="loading" :disabled="!img && texto.length === 0" dark @click="postar()">Postar</v-btn>
    </v-card-actions>
    <v-progress-linear :active="loading" :value="$store.state.main.uploadProgress" background-color="#dddddd" color="#ff4a3b"></v-progress-linear>
    <div v-show="img" class="imgPreview">
      <img id="img" src="" alt=""/>
    </div>
  </v-card>
</template>

<script>
import {newPost} from "@/plugins/axios";

export default {
  name: "NewPostComponent",
  data: () => ({
    rules: [
      value => !value || value.size < 4000000 || 'O tamanho da imagem precisa ser menor que 4 MB!',
    ],
    img: null,
    texto: '',
    loading: false
  }),
  methods: {
    imgPreview(){
      let idImg = document.getElementById('img');
      let leitor = new FileReader();
      leitor.onload = function (ev) {
        idImg.src = ev.target.result;
      }
      if(this.img){
        leitor.readAsDataURL(this.img);
      }
    },
    clearImg(){
      let idImg = document.getElementById('img');
      idImg.src = '';
    },
    postar(){
      if(this.img || this.texto.length > 0){
        this.loading = true;
        newPost(this.texto, this.img).then((value) => {
          if(value.data.postagem){
            this.texto = '';
            this.img = null;
            this.clearImg();
            value.data.post.autor = this.$store.state.auth.user;
            this.$emit('newPost', value.data.post);
          }
        }).finally(() => {
          this.loading = false;
        });
      }
    }
  },
  props: {
    bgColor: {
      type: String,
      default: 'rgb(30,30,30)'
    }
  }
}
</script>

<style scoped>
.imgPreview {
  width: 100%;
  padding: 20px;
}

.imgPreview img {
  width: 100%;
  height: auto;
}
</style>