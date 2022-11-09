<template>
  <v-container fill-height fluid style="background-color: rgba(30,30,30,.45);">
    <div class="perfil">
      <div class="esquerda">
        <div class="fotoPerfil">
          <div class="listra"></div>
          <img src="/img/users/default.jpg" alt=""/>
        </div>
        <div class="infoPrimaria">
          <span>421<br/>Seguindo</span>
          <span>587<br/>Seguidores</span>
        </div>
        <v-divider style="background-color: #7c7c7c"></v-divider>
        <div class="infoSecundaria">
          <h1>Karlos Warney</h1>
          <h3>Apelido: Senpai</h3>
          <h3>Data de Nascimento: 15/07/1998</h3>
          <h3>Signo: Câncer
            <v-icon color="#f03e3e">mdi-zodiac-aries</v-icon>
            <v-icon color="#1bb54b">mdi-zodiac-taurus</v-icon>
            <v-icon color="#e9a11c">mdi-zodiac-gemini</v-icon>
            <v-icon color="#007476">mdi-zodiac-cancer</v-icon>
            <v-icon color="#e57824">mdi-zodiac-leo</v-icon>
            <v-icon color="#217aeb">mdi-zodiac-virgo</v-icon>
            <v-icon color="#c74b88">mdi-zodiac-libra</v-icon>
            <v-icon color="#d9fa48">mdi-zodiac-scorpio</v-icon>
            <v-icon color="#1c94c3">mdi-zodiac-sagittarius</v-icon>
            <v-icon color="#6a9fa1">mdi-zodiac-capricorn</v-icon>
            <v-icon color="#33b688">mdi-zodiac-aquarius</v-icon>
            <v-icon color="#8b47d6">mdi-zodiac-pisces</v-icon>
          </h3>
          <h3>Orientação Sexual: Heterossexual</h3>
          <h3>Pronome Pessoal: Ele/Dele</h3>
          <h3>Anime Favorito: Naruto</h3>
          <h3>Membro desde: 17/04/2022</h3>
          <h3>Mora em: Tabuleiro do Norte - CE</h3>
          <h3>Biografia</h3>
          <p>Desenvolvedor Full-Stack Junior em Vue.js com Vuetify.js e Node.js com Express.js e MongoDB. Amante de animes de Vida Cotidiana, Romance e Isekai.</p>
        </div>
      </div>
      <div class="direita">
        <div class="capa" style="background: url('/img/users/capa/cover.jpg') no-repeat top center; background-size: 100% 100%"></div>
        <div class="conteudo-perfil">

          <v-tabs dark v-model="tab" center-active icons-and-text>

            <v-tabs-slider></v-tabs-slider>

            <v-tab href="#tab1">
              Postagens
              <v-icon>mdi-comment-text-outline</v-icon>
            </v-tab>
            <v-tab href="#tab2">
              Amigos
              <v-icon>mdi-account-group</v-icon>
            </v-tab>
            <v-tab href="#tab3">
              Animes
              <v-icon>mdi-filmstrip</v-icon>
            </v-tab>

            <v-tabs-items v-model="tab" style="background-color: rgba(30,30,30,.05)">
              <v-tab-item value="tab1">
                <div class="posts-user">
                  <NewPostComponent bgColor="rgba(30,30,30,.85)" @newPost="newPost"/>
                  <PostUserComponent v-for="(post, i) in postagem.list" :key="i"
                                     :id="post._id"
                                     :texto="post.texto"
                                     :imagem="post.imagem"
                                     :registro="post.registro"
                                     :autor="post.autor"
                                     :curtidas="post.curtidas"
                                     :comentarios="post.comentarios"
                                     :compartilhamentos="post.compartilhamentos"
                                     :compartilhado="post.compartilhado"
                                     :origem="post.postOrigem"
                                     @deletePost="deletePost(i)"
                  />
                </div>
                <v-card dark style="margin-top: 20px; background-color: rgba(30,30,30,.05)">
                  <v-pagination @input="paginationNavigation()" color="red" v-model="postagem.paginator.paginaAtual" :length="postagem.paginator.totalPaginas" total-visible="7"></v-pagination>
                </v-card>
              </v-tab-item>
            </v-tabs-items>

          </v-tabs>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import NewPostComponent from "@/components/postagem/NewPostComponent";
import PostUserComponent from "@/components/postagem/PostUserComponent";
import {getFeedUser} from "@/plugins/axios";

export default {
  name: "PerfilPageComponent",
  components: {PostUserComponent, NewPostComponent},
  data: () => ({
    tab: null,
    postagem: {
      list: [],
      loading: false,
      enableInfinity: false,
      paginator: {
        totalPosts: 0,
        limit: 10,
        totalPaginas: 0,
        paginaAtual: 1,
        slNo: 1,
        temAnterior: false,
        temProximo: false,
        anterior: null,
        proximo: null
      }
    }
  }),
  methods: {
    paginationNavigation(){},
    newPost(post){
      this.postagem.list.unshift(post);
    },
    getPostagens(pagina){
      this.postagem.loading = true;
      getFeedUser(pagina).then((value) => {
        this.postagem.paginator = value.data.paginator;
        for(let i = 0; i < value.data.posts.length; i++){
          this.postagem.list.push(value.data.posts[i]);
        }
        this.postagem.loading = false;
      });
    },
    deletePost(i){
      this.postagem.list.splice(i, 1);
    }
  },
  mounted() {
    this.getPostagens(1);
  }
}
</script>

<style scoped>
.perfil {
  width: 100%;
}

.esquerda {
  float: left;
  width: 30%;
  background-color: rgb(30,30,30);
  color: #FFFFFF;
}

.fotoPerfil {
  width: 100%;
  padding-top: 10px;
  position: relative;
}

.fotoPerfil img {
  width: 50%;
  border: 2px solid #ff4a3b;
  border-radius: 50%;
  position: relative;
  z-index: 20 !important;
}

.listra {
  width: 100%;
  height: 25%;
  background-color: #7c7c7c;
  position: absolute;
  top: 40%;
  z-index: 19 !important;
}

.infoPrimaria {
  width: 100%;
}

.infoPrimaria span {
  display: inline-block;
  margin: 10px;
}

.infoSecundaria {
  padding-left: 10px;
  padding-right: 10px;
  text-align: left;
}

.infoSecundaria h1 {
  text-align: center;
}

.direita {
  float: right;
  width: 70%;
}

.conteudo-perfil {
  width: 100%;
}

.capa {
  width: 100%;
  height: 300px;
}

.posts-user {
  width: 50%;
  margin: auto;
  padding: 20px 0;
}
</style>