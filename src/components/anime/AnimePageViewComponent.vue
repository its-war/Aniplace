<template>
  <v-container fill-height fluid>
    <div class="anime-cover" :style="displayCover"></div>
    <div class="anime-cover-sheet" :style="this.$vuetify.breakpoint.name === 'xs' ? 'display: none' : ''"></div>
    <div class="anime" :style="this.$vuetify.breakpoint.name === 'xs' ? 'margin-top: 0 !important' : ''">
      <div class="anime-foto" :style="animeFotoStyle">
        <div class="img-animation" id="img">
          <img :style="this.$vuetify.breakpoint.name === 'xs' ? 'width: 100% !important' : ''" :src="'/img/anime/' + anime.foto" alt="Foto do Anime"/>
        </div>
      </div>
      <div class="anime-info" :style="this.$vuetify.breakpoint.name === 'xs' ? 'float: none; width: 100%' : ''">
        <h1 :style="this.$vuetify.breakpoint.name === 'xs' ? 'font-size: 20px' : ''">{{anime.nome}}</h1>
        <span v-show="anime.nomeAlternativo !== ''">{{anime.nomeAlternativo}} — </span>

        <v-tooltip top color="rgb(30,30,30)">
          <template v-slot:activator="{on, attrs}">
            <div style="cursor: default; display: inline-block" v-on="on" v-bind="attrs">
              <span v-if="nota === ''"><v-btn style="color: #ff4a3b" icon loading></v-btn></span>
              <span v-else-if="nota === null">Sem Nota</span>
              <span v-else>{{nota}}<v-icon class="yellow--text" style="padding-bottom: 5px !important;">mdi-star</v-icon></span>
            </div>
          </template>
          <span v-if="quantidade < 1 || quantidade === undefined">Ninguém votou nesse Anime ainda.</span>
          <span v-else-if="quantidade === 1">{{quantidade}} pessoa votou nesse Anime.</span>
          <span v-else>{{quantidade}} pessoas votaram nesse Anime.</span>
        </v-tooltip>
        <br/>
        <v-btn v-for="(genero, g) in anime.generos" :key="g" :x-small="btnSmall"><v-icon>mdi-tag</v-icon>
          {{ genero.nome }}</v-btn>
      </div>
    </div>
    <div class="anime-detalhes">
      <div class="sinopse" :style="this.$vuetify.breakpoint.name === 'xs' ? 'float: none; width: 100%;' : ''">
        <h2>Sinopse</h2>
        <p>
          {{anime.sinopse}}
        </p>
      </div>
      <div class="detalhes-plus" :style="this.$vuetify.breakpoint.name === 'xs' ? 'float: none; width: 100%;' : ''">
        <h3>Lançamento: {{getPeriodo(anime.temporada[0].periodoInicial, anime.temporada[0].ano)}}</h3>
        <h3>Nº de Temporadas: {{anime.temporada.length}}</h3>
        <h3>Total de Episódios: {{totalEpisodios()}}</h3>
        <h3>Total de Acessos: {{anime.acessos}}</h3>
        <h3 v-if="notaSelecionada < 1">Avalie este anime:</h3>
        <h3 v-else>Sua avaliação:</h3>
        <v-select style="width: 250px" @change="setVoto()"
            v-model="notaSelecionada"
            :loading="notaLoading"
            dark
            filled
            color="red"
            item-color="red"
            dense
            prepend-icon="mdi-star"
            :items="notasLabel"
            label="Avaliar"
            item-text="label"
            item-value="id"
        ></v-select>
        <v-btn :x-small="this.$vuetify.breakpoint.name === 'xs'" :small="this.$vuetify.breakpoint.name === 'sm'" style="margin-right: 3px" :style="this.$vuetify.breakpoint.name === 'sm' ? 'margin-bottom: 5px' : ''">
          <v-icon>mdi-plus</v-icon> Adicionar à Lista
        </v-btn>
        <v-btn v-show="anime.temporada[0].episodios.length > 0" :x-small="this.$vuetify.breakpoint.name === 'xs'" :small="this.$vuetify.breakpoint.name === 'sm'" @click="episodioClick(progresso.temporada, progresso.episodio)">
          <v-icon>mdi-play-box</v-icon>
          <span v-if="progresso.episodio === 1 && progresso.temporada === 1 && progresso.tempo === 0">Assistir</span>
          <span v-else>Continuar</span>
        </v-btn>
      </div>
      <div class="temporada">
        <v-select style="width: 200px"
            v-model="temporadaSelecionada"
            v-show="anime.temporada.length > 1"
            item-value="numero"
            item-text="label"
            :items="anime.temporada"
            dark
            filled
            color="red"
            item-color="red"
            dense
        ></v-select>
        <div v-for="(temporada, index) in anime.temporada" :key="index" :style="temporadaSelecionada === (index + 1) ? '' : 'display: none !important;'">
          <h3 v-show="temporada.titulo !== null">{{temporada.titulo}}</h3>
          <h3 class="fansub">Fansub: <span v-for="(fansub, f) in temporada.fansubs" :key="f">
            <span @click="fansubClick()" v-if="temporada.fansubs.length - 1 === f">{{fansub.nome}}</span>
            <span @click="fansubClick()" v-else>{{fansub.nome}}, </span>
          </span></h3>
          <h3 v-show="temporadaSelecionada === 1 && temporada.periodoInicial !== temporada.periodoFinal && temporada.ano !== temporada.anoFinal">Período de Lançamento: {{getPeriodo(temporada.periodoInicial, temporada.ano)}} — {{getPeriodo(temporada.periodoFinal, temporada.anoFinal)}}</h3>
          <h3 v-show="temporadaSelecionada > 1">Período de Lançamento: {{getPeriodo(temporada.periodoInicial, temporada.ano)}} <span v-if="!temporada.periodoInicial === temporada.periodoFinal && !temporada.ano === temporada.anoFinal">— {{getPeriodo(temporada.periodoFinal, temporada.anoFinal)}}</span></h3>
          <h3>Nº de Episódios: {{temporada.episodios.length}}</h3>
          <h3>Status:
            <span v-if="temporada.periodoFinal !== null">Completo</span>
            <span v-if="temporada.periodoFinal === null">Em Lançamento</span>
          </h3>
          <div class="episodios d-flex flex-wrap">
            <EpisodioBox v-for="(episodio, indece) in temporada.episodios"
                         :key="indece"
                         :idAnime="anime._id"
                         :temporada="temporada.numero"
                         :numero="episodio.numero"
                         :thumb="episodio.thumb"/>
            <h2 v-if="anime.temporada[temporadaSelecionada - 1].episodios.length < 1">Ainda não há episódios cadastrados.</h2>
          </div>
        </div>
      </div>
      <div style="width: 100%; float: left; padding-left: 50px">
        <h3>Comentários</h3>
        <div style="width: 50%; background-color: rgb(30,30,30); display: block">
          <v-card dark style="position: relative; padding: 15px">
            <NewComentario
                @newComentario="newComentario"
                :id="anime._id"
                :tipo="2"
            />
            <ComentarioComponent v-for="(comentario, i) in anime.comentarios" :key="i"
                                 :id="comentario._id"
                                 :autor="comentario.autor"
                                 :texto="comentario.texto"
                                 :respostas="comentario.respostas"
                                 :curtidas="comentario.curtidas"
                                 :registro="comentario.registro"
                                 @deleteComentario="deleteComentario"
            />
            <h3 v-if="anime.comentarios.length <= 0">Seja o primeiro a comentar</h3>
          </v-card>
        </div>
      </div>
      <div class="semelhantes">
        <h3 :style="this.$vuetify.breakpoint.name === 'xs' ? 'font-size: 15px' : ''">Semelhantes a {{anime.nome}}</h3>
        <div class="semelhantes-content d-flex flex-row">
          <SemelhanteBox id="hggfh5485764sg45rg" nome="Darling" foto="74_637218453803005359Darling-Fran_Small_hq.jpg"/>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import EpisodioBox from "@/components/episodio/EpisodioBox";
import SemelhanteBox from "@/components/episodio/SemelhanteBox";
import {listarAnime, getRanking, votar} from "@/plugins/axios";
import {mapActions} from "vuex";
import NewComentario from "@/components/comentario/NewComentario";
import ComentarioComponent from "@/components/comentario/ComentarioComponent";

export default {
  name: "AnimePageViewComponent",
  components: {ComentarioComponent, NewComentario, SemelhanteBox, EpisodioBox},
  data: () => ({
    anime: {
      _id: '',
      nome: '',
      nomeAlternativo: '',
      sinopse: '',
      foto: '',
      cover: '',
      comentarios: [],
      acessos: 0,
      generos: [
          {
            _id: '',
            nome: ''
          }
      ],
      temporada:[
        {
          _id: '',
          periodoInicial: 1,
          periodoFinal: 1,
          ano: 2012,
          anoFinal: 2012,
          label: '',
          titulo: '',
          estudio: '',
          numero: 1,
          fansubs: [
            {
              _id: '',
              nome: ''
            }
          ],
          episodios: [
            {
              _id: '',
              numero: 12,
              thumb: ""
            }
          ]
        }
      ]
    },
    progresso: {
      _id: '',
      episodio: 1,
      temporada: 1,
      tempo: 0
    },
    temporadaSelecionada: 1,
    nota: '',
    notasLabel: [
      {id: 1, label: '01 - Terrível'},
      {id: 2, label: '02 - Horrível'},
      {id: 3, label: '03 - Muito Ruim'},
      {id: 4, label: '04 - Ruim'},
      {id: 5, label: '05 - Regular'},
      {id: 6, label: '06 - Bom'},
      {id: 7, label: '07 - Muito Bom'},
      {id: 8, label: '08 - Ótimo'},
      {id: 9, label: '09 - Excelente'},
      {id: 10, label: '10 - Obra-Prima'}
    ],
    notaSelecionada: 0,
    notaLoading: false,
    quantidade: 0
  }),
  computed: {
    displayCover(){
      if(this.$vuetify.breakpoint.name === 'xs'){
        return 'display: none';
      }else{
        return 'background: url(/img/anime/cover/' + this.anime.cover + ') center center fixed;';
      }
    },
    animeFotoStyle(){
      switch (this.$vuetify.breakpoint.name){
        case "xs": return {
          width: '100%'
        }
        case "sm": return '';
        case "md": return '';
        case "lg": return '';
        case "xl": return '';
        default: return '';
      }
    },
    btnSmall(){
      return this.$vuetify.breakpoint.name === 'xs';
    }
  },
  watch: {
    anime: {
      handler: function (){
        let img = document.getElementById('img');
        setTimeout(() => img.classList.remove('img-animation-loading'), 10000);
      },
      deep: true
    },
    '$route.params.id': {
      handler: function(){
        this.list();
      }
    }
  },
  methods: {
    ...mapActions('main', ['ActionNotFound']),
    episodioClick(temporada, numero){
      this.$router.push({name: 'Episódio', params: {id: this.anime._id, temporada: temporada, numero: numero}});
    },
    totalEpisodios(){
      let total = 0;
      for(let i = 0; i < this.anime.temporada.length; i++){
        total = total + this.anime.temporada[i].episodios.length;
      }
      return total;
    },
    list(){
      listarAnime(this.$route.params.id, this.$store.state.auth.user._id).then((value) => {
        if(value.data.anime.isNotSet){
          this.ActionNotFound({
            location: {
              name: 'Animes',
              params: {pagina: "1"}
            }, msg: 'Anime não encontrado. Se acredita que tentou buscar o anime certo, por favor, reporte este erro usando o botão abaixo, para que possamos resolvê-lo.'});
        }else{
          if(value){
            this.anime = value.data.anime;
            let img = document.getElementById('img');
            img.classList.add('img-animation-loading');
            this.progresso = value.data.progresso;
            window.document.title = this.anime.nome + ' — AniPlace';
            for(let i = 0; i < this.anime.temporada.length; i++){
              this.anime.temporada[i].label = this.anime.temporada[i].numero + "ª Temporada";
            }
            this.getNota();
            if(value.data.nota.length > 0){
              this.notaSelecionada = value.data.nota[0].nota;
            }
          }
        }
      });
    },
    fansubClick(){
      console.log("Clicou");
    },
    getPeriodo(periodo, ano){
      switch (periodo){
        case 1: return 'Inverno de ' + ano;
        case 2: return 'Primavera de ' + ano;
        case 3: return 'Verão de ' + ano;
        case 4: return 'Outono de ' + ano;
        default: return '??';
      }
    },
    getNota(){
      getRanking(this.anime._id).then((value) => {
        this.nota = value.data.nota;
        this.quantidade = value.data.quantidade;
      });
    },
    async setVoto(){
      this.notaLoading = true;
      await votar(this.$route.params.id, this.$store.state.auth.user._id, this.notaSelecionada).then((value) => {
        this.notaSelecionada = value.data.nota;
        this.notaLoading = false;
        this.getNota();
      });
    },
    newComentario(comentario){
      this.anime.comentarios.unshift(comentario);
    },
    deleteComentario(i){
      this.anime.comentarios.splice(i, 1);
    }
  },
  mounted() {
    this.list();
  }
}
</script>

<style scoped lang="scss">
$cover-height: 600px;

.anime-cover {
  background-size: cover;
  height: $cover-height;
  width: 100%;
}

.anime-cover-sheet {
  background-color: #000000d6;
  position: absolute;
  width: 100%;
  height: $cover-height;
  top: 0;
}

.anime {
  margin-top: -260px;
  z-index: 10;
  padding: 50px;
  width: 100%;
}

.anime-foto {
  float: left;
  width: 25%;
}

.anime-foto img {
  width: 100%;
  z-index: 15 !important;
  border-radius: 16px;
}

.img-animation {
  position: relative;
  width: 60%;
  padding: 5px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 14;
  overflow: hidden;
  border-radius: 16px;
  transition: 150ms;
}

.img-animation:hover {
  transform: scale(1.05);
}

.img-animation-loading::before {
  content: '';
  position: absolute;
  width: 60%;
  height: 500px;
  background-color: #ff4a3d;
  z-index: 14;
  animation: imgAnimation 2s linear infinite;
}

.img-animation-loading::after {
  content: '';
  position: absolute;
  background-color: rgb(30,30,30);
  border-radius: 16px;
  inset: 4px;
}

@keyframes imgAnimation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.anime-info {
  width: 75%;
  text-align: left;
  color: #FFFFFF;
  float: right;
}

.fansub span {
  cursor: pointer;
}

.fansub span:hover {
  color: #c0c0c0;
}

.anime-info button {
  margin-left: 5px;
  margin-bottom: 5px;
  padding: 5px !important;
}

.anime-detalhes {
  margin-top: -138px;
  background-color: rgba(18, 18, 18, 0.85);
  padding: 150px 50px 50px 50px;
  text-align: left;
  color: #FFFFFF;
  width: 100%;
}

.sinopse {
  float: left;
  width: 55%;
}

.detalhes-plus {
  float: right;
  width: 37%;
  padding-left: 35px;
  padding-top: 15px;
  padding-bottom: 15px;
  border-left: 3px solid #dfdfdf;
  margin-bottom: 15px;
}

.temporada {
  width: 100%;
  float: left;
}

.episodios {
  width: 100%;
  margin-top: 20px;
  background-color: #0F0F0FFF;
  padding: 10px;
}

.semelhantes {
  float: left;
  margin-top: 50px;
  width: 100%;
  display: inline;
}

.semelhantes-content {
  width: 100%;
  overflow-x: auto;
  padding: 20px;
  background-color: #0F0F0FFF;
  float: left;
}
</style>