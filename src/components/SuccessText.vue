<template>
  <div id="test">
      <p>{{this.text}}</p>
  </div>
</template>

<script>
export default {
    name: 'SuccessText',
    props: ['text']
}
</script>

<style scoped>
#test {
    text-align: left;
    color: green;
    background-color: white;
    border-bottom: green 1px solid;
    margin: 0.4em 0;
    padding: 0.3em 0;
}

p {
    padding: 0.2em 0.5em;
}
</style>