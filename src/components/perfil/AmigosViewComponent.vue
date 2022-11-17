<template>
  <div class="amigos-view">
    <v-card dark rounded>
      <v-card-title>
        <v-form style="width: 30%; float: right">
          <v-text-field @keyup="search" single-line label="Pesquisar amigo" append-icon="mdi-magnify" v-model="searchWord"></v-text-field>
        </v-form>
      </v-card-title>
      <v-card-text class="d-flex flex-wrap" v-if="searchResult.length > 0">
        <div class="amigo" v-for="(amigo, i) in this.searchResult" :key="i">
          <img src="/img/users/default.jpg" alt=""/>
          <span>{{amigo.nome}}</span>
          <v-spacer></v-spacer>
          <v-menu offset-x left> <!-- TODO implementar um sistema de pesquisa local e paginação -->
            <template v-slot:activator="{on, attrs}">
              <v-btn icon v-on="on" v-bind="attrs"><v-icon>mdi-dots-vertical</v-icon></v-btn>
            </template>
            <v-list dark>
              <v-list-item @click="desfazer(amigo._id)">
                <v-list-item-title>Desfazer amizade</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Abrir conversa</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-card-text>
      <v-card-text class="d-flex flex-wrap" v-else>
        <div class="amigo" v-for="(amigo, i) in getAmigosPerPage" :key="i">
          <img src="/img/users/default.jpg" alt=""/>
          <span>{{amigo.nome}}</span>
          <v-spacer></v-spacer>
          <v-menu offset-x left>
            <template v-slot:activator="{on, attrs}">
              <v-btn icon v-on="on" v-bind="attrs"><v-icon>mdi-dots-vertical</v-icon></v-btn>
            </template>
            <v-list dark>
              <v-list-item @click="desfazer(amigo._id)">
                <v-list-item-title>Desfazer amizade</v-list-item-title>
              </v-list-item> <!-- TODO terminar de implementar as opçãoes de menu, em seguida fazer correções no menu no bar principal -->
              <v-list-item>
                <v-list-item-title>Abrir conversa</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-card-text>
    </v-card>
    <v-card dark style="margin-top: 20px; background-color: rgba(30,30,30,.05)">
      <v-pagination color="red" v-model="paginator.pagina" :length="Math.ceil(this.$store.state.auth.user.amigos.length / paginator.limite)" total-visible="7"></v-pagination>
    </v-card>
  </div>
</template>

<script>
import {desfazerAmizade} from "@/plugins/axios";

export default {
  name: "AmigosViewComponent",
  methods: {
    search(){
      if(this.searchWord.length >= 3){
        let word = this.searchWord.toLocaleLowerCase();
        this.searchResult = this.$store.state.auth.user.amigos.filter(amigo => amigo.nome.toLocaleLowerCase().indexOf(word) >= 0);
      }else{
        this.searchResult = [];
      }
    },
    desfazer(id){
      desfazerAmizade(id).then((value) => {
        if(value.data.desfazer){
          for(let i = 0; i < this.$store.state.auth.user.amigos.length; i++){
            if(this.$store.state.auth.user.amigos[i]._id === id){
              this.$store.state.auth.user.amigos.splice(i, 1);
            }
          }
        }
      });
    }
  },
  data: () => ({
    searchWord: '',
    searchResult: [],
    paginator: {
      pagina: 1,
      limite: 10
    }
  }),
  computed: {
    getAmigosPerPage(){
      return this.$store.state.auth.user.amigos.slice((this.paginator.pagina - 1) * this.paginator.limite, this.paginator.pagina * this.paginator.limite);
    }
  }
}
</script>

<style scoped>
.amigo {
  width: 50%;
  padding: 10px 15px;
  text-align: left;
  display: flex;
  align-items: center;
  flex-direction: row;
  border-radius: 50px;
  transition: 300ms;
  cursor: pointer;
}

.amigo:hover {
  background-color: #b22c21;
}

.amigo img {
  width: 20%;
  border-radius: 50%;
}

.amigo span {
  font-size: 16px;
  margin-left: 3px;
  font-weight: bold;
}
</style>