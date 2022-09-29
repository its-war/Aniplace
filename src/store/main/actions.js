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

export const ActionSetNotFound = ({commit}, payload) => {
    commit(types.SET_NOT_FOUND, payload);
}

export const ActionSetCloseNotFoundLoading = ({commit}, payload) => {
    commit(types.SET_CLOSE_NOT_FOUND_LOADING, payload);
}

export const ActionSetAnimes = ({commit}, payload) => {
    commit(types.SET_ANIME, payload);
}

export const ActionNotFound = async ({dispatch}, payload) => {
    await window._Vue.$router.replace(payload.location);
    dispatch('ActionSetNotFound', {enabled: true, message: payload.msg});
}

export const ActionCloseNotFound = ({dispatch}) => {
    dispatch('ActionSetCloseNotFoundLoading', true);
    dispatch('ActionSetNotFound', {enabled: false, message: ''});
    dispatch('ActionSetCloseNotFoundLoading', false);
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

export const ActionSetUploadProgress = ({commit}, payload) => {
    commit(types.SET_UPLOAD_PROGRESS, payload);
}

export const ActionSetConnection = ({commit}, payload) => {
    commit(types.SET_CONNECTION, payload);
}