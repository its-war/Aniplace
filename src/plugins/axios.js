import axios from 'axios';
import store from '@/store/vuex';

const http = axios.create({
    baseURL: "http://192.168.0.21"
    //http://192.168.0.16
    //https://aniplace.herokuapp.com
});

http.interceptors.request.use(async (config) => {
    try{
        let t = window.localStorage.getItem('token');
        if(t || t.length > 0) {
            config.headers = {'x-access-token': t}
        }
    }catch{
        console.log('Erro na requisição da API.');
    }
    return config;
});

export function login(usuario, senha, lembrar){
    return http.post("login/efetuarLogin", {nomeusuario: usuario, senha: senha, lembrar: lembrar});
}

export function validarLogin(){
    return http.get("login/validar");
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
    return http.get('destaque/listar');
}

export function listarTopUsers(){
    return http.get('usuario/topUsers');
}

export function updateUserVersion(){
    return http.put('usuario/updateVersion', {id: store.state.auth.user._id});
}

export function listarAnimes(pagina, conditions, generos){
    return http.post('anime/listar', {pagina: pagina, conditions: conditions, generos: generos});
}

export function listarAnime(idAnime, idUser){
    return http.get('anime/listar/' + idAnime + '/' + idUser);
}

export function getRanking(idAnime){
    return http.get('ranking/get/' + idAnime);
}

export function votar(idAnime, idUser, nota){
    return http.post('ranking/votar', {idAnime: idAnime, idUser: idUser, nota: nota});
}

export function listarGeneros(){
    return http.get('genero/listar');
}

export function getMenorAno(){
    return http.get('anime/getMenorAno');
}

export function getEpisodio(idAnime, nTemporada, nEpisodio){
    return http.get('episodio/get/' + idAnime + '/' + nTemporada + '/' + nEpisodio);
}

export function setEpisodioProgresso(idUser, idAnime, temporada, episodio, tempo){
    return http.post('episodio/setEpisodioProgresso', {
        idUser: idUser,
        idAnime: idAnime,
        temporada: temporada,
        episodio: episodio,
        tempo: tempo
    });
}

export function animesMaisAcessados(){
    return http.get('anime/animesMaisAcessados');
}

export function getLancamentos(){
    return http.get('episodio/getLancamentos');
}

export function listarLancamentos(pagina){
    return http.get('episodio/listarLancamentos/' + pagina);
}

export function fastSearch(value){
    return http.get('anime/fastSearch/' + value);
}

export function animesMaiorPontuacao(){
    return http.get('anime/getAnimesMaiorPontuacao');
}

export function getSolicitacoes(){
    return http.get('usuario/getSolicitacoes');
}

export function getSolicitacao(id){
    return http.get('usuario/getSolicitacao/' + id);
}

export function solicitarAmizade(id){
    return http.get('usuario/solicitarAmizade/' + id);
}

export function aceitarSolicitacao(de){
    return http.get('usuario/aceitarSolicitacao/' + de);
}

export function userGetInfoPublic(id){
    return http.get('usuario/userGetInfoPublic/' + id);
}

export function hasSolicitacao(id){
    return http.get('usuario/hasSolicitacao/' + id);
}

export function getNotifications(){
    return http.get('usuario/getNotifications');
}

export function setLidoTodos(){
    return http.get('usuario/setLidoTodos');
}

export function newPost(texto, imagem){
    return http.post('postagem/newPost', {
        texto: texto,
        imagem: imagem
    }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: (progressEvent) => {
                window._Vue.$store.dispatch('main/ActionSetUploadProgress', parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100)));
            }
        }
    );
}

export function getFeed(pagina){
    return http.get('postagem/getFeed/' + pagina);
}

export function getFeedUser(pagina){
    return http.get('postagem/getFeedUser/' + pagina);
}

export function getPost(id){
    return http.get('postagem/getPost/' + id);
}

export function curtirPost(idPost){
    return http.get('postagem/curtirPost/' + idPost);
}

export function curtirComentario(idComentario){
    return http.get('comentario/curtirComentario/' + idComentario);
}

export function descurtirComentario(idComentario){
    return http.get('comentario/descurtirComentario/' + idComentario);
}

export function descurtirPost(idPost){
    return http.get('postagem/descurtirPost/' + idPost);
}

export function getCurtidas(idPost){
    return http.get('postagem/getCurtidas/' + idPost);
}

export function newComentario(id, texto, tipo){
    return http.post('comentario/newComentario', {
        id: id,
        texto: texto,
        tipo: tipo
    });
}

export function deletePost(idPost){
    return http.put('postagem/deletePost', {id: idPost});
}

export function deleteComentario(idComentario){
    return http.put('comentario/deleteComentario', {id: idComentario});
}

export function getConversas(){
    return http.get('conversa/getConversas');
}

export function getConversa(idConversa){
    return http.get('conversa/getConversa/' + idConversa);
}

export function newConversa(idAmigo){
    return http.post('conversa/newConversa', {id: idAmigo});
}

export function desfazerAmizade(id){
    return http.get('usuario/desfazerAmizade/' + id);
}

export function carregarMensagens(id, pagina, limite){
    return http.get('conversa/carregarMensagens/' + id + '/' + pagina + '/' + limite);
}

export function continuarCadastro(dados){
    return http.post('usuario/continuarCadastro', {
        dados
    });
}