import { http } from "./config";

export default {

    listar:() => {
        return http.get('users')
    },

    salvar:(userCreate) => {
        return http.post('users/create', userCreate)
    } ,

    atualizar: (userId, userData) => {
        return http.post(`users/${userId}`, userData);
    },

    apagar: (userId) => {
        return http.delete(`users/${userId}`);
    }


}