<template>
  <div class="page-container">
    <div class="container-fluid">
      <div class="row text-center justify-content-center">
        <div class="col-6 col-md-4">
          <b-card class="border-0 shadow p-3 mb-5 mt-3 bg-white rounded">
            <b-card-text class="h4 mt-2">S'inscrire</b-card-text>
            <div class="card-body pt-sm-3 pt-md-0">
              <b-form>
                <b-form-group>
                  <b-form-input id="email" type="email" placeholder="Email" v-model="input.email"
                    class="text-dark mb-2 mt-4 pl-3 w-100"></b-form-input>
                  <b-form-input id="password" type="password" placeholder="Mot de passe" v-model="input.password"
                    class="text-dark mb-2 pl-3 w-100"></b-form-input>
                </b-form-group>

                <b-button type="button" v-on:click="signup()" variant="danger" id="login-button"
                  class="font-weight-bold">
                  Inscription
                </b-button>
                <p class="mx-2">{{ errorMessage }}</p>
              </b-form>
            </div>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { apiClient } from '../services/ApiClient'
  import router from '../router/index'

  export default {
    name: 'Signup',
    data() {
      return {
        errorMessage: '',
        input: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      signup() {
        if (this.input.email != '' && this.input.password != '') {
          apiClient
            .post('api/auth/signup', this.input)
            .then(data => {
              localStorage.setItem('Usertoken', data.token)
              router.push('/posts')
            })
            .catch(error => {
              console.log({ error: error })
              this.errorMessage = 'Problème de connexion'
            })
        } else {
          this.errorMessage = 'Veuillez renseigner un email et un mot de passe'
        }
      }
    }
  }
</script>

<style lang="scss">
  a {
    text-decoration: none;
    color: #2c3e50 !important;
  }

  #email,
  #password {
    &:-webkit-autofill {
      border: 1px solid rgba(225, 83, 97, 0.5);
      -webkit-text-fill-color: #212529;
      -webkit-box-shadow: 0 0 0px 1000px rgba(225, 83, 97, 0.2) inset;
      transition: background-color 5000s ease-in-out 0s;
    }

    &:focus {
      border: 1px solid rgba(209, 37, 55, 0.5);
      border-radius: 6px;
      outline: 0;
      box-shadow: 0 0 0 0.2rem rgba(225, 83, 97, 0.5);
    }
  }
</style>