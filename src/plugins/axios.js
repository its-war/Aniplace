import axios from 'axios';
import store from '@/store/vuex';

const http = axios.create({
    baseURL: "http://192.168.0.15"
    //http://192.168.0.15
    //https://aniplace.herokuapp.com
});

export function login(usuario, senha, lembrar){
    return http.post("login/efetuarLogin", {nomeusuario: usuario, senha: senha, lembrar: lembrar});
}

export function validarLogin(token){
    return http.get("login/validar", {headers: {'x-access-token': token}});
}

export function cadastro(nome, email, nomeusuario, senha, senhaRepetida){
    return http.post("usuario/cadastrarUsuario", {
        nome: nome,
        email: email,
        nomeusuario: nomeusuario,
        senha: senha,
        senharepetida: senhaRepetida
    });
}

export function listarDestaques(){
    return http.get('destaque/listar', {headers: {'x-access-token': window.localStorage.getItem('token')}});
}

export function listarTopUsers(){
    return http.get('usuario/topUsers', {headers: {'x-access-token': window.localStorage.getItem('token')}});
}

export function updateUserVersion(){
    return http.put('usuario/updateVersion', {id: store.state.auth.user._id}, {headers: {'x-access-token': window.localStorage.getItem('token')}});
}

export function listarAnimes(pagina){
    return http.get('anime/listar/' + pagina, {headers: {'x-access-token': window.localStorage.getItem('token')}});
}

export function listarAnime(idAnime, idUser){
    return http.get('anime/listar/' + idAnime + '/' + idUser, {headers: {'x-access-token': window.localStorage.getItem('token')}});
}

export function getRanking(idAnime){
    return http.get('ranking/get/' + idAnime, {headers: {'x-access-token': window.localStorage.getItem('token')}});
}

export function votar(idAnime, idUser, nota){
    return http.post('ranking/votar', {idAnime: idAnime, idUser: idUser, nota: nota}, {headers: {'x-access-token': window.localStorage.getItem('token')}});
}