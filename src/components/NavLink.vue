<template>
    <p><br/><router-link v-bind:to="this.to"><slot></slot></router-link></p>
</template>

<script>
export default {
    name: 'NavLink',
    props: ['to']
}
</script>

<style scoped>
a {
    text-decoration: none;
    width: 100px;
    height: 50px;   
    padding: 1em 1em;
}

a:hover {
    border-bottom: 2px solid white;
}
</style>