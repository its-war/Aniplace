import axios from "axios";

const http = axios.create({
    baseURL: 'https://servicodados.ibge.gov.br'
});

export function getEstados(){
    return http.get('api/v1/localidades/estados?orderBy=nome');
}

export function getCidadesPorEstado(idEstado){
    return http.get('api/v1/localidades/estados/' + idEstado + '/municipios?orderBy=nome');
}

export function getCidade(idCidade){
    return http.get('api/v1/localidades/municipios/' + idCidade);
}

export function getEstado(idEstado){
    return http.get('api/v1/localidades/estados/' + idEstado);
}