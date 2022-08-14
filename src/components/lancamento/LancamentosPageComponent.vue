<template>
  <v-container fill-height fluid>
    <v-layout align-center style="background-color: rgba(30,30,30,.85); margin-top: 50px">
      <div class="sizer">
        <h1 style="float: left; color: #FFFFFF;">Lançamentos</h1>
        <router-view/>
        <v-card dark style="margin-top: 20px">
          <v-pagination @input="paginationNavigation()" color="red" v-model="paginaAtual" :length="paginator.totalPaginas" total-visible="7"></v-pagination>
        </v-card>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
import {listarLancamentos} from "@/plugins/axios";
import {mapActions} from "vuex";

export default {
  name: "LancamentosPageComponent",
  data: () => ({
    paginator: {
      totalLancamentos: 0,
      limit: 10,
      totalPaginas: 0,
      paginaAtual: 1,
      slNo: 1,
      temAnterior: false,
      temProximo: false,
      anterior: null,
      proximo: null
    },
    paginaAtual: 1
  }),
  methods: {
    ...mapActions('episodio', ['ActionSetLancamentos']),
    loadPage(){
      listarLancamentos(this.paginaAtual).then((value) => {
        if(value){
          this.ActionSetLancamentos(value.data.lancamentos);
          this.paginator = value.data.paginator;
        }
      });
    },
    async paginationNavigation(){
      if(this.paginaAtual !== parseInt(this.$route.params.pagina)){
        await this.$router.push({name: 'Lançamentos', params: {pagina: this.paginaAtual.toString()}});
      }
    }
  },
  watch: {
    paginaAtual: {
      handler: async function(){
        this.loadPage();
      }
    }
  },
  mounted() {
    if(this.paginaAtual === parseInt(this.$route.params.pagina)){
      this.loadPage();
    }else{
      this.paginaAtual = parseInt(this.$route.params.pagina);
    }
  }
}
</script>

<style scoped>
.lancamentos, .sizer {
  width: 100%;
}

.lancamentos {
  margin: auto;
}

.sizer {
  padding: 20px;
}
</style>