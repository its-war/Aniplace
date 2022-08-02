<template>
  <v-app id="inspire">
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center dark>
          <v-flex xs12 sm8 md4>
            <v-card dark class="elevation-12 form-login">
              <v-toolbar dark>
                <v-toolbar-title>AniPlace — Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent="login()">
                  <v-text-field
                      prepend-icon="mdi-account"
                      name="username"
                      v-model="usuario"
                      label="Usuário"
                      type="text"
                      v-on:keyup.enter="login()"
                  ></v-text-field>
                  <v-text-field
                      dark
                      id="password"
                      name="password"
                      prepend-icon="mdi-lock"
                      :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                      v-model="senha"
                      label="Senha"
                      :type="passwordShow ? 'text' : 'password'"
                      counter
                      v-on:keyup.enter="login()"
                      @click:append="passwordShow = !passwordShow"
                  ></v-text-field>
                  <span class="esqueceu">Esqueceu sua senha?</span>

                  <v-checkbox v-model="lembrar" label="Lembrar de mim." dark color="red"
                              @click="snackbar = lembrar"></v-checkbox>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :disabled="snackbar" :loading="this.$store.state.auth.loading" dark @click="login()">Entrar <v-icon>mdi-login</v-icon></v-btn>
              </v-card-actions>
              <v-card-text>
                <p class="noaccount">Não possui uma conta? <span @click="nav()">Cadastre-se</span> agora mesmo.</p>
              </v-card-text>
            </v-card>
            <v-snackbar light v-model="this.$store.state.auth.loginErr" timeout="-1">
              {{this.$store.state.auth.loginMsg}}
              <v-btn color="red" text @click="closeLoginErr()">
                OK <v-icon>mdi-check</v-icon>
              </v-btn>
            </v-snackbar>

            <v-snackbar light v-model="snackbar" timeout="10000">
              Se marcado, sua sessão em Aniplace terá duração de uma semana.
              <v-btn color="red" text @click="snackbar = false">
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
import { mapActions } from 'vuex';

export default {
name: "LoginPage",
  data: () => ({
    snackbar: false,
    usuario: "",
    senha: "",
    lembrar: false,
    passwordShow: false
  }),
  methods: {
    ...mapActions('auth', ['ActionLogin']),
    ...mapActions('auth', ['ActionKillSession']),
    ...mapActions('auth', ['ActionSetLoginErr']),
    login(){
      this.ActionLogin({usuario: this.usuario, senha: this.senha, lembrar: this.lembrar});
    },
    nav(){
      this.ActionKillSession();
      this.$router.push('/cadastro');
    },
    closeLoginErr(){
      this.ActionSetLoginErr(false);
    }
  },
  computed: {
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

.noaccount span, .esqueceu {
  cursor: pointer;
  transition: 300ms;
  color: #FFFFFF;
}

.noaccount span:hover, .esqueceu:hover {
  color: #FFFFFF69;
}

.esqueceu {
  float: right;
}
</style>