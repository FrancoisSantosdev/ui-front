<template>
  <div id="app">

    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Users Work</a>
      </div>
    </nav>

    

    <div class="container">

      <form>

          <label>Nome</label>
          <input type="text" placeholder="Nome">
          <label>Quantidade</label>
          <input type="number" placeholder="QTD">
          <label>Valor</label>
          <input type="text" placeholder="Valor">

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
            <td>{{ user.proficao }}</td>
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
      usersArray: []
    }
  },

  mounted(){
    Users.listar().then(resposta => {
      console.log(resposta.data.users)
      this.usersArray = resposta.data.users
    })
  }
}

</script>

<style>


</style>
