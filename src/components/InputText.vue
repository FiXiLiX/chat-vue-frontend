<template>
  <div>
      <slot></slot>
  </div>
</template>

<script>
export default {
 name: 'InputText'
}
</script>

<style scoped>
input[type=text], input[type=password] {
  width: 100%;
  font-size: 1.3em;
  margin: 0em 0em;
  border: none;
  
}

input:focus {
    outline: none;
}

div {
    background-color: white;
    padding: 0.4em;
    border: none;
    margin: 0.5em 0em;
}
</style>