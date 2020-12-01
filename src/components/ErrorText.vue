<template>
<div v-if="errors.length > 0" >
    <div id="" v-for="error in this.errors" v-bind:key="error.msg">
        <div id="test" v-if="error.param === target">
            <p>{{error.msg}}</p>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'ErrorText',
    props: ['errors', 'target']
}
</script>

<style scoped>
    #test {
        text-align: left;
        color: red;
        background-color: white;
        border-bottom: red 1px solid;
        margin: 0.4em 0;
        padding: 0.3em 0;
    }

    p {
        padding: 0.2em 0.5em;
    }
</style>