export default {
    user: [],
    token: window.localStorage.getItem('token'),
    loading: false,
    loginErr: false,
    loginMsg: "",
    cadastroErr: false,
    cadastroMsg: "",
    ativoMsg: "",
    ativoSnackbar: false,
    cadastroClear: false
}