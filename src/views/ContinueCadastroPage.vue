<template>
  <v-app id="inspire">
    <v-main>
      <v-container fluid fill-height>
        <v-layout justify-center align-center dark>
          <v-flex xs12 sm8 md4>
            <v-stepper alt-labels dark color="red" v-model="step">
              <v-stepper-header>
                <v-stepper-step step="1" color="red" :complete="step > 1">Info. pessoais</v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step step="2" color="red" :complete="step > 2">Info. públicas</v-stepper-step>
              </v-stepper-header>
            </v-stepper>
            <v-card dark class="elevation-12 form-login" style="opacity: 70%">
              <v-toolbar dark>
                <v-toolbar-title>Continue seu cadastro, falta pouco</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <div v-show="step === 1">
                  <v-form @submit.prevent>
                    <v-text-field
                        prepend-icon="mdi-account"
                        name="nick"
                        v-model="dados.apelido"
                        persistent-hint
                        hint="Isto será exibido próximo ao seu nome para quem acessar seu perfil."
                        label="Apelido"
                        type="text"
                        color="red"
                        v-on:keyup.enter="alert('teste')"
                    ></v-text-field>
                    <v-menu
                        ref="menuNascimento"
                        v-model="nascimento.menu"
                        :close-on-content-click="false"
                        :return-value.sync="nascimento.dado"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                      <template v-slot:activator="{on, attrs}">
                        <v-text-field
                            style="margin-top: 10px"
                            prepend-icon="mdi-calendar"
                            name="born"
                            v-model="getNascimentoLabel"
                            label="Data de nascimento"
                            readonly
                            v-on="on"
                            v-bind="attrs"
                            color="red"
                            v-on:keyup.enter="alert('teste')"
                            @click="nascimento.dado = nascimento.max"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                          v-model="nascimento.dado"
                          no-title
                          scrollable
                          color="red"
                          locale="pt-br"
                          :max="nascimento.max"
                      >
                        <v-spacer/>
                        <v-btn text color="red" @click="nascimento.menu = false">Cancelar</v-btn>
                        <v-btn text color="red" @click="saveDate">Ok</v-btn>
                      </v-date-picker>
                    </v-menu>
                    <v-select
                        label="Orientação sexual"
                        v-model="dados.orientationSex"
                        :items="oSexual"
                        item-value="id"
                        item-text="label"
                        :prepend-icon="iconeOSex"
                        color="red"
                        item-color="red"
                    ></v-select>
                    <v-select
                        label="Pronome de gênero"
                        v-model="dados.pronome"
                        :items="pronomes"
                        item-value="id"
                        item-text="label"
                        prepend-icon="mdi-account-details"
                        color="red"
                        item-color="red"
                    ></v-select>
                  </v-form>
                </div>
                <div v-show="step === 2">
                  <v-form @submit.prevent>
                    <img style="width: 200px" v-show="img" id="img" src="" alt=""/>
                    <v-file-input style="cursor: pointer" :rules="rules"
                                  hint="Formatos permitidos: JPEG, GIF e PNG" persistent-hint
                                  prepend-icon="mdi-image"
                                  v-model="img"
                                  :disabled="imgLoading"
                                  @change="imgPreview()"
                                  dense label="Selecione uma foto para o perfil..."
                                  show-size truncate-length="18"
                                  @click:clear="clearImg()"
                                  accept="image/png, image/jpeg, image/gif"></v-file-input>
                    <v-textarea style="margin-top: 15px" label="Escreva uma biografia..." rows="2" v-model="dados.biografia"
                                prepend-icon="mdi-account-details" dense auto-grow counter="500"></v-textarea>
                    <v-select
                        v-if="estados.length > 0"
                        :loading="estadoLoading"
                        label="Informe sua localização"
                        v-model="dados.estado"
                        :items="estados"
                        item-value="id"
                        item-text="nome"
                        prepend-icon="mdi-map-marker"
                        color="red"
                        item-color="red"
                        @change="carregarCidades"
                    ></v-select>
                    <v-select
                        v-if="cidades.length > 0"
                        label="Selecione seu município"
                        v-model="dados.cidade"
                        :items="cidades"
                        item-value="id"
                        item-text="nome"
                        prepend-icon="mdi-map-marker"
                        color="red"
                        item-color="red"
                    ></v-select>
                  </v-form>
                </div>
                <p v-show="erro !== ''" style="color: red; text-align: center; font-weight: bold">{{ erro }}</p>
              </v-card-text>
              <v-card-actions>
                <v-spacer/>
                <v-btn :disabled="loading" dark v-show="step > 1" @click="step = step - 1">Voltar</v-btn>
                <v-btn :disabled="loading" dark color="grey" @click="pular">Pular</v-btn>
                <v-btn :loading="loading" dark color="red" @click="next">Confirmar</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import {uploadImg} from "@/plugins/axiosUploads";
import {continuarCadastro} from "@/plugins/axios";
import {getEstados, getCidadesPorEstado} from "@/plugins/axiosApiLocalidade";

export default {
  name: "ContinueCadastroPage",
  data: () => ({
    dados: {
      apelido: '',
      nascimento: null,
      orientationSex: 0,
      pronome: 0,
      biografia: '',
      foto: null,
      estado: null,
      cidade: null
    },
    nascimento: {
      max: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substring(0, 10),
      menu: false,
      dado: null
    },
    oSexual: [
      {id: 1, label: 'assexual'},
      {id: 2, label: 'bissexual'},
      {id: 3, label: 'heterossexual'},
      {id: 4, label: 'homossexual'},
      {id: 5, label: 'pansexual'},
      {id: 6, label: 'não quero informar'}
    ],
    iconeOSex: 'mdi-gender-male',
    timer: null,
    pronomes: [
      {id: 1, label: 'ele/dele'},
      {id: 2, label: 'ela/dela'},
      {id: 3, label: 'elu/delu'},
      {id: 4, label: 'ile/dile'},
      {id: 5, label: 'não quero informar'}
    ],
    step: 1,
    img: null,
    imgLoading: false,
    rules: [
      value => !value || value.size < 4000000 || 'O tamanho da imagem precisa ser menor que 4 MB!',
    ],
    page1: false,
    page2: false,
    erro: '',
    loading: false,
    estados: [],
    cidades: [],
    estadoLoading: false
  }),
  computed: {
    getNascimentoLabel(){
      if(this.nascimento.dado){
        let data = this.nascimento.dado.split('-');
        return data[2] + '/' + data[1] + '/' + data[0];
      }
      return ''
    }
  },
  mounted() {
    let data = this.nascimento.max.split('-');
    this.nascimento.max = (data[0] - 5) + '-' + data[1] + '-' + data[2];

    this.timer = setInterval(() => {
      if(this.iconeOSex === 'mdi-gender-male'){
        this.iconeOSex = 'mdi-gender-female';
      }else if(this.iconeOSex === 'mdi-gender-female'){
        this.iconeOSex = 'mdi-gender-male-female';
      }else if(this.iconeOSex === 'mdi-gender-male-female'){
        this.iconeOSex = 'mdi-gender-male-female-variant';
      }else if(this.iconeOSex === 'mdi-gender-male-female-variant'){
        this.iconeOSex = 'mdi-gender-non-binary';
      }else if(this.iconeOSex === 'mdi-gender-non-binary'){
        this.iconeOSex = 'mdi-gender-transgender';
      }else{
        this.iconeOSex = 'mdi-gender-male'
      }
    }, 2000);
    getEstados().then((value) => {
      if(value.data){
        this.estados = value.data;
      }
    });
  },
  methods: {
    saveDate(){
      this.$refs.menuNascimento.save(this.nascimento.dado);
      this.dados.nascimento = this.nascimento.dado;
    },
    imgPreview(){
      let idImg = document.getElementById('img');
      let leitor = new FileReader();
      leitor.onload = function (ev) {
        idImg.src = ev.target.result;
      }
      if(this.img){
        leitor.readAsDataURL(this.img);
      }
    },
    clearImg(){
      let idImg = document.getElementById('img');
      idImg.src = '';
    },
    uploadImage(){
      if(this.img){
        uploadImg(this.$store.state.auth.user._id, this.img, 1).then((value) => {
          if(value.data.upload){
            this.dados.foto = value.data.nomeArquivo;
            this.atualizar();
          }else{
            this.erro = value.data.msg;
          }
        });
      }else{
        this.atualizar();
      }
    },
    next(){
      this.step === 1 ? this.page1 = true : false;
      this.step === 2 ? this.page2 = true : false;
      if(this.step === 2){
        this.loading = true;
        this.uploadImage();
      }else{
        this.step = this.step + 1;
      }
    },
    async atualizar(){
      if(!this.page1){
        this.dados.apelido = '';
        this.dados.nascimento = null;
        this.dados.orientationSex = 0;
        this.dados.pronome = 0;
      }
      if(!this.page2){
        this.img = null;
        this.dados.biografia = '';
      }

      if(this.dados.nascimento){
        this.dados.nascimento = new Date(this.dados.nascimento + ' 12:00:00');
      }
      await continuarCadastro(this.dados).then((value) => {
        this.loading = false;
        if(value.data.atualizar){
          this.$router.replace('/');
        }
      });
    },
    pular(){
      if(this.step === 2){
        if(this.page1 || this.page2){
          this.uploadImage();
        }else{
          this.$router.replace('/');
        }
      }else if(this.step === 1){
        this.step = 2;
      }
    },
    carregarCidades(){
      this.estadoLoading = true;
      this.cidades = [];
      getCidadesPorEstado(this.dados.estado).then((value) => {
        if(value.data){
          this.estadoLoading = false;
          this.cidades = value.data;
        }
      });
    }
  },
}
</script>

<style scoped>

</style>