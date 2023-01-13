<template>
  <v-app id="inspire">
    <v-app-bar app fixed dense dark style="z-index: 1000 !important; width: 100% !important;">
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title @click="menuClick('Home')">AniPlace</v-toolbar-title>
      <v-form class="form-busca" :style="searchDisplay">
        <v-text-field
            v-model="pesquisa"
            solo
            label="Pesquisar"
            append-icon="mdi-close"
            @click:append="clearPesquisa()"
            :loading="pesquisaLoading"
            color="red"
        ></v-text-field>
        <div class="results">
          <ResultSearchBox v-for="(result, i) in pesquisaResults" :key="i"
              :id="result._id"
              :nome="result.nome"
              :ano="result.temporada[0].ano"
              :generos="result.generos"
              :foto="result.foto"/>
        </div>
      </v-form>
      <div class="appbar-perfil" v-click-outside="onClickOutside">
        <div class="appbar-dropdown-activator">
          <div class="left" v-click-outside="closeAllMenu">
            <v-badge style="float: left" dot overlap left offset-y="20" offset-x="15" color="red" avatar :value="countSolicitacoes">
              <v-btn dark icon @click="openSolicitationsMenu"><v-icon :color="solicitacao ? 'red' : ''">mdi-account-multiple</v-icon></v-btn>
            </v-badge>
            <v-badge style="float: left" dot overlap left offset-y="20" offset-x="15" color="red" avatar :value="countConversas">
              <v-btn dark icon @click="openConversasMenu">
                <v-icon :color="conversasMenuEnabled ? 'red' : ''">mdi-forum</v-icon>
              </v-btn>
            </v-badge>
            <v-badge style="float: left" dot overlap left offset-y="20" offset-x="15" color="red" avatar :value="countNotifications">
              <v-btn dark icon @click="openNotificationsMenu"><v-icon :color="notification.enable ? 'red' : ''">mdi-bell</v-icon></v-btn>
            </v-badge>
            <v-avatar size="50px">
              <img :src="getFoto()" alt="Imagem de usuário padrã." :style="fotoStyle" @click="openDropdownMenu"/>
            </v-avatar>
            <span @click="openDropdownMenu" :style="nomeDisplay">{{getFistName()}}</span>
            <ConversasMenuComponent
                :conversas="conversasHistory"
                v-show="conversasMenuEnabled"
                @abrirConversa="abrirConversaPeloMenu"
            />
            <SolicitacoesMenuComponent
                :solicitacoes="solicitacoes"
                v-show="solicitacao"
                @atualizarSolicitacao="atualizarSolicitacao"
            />
            <NotificacoesMenuComponent
                :notifications="notification.list"
                v-show="notification.enable"
                @lerTudo="marcarLidoTodos"
            />
          </div>
          <div @click="appbardropdown = !appbardropdown" class="right" :style="nomeDisplay">
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

    <v-navigation-drawer right permanent fixed expand-on-hover dark style="z-index: 999 !important;" v-show="showListAmigos">
      <v-list>
        <v-list-item v-for="(amigo, i) in $store.state.auth.user.amigos" :key="i" @click="abrirConversa(amigo)">
          <v-list-item-avatar>
            <v-badge :value="amigo.online" bordered bottom color="#5DFF09" dot offset-x="10" offset-y="10">
              <v-avatar size="30px">
                <img :src="getAmigoFoto(amigo.foto)" alt="Foto de perfil"/>
              </v-avatar>
            </v-badge>
          </v-list-item-avatar>
          <v-list-item-title>
            {{amigo.nome}}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main style="margin-bottom: 50px;">

      <v-dialog scrollable persistent :max-width="dialogWidth" dark v-model="this.$store.state.main.notFound.enabled">
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

      <v-snackbar bottom light timeout="10000" elevation="20" v-model="solicitacaoNotification">
        <div style="text-align: center">
          Nova solicitação de amizade.
          <v-btn color="red" text @click="closeSolicitacaoNotification()">
            Ver <v-icon>mdi-redo</v-icon>
          </v-btn>
        </div>
        <v-btn style="position: absolute; top: 0; right: 0" color="red" dark icon @click="solicitacaoNotification = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-snackbar>

      <v-snackbar bottom light timeout="10000" elevation="20" v-model="notification.preview">
        <div style="text-align: center">
          Você recebeu uma notificação.
          <v-btn color="red" text @click="closeNotificationPreview()">
            Ver <v-icon>mdi-redo</v-icon>
          </v-btn>
        </div>
        <v-btn style="position: absolute; top: 0; right: 0" color="red" dark icon @click="notification.preview = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-snackbar>

      <v-dialog scrollable persistent :max-width="dialogWidth" dark v-model="this.$store.state.main.update.enabled">
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

      <div v-for="(conversa, i) in conversas" :key="i">
        <ChatComponent
            v-if="conversa.ativo"
            :id="conversa._id"
            :participantes="conversa.participantes"
            :mensagens="conversa.mensagens"
            @closeChat="closeChat(i)"
            @mensagemVista="mensagemVista(i)"
            :width="conversa.position"
            :indice="i"
            @playMsg="playMsgAudio"
        />
      </div>
      <div class="audio-msg-player" ref="audio">
        <vue-plyr>
          <audio crossorigin>
            <source src="../assets/msg-audio.mp3" type="audio/mp3"/>
          </audio>
        </vue-plyr>
      </div>

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
import {fastSearch, getSolicitacao,
  getSolicitacoes, getNotifications, setLidoTodos, getConversas,
  newConversa, getConversa} from "@/plugins/axios";
import ResultSearchBox from "@/components/inicio/ResultSearchBox";
import ConversasMenuComponent from "@/components/menuBar/ConversasMenuComponent";
import ChatComponent from "@/components/mensagem/ChatComponent";
import SolicitacoesMenuComponent from "@/components/menuBar/SolicitacoesMenuComponent";
import NotificacoesMenuComponent from "@/components/menuBar/NotificacoesMenuComponent";

export default {
  name: "HomePage",
  components: {
    NotificacoesMenuComponent,
    SolicitacoesMenuComponent, ChatComponent, ConversasMenuComponent, ResultSearchBox},
  data: () => ({
    drawer: false,
    group: null,
    appbardropdown: false,
    pesquisa: "",
    pesquisaResults: [],
    pesquisaLoading: false,
    solicitacao: false,
    solicitacoes: [],
    newSolicitacoes: 0,
    solicitacaoNotification: false,
    solicitacaoAceita: false,
    aceitarSolicitacaoLoading: false,
    notification: {
      enable: false,
      list: [],
      preview: false
    },
    newNotifications: 0,
    showFormReport: false,
    reportLoading: false,
    reportMsg: '',
    reportRules: [
      v => !!v || 'Mensagem vazia.',
      v => (v && v.length <= 500) || 'A mensagem deve ter no máximo 500 dígitos.'
    ],
    conversas: [],
    conversasHistory: [],
    mensagens: [],
    conversasAbertas: [],
    conversasMenuEnabled: false,
    audioPlayer: null
  }),
  methods: {
    ...mapActions('auth', ['ActionKillSession']),
    ...mapActions('auth', ['ActionSetAtivoSnackbar']),
    ...mapActions('auth', ['ActionSetAtivoMsg']),
    ...mapActions('main', ['ActionCloseDialogUpdate']),
    ...mapActions('main', ['ActionCloseNotFound']),
    menuClick(nomeRota){
      if(nomeRota === 'Animes' || nomeRota === 'Lançamentos'){
        this.$router.push({name: nomeRota, params: {pagina: "1"}});
        this.appbardropdown = false;
      }else if(nomeRota === 'Perfil'){
        this.appbardropdown = false;
        this.$router.push({name: nomeRota, params: {id: this.$store.state.auth.user._id}});
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
      if(this.$store.state.auth.user){
        return this.$store.state.auth.user.foto!==null?this.$imgServer+'/img/users/'+this.$store.state.auth.user.foto:this.$imgUserDefault;
      }else{
        return this.$imgUserDefault;
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
        this.reportLoading = false;
        this.showFormReport = false;
        this.reportMsg = '';
        this.closeNotFound();
      }, 2000);
    },
    clearPesquisa(){
      this.pesquisa = '';
      this.pesquisaResults = [];
    },
    onClickOutside(){
      this.appbardropdown = false;
    },
    closeAllMenu(){
      this.onClickOutsideConversasMenu();
      this.solicitacao = false;
      this.notification.enable = false;
    },
    openSolicitationsMenu(){
      if(this.solicitacao){
        this.solicitacao = !this.solicitacao;
      }else{
        this.closeAllMenu();
        this.appbardropdown = false;
        this.solicitacao = true;
      }
    },
    openConversasMenu(){
      if(this.conversasMenuEnabled){
        this.conversasMenuEnabled = !this.conversasMenuEnabled;
      }else{
        this.closeAllMenu();
        this.appbardropdown = false;
        this.conversasMenuEnabled = true;
      }
    },
    openNotificationsMenu(){
      if(this.notification.enable){
        this.notification.enable = !this.notification.enable;
      }else{
        this.closeAllMenu();
        this.appbardropdown = false;
        this.notification.enable = true;
      }
    },
    openDropdownMenu(){
      this.closeAllMenu();
      this.appbardropdown = !this.appbardropdown;
    },
    onClickOutsideConversasMenu(){
      this.conversasMenuEnabled = false;
    },
    async closeSolicitacaoNotification(){
      await this.listarSolicitacoes();
      this.solicitacaoNotification = false;
      this.solicitacao = true;
    },
    closeNotificationPreview(){
      this.notification.preview = false;
      this.notification.enable = true;
    },
    listarSolicitacoes(){
      this.solicitacoes = [];
      getSolicitacoes().then((value) => {
        for(let i = 0; i < value.data.solicitacoes.length; i++){
          this.solicitacoes.push({user: value.data.solicitacoes[i].de, status: value.data.solicitacoes[i].status});
        }
        this.newSolicitacoes = this.solicitacoes.length;
      });
    },
    listarNotifications(){
      this.notification.list = [];
      getNotifications().then((value) => {
        this.notification.list = value.data.notifications;
        for(let i = 0; i < value.data.notifications; i++){
          this.notification.list[i].dado = value.data.dados;
        }
      });
    },
    marcarLidoTodos(){
      setLidoTodos().then((value) => {
        if(value.data.markLidos){
          for(let i = 0; i < this.notification.list.length; i++){
            this.notification.list[i].status = 1;
          }
        }
      });
    },
    getAmigoFoto(foto){
      if(foto){
        return this.$imgServer + '/img/users/' + foto;
      }else{
        return this.$imgUserDefault;
      }
    },
    abrirConversa(amigo){
      let newC = true;
      for(let i = 0; i < this.conversas.length; i++){
        this.conversas[i].participantes.forEach((user) => {
          if(user._id === amigo._id){
            if(!this.conversas[i].ativo){
              this.conversas[i].ativo = true;
              this.conversas[i].position = this.getConversaWidth(this.conversas[i].position, i);
            }
            newC = false;
          }
        });
      }
      if(newC){
        newConversa(amigo._id).then((value) => {
          if(value.data.conversa) {
            for (let i = 0; i < value.data.conversa.participantes.length; i++) {
              if (value.data.conversa.participantes[i] === amigo._id) {
                value.data.conversa.participantes[i] = amigo;
              }
            }
            value.data.conversa.ativo = true;
            this.conversas.unshift(value.data.conversa);
            this.conversasHistory.unshift(value.data.conversa);
            this.conversas[0].position = this.getConversaWidth(0, 0);
          }
        });
      }
    },
    listarConversas(){
      getConversas().then((value) => {
        if(value.data.conversas.length > 0){
          this.conversas = value.data.conversas;
          this.conversasHistory = value.data.conversas;
        }
      });
    },
    closeChat(i){
      let positionAntiga = this.conversas[i].position;
      this.conversas[i].ativo = false;
      this.conversas[i].position = 0;
      for(let indice = 0; indice < this.conversas.length; indice++){
        if(this.conversas[indice].ativo && this.conversas[indice].position > positionAntiga){
          this.conversas[indice].position = this.conversas[indice].position - 1;
        }
      }
    },
    abrirConversaPeloMenu(idConversa){
      for(let i = 0; i < this.conversas.length; i++){
        if(this.conversas[i]._id === idConversa){
          this.conversas[i].participantes.forEach((user) => {
            if(user._id !== this.$store.state.auth.user._id){
              this.abrirConversa(user);
            }
          });
        }
      }
    },
    getConversaWidth(positionAtual, indice){
      for(let i = 0; i < this.conversas.length; i++){
        if(this.conversas[i].ativo){
          if(this.conversas[i].position > positionAtual){
            positionAtual = this.conversas[i].position;
          }
        }
      }
      this.conversas[indice].position = positionAtual + 1;
      return this.conversas[indice].position;
    },
    playMsgAudio(){
      this.audioPlayer.play();
    },
    mensagemVista(i){
      this.conversas[i].mensagens[this.conversas[i].mensagens.length - 1].visto = true;
      this.$forceUpdate();
    },
    atualizarSolicitacao(i){
      this.solicitacoes[i].status = 1;
    },
    solicitacaoMenuClickOut(){
      this.solicitacao = false;
    }
  },
  watch: {
    pesquisa: {
      handler: function(){
        if(this.pesquisa.length >= 3){
          this.pesquisaLoading = true;
          fastSearch(this.pesquisa).then((value) => {
            this.pesquisaResults = value.data.results;
            this.pesquisaLoading = false;
          });
        }else{
          this.pesquisaResults = [];
        }
      }
    },
    $route: {
      handler: function(){
        this.pesquisa = '';
        this.pesquisaResults = [];
      }
    }
  },
  computed: {
    searchDisplay(){
      switch (this.$vuetify.breakpoint.name){
        case "xs": return 'display: none';
        case "sm": return '';
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
    },
    dialogWidth(){
      switch (this.$vuetify.breakpoint.name){
        case "xs": return '330px';
        case "sm": return '400px';
        case "md": return '500px';
        case "lg": return '600px';
        case "xl": return '700px';
        default: return '330px';
      }
    },
    countSolicitacoes(){
      if(this.newSolicitacoes > 0){
        return 1;
      }else{
        return 0;
      }
    },
    countNotifications(){
      let count = 0;
      for(let i = 0; i < this.notification.list.length; i++){
        if(this.notification.list[i].status === 0){
          count++;
        }
      }
      return count > 0 ? 1 : count;
    },
    countConversas(){
      for(let i = 0; i < this.conversas.length; i++){
        if(this.conversas[i].mensagens.length > 0){
          if(!this.conversas[i].mensagens[this.conversas[i].mensagens.length - 1].visto && this.conversas[i].mensagens[this.conversas[i].mensagens.length - 1].autor._id !== this.$store.state.auth.user._id){
            return 1;
          }
        }
      }
      return 0;
    },
    getConversasAbertas(){
      return this.conversasAbertas;
    },
    showListAmigos(){
      if(this.$store.state.auth.user){
        if(this.$store.state.auth.user.amigos.length > 0){
          return true;
        }
      }
      return false;
    }
  },
  sockets: {
    solicitacao: function(data){
      if(data.para === this.$store.state.auth.user._id){
        getSolicitacao(data.id).then((value) => {
          this.solicitacoes.push({user: value.data.solicitacao.de, status: value.data.solicitacao.status});
          this.newSolicitacoes++;
          this.solicitacaoNotification = true;
        });
      }
    },
    newNotification: function(data){
      this.notification.list.push(data.notification);
      this.notification.preview = true;
    },
    frontNewMensagem: function(data){
      let achou = false;
      for(let i = 0; i < this.conversas.length; i++){
        if(this.conversas[i]._id === data.idConversa){
          achou = true;
          this.conversas[i].mensagens.push(data.mensagem);
          if(!this.conversas[i].ativo){
            this.abrirConversaPeloMenu(this.conversas[i]._id);
          }
          //this.conversasHistory.splice(0, 0, this.conversas.splice(i, 1)[0]);
        }
      }

      if(!achou){
        getConversa(data.idConversa).then((value) => {
          if(value.data.conversa){
            this.conversas.push(value.data.conversa);
            this.conversasHistory.push(value.data.conversa);
            this.abrirConversaPeloMenu(value.data.conversa._id);
          }
        });
      }
    },
    reconnect: function(){
      this.$socket.emit('saveIdSocket', {id: this.$store.state.auth.user._id, socket: this.$store.state.main.connection});
    },
    desfazerAmizade: function(data){
      for(let i = 0; i < this.$store.state.auth.user.amigos.length; i++){
        if(this.$store.state.auth.user.amigos[i]._id === data.id){
          this.$store.state.auth.user.amigos.splice(i, 1);
        }
      }
    },
    vistoOnline: function(data){
      for(let i = 0; i < this.$store.state.auth.user.amigos.length; i++){
        if(this.$store.state.auth.user.amigos[i]._id === data.idAmigo){
          this.$store.state.auth.user.amigos[i].online = true;
          if(data.resend){
            this.$socket.emit('amigoOnline', {
              to: data.idAmigo,
              from: this.$store.state.auth.user._id
            });
          }
        }
      }
    },
    offline: function(data){
      for(let i = 0; i < this.$store.state.auth.user.amigos.length; i++){
        if(this.$store.state.auth.user.amigos[i]._id === data.idAmigo){
          this.$store.state.auth.user.amigos[i].online = false;
        }
      }
    }
  },
  mounted() {
    this.$socket.emit('saveIdSocket', {id: this.$store.state.auth.user._id, socket: this.$store.state.main.connection});
    this.listarNotifications();
    this.listarSolicitacoes();
    this.listarConversas();

    document.addEventListener('ready', (e) => {
      this.audioPlayer = e.detail.plyr;
    });
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
  position: relative;
}

.v-input {
  float: left;
  width: 100%;
  border-radius: 0 !important;
}

.form-busca button {
  margin-right: 2px;
  float: right;
  background-color: #1E1E1E;
  border-radius: 0 15% 15% 0;
  height: 50px !important;
}

.results {
  position: absolute;
  top: 48px;
  background-color: rgb(30,30,30);
  width: 100%;
  max-height: 350px;
  overflow: auto;
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
  margin-right: 3px;
  border-radius: 50%;
}

.appbar-perfil span {
  line-height: 50px;
  float: right;
}

.audio-msg-player {
  display: none;
}
</style>