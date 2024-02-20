<template>
  <div id="app">

    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Users Work</a>
      </div>
    </nav>

    

    <div class="container">

      <ul>
        <li v-for="(erro, index) of errors" :key="index">
           campo <b>{{ erro.field }}</b> - {{ erro.defaultMessege }}
        </li>
      </ul>
          
      <form @submit.prevent="salvar">

          <label>Nome</label>
          <input type="text" placeholder="Nome" v-model="userCreate.name">
          <label>Quantidade</label>
          <input type="text" placeholder="QTD" v-model="userCreate.email">
          <label>Valor</label>
          <input type="text" placeholder="Valor" v-model="userCreate.profession">

          <button class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>
        

      </form>

      <table>

        <thead>

          <tr>
            <th>NOME</th>
            <th>QTD</th>
            <th>VALOR</th>
            <th>OPÇÕES</th>
          </tr>

        </thead>

        <tbody>

          <tr v-for="user of usersArray" :key="user.id">

            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.profession }}</td>
            <td>
              <button class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
              <button class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
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

 
  data(){

    return {
       userCreate: {
        name: '',
        email: '',
        profession: '',
      },

      usersArray: [],
      errors: []
    }
  },

  mounted(){
    this.listar()
  },
  
  methods:{

    listar(){
    Users.listar().then(resposta => {
      
      this.usersArray = resposta.data.users
    })

  },

      salvar(){

          Users.salvar(this.userCreate).then(() => {
          this.userCreate = {}
          alert('Salvo com sucesso!')
          this.listar() 
          this.errors = []

      }).catch(e => {
        this.errors = e.response.data.errors
      })
        
    }
  }

  
}

</script>

<style>


</style>
