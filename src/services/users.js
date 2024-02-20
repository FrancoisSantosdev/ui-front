import { http } from "./config";

export default {

    listar:() => {
        return http.get('users')
    },

    // salvar:(userCreate) => {
    //     return http.post('users')
    // } 
}