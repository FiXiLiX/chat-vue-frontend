<template>
  <div>
    <NavBar></NavBar>
    <NewPost @newPost="addNewPost"></NewPost>
    <Post @postDeleted="deletePost" v-for="post in posts" v-bind:key="post._id" v-bind:postData="post"></Post>
  </div>
</template>

<script>
import axios from 'axios';
import NavBar from '../components/NavBar.vue';
import NewPost from '../components/NewPost.vue';
import Post from '../components/Post.vue';

export default {
    name: 'Home',
    data(){return{
      posts: []
    }},
    sockets: {
      connect: function() {
        console.log('connected bic');
      },
    },
    components: {NavBar, NewPost, Post},
    created: function(){
      axios.get('http://localhost:3000/api/posts/page/1', {headers: {
        'Authorization': this.$store.state.user.token
      }})
      .then(response => {
        console.log(response.data);
        response.data.posts.forEach(post => {
          this.posts.unshift(post)
        });
      })
    },
    methods: {
      addNewPost: function(post){
        this.posts.unshift(post)
      },
      deletePost: function(postId){
        for(var i = 0; i < this.posts.length; i++){
          if(postId == this.posts[i].post._id){
            this.posts.splice(i, 1)
          }
        }
      }
    }
}
</script>

<style scoped>
</style>