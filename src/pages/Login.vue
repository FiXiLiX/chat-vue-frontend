<template>
    <Dialog animation="animate__fadeInRight">
        <h2>Chat - Login</h2><br/><hr/>
        <div class="form-container" id="loginform">
            <form @submit.prevent="login()">
                <SuccessText v-if="this.$store.state.user.status == 'register'" text="Succesfully registred, please login" />
                <InputText>
                    <input type="text" name="username" required id="username" v-model="username" placeholder="Username..." @focus="removeErrors()">
                </InputText>
                <ErrorText target="username" v-bind:errors="this.errors"></ErrorText>
                <InputText>
                    <input type="password" name="password" required id="password" v-model="password" placeholder="Password..." @focus="removeErrors()">
                </InputText>
                <ErrorText target="password" v-bind:errors="this.errors"></ErrorText>
                <ErrorText target="global" v-bind:errors="this.errors"></ErrorText>
                <input type="submit" v-bind:value="this.loginField">
            </form>
        </div>
        <router-link to="/reset-password/email">Forgot Password?</router-link>
        <p>Don't have an Account? <router-link to="/register">Register now!</router-link></p>
    </Dialog>
</template>

<script>
import Axios from 'axios';
import qs from 'querystring';
import ErrorText from '../components/ErrorText';
import Dialog from '../components/Dialog'
import InputText from '../components/InputText';
import SuccessText from '../components/SuccessText';

export default {
    name: 'Login',
    data() {
        return{
            username: '',
            password: '',
            errors: [],
            loginField: 'Login'
        }
    },
    methods: {
        login:function (){
            this.errors = []
            this.loginField = 'Wait...'
            const data = {
                username: this.username,
                password: this.password
            }
            Axios.post('http://localhost:3000/api/auth/login', qs.stringify(data))
            .then(async response => {
                await this.$store.dispatch('login', response.data)
                this.$router.push('/')
            })
            .catch(error => {
                this.errors = error.response.data.errors
                this.loginField = 'Try Again'
            })
        },
        removeErrors:function (){
            this.errors = []
        }
    },
    components: {
        Dialog, ErrorText, InputText, SuccessText
    },
}
</script>

<style>

</style>