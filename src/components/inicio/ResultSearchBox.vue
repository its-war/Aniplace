<template>
  <div class="result-search-box" @click="animePage()">
    <div class="esquerda">
      <img :src="'/img/anime/' + this.$props.foto" alt=""/>
    </div>
    <div class="direita">
      <div class="topCenter">
        {{this.$props.nome}}
      </div>
      <div class="bottom">
        <div class="bottomLeft">{{this.$props.ano}}</div>
        <div class="bottomRight">
          <span v-for="(genero, i) in this.$props.generos" :key="i">
            <span v-if="i < 2">{{genero.nome}}<span v-if="i === 0">, </span></span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResultSearchBox",
  props: {
    id: {
      type: String,
      required: true
    },
    nome: {
      type: String,
      required: true
    },
    foto: {
      type: String,
      required: true
    },
    ano: {
      type: Number,
      required: true
    },
    generos: {
      type: Array,
      required: true
    }
  },
  methods: {
    animePage(){
      this.$router.push({name: 'Anime', params: {id: this.$props.id}});
    }
  }
}
</script>

<style scoped>
.result-search-box {
  width: 100%;
  height: 110px;
  margin-bottom: 15px;
  cursor: pointer;
  transition: 200ms;
}

.result-search-box:hover {
  background-color: #8d8d8d;
}

.esquerda {
  float: left;
  width: 29%;
}

.direita {
  float: right;
  width: 68%;
  height: 100%;
}

.esquerda img {
  width: 80px;
  height: 110px;
}

.topCenter {
  float: top;
  height: 80%;
  font-size: 15px;
}

.bottom {
  float: bottom;
}

.bottomLeft {
  float: left;
}

.bottomRight {
  float: right;
  margin-right: 10px;
  font-size: 15px;
}
</style>