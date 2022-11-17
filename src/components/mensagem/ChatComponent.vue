<template>
  <v-card elevation="16" dark :style="cardWidth" style="position: fixed; bottom: 0; width: 300px; height: 400px; z-index: 500">
    <v-toolbar dark>
      {{conversaTitle($props.participantes)}}
    </v-toolbar>
    <v-btn @click="closeChat()" style="position: absolute; right: 0; top: 0" icon dark><v-icon>mdi-close</v-icon></v-btn>

    <div class="messages" :id="'chat' + $props.indice">

      <div v-for="(mensagem, i) in $props.mensagens" :key="i" v-once>
        <div class="msg my" v-if="$store.state.auth.user._id === mensagem.autor._id">
          <div>
            <div class="text my-message">
              {{mensagem.texto}}
            </div>
          </div>
        </div>

        <div class="msg outher" v-else>
          <div>
            <div class="text other-message">
              {{mensagem.texto}}
            </div>
          </div>
        </div>

      </div>

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
export default {
  name: "ChatComponent",
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
      this.$forceUpdate();
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
    },
    width: {
      type: Number,
      required: true
    },
    indice: {
      type: Number,
      required: true
    }
  },
  mounted() {
    let chat = document.getElementById('chat' + this.$props.indice);
    chat.scrollTo(0, chat.scrollHeight);
    this.chatHeight = chat.scrollHeight;
  },
  sockets: {
    frontNewMensagem: function(data){
      if(this.$props.id === data.idConversa){
        let el = document.createElement('div');
        if(data.mensagem.autor._id === this.$store.state.auth.user._id){
          el.setAttribute("style", "display: flex;padding: 10px;justify-content: flex-end;");
          el.innerHTML = `
          <div style="max-width: 80%; box-shadow: 0 0 20px 5px rgba(0,0,0,.05);">
            <div style="word-wrap: break-word;padding: 7px;border-radius: 15px;background-color: #ff4a3b;">
              ${data.mensagem.texto}
            </div>
          </div>
        `;
        }else {
          el.setAttribute('style', 'display: flex;padding: 10px;justify-content: flex-start;');
          el.innerHTML = `
          <div style="max-width: 80%; box-shadow: 0 0 20px 5px rgba(0,0,0,.05);">
            <div style="word-wrap: break-word;padding: 7px;border-radius: 15px;background-color: #7c7c7c;">
              ${data.mensagem.texto}
            </div>
          </div>
        `;
        }

        let chat = document.getElementById('chat' + this.$props.indice);

        chat.appendChild(el);
        chat.scrollTop = chat.scrollHeight - chat.clientHeight;
      }
    }
  },
  computed: {
    cardWidth(){
      switch (this.$props.width){
        case 1:
          return 'right: 100px';
        case 2:
          return 'right: 415px';
        case 3:
          return 'right: 730px';
        case 4:
          return 'right: 1045px';
        default:
          return 'display: none';
      }
    }
  }
}
</script>

<style scoped>
.messages {
  width: 100%;
  height: 280px;
  overflow: auto;
}

.msg {
  display: flex;
  padding: 10px;
}

.msg > div {
  max-width: 80%;
  box-shadow: 0 0 20px 5px rgba(0,0,0,.05);
}

.msg.my {
  justify-content: flex-end;
}

.msg.outher {
  justify-content: flex-start;
}

.msg .text {
  word-wrap: break-word;
  padding: 7px;
  border-radius: 15px;
}

.text.my-message {
  background-color: #ff4a3b;
}

.text.other-message {
  background-color: #7c7c7c;
}
</style>