<template>
  <div class="dialog-container animate__animated" v-bind:class="animation">
      <div class="dialog">
        <slot></slot>
      </div>
  </div>
</template>

<script>
export default {
    name: 'Dialog',
    props: ['animation']
}
</script>

<style scoped>
    .dialog-container {
        width: 30%;
        min-width: 300px;
        margin: auto;
        padding-top: 5%;
    }
    .dialog {
        background: #0072B5;
        height: 100%;
        border-bottom: 4px solid whitesmoke;
        padding: 1em;
        color: whitesmoke;
        text-align: left;
    }
</style>