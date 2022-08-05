import * as types from '@/store/main/mutation-types';

export default {
    [types.SET_OVERLAY] (state, payload){
        state.overlay = payload;
    },

    [types.SET_TOP_USERS] (state, payload){
        state.topUsers = payload;
    },

    [types.SET_UPDATE] (state, payload){
        state.update = payload;
    },

    [types.SET_CLOSE_DIALOG_LOADING] (state, payload){
        state.closeDialogLoading = payload;
    },

    [types.SET_NOT_FOUND] (state, payload){
        state.notFound = payload;
    },

    [types.SET_CLOSE_NOT_FOUND_LOADING] (state, payload){
        state.closeNotFoundLoading = payload;
    },

    [types.SET_ANIME] (state, payload){
        state.animes = payload;
    }
}