import axios from 'axios';
import store from '@/store/vuex';

const http = axios.create({
    baseURL: "http://192.168.0.16"
    //http://192.168.0.16
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

export function esqueceuSenha(nomeusuario, email, senha, senhaRepetida){
    return http.put('usuario/esqueceuSenha', {
        nomeusuario: nomeusuario,
        email: email,
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

export function listarAnimes(pagina, conditions, generos){
    return http.post('anime/listar', {pagina: pagina, conditions: conditions, generos: generos}, {headers: {'x-access-token': window.localStorage.getItem('token')}});
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

export function listarGeneros(){
    return http.get('genero/listar', {headers: {'x-access-token': window.localStorage.getItem('token')}});
}

export function getMenorAno(){
    return http.get('anime/getMenorAno', {headers: {'x-access-token': window.localStorage.getItem('token')}});
}

export function getEpisodio(idAnime, nTemporada, nEpisodio){
    return http.get('episodio/get/' + idAnime + '/' + nTemporada + '/' + nEpisodio, {headers: {'x-access-token': window.localStorage.getItem('token')}});
}

export function setEpisodioProgresso(idUser, idAnime, temporada, episodio, tempo){
    return http.post('episodio/setEpisodioProgresso', {
        idUser: idUser,
        idAnime: idAnime,
        temporada: temporada,
        episodio: episodio,
        tempo: tempo
    }, {headers: {'x-access-token': window.localStorage.getItem('token')}});
}

export function animesMaisAcessados(){
    return http.get('anime/animesMaisAcessados', {headers: {'x-access-token': window.localStorage.getItem('token')}});
}

export function getLancamentos(){
    return http.get('episodio/getLancamentos', {headers: {'x-access-token': window.localStorage.getItem('token')}});
}

export function listarLancamentos(pagina){
    return http.get('episodio/listarLancamentos/' + pagina, {headers: {'x-access-token': window.localStorage.getItem('token')}});
}

export function fastSearch(value){
    return http.get('anime/fastSearch/' + value, {headers: {'x-access-token': window.localStorage.getItem('token')}});
}

export function animesMaiorPontuacao(){
    return http.get('anime/getAnimesMaiorPontuacao', {headers: {'x-access-token': window.localStorage.getItem('token')}});
}

export function getSolicitacoes(){
    return http.get('usuario/getSolicitacoes', {headers: {'x-access-token': window.localStorage.getItem('token')}});
}

export function getSolicitacao(id){
    return http.get('usuario/getSolicitacao/' + id, {headers: {'x-access-token': window.localStorage.getItem('token')}});
}

export function solicitarAmizade(id){
    return http.get('usuario/solicitarAmizade/' + id, {headers: {'x-access-token': window.localStorage.getItem('token')}});
}

export function aceitarSolicitacao(de){
    return http.get('usuario/aceitarSolicitacao/' + de, {headers: {'x-access-token': window.localStorage.getItem('token')}});
}

export function userGetInfoPublic(id){
    return http.get('usuario/userGetInfoPublic/' + id, {headers: {'x-access-token': window.localStorage.getItem('token')}});
}

export function hasSolicitacao(id){
    return http.get('usuario/hasSolicitacao/' + id, {headers: {'x-access-token': window.localStorage.getItem('token')}});
}

export function getNotifications(){
    return http.get('usuario/getNotifications', {headers: {'x-access-token': window.localStorage.getItem('token')}});
}

export function setLidoTodos(){
    return http.get('usuario/setLidoTodos', {headers: {'x-access-token': window.localStorage.getItem('token')}});
}

export function newPost(texto, imagem){
    return http.post('postagem/newPost', {
        texto: texto,
        imagem: imagem
    }, {
            headers: {
                'x-access-token': window.localStorage.getItem('token'),
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: (progressEvent) => {
                window._Vue.$store.dispatch('main/ActionSetUploadProgress', parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100)));
            }
        }
    );
}

export function getFeed(pagina){
    return http.get('postagem/getFeed/' + pagina, {headers: {'x-access-token': window.localStorage.getItem('token')}});
}

export function getFeedUser(pagina){
    return http.get('postagem/getFeedUser/' + pagina, {headers: {'x-access-token': window.localStorage.getItem('token')}});
}

export function getPost(id){
    return http.get('postagem/getPost/' + id, {headers: {'x-access-token': window.localStorage.getItem('token')}});
}

export function curtirPost(idPost){
    return http.get('postagem/curtirPost/' + idPost, {headers: {'x-access-token': window.localStorage.getItem('token')}});
}

export function curtirComentario(idComentario){
    return http.get('comentario/curtirComentario/' + idComentario, {headers: {'x-access-token': window.localStorage.getItem('token')}});
}

export function descurtirComentario(idComentario){
    return http.get('comentario/descurtirComentario/' + idComentario, {headers: {'x-access-token': window.localStorage.getItem('token')}});
}

export function descurtirPost(idPost){
    return http.get('postagem/descurtirPost/' + idPost, {headers: {'x-access-token': window.localStorage.getItem('token')}});
}

export function getCurtidas(idPost){
    return http.get('postagem/getCurtidas/' + idPost, {headers: {'x-access-token': window.localStorage.getItem('token')}});
}

export function newComentario(id, texto, tipo){
    return http.post('comentario/newComentario', {
        id: id,
        texto: texto,
        tipo: tipo
    }, {headers: {'x-access-token': window.localStorage.getItem('token')}});
}

export function deletePost(idPost){
    return http.put('postagem/deletePost', {id: idPost}, {headers: {'x-access-token': window.localStorage.getItem('token')}});
}

export function deleteComentario(idComentario){
    return http.put('comentario/deleteComentario', {id: idComentario}, {headers: {'x-access-token': window.localStorage.getItem('token')}});
}

export function getConversas(){
    return http.get('conversa/getConversas', {headers: {'x-access-token': window.localStorage.getItem('token')}});
}

export function getConversa(idConversa){
    return http.get('conversa/getConversa/' + idConversa, {headers: {'x-access-token': window.localStorage.getItem('token')}});
}

export function newConversa(idAmigo){
    return http.post('conversa/newConversa', {id: idAmigo}, {headers: {'x-access-token': window.localStorage.getItem('token')}});
}