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
          <h1>{{user.nome}}</h1>
          <h3 v-if="user.apelido !== ''">Apelido: {{user.apelido}}</h3>
          <h3>Aniversário: {{getAniversario}}</h3>
          <h3>Signo: {{getSignoNome}}
            <v-icon :color="'#' + getSignoCor">mdi-zodiac-{{getSignoSimbolo}}</v-icon>
          </h3>
          <h3>Orientação Sexual: {{getSexo}}</h3>
          <h3>Pronome Pessoal: {{getPronome}}</h3>
          <h3 v-if="user.animeFavorito">Anime Favorito: {{ getAnimeNome }}</h3>
          <h3>Membro desde: {{ user.registro }}</h3>
          <h3>Mora em: Tabuleiro do Norte - CE</h3>
          <h3>Biografia</h3>
          <p>{{user.biografia}}</p>
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
              <v-tab-item value="tab2">
                <div class="user-amigos">
                  <AmigosViewComponent/>
                </div>
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
import {getFeedUser, userGetInfoPublic} from "@/plugins/axios";
import AmigosViewComponent from "@/components/perfil/AmigosViewComponent";

export default {
  name: "PerfilPageComponent",
  components: {AmigosViewComponent, PostUserComponent, NewPostComponent},
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
    },
    user: {
      _id: '',
      nome: '',
      registro: null,
      foto: null,
      capa: '',
      apelido: '',
      nascimento: null,
      sexo: 0,
      pronome: 0,
      animeFavorito: null,
      localidade: null,//TODO implementar localização por API pública
      biografia: '',
      amigos: [],
      online: false
    },
    loading: true
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
    if(this.$route.params.id === this.$store.state.auth.user._id){
      this.user = this.$store.state.auth.user;
      this.user.nascimento = new Date(this.user.nascimento);
      this.loading = false;
    }else{
      userGetInfoPublic(this.$route.params.id).then((value) => {
        this.user = value.data.user;
        this.loading = false;
      });
    }
    this.getPostagens(1);
  },
  computed: {
    getSignoNome(){
      let m = this.user.nascimento?.getMonth();
      let d = this.user.nascimento?.getDate();
      switch (m){
        case 0:{//janeiro
          if(d <= 19){
            return 'Capricórnio';
          }else{
            return 'Aquário';
          }
        }
        case 1:{//fevereiro
          if(d <= 18){
            return 'Aquário';
          }else{
            return 'Peixes';
          }
        }
        case 2:{//março
          if(d <= 20){
            return 'Peixes';
          }else{
            return 'Áries';
          }
        }
        case 3:{//abril
          if(d <= 19){
            return 'Áries';
          }else{
            return 'Touro';
          }
        }
        case 4:{//maio
          if(d <= 20){
            return 'Touro';
          }else{
            return 'Gêmeos';
          }
        }
        case 5:{//junho
          if(d <= 21){
            return 'Gêmeos';
          }else{
            return 'Câncer';
          }
        }
        case 6:{//julho
          if(d <= 22){
            return 'Câncer';
          }else{
            return 'Leão';
          }
        }
        case 7:{//agosto
          if(d <= 22){
            return 'Leão';
          }else{
            return 'Virgem';
          }
        }
        case 8:{//setembro
          if(d <= 22){
            return 'Virgem';
          }else{
            return 'Libra';
          }
        }
        case 9:{//outubro
          if(d <= 22){
            return 'Libra';
          }else{
            return 'Escorpião';
          }
        }
        case 10:{//novembro
          if(d <= 21){
            return 'Escorpião';
          }else{
            return 'Sagitário';
          }
        }
        case 11:{//dezembro
          if(d <= 21){
            return 'Sagitário';
          }else{
            return 'Capricórnio';
          }
        }
        default:{
          return '';
        }
      }
    },
    getSignoNumero(){
      let m = this.user.nascimento?.getMonth();
      let d = this.user.nascimento?.getDate();
      switch (m){
        case 0:{//janeiro
          if(d <= 19){
            return 10;
          }else{
            return 11;
          }
        }
        case 1:{//fevereiro
          if(d <= 18){
            return 11;
          }else{
            return 12;
          }
        }
        case 2:{//março
          if(d <= 20){
            return 12;
          }else{
            return 1;
          }
        }
        case 3:{//abril
          if(d <= 19){
            return 1;
          }else{
            return 2;
          }
        }
        case 4:{//maio
          if(d <= 20){
            return 2;
          }else{
            return 3;
          }
        }
        case 5:{//junho
          if(d <= 21){
            return 3;
          }else{
            return 4;
          }
        }
        case 6:{//julho
          if(d <= 22){
            return 4;
          }else{
            return 5;
          }
        }
        case 7:{//agosto
          if(d <= 22){
            return 5;
          }else{
            return 6;
          }
        }
        case 8:{//setembro
          if(d <= 22){
            return 6;
          }else{
            return 7;
          }
        }
        case 9:{//outubro
          if(d <= 22){
            return 7;
          }else{
            return 8;
          }
        }
        case 10:{//novembro
          if(d <= 21){
            return 8;
          }else{
            return 9;
          }
        }
        case 11:{//dezembro
          if(d <= 21){
            return 9;
          }else{
            return 10;
          }
        }
        default:{
          return 0;
        }
      }
    },
    getSignoSimbolo(){
      switch (this.getSignoNumero){
        case 1:{
          return 'aries';
        }
        case 2:{
          return 'taurus'
        }
        case 3:{
          return 'gemini';
        }
        case 4:{
          return 'cancer';
        }
        case 5:{
          return 'leo';
        }
        case 6:{
          return 'virgo';
        }
        case 7:{
          return 'libra';
        }
        case 8:{
          return 'scorpio';
        }
        case 9:{
          return 'sagittarius';
        }
        case 10:{
          return 'capricorn';
        }
        case 11:{
          return 'aquarius';
        }
        case 12:{
          return 'pisces';
        }
        default:{
          return false;
        }
      }
    },
    getSignoCor(){
      switch (this.getSignoNumero){
        case 1:{
          return 'f03e3e';
        }
        case 2:{
          return '1bb54b'
        }
        case 3:{
          return 'e9a11c';
        }
        case 4:{
          return '007476';
        }
        case 5:{
          return 'e57824';
        }
        case 6:{
          return '217aeb';
        }
        case 7:{
          return 'c74b88';
        }
        case 8:{
          return 'd9fa48';
        }
        case 9:{
          return '1c94c3';
        }
        case 10:{
          return '6a9fa1';
        }
        case 11:{
          return '33b688';
        }
        case 12:{
          return '8b47d6';
        }
        default:{
          return false;
        }
      }
    },
    getAniversario(){
      let d = this.user.nascimento?.getDate();
      if(d < 10){
        d = '0' + d;
      }

      let m = this.user.nascimento?.getMonth() + 1;
      switch (m){
        case 1:{
          return d + ' de Janeiro';
        }
        case 2:{
          return d + ' de Fevereiro';
        }
        case 3:{
          return d + ' de Março';
        }
        case 4:{
          return d + ' de Abril';
        }
        case 5:{
          return d + ' de Maio';
        }
        case 6:{
          return d + ' de Junho';
        }
        case 7:{
          return d + ' de Julho';
        }
        case 8:{
          return d + ' de Agosto';
        }
        case 9:{
          return d + ' de Setembro';
        }
        case 10:{
          return d + ' de Outubro';
        }
        case 11:{
          return d + ' de Novembro';
        }
        case 12:{
          return d + ' de Dezembro';
        }
        default:{
          return false;
        }
      }
    },
    getPronome(){
      switch (this.user.pronome){
        case 1:{
          return 'ele/dele';
        }
        case 2:{
          return 'ela/dela';
        }
        case 3:{
          return 'elu/delu';
        }case 4:{
          return 'ile/dile';
        }
        default:{
          return false;
        }
      }
    },
    getSexo(){
      switch (this.user.sexo){
        case 1:{
          return 'assexual';
        }
        case 2:{
          return 'bissexual';
        }
        case 3:{
          return 'heterossexual';
        }case 4:{
          return 'homossexual';
        }
        case 5:{
          return 'pansexual';
        }
        default:{
          return false;
        }
      }
    },
    getAnimeNome(){
      return this.user.animeFavorito?.nome;
    }
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

.user-amigos {
  width: 100%;
  padding: 15px 50px 15px 10px;
}
</style>