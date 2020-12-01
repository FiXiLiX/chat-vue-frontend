<template>
<div class="app-container">
  <router-view></router-view>
</div>
</template>

<script>
import Vue from 'vue'
import store from './store'
import VueRouter from 'vue-router'

import Login from './pages/Login'
import Register from './pages/Register'
import ResetPasswordMail from './pages/ResetPasswordMail'
import ResetPasswordCheck from './pages/ResetPasswordCheck'
import Home from './pages/Home'
// import VueSocketIO from 'vue-socket.io'

// Vue.use(new VueSocketIO({
//     debug: false,
//     connection: 'http://localhost:3000',
//     vuex: {
//         store,
//         actionPrefix: 'SOCKET_',
//         mutationPrefix: 'SOCKET_'
//     },
//     options: { path: "/" } //Optional options
// }))

Vue.use(VueRouter);

const guardOnlyLogged = (to, from, next) => {
  console.log(store.state.user.status)
  if(store.state.user.status != 'logged')next('/login')
  else next()
}

const guardOnlyGuest = (to, from, next) => {
  const {status} = store.state.user
  if(status != 'guest' && status != 'register')next('/')
  else next()
}

const logout = (to, from, next) => {
  store.dispatch('logout')
  next('/login')
}

const routes = [
  //Auth
  { path: '/login', component: Login, beforeEnter: guardOnlyGuest },
  { path: '/register', component: Register },
  { path: '/logout', component: {template: '<p>/</p>'}, beforeEnter: logout },
  //Reset password
  { 'path': '/reset-password/email', component: ResetPasswordMail},
  { 'path': '/reset-password/check', component: ResetPasswordCheck},
  //
  { path: '/', component: Home, beforeEnter: guardOnlyLogged }
]

const router = new VueRouter({routes})

export default {
  name: 'App',
  router,
  store
}
</script>

<style>
html{ 
  background: url(~@/images/background.png) no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
* {
  margin: 0;
  padding: 0;
  font-family: Arial, Helvetica, sans-serif;
}
#loginform {
  padding: 2em 0em 1em 0em;
}

a {
  color: white;
}

input[type=submit], button {
  padding: 0.5em 1em; 
  font-size: 1.0em;
  background-color: white;
  border: none;
}

input[type=submit]:focus, button:focus {
  outline: none;
  border-radius: none;
  border: 1px solid black;
}

.error-text{
  color: red;
  margin: 0.5em 0;
  padding: 0.4em; 
  background-color: white;
  border-radius: 5px;
  border: 1px solid red;  
}
</style>
