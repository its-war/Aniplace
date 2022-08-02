<template>
  <v-container fill-height fluid>
    <div class="page">
      <div class="player_sizer_main" ref="player">
        <vue-plyr class="player-box-main-style">
          <video controls crossorigin playsinline style="--plyr-color-main: red;">
            <source size="720" type="video/mp4" :src="'https://aniplace-mysql.000webhostapp.com/video/zero06.mp4'"/>
          </video> <!-- https://aniplace-mysql.000webhostapp.com/video/zero06.mp4 '/video/' + episodio.video.src -->
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
        <v-btn dark style="float: left" :disabled="this.disabled.anterior"><v-icon>mdi-skip-backward</v-icon> Episódio Anterior</v-btn>
        <v-btn @click="proximo()" dark style="float: right" :disabled="this.disabled.proximo">Próximo Episódio <v-icon>mdi-skip-forward</v-icon></v-btn>
        <v-btn dark @click="fullScreenEnter()"><v-icon>mdi-fullscreen</v-icon></v-btn>
      </div>
      <h2 style="color: #FFFFFF">{{this.episodio.anime.nome}} — Episódio {{this.$route.params.numero}}</h2>
    </div>
  </v-container>
</template>

<script>
import screenfull from 'screenfull';
export default {
  name: "EpisodioPageComponent",
  components: {},
  data: () => ({
    interval: 0,
    disabled: {
      anterior: false,
      proximo: false
    },
    player: null,
    showPularAbertura: false,
    showFullScreenClose: false,
    isFullScreen: false,
    episodio: {
      _id: 'fgf878755jj4qs25d',
      anime: {
        _id: 'ghg45484jhjg64ku8',
        nome: "Zero no Tsukaima",
        temporadas: 4
      },
      video: {
        src: "hj588khjg5g665hj456hjh5.mkv",
        thumb: "wallhaven-pkj7gm.png"
      },
      abertura: {
        inicio: 70,
        fim: 160
      },
      numero: 6,
      temporada: 1,
      totalEpisodios: 12
    },
    btnVoltarStyle: ''
  }),
  mounted() {
    this.episodio.anime._id = this.$route.params.id;

    document.addEventListener('ready', (e) => {
      this.player = e.detail.plyr;

      setTimeout(() => {
        this.player.play();
      }, 2000);

      this.interval = setInterval(() => {
        if(Math.floor(this.player.currentTime) >= this.episodio.abertura.inicio && Math.floor(this.player.currentTime) <= this.episodio.abertura.fim){
          this.showPularAbertura = true;
        }else{
          this.showPularAbertura = false;
        }
      }, 1000);
    });

    this.disabledAnterior();
    this.disabledProximo();

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
      this.player.currentTime = this.episodio.abertura.fim + 1;
    },
    fullScreenEnter(){
      screenfull.request(this.$refs.player);
    },
    fullScreenExit(){
      screenfull.exit();
    },
    async voltar(){
      await this.$router.replace({name: 'Anime', params: {id: this.episodio.anime._id}});
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
    proximo(){
      this.player.source = {
        type: 'video',
        title: 'episodio 7',
        sources: [
          {
            src: '/video/ghj554kh1gf.mkv',
            type: 'video/mp4',
            size: 720
          }
        ]
      };
    },
    disabledAnterior(){
      this.disabled.anterior = Number.parseInt(this.$route.params.temporada) === 1 && Number.parseInt(this.$route.params.numero) === 1;
    },
    disabledProximo(){ //       se o episodio atual for o ultimo da temporada E se for a ultima temporada
      this.disabled.proximo = this.episodio.totalEpisodios === Number.parseInt(this.$route.params.numero) && Number.parseInt(this.$route.params.temporada) === this.episodio.anime.temporadas;
    }
  },
  async beforeDestroy() {
    clearInterval(this.interval);
    await this.player.pause();
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