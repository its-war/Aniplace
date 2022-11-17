import Vue from 'vue'
import VueRouter from 'vue-router'
import {validarLogin} from "@/plugins/axios";
import store from '@/store/vuex';
import HomePage from "@/views/HomePage";
import InicialComponent from "@/components/inicio/InicialComponent";
import AnimesPageComponent from "@/components/anime/AnimesPageComponent";
import AnimePageViewComponent from "@/components/anime/AnimePageViewComponent";
import LancamentosPageComponent from "@/components/lancamento/LancamentosPageComponent";
import AnimesComponent from "@/components/anime/AnimesComponent";
import LancamentosContainer from "@/components/lancamento/LancamentosContainer";
import PerfilPageComponent from "@/components/perfil/PerfilPageComponent";
const LoginPage = () => import("@/views/LoginPage");
const CadastroPage = () => import("@/views/CadastroPage");
const AtivadoPage = () => import("@/views/AtivadoPage");
const EsqueceuSenhaPage = () => import("@/views/EsqueceuSenhaPage");
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
        path: '',
        component: AnimesPageComponent,
        children: [
          {
            path: 'animes/p/:pagina',
            name: 'Animes',
            component: AnimesComponent
          }
        ]
      },
      {
        path: 'anime/:id',
        name: 'Anime',
        component: AnimePageViewComponent
      },
      {
        path: '',
        component: LancamentosPageComponent,
        children: [
          {
            path: 'lancamentos/p/:pagina',
            name: 'Lançamentos',
            component: LancamentosContainer
          }
        ]
      },
      {
        path: 'perfil/:id',
        name: 'Perfil',
        component: PerfilPageComponent
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
    path: '/esqueceuSenha',
    name: 'Esqueceu sua senha?',
    component: EsqueceuSenhaPage
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

router.beforeEach(async (to, from, next) => {
  await store.dispatch('main/ActionSetOverlay', true);
  await store.dispatch('main/ActionSetNotFound', {enabled: false, message: ''});
  if(to.name === 'Episódio'){
    await store.dispatch('episodio/ActionLoadEpisodio', {
      idAnime: to.params.id,
      temporada: to.params.temporada,
      numero: to.params.numero
    });
  }
  let token = window.localStorage.getItem('token');
    validarLogin(token).then(value => {
      if(from.path === '/esqueceuSenha'){
        store.dispatch('auth/ActionSetLoading', false);
        store.dispatch('auth/ActionSetLoginErr', false);
        store.dispatch('auth/ActionSetLoginMsg', '');
      }

      if(value.data.auth){
        store.dispatch('main/ActionSetUpdate', value.data.update);
        store.dispatch('auth/ActionSetToken', token);
        store.dispatch('auth/ActionSetUser', value.data.user);
        if(to.name === 'Login' || to.name === 'Cadastro' || to.name === 'Ativado' || to.path === '/esqueceuSenha'){
          window.document.title = "Home — AniPlace";
          next({name: 'Home'});
        }else{
          window.document.title = to.name + " — AniPlace";
          next();
        }
      }else{
        if(to.name === 'Login' || to.name === 'Cadastro' || to.name === 'Ativado' || to.path === '/esqueceuSenha'){
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
  if(store.state.auth.user._id !== ''){
    window._Vue.$socket.emit('saveIdSocket', {
      id: store.state.auth.user._id
    });
  }
});

export default router
