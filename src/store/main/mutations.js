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
    }
}