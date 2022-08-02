<template>
  <v-container fill-height fluid>
    <v-layout align-center style="background-color: rgba(30,30,30,.85); margin-top: 50px">
      <div class="sizer">
        <h1 style="float: left; color: #FFFFFF;">Lançamentos</h1>
        <div class="lancamentos d-flex flex-wrap">
          <LancamentoBox id="hjyj4ty864j65d4th8y4jhy" nome="Aquele anime lá" :temporada="1" :numero="1" thumb="wallhaven-pkj7gm.png"/>
          <LancamentoBox id="hjyj4ty864j65d4th8y4jhy" nome="Aquele anime lá" :temporada="1" :numero="1" thumb="wallhaven-pkj7gm.png"/>
          <LancamentoBox id="hjyj4ty864j65d4th8y4jhy" nome="Aquele anime lá" :temporada="1" :numero="1" thumb="wallhaven-pkj7gm.png"/>
          <LancamentoBox id="hjyj4ty864j65d4th8y4jhy" nome="Aquele anime lá, lembra não?" :temporada="1" :numero="1" thumb="wallhaven-pkj7gm.png"/>
          <LancamentoBox id="hjyj4ty864j65d4th8y4jhy" nome="Aquele anime lá" :temporada="1" :numero="1" thumb="wallhaven-pkj7gm.png"/>
          <LancamentoBox id="hjyj4ty864j65d4th8y4jhy" nome="Aquele anime lá" :temporada="1" :numero="1" thumb="wallhaven-pkj7gm.png"/>
          <LancamentoBox id="hjyj4ty864j65d4th8y4jhy" nome="Aquele anime lá" :temporada="1" :numero="1" thumb="wallhaven-pkj7gm.png"/>
          <LancamentoBox id="hjyj4ty864j65d4th8y4jhy" nome="Aquele anime lá" :temporada="1" :numero="1" thumb="wallhaven-pkj7gm.png"/>
          <LancamentoBox id="hjyj4ty864j65d4th8y4jhy" nome="Aquele anime lá" :temporada="1" :numero="1" thumb="wallhaven-pkj7gm.png"/>
          <LancamentoBox id="hjyj4ty864j65d4th8y4jhy" nome="Aquele anime lá" :temporada="1" :numero="1" thumb="wallhaven-pkj7gm.png"/>
          <LancamentoBox id="hjyj4ty864j65d4th8y4jhy" nome="Aquele anime lá" :temporada="1" :numero="1" thumb="wallhaven-pkj7gm.png"/>
          <LancamentoBox id="hjyj4ty864j65d4th8y4jhy" nome="Aquele anime lá" :temporada="1" :numero="1" thumb="wallhaven-pkj7gm.png"/>
          <LancamentoBox id="hjyj4ty864j65d4th8y4jhy" nome="Aquele anime lá" :temporada="1" :numero="1" thumb="wallhaven-pkj7gm.png"/>
          <LancamentoBox id="hjyj4ty864j65d4th8y4jhy" nome="Aquele anime lá" :temporada="1" :numero="1" thumb="wallhaven-pkj7gm.png"/>
          <LancamentoBox id="hjyj4ty864j65d4th8y4jhy" nome="Aquele anime lá" :temporada="1" :numero="1" thumb="wallhaven-pkj7gm.png"/>
        </div>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
import LancamentoBox from "@/components/lancamento/LancamentoBox";
export default {
  name: "LancamentosPageComponent",
  components: {LancamentoBox}

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