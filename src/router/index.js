import Vue from 'vue'
import VueRouter from 'vue-router'
import {validarLogin} from "@/plugins/axios";
import store from '@/store/vuex';
import HomePage from "@/views/HomePage";
import InicialComponent from "@/components/inicio/InicialComponent";
import AnimesPageComponent from "@/components/anime/AnimesPageComponent";
import AnimePageViewComponent from "@/components/anime/AnimePageViewComponent";
import LancamentosPageComponent from "@/components/lancamento/LancamentosPageComponent";
const LoginPage = () => import("@/views/LoginPage");
const CadastroPage = () => import("@/views/CadastroPage");
const AtivadoPage = () => import("@/views/AtivadoPage");
const EpisodioPage = () => import("@/views/EpisodioPageComponent");

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: HomePage,
    children: [
      {
        path: '',
        name: 'Home',
        component: InicialComponent
      },
      {
        path: 'animes',
        name: 'Animes',
        component: AnimesPageComponent
      },
      {
        path: 'anime/:id',
        name: 'Anime',
        component: AnimePageViewComponent
      },
      {
        path: 'lancamentos',
        name: 'Lançamentos',
        component: LancamentosPageComponent
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/login/ativado',
    name: 'Ativado',
    component: AtivadoPage
  },
  {
    path: '/cadastro',
    name: 'Cadastro',
    component: CadastroPage
  },
  {
    path: '/video/:id/t/:temporada/ep/:numero',
    name: 'Episódio',
    component: EpisodioPage
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  store.dispatch('main/ActionSetOverlay', true);
  let token = window.localStorage.getItem('token');
    validarLogin(token).then(value => {
      if(value.data.auth){
        store.dispatch('main/ActionSetUpdate', value.data.update);
        store.dispatch('auth/ActionSetToken', token);
        store.dispatch('auth/ActionSetUser', value.data.user);
        if(to.name === 'Login' || to.name === 'Cadastro' || to.name === 'Ativado'){
          window.document.title = "Home — AniPlace";
          next({name: 'Home'});
        }else{
          window.document.title = to.name + " — AniPlace";
          next();
        }
      }else{
        if(to.name === 'Login' || to.name === 'Cadastro' || to.name === 'Ativado'){
          window.document.title = to.name + " — AniPlace";
          next();
        }else{
          window.document.title = "Login — AniPlace";
          next({name: 'Login'});
        }
      }
    }).catch(reason => {
      console.log("Erro: " + reason);
      window.alert("Nosso servidor está fora do ar, tente novamente mais tarde.");
    });
});

router.afterEach(() => {
  window.scrollTo(0,0);
  store.dispatch('main/ActionSetOverlay', false);
});

export default router
