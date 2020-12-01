<template>
    <Dialog animation="animate__fadeInRight">
        <h2>Reset Password</h2><br/><hr/><br/>
        <p>Please enter your email address.</p>
        <form @submit.prevent="sendMail()">
            <InputText>
                <input type="text" name="email" id="email" v-model="data.email" @focus="errors = []">
            </InputText>
            <ErrorText target="email" v-bind:errors="this.errors"></ErrorText>
            <ErrorText target="global" v-bind:errors="this.errors"></ErrorText>
            <input type="submit">
        </form>
        <router-link to="/login"><br/>Login</router-link>
    </Dialog>
</template>

<script>
import axios from 'axios'
import qs from 'querystring'

import Dialog from '../components/Dialog';
import InputText from '../components/InputText';
import ErrorText from '../components/ErrorText';

export default {
    name: 'ResetPasswordMail',
    components: {Dialog, InputText, ErrorText},
    data(){
        return{
            data: {
                email: '',
            },
            errors: []
        }
    },
    methods: {
        sendMail: function(){
            const data = {
                email: this.data.email
            }
            axios.post('http://localhost:3000/api/auth/reset-password', qs.stringify(data))
            .then((response) => {
                if (response.data.success)this.$router.push('/reset-password/check')
            })
            .catch(error => {
                console.log(error.response);
                this.errors = error.response.data.errors
            })
        }
    }
}
</script>

<style>

</style>