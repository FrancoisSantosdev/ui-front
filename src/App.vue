<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Users Work</a>
      </div>
    </nav>

    <div class="container">
      <ul v-if="errors && Object.keys(errors).length > 0">
        <li v-for="(messages, field) in errors" :key="field">
          <b>{{ field }}</b> - {{ translateErrorMessage(messages[0]) }}
        </li>
      </ul>
          
      <form @submit.prevent="salvar">

        <label>Nome</label>
        <input type="text" placeholder="Nome" v-model="userCreate.name">
        <label>Email</label>
        <input type="text" placeholder="Email" v-model="userCreate.email">
        <label>Profissão</label>
        <input type="text" placeholder="Profissão" v-model="userCreate.profession">

        <button class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>
        
      </form>

      <table>
        <thead>
          <tr>
            <th>NOME</th>
            <th>EMAIL</th>
            <th>PROFISSÃO</th>
            <th>OPÇÕES</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user of usersArray" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.profession }}</td>
            <td>
              <button class="waves-effect btn-small blue darken-1" @click="editUsers(user)"><i class="material-icons">create</i></button>
              <button class="waves-effect btn-small red darken-1" @click="deleteUser(user.id)"><i class="material-icons">delete_sweep</i></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Users from './services/users'

export default {
  data() {
    return {
      userCreate: {
        id: null,
        name: '',
        email: '',
        profession: '',
      },
      usersArray: [],
      errors: []
    }
  },
  mounted() {
    this.listar()
  },
  methods: {
    listar() {
      Users.listar().then(resposta => {
        this.usersArray = resposta.data.users
      })
    },
    salvar() {
      if (this.userCreate.id) { 
        this.updateUsers(this.userCreate.id, this.userCreate);
      } else { 
        Users.salvar(this.userCreate)
          .then(() => {
            this.userCreate = {};
            alert('Salvo com sucesso!');
            this.listar();
            this.errors = [];
          })
          .catch(e => {
            this.errors = e.response.data.errors;
          });
      }
    },
    editUsers(user) {
      this.userCreate = { ...user }; 
    },
    updateUsers(userId, userData) {
      Users.atualizar(userId, userData)
        .then(() => {
          alert('Usuário atualizado com sucesso!');
          this.listar();
          this.errors = [];
          this.userCreate = {
                    id: null,
                    name: '',
                    email: '',
                    profession: '',
                };
        })
        .catch(e => {
          this.errors = e.response.data.errors;
        });
    },

    deleteUser(userId) {
            if (confirm("Tem certeza que deseja excluir este usuário?")) {
                Users.apagar(userId)
                    .then(() => {
                        alert('Usuário excluído com sucesso!');
                        this.listar();
                    })
                    .catch(error => {
                        console.error('Erro ao excluir usuário:', error);
                    });
            }
     },
    
 
    translateErrorMessage(message) {
      const errorMessages = {
        "The name field is required.": "O campo nome é obrigatório.",
        "The email field is required.": "O campo email é obrigatório.",
        "The profession field is required.": "O campo profissão é obrigatório."
      };
      return errorMessages[message] || message;
    }
  }
}
</script>

<style>

</style>

