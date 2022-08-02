import * as types from '@/store/auth/mutation-types';
import {login} from '@/plugins/axios';
import {cadastro} from "@/plugins/axios";

export const ActionSetUser = ({ commit }, payload) => {
    commit(types.SET_USER, payload);
}

export const ActionSetToken = ({ commit }, payload) => {
    commit(types.SET_TOKEN, payload);
}

export const ActionSetLoading = ({ commit }, payload) => {
    commit(types.SET_LOADING, payload);
}

export const ActionSetLoginErr = ({ commit }, payload) => {
    commit(types.SET_LOGIN_ERR, payload);
}

export const ActionSetCadastroErr = ({ commit }, payload) => {
    commit(types.SET_CADASTRO_ERR, payload);
}

export const ActionSetCadastroMsg = ({ commit }, payload) => {
    commit(types.SET_CADASTRO_MSG, payload);
}

export const ActionSetLoginMsg = ({commit}, payload) => {
    commit(types.SET_lOGIN_MSG, payload);
}

export const ActionSetAtivoMsg = ({commit}, payload) => {
    commit(types.SET_ATIVO_MSG, payload);
}

export const ActionSetAtivoSnackbar = ({commit}, payload) => {
    commit(types.SET_ATIVO_SNACKBAR, payload);
}

export const ActionLogin = ({ dispatch }, payload) => {
    dispatch('ActionSetLoading', true);
    login(payload.usuario, payload.senha, payload.lembrar).then(value => {
        if(value.data.autorizado !== undefined){
            if(value.data.autorizado){
                if(value.data.user.ativo === 2){
                    dispatch('ActionSetAtivoSnackbar', true);
                    dispatch('ActionSetAtivoMsg', value.data.msg);
                }
                dispatch('ActionSetToken', value.data.token);
                dispatch('ActionSetUser', value.data.user);
                window.localStorage.setItem('token', value.data.token);
                dispatch('ActionSetLoginMsg', "");
                dispatch('ActionSetLoginErr', false);
                dispatch('ActionSetLoading', false);
                window._Vue.$router.replace('/');
            }else{
                dispatch('ActionSetLoading', false);
                dispatch('ActionSetLoginMsg', value.data.msg);
                dispatch('ActionSetLoginErr', true);
                dispatch('ActionSetToken', "");
                dispatch('ActionSetUser', []);
                window.localStorage.setItem('token', "");
            }
        }else{
            dispatch('ActionSetLoading', false);
            dispatch('ActionSetLoginMsg', 'Erro no sistema, tente novamente mais tarde.');
            dispatch('ActionSetLoginErr', true);
        }
    });
}

export const ActionCadastro = ({dispatch}, payload) => {
    dispatch('ActionSetLoading', true);
    cadastro(payload.nome, payload.email, payload.nomeusuario, payload.senha, payload.senharepetida).then(value => {
        if(value.data.cadastro){
            dispatch('ActionSetLoading', false);
            dispatch('ActionSetCadastroMsg', "Cadastro realizado com sucesso. Acesse seu e-mail para ativar sua conta.");
            dispatch('ActionSetCadastroErr', true);
            return true;
        }else{
            dispatch('ActionSetLoading', false);
            dispatch('ActionSetCadastroMsg', value.data.msg);
            dispatch('ActionSetCadastroErr', true);
            return false;
        }
    }).catch(() => {
        return false;
    });
}

export const ActionKillSession = ({dispatch}) => {
    dispatch('ActionSetUser', []);
    dispatch('ActionSetToken', "");
    dispatch('ActionSetLoading', false);
    dispatch('ActionSetLoginErr', false);
    window.localStorage.setItem('token', "");
}