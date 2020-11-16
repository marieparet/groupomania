<template>
  <div class="page-container">
    <div class="container-fluid">
      <div class="row text-center justify-content-center">
        <div class="col-6 col-md-4">
          <b-card>
            <b-card-text class="h4">Se connecter</b-card-text>
            <div class="card-body pt-sm-3 pt-md-0">
              <b-form>
                <b-form-group>
                  <b-form-input
                    id="email"
                    type="email"
                    placeholder="Email"
                    v-model="input.email"
                    class="text-dark mb-2 mt-4 pl-3 w-100"
                  ></b-form-input>
                  <b-form-input
                    id="password"
                    type="password"
                    placeholder="Mot de passe"
                    v-model="input.password"
                    class="text-dark mb-2 pl-3 w-100"
                  ></b-form-input>
                </b-form-group>

                <b-button
                  type="button"
                  v-on:click="login()"
                  variant="danger"
                  id="login-button"
                  class="font-weight-bold"
                >
                  Connexion
                </b-button>
                <p>{{ errorMessage }}</p>
              </b-form>
            </div>

            <p class="font-small grey-text d-flex justify-content-center">
              Vous n'êtes pas encore inscrit ?
              <a href="#" class="font-weight-bold ml-1"> Créer un compte</a>
            </p>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiClient } from '../services/ApiClient'

export default {
  name: 'Login',
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
              localStorage.setItem('Usertoken', data.token)
              //window.location.replace('./secure')
              apiClient.get('api/posts')
            }
          })
          .catch(error => {
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

input {
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  :-webkit-autofill {
    border: 1px solid rgba(235, 202, 225, 0.3);
    -webkit-text-fill-color: #212529;
    -webkit-box-shadow: 0 0 0px 1000px rgba(235, 202, 225, 0.3) inset;
    transition: background-color 5000s ease-in-out 0s;
  }
}

input:focus,
button:focus {
  border: 1px solid rgb(235, 202, 225);
  border-radius: 6px;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(235, 202, 225, 0.5);
}
</style>
