import * as types from '@/store/main/mutation-types';
import {listarTopUsers, updateUserVersion} from "@/plugins/axios";

export const ActionSetOverlay = ({commit}, payload) => {
    commit(types.SET_OVERLAY, payload);
}

export const ActionSetTopUsers = ({commit}, payload) => {
    commit(types.SET_TOP_USERS, payload);
}

export const ActionSetUpdate = ({commit}, payload) => {
    commit(types.SET_UPDATE, payload);
}

export const ActionSetCloseDialogLoading = ({commit}, payload) => {
    commit(types.SET_CLOSE_DIALOG_LOADING, payload);
}

export const ActionListarTopUsers = ({dispatch}) => {
    listarTopUsers().then((value) => {
        if(value){
            dispatch('ActionSetTopUsers', value.data);
        }else{
            dispatch('ActionSetTopUsers', []);
        }
    });
}

export const ActionCloseDialogUpdate = ({dispatch}) => {
    dispatch('ActionSetCloseDialogLoading', true);
    updateUserVersion().then((value) => {
        if(value){
            dispatch('ActionSetUpdate', value.data.update);
            dispatch('ActionSetCloseDialogLoading', false);
        }else{
            dispatch('ActionSetCloseDialogLoading', false);
        }
    }).catch(() => {
        dispatch('ActionSetCloseDialogLoading', false);
    });
}