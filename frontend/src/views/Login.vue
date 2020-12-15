<template>
  <div class="page-container">
    <b-container fluid>
      <b-row class="text-center justify-content-center">
        <b-col cols="12" lg="4">
          <b-card class="border-0 shadow p-3 mb-5 mt-3 bg-white rounded">
            <div class="pt-sm-3 pt-lg-0">
              <b-card-text class="login-text h4">Se connecter</b-card-text>

              <b-form>
                <b-form-group>
                  <b-form-input
                    id="email"
                    type="email"
                    placeholder="Email"
                    v-model="input.email"
                    class="account-input text-dark mb-2 mt-4 pl-3 w-100"
                  ></b-form-input>
                  <b-form-input
                    id="password"
                    type="password"
                    placeholder="Mot de passe"
                    v-model="input.password"
                    class="account-input text-dark mb-2 pl-3 w-100"
                  ></b-form-input>
                </b-form-group>

                <button
                  v-on:click.stop="login()"
                  type="submit"
                  id="login-button"
                  class="account-btn font-weight-bold"
                >
                  Connexion
                </button>
                <p class="my-3 text-danger">{{ errorMessage }}</p>
              </b-form>
            </div>
            <div class="line my-3"></div>

            <p class="font-small grey-text d-flex justify-content-center mb-1">
              Vous n'êtes pas encore inscrit ?
              <router-link to="/signup" class="font-weight-bold ml-1">
                Créer un compte</router-link
              >
            </p>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Signup from '../components/Signup'
import { apiClient } from '../services/ApiClient'
import router from '../router/index'

export default {
  name: 'Login',
  components: {
    Signup
  },
  data () {
    return {
      errorMessage: '',
      input: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      if (this.input.email != '' && this.input.password != '') {
        apiClient
          .post('api/auth/login', this.input)
          .then(data => {
            if (!data.token) {
              this.errorMessage = 'Mot de passe incorrect'
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

.line {
  display: block;
  width: 100%;
  height: 1px;
  background-color: rgba(192, 192, 192, 0.5);
}

.account-input {
  &:-webkit-autofill {
    border: none;
    -webkit-text-fill-color: #212529;
    -webkit-box-shadow: 0 0 0px 1000px rgba(32, 120, 244, 0.2) inset;
    transition: background-color 5000s ease-in-out 0s;
  }
  &:focus {
    border: none;
    border-radius: 6px;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(32, 120, 244, 0.5);
  }
}

@media screen and (min-width: 280px) and (max-width: 769px) {
  .card-body {
    padding: 0.7rem;
  }

  .shadow {
    box-shadow: 0rem 0.2rem 0.5rem rgba(0, 0, 0, 0.08) !important;
  }

  .login-text {
    font-size: 1.1rem;
  }
}
</style>
