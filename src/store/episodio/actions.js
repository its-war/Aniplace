import * as types from '@/store/episodio/mutation-types';
import {getEpisodio} from "@/plugins/axios";

export const ActionSetSrc = ({commit}, payload) => {
    commit(types.SET_SRC, payload);
}

export const ActionSetThumb = ({commit}, payload) => {
    commit(types.SET_THUMB, payload);
}

export const ActionSetAnime = ({commit}, payload) => {
    commit(types.SET_ANIME, payload);
}

export const ActionSetDados = ({commit}, payload) => {
    commit(types.SET_DADOS, payload);
}

export const ActionLoadEpisodio = async ({dispatch}, {idAnime, temporada, numero}) => {
    await getEpisodio(idAnime, temporada, numero).then((value) => {
        dispatch('ActionSetSrc', value.data.src);
        dispatch('ActionSetThumb', value.data.thumb);
        dispatch('ActionSetAnime', value.data.anime);
        dispatch('ActionSetDados', value.data.dados);
    });
}