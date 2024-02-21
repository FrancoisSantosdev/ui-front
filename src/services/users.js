import { http } from "./config";

export default {

    listar:() => {
        return http.get('users')
    },

    salvar:(userCreate) => {
        return http.post('users/create', userCreate)
    } ,

    // atualizar:(userCreate) => {
    //     return http.post('users/{id}', userCreate)
    // },

    atualizar: (userId, userData) => {
        return http.post(`users/${userId}`, userData);
    }
}