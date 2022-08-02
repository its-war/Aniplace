<template>
  <v-app id="inspire">
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center dark>
          <v-flex xs12 sm8 md4>
            <v-card dark class="elevation-12 form-login">
              <v-toolbar dark>
                <v-toolbar-title>AniPlace — Ativação de conta</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <p class="noaccount">
                  Sua conta foi ativada com sucesso. <span @click="nav()">Clique aqui</span> para fazer login.
                </p>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "AtivadoPage",
  methods: {
    ...mapActions('auth', ['ActionKillSession']),
    nav(){
      this.ActionKillSession();
      this.$router.push('/login');
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

.noaccount span {
  cursor: pointer;
  transition: 300ms;
  color: #FFFFFF;
}

.noaccount span:hover {
  color: #FFFFFF69;
}
</style>