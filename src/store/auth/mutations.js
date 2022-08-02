import * as types from '@/store/auth/mutation-types';

export default {
    [types.SET_USER] (state, payload){
        state.user = payload;
    },

    [types.SET_TOKEN] (state, payload){
        state.token = payload;
    },

    [types.SET_LOADING] (state, payload){
        state.loading = payload;
    },

    [types.SET_LOGIN_ERR] (state, payload){
        state.loginErr = payload;
    },

    [types.SET_CADASTRO_ERR] (state, payload){
        state.cadastroErr = payload;
    },

    [types.SET_CADASTRO_MSG] (state, payload){
        state.cadastroMsg = payload;
    },

    [types.SET_lOGIN_MSG] (state, payload){
        state.loginMsg = payload;
    },

    [types.SET_ATIVO_MSG] (state, payload){
        state.ativoMsg = payload;
    },

    [types.SET_ATIVO_SNACKBAR] (state, payload){
        state.ativoSnackbar = payload;
    }
}