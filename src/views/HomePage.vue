<template>
  <v-app id="inspire">
    <v-app-bar app dense dark style="z-index: 1000 !important; width: 100% !important;">
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title @click="menuClick('Home')">AniPlace</v-toolbar-title>
      <v-form class="form-busca" :style="searchDisplay">
        <v-text-field
            v-model="pesquisa"
            solo
            label="Pesquisar"
            clearable
        ></v-text-field> <!-- TODO criar e estruturar pagina de pesquisa  -->
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-form>
      <div class="appbar-perfil">
        <div class="appbar-dropdown-activator" @click="appbardropdown = !appbardropdown">
          <div class="left">
            <img :src="getFoto()" alt="Imagem de usuário padrã." :style="fotoStyle"/>
            <span :style="nomeDisplay">{{getFistName()}}</span>
          </div>
          <div class="right" :style="nomeDisplay">
            <v-icon>mdi-chevron-down</v-icon>
          </div>
        </div>
        <v-list class="appbar-dropdown" v-show="appbardropdown" :style="dropdownStyle">
          <v-list-item @click="menuClick('Perfil')">
            <v-list-item-title>Perfil</v-list-item-title>
          </v-list-item>
          <v-list-item @click="menuClick('Config')">
            <v-list-item-title>Conta</v-list-item-title>
          </v-list-item>
          <v-list-item @click="sair()">
            <v-list-item-title>Sair <v-icon>mdi-logout</v-icon></v-list-item-title>
          </v-list-item>
        </v-list>
      </div>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" fixed temporary dark style="z-index: 1000 !important;">
      <v-btn icon class="left btn-close" @click="drawer = false">
        <v-icon>mdi-window-close</v-icon>
      </v-btn>
      <v-list nav dense>

        <v-list-item-group v-model="group" active-class="red text--accent-4">

          <v-list-item @click="menuClick('Home')">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Página Inicial</v-list-item-title>
          </v-list-item>

          <v-list-item @click="menuClick('Animes')">
            <v-list-item-icon>
              <v-icon>mdi-television-play</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Animes</v-list-item-title>
          </v-list-item>

          <v-list-item @click="menuClick('Lançamentos')">
            <v-list-item-icon>
              <v-icon>mdi-calendar-month</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Lançamentos</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main style="margin-bottom: 50px">

      <v-dialog scrollable persistent max-width="330px" dark v-model="this.$store.state.main.notFound.enabled">
        <v-card>
          <v-card-title class="text-h5 red">
            <v-icon>mdi-alert-circle</v-icon>
            Página Não Encontrada
          </v-card-title>
          <v-card-text style="height: 400px">
            {{this.$store.state.main.notFound.message}}
            <v-divider v-show="showFormReport"></v-divider>
            <v-form style="margin-top: 5px" v-show="showFormReport">
              <v-textarea v-model="reportMsg" :rules="reportRules" label="Descreva o problema" outlined color="white" clearable counter="500"></v-textarea>
              <v-btn
                  :loading="reportLoading"
                  @click="reportar()"
                  :text="!reportLoading"
                  color="red"
              ><v-icon>mdi-alert</v-icon> Reportar</v-btn>
              <v-btn
                  @click="showFormReport = !showFormReport"
                  text
                  color="primary"
              ><v-icon>mdi-close</v-icon> Cancelar</v-btn>
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn
                v-show="!showFormReport"
                x-large
                text
                @click="showFormReport = !showFormReport"
                color="red"
            ><v-icon>mdi-alert</v-icon> Reportar</v-btn>
            <v-spacer></v-spacer>
            <v-btn
                :loading="this.$store.state.main.closeNotFoundLoading"
                x-large
                @click="closeNotFound()"
                :text="!this.$store.state.main.closeNotFoundLoading"
                color="red"
            >OK <v-icon>mdi-check</v-icon></v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-snackbar width="50%" centered light timeout="-1" elevation="20" v-model="this.$store.state.auth.ativoSnackbar">
        <div style="text-align: center">
          {{this.$store.state.auth.ativoMsg}}
          <v-btn color="red" text @click="closeSnackbarMsg()">
            OK <v-icon>mdi-check</v-icon>
          </v-btn>
        </div>
      </v-snackbar>

      <v-dialog scrollable persistent max-width="300px" dark v-model="this.$store.state.main.update.enabled">
        <v-card>
          <v-card-title class="text-h5 red">Atualização</v-card-title>
          <v-card-text style="height: 300px">
            <v-list style="text-align: left">
              <v-list-item v-for="(t, i) in this.$store.state.main.update.text" :key="i">
                <v-list-item-icon><v-icon color="red">mdi-circle-medium</v-icon></v-list-item-icon>
                <v-list-item-content>{{t}}</v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                :loading="this.$store.state.main.closeDialogLoading"
                x-large
                @click="closeUpdate()"
                :text="!this.$store.state.main.closeDialogLoading"
                color="red"
            >OK <v-icon>mdi-check</v-icon></v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <router-view/>

    </v-main>
    <v-footer padless>
      <v-card flat tile width="100%" class="red lighten-1 text-center">
        <v-card-text>
          <v-btn class="mx-4" icon color="white" @click="menuClick('Home')"><v-icon>mdi-home</v-icon></v-btn>
          <v-btn class="mx-4" icon color="white" @click="footerLink('https://www.instagram.com/its.war_/')"><v-icon>mdi-instagram</v-icon></v-btn>
          <v-btn class="mx-4" icon color="white" @click="footerLink('https://www.facebook.com/karlos.warney')"><v-icon>mdi-facebook</v-icon></v-btn>
          <v-btn class="mx-4" icon color="white" @click="footerLink('https://github.com/its-war')"><v-icon>mdi-github</v-icon></v-btn>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text class="white--text">
          <v-icon>mdi-trademark</v-icon>AniPlace <v-icon>mdi-copyright</v-icon> 2022
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "HomePage",
  data: () => ({
    drawer: false,
    group: null,
    appbardropdown: false,
    pesquisa: "",
    showFormReport: false,
    reportLoading: false,
    reportMsg: '',
    reportRules: [
      v => !!v || 'Mensagem vazia.',
      v => (v && v.length <= 500) || 'A mensagem deve ter no máximo 500 dígitos.'
    ]
  }),
  methods: {
    ...mapActions('auth', ['ActionKillSession']),
    ...mapActions('auth', ['ActionSetAtivoSnackbar']),
    ...mapActions('auth', ['ActionSetAtivoMsg']),
    ...mapActions('main', ['ActionCloseDialogUpdate']),
    ...mapActions('main', ['ActionCloseNotFound']),
    menuClick(nomeRota){
      if(nomeRota === 'Animes'){
        this.$router.push({name: 'Animes', params: {pagina: "1"}});
        this.appbardropdown = false;
      }else if(this.$route.name !== nomeRota){
        this.$router.push({name: nomeRota});
        this.appbardropdown = false;
      }else{
        this.$router.go(0);
      }
    },
    sair(){
      this.ActionKillSession();
      this.$router.replace('/login');
    },
    nav(destino, idusuario){
      this.$router.push({path: destino, params: {idusuario: idusuario}});
    },
    getFoto(){
      if(this.$store.state.auth.user.length > 0){
        return this.$store.state.auth.user.foto!==null?'/img/users/perfil/'+this.$store.state.auth.user.foto:'/img/users/default.jpg';
      }else{
        return '/img/users/default.jpg';
      }
    },
    getFistName(){
      return this.$store.state.auth.user.fistname;
    },
    setGoTop(){
      window.scrollTo(0,0);
    },
    closeSnackbarMsg(){
      this.ActionSetAtivoSnackbar(false);
      this.ActionSetAtivoMsg('');
    },
    footerLink(url){
      window.open(url, '_blank');
    },
    closeUpdate(){
      this.ActionCloseDialogUpdate();
    },
    closeNotFound(){
      this.ActionCloseNotFound();
    },
    reportar(){
      this.reportLoading = true;
      setTimeout(() => {
        console.log(this.reportMsg);
        this.reportLoading = false;
        this.showFormReport = false;
        this.reportMsg = '';
        this.closeNotFound();
      }, 2000);
    }
  },
  computed: {
    searchDisplay(){
      switch (this.$vuetify.breakpoint.name){
        case "xs": return 'display: none';
        case "sm": return 'display: none';
        case "md": return '';
        case "lg": return '';
        case "xl": return '';
        default: return '';
      }
    },
    fotoStyle(){
      switch (this.$vuetify.breakpoint.name){
        case "xs": return 'position: absolute; right: 0; top: 0;';
        case "sm": return 'position: absolute; right: 0; top: 0;';
        case "md": return '';
        case "lg": return '';
        case "xl": return '';
        default: return '';
      }
    },
    nomeDisplay(){
      switch (this.$vuetify.breakpoint.name){
        case "xs": return 'display: none';
        case "sm": return 'display: none';
        case "md": return '';
        case "lg": return '';
        case "xl": return '';
        default: return '';
      }
    },
    dropdownStyle(){
      switch (this.$vuetify.breakpoint.name){
        case "xs": return 'right: 0; margin-top: 25px !important;';
        case "sm": return 'right: 0; margin-top: 25px !important;';
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
.container {
  padding: 0 !important;
}

.v-toolbar__title {
  font-size: 24px;
  text-transform: uppercase;
  letter-spacing: 4px;
  margin-left: 25px;
  color: white;
  cursor: pointer;
}

.v-list {
  margin-top: 40px;
}

.btn-close {
  margin: 5px 0 0 15px;
}

.form-busca {
  text-align: center;
  margin: auto;
  width: 30%;
}

.v-input {
  float: left;
  width: 88%;
  border-radius: 0 !important;
}

.form-busca button {
  margin-right: 2px;
  float: right;
  background-color: #1E1E1E;
  border-radius: 0 15% 15% 0;
  height: 50px !important;
}

.appbar-perfil {
  cursor: pointer;
  margin-right: 10px;
}

.appbar-dropdown {
  position: absolute;
  margin-top: 50px;
  width: 180px;
  right: 0;
}

.left {
  float: left;
}

.right {
  float: right;
  line-height: 50px;
}

.appbar-perfil img {
  width: 50px;
  height: 50px;
  float: left;
  margin-right: 3px;
  border-radius: 50%;
}

.appbar-perfil span {
  line-height: 50px;
  float: right;
}
</style>