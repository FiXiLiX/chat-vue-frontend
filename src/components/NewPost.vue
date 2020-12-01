<template>
    <div class="post-container">
      <div class="post">
        <label for="post-content">
          <h3>Post something: <br/>
          <button v-if="this.type!='1'" class="image-btn" @click="type='1'"><i class="fas fa-camera"></i> Image</button>
          <button v-if="this.type!='0'" class="image-btn" @click="type='0'"><i class="fas fa-align-justify"></i> Text</button>
          </h3>
        </label><br/>
        <!-- Text input -->
        <div v-if="this.type==='0'">
          <form @submit.prevent="addTextPost">
            <textarea class="post-content" v-model="value"></textarea>
            <button>Post</button>
          </form>
        </div>
        <!-- Image input -->
        <div v-else-if="this.type==='1'">
          <form @submit.prevent="addImagePost">
            <img class="preview-image" v-if="this.image.url!=null" v-bind:src="this.image.url" />

            <div v-if="this.image.url===null" class="Neon Neon-theme-dragdropbox">
              <input @change="this.previewImages" style="z-index: 999; opacity: 0; width: 320px; height: 200px; position: absolute; right: 0px; left: 0px; margin-right: auto; margin-left: auto;" name="file" id="filer_input2" type="file">
              <div class="Neon-input-dragDrop">
                <div class="Neon-input-inner">
                  <div class="Neon-input-icon">
                    <i class="fa fa-file-image-o"></i>
                  </div>
                  <div class="Neon-input-text">
                    <h3>Drag&amp;Drop files here</h3>
                     <span style="display:inline-block; margin: 15px 0">or</span>
                  </div>
                  <a class="Neon-input-choose-btn blue">Browse Files</a>
                </div>
              </div>
            </div>
            <label>Write something about the image:</label>
            <textarea class="image-content" v-model="value"></textarea>
            <button>Post</button>
          </form>
        </div>
        <!--  -->
      </div>
    </div>
</template>

<script>
import axios from 'axios';
import qs from 'querystring';
export default {
    name : 'NewPost',
    data(){return{
        value: '',
        type: '0',
        user: {},
        image: {
          url: null,
          file: null
        }
    }},
    methods: {
      addTextPost : function() {
        const data = {
          value: this.value,
          type: this.type
        }
        console.log(data);
        axios.post('http://localhost:3000/api/posts', qs.stringify(data), {
          headers: {'Authorization': this.$store.state.user.token}
        })
        .then((response) => {
          this.$emit('newPost', response.data)
          this.value = ''
        })
        .catch((error) => {
          this.errors = error.response.data.errors
        })
      },
      previewImages: function(event){
        const file = event.target.files[0];
        this.image.file = file
        this.image.url = URL.createObjectURL(file);
      },
      addImagePost : function(){
        let formData = new FormData()
        let inputImage = this.image.file
        formData.append('file', inputImage, inputImage.name)
        formData.append('value', this.value)
        formData.append('type', this.type)

        axios.post('http://localhost:3000/api/posts/image', qs.stringify(formData))
        .then(() => {

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
.image-content {
  width: 100%;
  height: 3em;
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
.image-btn {
  background-color: white;
  color: black;
}
button:focus{
  border: none;
  outline: 1px solid black;
}

.Neon {
    font-family: sans-serif;
    font-size: 14px;
    color: #494949;
    position: relative;
    

}
.Neon * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
.Neon-input-dragDrop {
    display: block;
    width: 100%;
    margin: 0 auto 25px auto;
    padding: 25px;
    color: #8d9499;
    color: #97A1A8;
    background: #fff;
    border: 2px dashed #C8CBCE;
    text-align: center;
    -webkit-transition: box-shadow 0.3s, border-color 0.3s;
    -moz-transition: box-shadow 0.3s, border-color 0.3s;
    transition: box-shadow 0.3s, border-color 0.3s;
}
.Neon-input-dragDrop .Neon-input-icon {
    font-size: 48px;
    margin-top: -10px;
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    transition: all 0.3s ease;
}
.Neon-input-text h3 {
    margin: 0;
    font-size: 18px;
}
.Neon-input-text span {
    font-size: 12px;
}
.Neon-input-choose-btn.blue {
    color: #008BFF;
    border: 1px solid #008BFF;
}
.Neon-input-choose-btn {
    display: inline-block;
    padding: 8px 14px;
    outline: none;
    cursor: pointer;
    text-decoration: none;
    text-align: center;
    white-space: nowrap;
    font-size: 12px;
    font-weight: bold;
    color: #8d9496;
    border-radius: 3px;
    border: 1px solid #c6c6c6;
    vertical-align: middle;
    background-color: #fff;
    box-shadow: 0px 1px 5px rgba(0,0,0,0.05);
    -webkit-transition: all 0.2s;
    -moz-transition: all 0.2s;
    transition: all 0.2s;
}
.preview-image {
  width: 100%;
}
</style>