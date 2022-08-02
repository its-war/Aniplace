<template>
  <v-app id="inspire">
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center dark>
          <v-flex xs12 sm8 md4>
            <v-card dark class="elevation-12 form-login">
              <v-toolbar dark>
                <v-toolbar-title>AniPlace — Cadastro</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent="cadastrar()">
                  <v-text-field
                      prepend-icon="mdi-account"
                      name="name"
                      v-model="nome"
                      persistent-hint
                      hint="Aviso: nomes suspeitos estarão sujeitos a analise"
                      label="Nome"
                      type="text"
                      v-on:keyup.enter="cadastrar()"
                  ></v-text-field>
                  <v-text-field
                      prepend-icon="mdi-email"
                      name="email"
                      v-model="email"
                      persistent-hint
                      hint="Permitido apenas e-mails do Google, Microsoft e Apple"
                      label="E-Mail"
                      type="email"
                      v-on:keyup.enter="cadastrar()"
                  ></v-text-field>
                  <v-text-field
                      prepend-icon="mdi-at"
                      name="username"
                      v-model="usuario"
                      label="Usuário"
                      hint="Pontos e subtraços são permitidos"
                      persistent-hint
                      type="text"
                      v-on:keyup.enter="cadastrar()"
                  ></v-text-field>
                  <v-text-field
                      id="password"
                      name="password"
                      counter
                      prepend-icon="mdi-lock"
                      :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                      v-model="senha"
                      label="Senha"
                      persistent-hint
                      hint="Mínimo de 8 dígitos"
                      :type="passwordShow ? 'text' : 'password'"
                      v-on:keyup.enter="cadastrar()"
                      @click:append="passwordShow = !passwordShow"
                  ></v-text-field>
                  <v-text-field
                      id="passwordRepeat"
                      counter
                      prepend-icon="mdi-lock-reset"
                      :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                      v-model="senhaRepetir"
                      label="Repita sua Senha"
                      :type="passwordShow ? 'text' : 'password'"
                      v-on:keyup.enter="cadastrar()"
                      @click:append="passwordShow = !passwordShow"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :loading="this.$store.state.auth.loading" dark @click="cadastrar()">Cadastrar <v-icon>mdi-account-plus</v-icon></v-btn>
              </v-card-actions>
              <v-card-text>
                <p class="noaccount">Já possui uma conta? <span @click="nav()">Faça Login</span> agora mesmo.</p>
              </v-card-text>
            </v-card>

            <v-snackbar multi-line light timeout="-1" v-model="this.$store.state.auth.cadastroErr">
              {{this.$store.state.auth.cadastroMsg}}
              <v-btn color="red" text @click="closeCadastroErr()">
                OK <v-icon>mdi-check</v-icon>
              </v-btn>
            </v-snackbar>

          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "CadastroPage",
  data: () => ({
    nome: "",
    email: "",
    usuario: "",
    senha: "",
    senhaRepetir: "",
    passwordShow: false
  }),
  methods: {
    ...mapActions('auth', ['ActionKillSession']),
    ...mapActions('auth', ['ActionCadastro']),
    ...mapActions('auth', ['ActionSetCadastroErr']),
    async cadastrar(){
      if(await this.ActionCadastro({
        nome: this.nome,
        email: this.email,
        nomeusuario: this.usuario,
        senha: this.senha,
        senharepetida: this.senhaRepetir
      })){
        this.resetForm();
      }
    },
    nav(){
      this.ActionKillSession();
      this.$router.push('/login');
    },
    resetForm(){
      this.nome = "";
      this.email = "";
      this.usuario = "";
      this.senha = "";
      this.senhaRepetir = "";
    },
    closeCadastroErr(){
      this.ActionSetCadastroErr(false);
    }
  }
}
</script>

<style scoped>
#inspire {
  background-image: url(https://i.imgur.com/zBVQoFx.jpeg);
  background-attachment: fixed;
  background-size: cover;
}

.form-login {
  opacity: 65%;
}

.login-err {
  color: #FF0000;
  margin-bottom: 0;
}

.login-err span {
  margin-left: 4px;
}

.noaccount span {
  cursor: pointer;
  transition: 300ms;
  color: #FFFFFF;
}

.noaccount span:hover {
  color: #FFFFFF69;
}
</style>