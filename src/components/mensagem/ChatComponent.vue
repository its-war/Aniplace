<template>
  <v-card elevation="16" dark style="position: fixed; bottom: 0; right: 10%; width: 300px; height: 400px; z-index: 500">
    <v-toolbar dark>
      {{conversaTitle($props.participantes)}}
    </v-toolbar>
    <v-btn @click="closeChat()" style="position: absolute; right: 0; top: 0" icon dark><v-icon>mdi-close</v-icon></v-btn>

    <div style="width: 100%; height: 280px; overflow-y: auto" ref="chat">
      <MensagemComponent
          v-for="(msg, i) in $props.mensagens" :key="i"
          :propria="msg.autor._id === $store.state.auth.user._id"
          :autor="msg.autor.foto ? msg.autor.foto : ''"
          :texto="msg.texto"
          :id="msg._id"
          ref="mensagem"
      />
      <!-- TODO criar rota para solicitar informações da conversa (se já existir) e abrir o card -->
    </div>

    <v-card-actions style="width: 100%; background-color: rgb(45,45,45)">
      <v-textarea
          rows="1"
          no-resize
          solo
          :disabled="loading"
          :loading="loading"
          color="#ff4a3b"
          dense
          v-model="mensagem"
          label="Escreva sua mensagem..."
          append-icon="mdi-send"
          v-on:keydown.enter.prevent="sendMessage"
          @click:append="sendMessage"
      ></v-textarea>
    </v-card-actions>
  </v-card>
</template>

<script>
import MensagemComponent from "@/components/mensagem/MensagemComponent";

export default {
  name: "ChatComponent",
  components: {
    MensagemComponent,
  },
  data: () => ({
    mensagem: '',
    loading: false,
    chatHeight: 0
  }),
  methods: {
    sendMessage(){
      if(this.mensagem.length > 0){
        this.loading = true;
        this.$socket.emit('newMensagem', {
          idConversa: this.$props.id,
          msg: this.mensagem,
          idUser: this.$store.state.auth.user._id
        });
      }
      this.loading = false;
      this.mensagem = '';
    },
    conversaTitle(participantes){
      for(let i = 0; i < participantes.length; i++){
        if(participantes[i]._id !== this.$store.state.auth.user._id){
          return participantes[i].nome;
        }
      }
    },
    closeChat(){
      this.$emit('closeChat');
    }
  },
  props: {
    id: {
      type: String,
      required: true
    },
    participantes: {
      type: Array,
      required: true
    },
    mensagens: {
      type: Array,
      required: true
    }
  },
  mounted() {
    this.$refs.chat.scrollTo(0, this.$refs.chat.scrollHeight);
    this.chatHeight = this.$refs.chat.scrollHeight;
  },
  watch: {
    mensagens: { //TODO fazer com que o chat role para baixo ao chegar novas mensagens
      handler: function(){
        this.$refs.chat.scrollTo(0, this.$refs.chat.scrollHeight);
      }
    } //transition: max-height 200ms ease-out; scroll-behavior: smooth; hyphens: auto
  },
  updated() {
    if(this.$refs.chat.scrollTop + this.$refs.chat.clientHeight === this.$refs.chat.scrollHeight){
      this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight;
    }
  }
}
</script>

<style scoped>

</style>