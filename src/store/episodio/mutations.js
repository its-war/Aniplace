import * as types from '@/store/episodio/mutation-types';

export default {
    [types.SET_SRC] (state, payload){
        state.src = payload;
    },

    [types.SET_THUMB] (state, payload){
        state.thumb = payload;
    },

    [types.SET_ANIME] (state, payload){
        state.anime = payload;
    },

    [types.SET_DADOS] (state, payload){
        state.dados = payload;
    },

    [types.SET_LANCAMENTOS] (state, payload){
        state.lancamentos = payload;
    }
}