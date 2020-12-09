<template>
  <div class="page-container">
    <b-container fluid>
      <b-row class="text-center justify-content-center">
        <b-col cols="6" md="4">
          <b-card class="border-0 shadow p-3 mb-5 mt-3 bg-white rounded">
            <div class="pt-sm-3 pt-md-0">
              <b-card-text class="h4">S'inscrire</b-card-text>
              <b-form>
                <b-form-group>
                  <b-form-input
                    id="firstName"
                    type="text"
                    placeholder="Prénom"
                    v-model="input.firstName"
                    class="account-input text-dark mb-2 mt-4 pl-3 w-100"
                  ></b-form-input>
                  <b-form-input
                    id="lastName"
                    type="text"
                    placeholder="Nom"
                    v-model="input.lastName"
                    class="account-input text-dark mb-2 pl-3 w-100"
                  ></b-form-input>
                  <b-form-input
                    id="email"
                    type="email"
                    placeholder="Email"
                    v-model="input.email"
                    class="account-input text-dark mb-2 pl-3 w-100"
                  ></b-form-input>
                  <b-form-input
                    id="password"
                    type="password"
                    placeholder="Mot de passe"
                    v-model="input.password"
                    class="account-input text-dark mb-2 pl-3 w-100"
                  ></b-form-input>
                </b-form-group>

                <b-button
                  v-on:click.stop="signup()"
                  type="submit"
                  id="login-button"
                  class="account-btn font-weight-bold"
                >
                  Inscription
                </b-button>
                <p class="my-3 text-danger">{{ errorMessage }}</p>
              </b-form>
            </div>
            <div class="line my-3"></div>

            <p class="font-small grey-text d-flex justify-content-center mb-1">
              Vous avez déjà un compte ?
              <router-link to="/login" class="font-weight-bold ml-1">
                Se connecter</router-link
              >
            </p>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { apiClient } from '../services/ApiClient'
import router from '../router/index'

export default {
  name: 'Signup',
  data () {
    return {
      errorMessage: '',
      input: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    signup () {
      if (
        this.input.firstName != '' &&
        this.input.lastName != '' &&
        this.input.email != '' &&
        this.input.password != ''
      ) {
        apiClient
          .post('api/auth/signup', this.input)
          .then(data => {
            if (!data.token) {
              this.errorMessage = data.error.errors[0].message
            } else {
              localStorage.setItem('userToken', data.token)
              localStorage.setItem('userData', JSON.stringify(data.user))
              router.push({ name: 'Posts' })
            }
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
</style>
