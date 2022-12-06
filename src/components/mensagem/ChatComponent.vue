<template>
  <v-card elevation="16" dark :style="cardWidth" style="position: fixed; bottom: 0; width: 300px; height: 400px; z-index: 500">
    <v-toolbar dark style="padding-left: 2px">
      <v-badge bordered bottom left offset-y="13px" offset-x="-3px" color="#5DFF09" dot :value="isOnline">
        {{conversaTitle($props.participantes)}}
      </v-badge>
    </v-toolbar>
    <v-btn @click="closeChat()" style="position: absolute; right: 0; top: 0" icon dark><v-icon>mdi-close</v-icon></v-btn>

    <div class="messages" :id="'chatMaster' + $props.indice" @click="visualizar">

      <v-btn icon loading style="margin: auto" v-show="scroll.loading"></v-btn>

      <div :id="'chat' + $props.indice">
        <div v-for="(mensagem, i) in $props.mensagens" :key="i" v-once>
          <div class="msg my" v-if="$store.state.auth.user._id === mensagem.autor._id">
            <div> <!-- mensagem do usuário atual -->
              <div class="text my-message" :title="'Enviada em ' + getMsgRegistro(mensagem.registro)">
                {{mensagem.texto}}
              </div>
            </div>
          </div>

          <div class="msg outher" v-else>
            <div> <!-- mensagem do amigo -->
              <div class="text other-message" :title="'Enviada em ' + getMsgRegistro(mensagem.registro)">
                {{mensagem.texto}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <p class="text-see"
         :style="showVisualizar ? 'visibility: visible' : 'visibility: hidden'"
      >Visualizado</p>
    </div>

    <v-card-actions style="width: 100%; background-color: rgb(45,45,45)">
      <v-textarea
          rows="1"
          no-resize
          :id="'text' + $props.indice"
          solo
          :disabled="loading"
          :loading="loading"
          color="#ff4a3b"
          dense
          v-model="mensagem"
          label="Escreva sua mensagem..."
          append-icon="mdi-send"
          v-on:keydown.enter.prevent="sendMessage"
          @click="visualizar"
          @click:append="sendMessage"
      ></v-textarea>
    </v-card-actions>
  </v-card>
</template>

<script>
import {carregarMensagens} from "@/plugins/axios";

export default {
  name: "ChatComponent",
  data: () => ({
    mensagem: '',
    loading: false,
    chatHeight: 0,
    scroll: {
      loading: false,
      pagina: 1,
      limite: 10,
      final: false
    }
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
    },
    getMsgRegistro(stringDate){
      let data = new Date(parseInt(stringDate));
      let d = data.getDate();
      let m = data.getMonth()
      let a = data.getFullYear();
      let h = data.getHours();
      let mi = data.getMinutes();

      if(d < 10){
        d = '0' + d;
      }
      if(m < 10){
        m = '0' + m;
      }
      if(h < 10){
        h = '0' + h;
      }
      if(mi < 10){
        mi = '0' + mi;
      }

      return d + '/' + m + '/' + a + ' às ' + h + 'h' + mi;
    },
    visualizar(){
      if(this.$props.mensagens.length > 0){
        if(this.$props.mensagens[this.$props.mensagens.length - 1].autor._id !== this.$store.state.auth.user._id){
          let user = null;
          for(let i = 0; i < this.$props.participantes.length; i++){
            if(this.$props.participantes[i]._id !== this.$store.state.auth.user._id){
              user = this.$props.participantes[i]._id;
            }
          }
          this.$socket.emit('visualizarMsg', {idConversa: this.$props.id, idUser: user});
        }
      }
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
    let chat = document.getElementById('chatMaster' + this.$props.indice);
    chat.scrollTo(0, chat.scrollHeight);
    this.chatHeight = chat.scrollHeight;

    chat.addEventListener('scroll', () => {
      if(chat.scrollTop === 0 && !this.scroll.loading && !this.scroll.final) {
        this.scroll.loading = true;
        this.scroll.pagina = this.scroll.pagina + 1;
        carregarMensagens(this.$props.id, this.scroll.pagina, this.scroll.limite).then((value) => {
          this.scroll.loading = false;
          if(value.data.mensagens.length > 0){
            for(let i = 0; i < value.data.mensagens.length; i++){
              let el = document.createElement('div');
              if(value.data.mensagens[i].autor._id === this.$store.state.auth.user._id){
                el.setAttribute("style", "display: flex;padding: 10px;justify-content: flex-end;");
                el.innerHTML = `
                    <div style="max-width: 80%; box-shadow: 0 0 20px 5px rgba(0,0,0,.05);">
                      <div style="word-wrap: break-word;padding: 7px;border-radius: 15px;background-color: #ff4a3b;text-align: left" title="Enviada em ${this.getMsgRegistro(value.data.mensagens[i].registro)}">
                        ${value.data.mensagens[i].texto}
                      </div>
                    </div>
                 `;
              }else{
                el.setAttribute('style', 'display: flex;padding: 10px;justify-content: flex-start;');
                el.innerHTML = `
                  <div style="max-width: 80%; box-shadow: 0 0 20px 5px rgba(0,0,0,.05);">
                    <div style="word-wrap: break-word;padding: 7px;border-radius: 15px;background-color: #7c7c7c;text-align: left" title="Enviada em ${this.getMsgRegistro(value.data.mensagens[i].registro)}">
                      ${value.data.mensagens[i].texto}
                    </div>
                  </div>
                `;
              }
              let chat = document.getElementById('chat' + this.$props.indice);
              chat.prepend(el);
            }
          }else{
            this.scroll.pagina = this.scroll.pagina - 1;
            this.scroll.final = true;
          }
        });
      }
    });
  },
  sockets: {
    frontNewMensagem: function(data){
      if(this.$props.id === data.idConversa){
        let el = document.createElement('div');
        let text = document.getElementById('text' + this.$props.indice);
        if(data.mensagem.autor._id === this.$store.state.auth.user._id){
          el.setAttribute("style", "display: flex;padding: 10px;justify-content: flex-end;");
          el.innerHTML = `
          <div style="max-width: 80%; box-shadow: 0 0 20px 5px rgba(0,0,0,.05);">
            <div style="word-wrap: break-word;padding: 7px;border-radius: 15px;background-color: #ff4a3b;text-align: left" title="Enviada em ${this.getMsgRegistro(data.mensagem.registro)}">
              ${data.mensagem.texto}
            </div>
          </div>
        `;
        }else {
          el.setAttribute('style', 'display: flex;padding: 10px;justify-content: flex-start;');
          el.innerHTML = `
          <div style="max-width: 80%; box-shadow: 0 0 20px 5px rgba(0,0,0,.05);">
            <div style="word-wrap: break-word;padding: 7px;border-radius: 15px;background-color: #7c7c7c;text-align: left" title="Enviada em ${this.getMsgRegistro(data.mensagem.registro)}">
              ${data.mensagem.texto}
            </div>
          </div>
        `;
          text === document.activeElement ? this.$emit('playMsg') : false;
        }

        let chat = document.getElementById('chat' + this.$props.indice);
        let chatMaster = document.getElementById('chatMaster' + this.$props.indice);

        chat.appendChild(el);
        chatMaster.scrollTop = chatMaster.scrollHeight - chatMaster.clientHeight;
        text === document.activeElement ? this.visualizar() : false;
      }
    },
    mensagemVista: function(){
      this.$emit('mensagemVista');
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
    },
    isOnline(){
      for(let i = 0; i < this.$props.participantes.length; i++){
        if(this.$props.participantes[i]._id !== this.$store.state.auth.user._id){
          for(let j = 0; j < this.$store.state.auth.user.amigos.length; j++){
            if(this.$props.participantes[i]._id === this.$store.state.auth.user.amigos[j]._id){
              return this.$store.state.auth.user.amigos[j].online;
            }
          }
        }
      }
      return false;
    },
    showVisualizar(){
      if(this.$props.mensagens.length > 0){
        return (this.$store.state.auth.user._id === this.$props.mensagens[this.$props.mensagens.length - 1].autor._id && this.$props.mensagens[this.$props.mensagens.length - 1].visto);
      }
      return false;
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
  text-align: left;
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

.text-see {
  font-size: 12px;
  color: #dddddd;
  text-align: right;
  margin: -5px 10px 4px 2px;
}
</style>