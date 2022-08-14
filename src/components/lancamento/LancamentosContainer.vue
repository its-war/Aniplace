<template>
  <div class="lancamentos d-flex flex-wrap">
    <LancamentoBox v-for="(lancamento, i) in this.$store.state.episodio.lancamentos" :key="i"
        :id="lancamento.anime._id"
        :nome="lancamento.anime.nome"
        :temporada="lancamento.temporada"
        :numero="lancamento.numero"
        :thumb="lancamento.thumb"/>
  </div>
</template>

<script>
import LancamentoBox from "@/components/lancamento/LancamentoBox";
export default {
  name: "LancamentosContainer",
  components: {LancamentoBox}
}
</script>

<style scoped>

</style>