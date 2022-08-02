<template>
  <v-card dark class="postagem">
    <div class="postagem-header red lighten-1">
      <div class="postagem-header-title">
        <h2 :style="tituloStyle"> <!-- 50 caracteres max -->
          isso e uma postagem com varias palavras para testar palavra
        </h2>
      </div>
      <div class="postagem-header-author" :style="authorMargin">
        <img src="/img/users/default.jpg"/>
        <span>Karlos Warney</span>
      </div>
    </div>
    <div class="postagem-header-time">
      <span>15/06/2022 — 15h29</span>
    </div>
    <div class="postagem-body">
      <div class="postagem-body-text">
        <p>
          Este é um texto de postagem, e não importa o seu tamanho.
        </p>
      </div>
      <div class="postagem-body-img">
        <img src="/img/destaques/wallhaven-pkj7gm.png">
      </div>
    </div>
    <div class="postagem-action">
      <v-btn dark><v-icon>mdi-heart</v-icon></v-btn>
      <v-btn dark><v-icon>mdi-comment-text-outline</v-icon></v-btn>
      <v-btn dark><v-icon>mdi-share-variant-outline</v-icon></v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "PostagemComponent",
  computed: {
    tituloStyle(){
      switch (this.$vuetify.breakpoint.name){
        case "xs": return {
          'font-size': '15px',
          height: '80px'
        };
        case "sm": return {
          'font-size': '15px',
          height: '80px'
        };
        case "md": return '';
        case "lg": return '';
        case "xl": return '';
        default: return '';
      }
    },
    authorMargin(){
      switch (this.$vuetify.breakpoint.name){
        case "xs": return {
          'margin-top': '-45px !important'
        };
        case "sm": return {
          'margin-top': '-45px !important'
        };
        case "md": return '';
        case "lg": return '';
        case "xl": return '';
        default: return '';
      }
    }
  }
}
</script>

<style scoped>
.postagem {
  width: 100%;
  padding-bottom: 80px;
  margin-bottom: 30px;
}

.postagem-header {
  height: 100px;
  width: 100%;
  border-radius: 0 0 100px 100px;
  padding-top: 5px;
}

.postagem-header-author {
  float: left;
  margin-left: 10%;
  padding: 0;
  width: 250px;
  height: 80px;
}

.postagem-header-author img {
  width: 50px;
  border-radius: 50%;
  margin-top: 32px;
  margin-left: -60px;
  position: absolute;
}

.postagem-header-author span {
  position: relative;
  margin-left: -5px;
  line-height: 100px;
}

.postagem-header-time {
  float: left;
  margin-left: -180px;
}

.postagem-body-text {
  float: left;
  margin-top: -50px;
  padding: 0 50px;
  position: relative;
}

.postagem-body-text p {
  width: 100%;
}

.postagem-body-text p {
  text-align: left;
}

.postagem-body-img {
  margin-top: 100px;
}

.postagem-body-img {
  width: 100%;
}

.postagem-body-img img {
  width: 90%;
}

.postagem-action {
  float: left;
  margin-top: 20px;
  margin-left: 5%;
}

.postagem-action button {
  margin-right: 8px;
}
</style>