<template>
  <v-container fill-height fluid>
    <div class="page">
      <div class="player_sizer_main" ref="player">
        <vue-plyr class="player-box-main-style">
          <video controls crossorigin playsinline style="--plyr-color-main: red;">
            <source size="720" type="video/mp4" :src="'https://aniplace-mysql.000webhostapp.com/video/' + this.$store.state.episodio.src"/>
            <source size="720" type="video/mp4" :src="'https://otakuland-server.000webhostapp.com/video/' + this.$store.state.episodio.src"/>
            <track kind="captions" :src="'https://aniplace-mysql.000webhostapp.com/legendas/' + legenda() + '.vtt'" srclang="en" label="Português Brasil" default>
          </video>
        </vue-plyr>
        <v-btn
            dark
            text
            elevation="16"
            outlined
            v-show="showPularAbertura"
            class="pular"
            @click="pularAbertura()"
            style="background-color: rgba(30,30,30,.39)"
        >Pular Abertura</v-btn>
        <v-btn
            dark
            text
            elevation="16"
            outlined
            v-show="showPularEncerramento"
            class="pular"
            @click="pularEncerramento()"
            style="background-color: rgba(30,30,30,.39)"
        >Pular Encerramento</v-btn>
        <v-btn
            dark
            text
            elevation="16"
            outlined
            v-show="showPularEncerramento && !disabledProximo"
            class="proximo-episodio"
            @click="proximo()"
            style="background-color: rgba(30,30,30,.39)"
        >Próximo Episódio</v-btn>
        <v-btn
            dark
            :style="isFullScreen && showFullScreenClose ? 'display: block;' : ''"
            class="fullscreen-sair"
            @click="fullScreenExit()"
            elevation="6"
            icon
            outlined
            x-large
            style="background-color: rgba(30,30,30,.80)"
        ><v-icon>mdi-close</v-icon></v-btn>
        <v-btn
            dark
            :style="btnVoltarStyle"
            class="btn-voltar"
            @click="voltar()"
            elevation="6"
            icon
            outlined
            x-large
            style="background-color: rgba(30,30,30,.80)"
        ><v-icon>mdi-arrow-left</v-icon></v-btn>
      </div>
      <div class="subcontrols">
        <v-btn @click="anterior()" dark style="float: left" :disabled="disabledAnterior"><v-icon>mdi-skip-backward</v-icon> <span v-show="showBtnTitle">Episódio Anterior</span></v-btn>
        <v-btn @click="proximo()" dark style="float: right" :disabled="disabledProximo"><span v-show="showBtnTitle">Próximo Episódio</span> <v-icon>mdi-skip-forward</v-icon></v-btn>
        <v-btn dark @click="fullScreenEnter()"><v-icon>mdi-fullscreen</v-icon></v-btn>
      </div>
      <h2 style="color: #FFFFFF" :style="textStyle">{{this.$store.state.episodio.anime.nome}} <span v-if="this.$store.state.episodio.dados.nTemporadas > 1">— Temporada {{this.$route.params.temporada}}</span> — Episódio {{this.$route.params.numero}}</h2>
    </div>
  </v-container>
</template>

<script>
import screenfull from 'screenfull';
import {setEpisodioProgresso} from "@/plugins/axios";

export default {
  name: "EpisodioPageComponent",
  components: {},
  data: () => ({
    interval: 0,
    intervalProgress: 0,
    disabled: {
      anterior: false,
      proximo: false
    },
    player: null,
    showPularAbertura: false,
    showPularEncerramento: false,
    showFullScreenClose: false,
    isFullScreen: false,
    btnVoltarStyle: ''
  }),
  async mounted() {

    document.addEventListener('ready', (e) => {
      this.player = e.detail.plyr;

      setTimeout(() => {
        this.player.play();
        if(this.$store.state.episodio.dados.progresso.tempo > 0 && this.$store.state.episodio.dados.progresso.episodio === parseInt(this.$route.params.numero) && this.$store.state.episodio.dados.progresso.temporada === parseInt(this.$route.params.temporada)) {
          this.player.currentTime = this.$store.state.episodio.dados.progresso.tempo;
        }else{
          this.updateProgress();
        }
      }, 2000);

      this.interval = setInterval(() => {
        if(this.$store.state.episodio.dados.abertura.fim > 0){
          this.showPularAbertura = Math.floor(this.player.currentTime) >= this.$store.state.episodio.dados.abertura.inicio && Math.floor(this.player.currentTime) <= this.$store.state.episodio.dados.abertura.fim;
        }

        if(this.$store.state.episodio.dados.encerramento.inicio > 0){
          this.showPularEncerramento = Math.floor(this.player.currentTime) >= this.$store.state.episodio.dados.encerramento.inicio && Math.floor(this.player.currentTime) <= this.$store.state.episodio.dados.encerramento.fim;
        }
      }, 1000);

      this.intervalProgress = setInterval(() => {
        this.updateProgress();
      }, 60000);
    });

    document.addEventListener('ended', () => {
      if(!this.disabledProximo){
        this.proximo();
      }
    });

    document.addEventListener('controlsshown', () => {
      this.showFullScreenClose = true;
      this.showBtnVoltar(1);
    });

    document.addEventListener('controlshidden', () => {
      this.showFullScreenClose = false;
      this.showBtnVoltar(0);
    });

    document.addEventListener('playing', () => {
      this.showFullScreenClose = false;
      this.showBtnVoltar(0);
    });

    this.$refs.player.addEventListener('dblclick', () => {
      if(this.isFullScreen){
        this.fullScreenExit();
      }else{
        this.fullScreenEnter();
      }
    })

    if (screenfull.isEnabled) {
      screenfull.on('change', () => {
        this.isFullScreen = screenfull.isFullscreen;
      });
    }
  },
  methods: {
    pularAbertura(){
      this.player.currentTime = this.$store.state.episodio.dados.abertura.fim + 1;
      this.updateProgress();
    },
    pularEncerramento(){
      this.player.currentTime = this.$store.state.episodio.dados.encerramento.fim + 1;
      this.updateProgress();
    },
    fullScreenEnter(){
      screenfull.request(this.$refs.player);
    },
    fullScreenExit(){
      screenfull.exit();
    },
    async voltar(){
      this.updateProgress();
      await this.$router.replace({name: 'Anime', params: {id: this.$route.params.id}});
    },
    showBtnVoltar(opcao){
      switch (opcao){
        case 0: {
          this.btnVoltarStyle = 'display: none';
          break;
        }
        case 1: {
          this.btnVoltarStyle = 'display: block';
          break;
        }
        default: {
          this.btnVoltarStyle = 'display: block';
        }
      }
    },
    async proximo(){
      if(parseInt(this.$route.params.numero) < this.$store.state.episodio.dados.nEpisodios){
        await this.$router.push({name: 'Episódio', params: {
          id: this.$store.state.episodio.anime._id,
          temporada: this.$route.params.temporada,
          numero: (parseInt(this.$route.params.numero) + 1).toString()
        }});
        this.player.source = {
          type: 'video',
          sources: [
            {
              src: 'https://aniplace-mysql.000webhostapp.com/video/' + this.$store.state.episodio.anime.temporada[parseInt(this.$route.params.temporada) - 1].episodios[parseInt(this.$route.params.numero) - 1].online,
              type: 'video/mp4',
              size: 720
            },
            {
              src: 'https://otakuland-server.000webhostapp.com/video/' + this.$store.state.episodio.anime.temporada[parseInt(this.$route.params.temporada) - 1].episodios[parseInt(this.$route.params.numero) - 1].online,
              type: 'video/mp4',
              size: 720
            }
          ],
          tracks: [
            {
              kind: 'captions',
              label: 'English',
              srclang: 'en',
              src: 'https://aniplace-mysql.000webhostapp.com/legendas/' + this.legenda() + '.vtt',
              default: true
            }
          ]
        }
      }else if(parseInt(this.$route.params.temporada) < this.$store.state.episodio.dados.nTemporadas){
        await this.$router.push({name: 'Episódio', params: {
            id: this.$store.state.episodio.anime._id,
            temporada: (parseInt(this.$route.params.temporada) + 1).toString(),
            numero: '1'
          }});
        this.player.source = {
          type: 'video',
          sources: [
            {
              src: 'https://aniplace-mysql.000webhostapp.com/video/' + this.$store.state.episodio.anime.temporada[parseInt(this.$route.params.temporada) - 1].episodios[0].online,
              type: 'video/mp4',
              size: 720
            },
            {
              src: 'https://otakuland-server.000webhostapp.com/video/' + this.$store.state.episodio.anime.temporada[parseInt(this.$route.params.temporada) - 1].episodios[0].online,
              type: 'video/mp4',
              size: 720
            }
          ],
          tracks: [
            {
              kind: 'captions',
              label: 'English',
              srclang: 'en',
              src: 'https://aniplace-mysql.000webhostapp.com/legendas/' + this.legenda() + '.vtt',
              default: true
            }
          ]
        }
      }
      this.player.currentTime = 0;
      this.updateProgress();
    },
    async anterior(){
      if(parseInt(this.$route.params.numero) > 1){
        await this.$router.push({name: 'Episódio', params: {
            id: this.$store.state.episodio.anime._id,
            temporada: this.$route.params.temporada,
            numero: (parseInt(this.$route.params.numero) - 1).toString()
          }});
        this.player.source = {
          type: 'video',
          sources: [
            {
              src: 'https://aniplace-mysql.000webhostapp.com/video/' + this.$store.state.episodio.anime.temporada[parseInt(this.$route.params.temporada) - 1].episodios[parseInt(this.$route.params.numero) - 1].online,
              type: 'video/mp4',
              size: 720
            },
            {
              src: 'https://otakuland-server.000webhostapp.com/video/' + this.$store.state.episodio.anime.temporada[parseInt(this.$route.params.temporada) - 1].episodios[parseInt(this.$route.params.numero) - 1].online,
              type: 'video/mp4',
              size: 720
            }
          ],
          tracks: [
            {
              kind: 'captions',
              label: 'English',
              srclang: 'en',
              src: 'https://aniplace-mysql.000webhostapp.com/legendas/' + this.legenda() + '.vtt',
              default: true
            }
          ]
        }
      }else if(parseInt(this.$route.params.temporada) > 1){
        await this.$router.push({name: 'Episódio', params: {
            id: this.$store.state.episodio.anime._id,
            temporada: (parseInt(this.$route.params.temporada) - 1).toString(),
            numero: (this.$store.state.episodio.anime.temporada[this.$store.state.episodio.anime.temporada.length - 2].episodios.length).toString()
          }});
        this.player.source = {
          type: 'video',
          sources: [
            {
              src: 'https://aniplace-mysql.000webhostapp.com/video/' + this.$store.state.episodio.anime.temporada[parseInt(this.$route.params.temporada) - 1].episodios[parseInt(this.$route.params.numero) - 1].online,
              type: 'video/mp4',
              size: 720
            },
            {
              src: 'https://otakuland-server.000webhostapp.com/video/' + this.$store.state.episodio.anime.temporada[parseInt(this.$route.params.temporada) - 1].episodios[parseInt(this.$route.params.numero) - 1].online,
              type: 'video/mp4',
              size: 720
            }
          ],
          tracks: [
            {
              kind: 'captions',
              label: 'English',
              srclang: 'en',
              src: 'https://aniplace-mysql.000webhostapp.com/legendas/' + this.legenda() + '.vtt',
              default: true
            }
          ]
        }
      }
      this.player.currentTime = 0;
      this.updateProgress();
    },
    updateProgress(){
      setEpisodioProgresso(
          this.$store.state.auth.user._id,
          this.$route.params.id,
          parseInt(this.$route.params.temporada),
          parseInt(this.$route.params.numero),
          Math.floor(this.player.currentTime)
      ).then();
    },
    legenda(){
      return this.$store.state.episodio.src.split('.')[0];
    }
  },
  async beforeDestroy() {
    clearInterval(this.interval);
    clearInterval(this.intervalProgress);
    await this.player.pause();
  },
  computed: {
    disabledAnterior(){
      return parseInt(this.$route.params.temporada) === 1 && parseInt(this.$route.params.numero) === 1;
    },
    disabledProximo(){ //       se o episodio atual for o ultimo da temporada E se for a ultima temporada
      if(parseInt(this.$route.params.temporada) === this.$store.state.episodio.dados.nTemporadas && parseInt(this.$route.params.numero) === this.$store.state.episodio.dados.nEpisodios){
        return true;
      }else{
        return this.$store.state.episodio.anime.temporada[parseInt(this.$route.params.temporada)].episodios.length < 1;
      }
    },
    textStyle(){
      switch (this.$vuetify.breakpoint.name){
        case "xs": return 'font-size: 12px !important; margin-top: 5px';
        case "sm": return 'font-size: 16px !important;';
        case "md": return '';
        case "lg": return '';
        case "xl": return '';
        default: return '';
      }
    },
    showBtnTitle(){
      switch (this.$vuetify.breakpoint.name){
        case "xs": return false;
        case "sm": return false;
        case "md": return true;
        case "lg": return true;
        case "xl": return true;
        default: return true;
      }
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: rgb(30,30,30);
}

.page {
  margin: auto !important;
}

.player_sizer_main {
  width: 80%;
  margin: auto;
  z-index: 20;
  position: relative;
}

.subcontrols {
  width: 80%;
  margin: auto;
}

.pular {
  position: absolute;
  z-index: 21;
  bottom: 30%;
  right: 0;
}

.proximo-episodio {
  position: absolute;
  z-index: 21;
  bottom: 50%;
  right: 0;
}

.fullscreen-sair {
  position: absolute;
  z-index: 21;
  top: 0;
  right: 0;
  display: none;
}

.fullscreen-sair:hover {
  display: block;
}

.btn-voltar {
  position: absolute;
  z-index: 21;
  top: 0;
  left: 0;
  display: block;
}

.btn-voltar:hover {
  display: block !important;
}
</style>