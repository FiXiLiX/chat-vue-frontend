<template>
  <Dialog animation="animate__fadeInRight">
      <h2>Register</h2><br/><hr/><br/>
      <div class="form-container">
          <form @submit.prevent="register()">
            <InputText>
                <input type="text" @focus="removeErrors()" name="username" required id="username" v-model="userdata.username" placeholder="Username...">
            </InputText> 
            <ErrorText target="username" v-bind:errors="this.errors" />
            <InputText>
             <input type="text" @focus="removeErrors()" name="email" required id="email" v-model="userdata.email" placeholder="Email...">
            </InputText>
            <ErrorText target="email" v-bind:errors="this.errors" />
            <InputText>
                <input type="password" @focus="removeErrors()" name="password" required id="password" v-model="userdata.password" placeholder="Password...">
            </InputText>
            <ErrorText target="password" v-bind:errors="this.errors" />
            <ErrorText target="global" v-bind:errors="this.errors" />
            <input type="submit" v-bind:value="this.registerButtonText" />
          </form>
      </div><br/>
      Already have an Account? <router-link to="/login">Sing In</router-link>
  </Dialog>
</template>

<script>
import Dialog from '../components/Dialog'
import Axios from 'axios';
import InputText from '../components/InputText';
import ErrorText from '../components/ErrorText';
import querystring from 'querystring';
export default {
    name: 'Register',
    data(){
        return {
            userdata: {
                username: '',
                password: '',
                email: ''
            },
            errors: [],
            registerButtonText: 'Register'
        }
    },
    methods: {
        register: function (){
            this.errors = []
            this.registerButtonText = 'Wait...'
            const {username, password, email} = this.userdata
            const data = {
                username, password, email
            }
            Axios.post('http://localhost:3000/api/auth/register', querystring.stringify(data))
            .then(() => {
                this.$store.dispatch('register')
                this.$router.push('/login')
            })
            .catch(error => {
                this.errors = error.response.data.errors
                this.registerButtonText = 'Try Again'
            })
        },
        removeErrors: function(){
            this.errors = []
        }
    },
    components: {Dialog, InputText, ErrorText}
}
</script>

<style>

</style>