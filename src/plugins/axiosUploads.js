import axios from 'axios';

const http = axios.create({
    baseURL: 'http://192.168.0.21:3000'
});

export function uploadImg(id, foto, opcao){
    return http.post('', {
        opcao: opcao,
        id: id,
        foto: foto
    },{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}