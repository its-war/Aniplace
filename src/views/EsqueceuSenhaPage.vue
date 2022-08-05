<template>
  <v-app id="inspire">
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center dark>
          <v-flex xs12 sm8 md4>
            <v-card dark class="elevation-12 form-login">
              <v-toolbar dark>
                <v-toolbar-title>AniPlace — Esqueceu sua senha?</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <p>Informe seus dados.</p>
                <v-form @submit.prevent="esqueceu()">
                  <v-text-field
                      prepend-icon="mdi-account"
                      name="username"
                      v-model="usuario"
                      label="Usuário"
                      :rules="usuarioRules"
                      type="text"
                      v-on:keyup.enter="esqueceu()"
                  ></v-text-field>
                  <v-text-field
                      prepend-icon="mdi-email"
                      name="email"
                      v-model="email"
                      label="E-Mail"
                      :rules="emailRules"
                      type="email"
                      v-on:keyup.enter="esqueceu()"
                  ></v-text-field>
                  <v-text-field
                      id="password"
                      name="password"
                      counter
                      prepend-icon="mdi-lock"
                      :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                      v-model="senha"
                      label="Nova Senha"
                      :rules="senhaRules"
                      persistent-hint
                      hint="Mínimo de 8 dígitos"
                      :type="passwordShow ? 'text' : 'password'"
                      v-on:keyup.enter="esqueceu()"
                      @click:append="passwordShow = !passwordShow"
                  ></v-text-field>
                  <v-text-field
                      id="passwordRepeat"
                      counter
                      prepend-icon="mdi-lock-reset"
                      :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                      v-model="senhaRepetir"
                      label="Repita sua Nova Senha"
                      :rules="senhaRules"
                      :type="passwordShow ? 'text' : 'password'"
                      v-on:keyup.enter="esqueceu()"
                      @click:append="passwordShow = !passwordShow"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn text color="primary" @click="backLogin()"><v-icon>mdi-close</v-icon> Cancelar</v-btn>
                <v-spacer></v-spacer>
                <v-btn :loading="this.$store.state.auth.loading" dark @click="esqueceu()">Confirmar <v-icon>mdi-check</v-icon></v-btn>
              </v-card-actions>
            </v-card>

            <v-snackbar light v-model="this.$store.state.auth.loginErr" timeout="-1">
              {{this.$store.state.auth.loginMsg}}
              <v-btn color="red" text @click="closeSnackbar()">
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
  name: "EsqueceuSenha",
  data: () => ({
    usuario: '',
    email: '',
    senha: "",
    senhaRepetir: "",
    passwordShow: false,
    emailRules: [
      value => !!value || 'E-mail precisa ser preenchido.',
      value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'E-mail inválido.'
      }
    ],
    usuarioRules: [
        value => !!value || 'Nome de usuário precisa ser preenchido.'
    ],
    senhaRules: [
        value => !!value || 'Senha precisa ser preenchida.',
        value => (value || '').length >= 8 || 'Senha precisa ter pelo menos 8 dígitos.'
    ]
  }),
  methods: {
    ...mapActions('auth', ['ActionEsqueceuSenha']),
    ...mapActions('auth', ['ActionSetLoginErr']),
    async esqueceu(){
      await this.ActionEsqueceuSenha({
        usuario: this.usuario,
        email: this.email,
        senha: this.senha,
        senhaRepetida: this.senhaRepetir
      });
      this.resetForm();
    },
    backLogin(){
      this.$router.push({name: 'Login'});
    },
    closeSnackbar(){
      this.ActionSetLoginErr(false);
    },
    resetForm(){
      this.email = "";
      this.usuario = "";
      this.senha = "";
      this.senhaRepetir = "";
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
</style>