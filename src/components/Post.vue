<template>
  <div class="post-container">
      <div class="post">
          <h2>
            <router-link v-bind:to="'/user/' + this.postData.user.username">
            {{this.postData.user.username}}
            </router-link>
            <button v-if="this.postData.user._id===this.$store.state.user.data._id" class="edit-btn post-btn"><i class="fas fa-pencil-alt"></i></button>
            <button @click="this.deletePost" v-if="this.postData.user._id===this.$store.state.user.data._id" class="delete-btn post-btn"><i class="far fa-trash-alt"></i></button>
          </h2>
          <br/>
          <p v-html="this.postData.post.value"></p>
          <h3>
            {{this.postData.post.likes}} 
            <button @click="this.reactLike" class="edit-btn post-btn"><i class="far fa-thumbs-up"></i></button>
            <button @click="this.reactDislike" class="delete-btn post-btn"><i class="far fa-thumbs-down"></i></button> 
            {{this.postData.post.dislikes}}
          </h3>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import qs from 'querystring'
export default {
    name: 'Post',
    props: ['postData'],
    data(){return{
      reacting: false
    }},
    methods: {
      deletePost: function(){
        const postId = this.postData.post._id
        axios.delete('http://localhost:3000/api/posts/' + postId, { 
          headers:{'Authorization': this.$store.state.user.token}
          })
          .then(() => {
            this.$emit('postDeleted', postId)
          })
          .catch((error) => {
            this.errors = error.response.data.errors
          })
      },
      reactLike: function(){
        if(this.reacting)return;
        this.reacting = true
        const postId = this.postData.post._id
        axios.put('http://localhost:3000/api/posts/' + postId + '/reaction', qs.stringify({reactionType: false}) ,{headers:{
          'Authorization': this.$store.state.user.token
        }})
        .then((response) => {
          this.postData.post.likes = response.data.likes
          this.postData.post.dislikes = response.data.dislikes
          this.reacting = false
        })
        .catch((error) => {
          console.log(error);
        })
      },
      reactDislike: function(){
        if(this.reacting)return;
        this.reacting = true
        const postId = this.postData.post._id
        axios.put('http://localhost:3000/api/posts/' + postId + '/reaction', qs.stringify({reactionType: true}) ,{headers:{
          'Authorization': this.$store.state.user.token
        }})
        .then((response) => {
          this.postData.post.likes = response.data.likes
          this.postData.post.dislikes = response.data.dislikes
          this.reacting = false
        })
        .catch((error) => {
          console.log(error);
        })
      }
    }
}
</script>

<style scoped>
.post-container {
  padding: 1em 1em 0 1em;
  max-width: 800px;
}

.post {
  background-color: #0072B5;  
  box-shadow: 0px 5px 5px gray;
  padding: 1em;
  color: white;
}
.post-content {
  width: 100%;
  height: 10em;
}
button {
  margin-top: 0.9em;
}
textarea {
    font-size:1.4em;
}
textarea:focus {
    outline: none;
}
a {
  text-decoration: none;
}
.post-btn {
  padding: 0.1em 0.25em;
  color: white;
  margin: 0 0 0 0.3em;
  border-radius: 5px;
}
.delete-btn {
  background-color: red;
}
.edit-btn {
  background-color: green;
}
.post-btn:focus {
  border: 1px solid white;
}
</style>