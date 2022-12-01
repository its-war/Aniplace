import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from '@/store/vuex'
import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'
import VueSocketIO from 'vue-socket.io'

Vue.config.productionTip = false

Vue.use(VuePlyr, {
  plyr: {
    autoplay: false,
    i18n: {
      restart: 'Reiniciar',
      rewind: 'Retroceder {seektime}s',
      play: 'Reproduzir',
      pause: 'Pausar',
      fastForward: 'Avançar {seektime}s',
      seek: 'Seek',
      seekLabel: '{currentTime} de {duration}',
      played: 'Reproduzido',
      buffered: 'Buffered',
      currentTime: 'Tempo atual',
      duration: 'Duração',
      volume: 'Volume',
      mute: 'Desativar som',
      unmute: 'Ativar som',
      enableCaptions: 'Habilitar legendas',
      disableCaptions: 'Desabilitar legendas',
      download: 'Baixar episódio',
      enterFullscreen: 'Entrar no modo Tela Inteira',
      exitFullscreen: 'Sair do modo Tela Inteira',
      frameTitle: 'Assistindo {title}',
      captions: 'Legendas',
      settings: 'Configurações',
      pip: 'Desfixar vídeo da página',
      menuBack: 'Voltar para o menu anterior',
      speed: 'Velocidade',
      normal: 'Normal',
      quality: 'Qualidade',
      loop: 'Repetição',
      start: 'Iniciar',
      end: 'Fim',
      all: 'Todo',
      reset: 'Redefinir',
      disabled: 'Desabilitado',
      enabled: 'Habilitado',
      advertisement: 'Ad',
      qualityBadge: {
        3840: '4K',
        2160: '2K',
        1440: 'FullHD',
        1080: 'FullHD',
        720: 'HD',
        576: 'SD',
        480: 'SD',
      },
    },
    markers: {
      enabled: true,
      points: [
        {time: 1, label: "Teste de Capitulo"},
        {time: 14, label: "Teste de Capitulo 02"}
      ]
    },
    captions: {
      active: true,
      language: 'en',
      update: true
    },
    controls: [
      'play-large',
      // 'restart',
      'rewind',
      'play',
      'fast-forward',
      'progress',
      'current-time',
      'duration',
      'mute',
      'volume',
      'airplay'
    ],
    tooltips: {
      controls: true,
      seek: true
    },
    toggleInvert: false
  }
})

Vue.use(new VueSocketIO({
  debug: false,
  connection: 'http://192.168.0.21',
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  }
}))

window._Vue = new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
