<template>
  <div class="navbar">
      <ul>
          <li><NavLink to="/profile"><i class="far fa-user"></i> {{this.$store.state.user.data.username}}</NavLink></li>
          <li><NavLink to="/"><i class="fas fa-home"></i> Home</NavLink></li>
          <li><NavLink to="/logout"><i class="fas fa-sign-out-alt"></i> Logout</NavLink></li>
      </ul>
  </div>
</template>

<script>
import NavLink from './NavLink.vue';
export default {
    name: 'NavBar',
    components: {NavLink},
}
</script>

<style scoped>
.navbar {
    height: 50px;
    width: 100%;
    background-color: #0072B5;  
    box-shadow: 0px 5px 5px gray;
}
ul {
    list-style-type: none;
}
li {
    float: left;
}
a {
    text-decoration: none;
}
</style>