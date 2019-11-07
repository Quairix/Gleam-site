<template>
  <div id="add-blog">
    <h2>Добавление новой модели</h2>
    <v-btn @click.native="selectFile" v-if="!uploadEnd && !uploading">
      Upload a cover image
      <v-icon right aria-hidden="true">add_a_photo</v-icon>
    </v-btn>
    <form v-if="!submitted">
        <input
      id="files"
      type="file"
      name="file"
      ref="uploadInput"
      accept="image/*"
      :multiple="false"
      @change="detectFiles($event)" />
      <label>Название:</label>
      <input type="text" v-model.lazy="blog.title" required />
      <label>Описание:</label>
      <textarea v-model.lazy.trim="blog.content"></textarea>
      <div id="checkboxes">
        <p>Категории:</p>
        <label>VGA</label>
        <input type="checkbox" value="VGA" v-model="blog.categories" />
        <label>HDMI</label>
        <input type="checkbox" value="HDMI" v-model="blog.categories" />
        <label>USB</label>
        <input type="checkbox" value="USB" v-model="blog.categories" />
        <label>Wi-Fi</label>
        <input type="checkbox" value="Wi-Fi" v-model="blog.categories" />
      </div>
      <label>Страна производства:</label>
      <select v-model="blog.author">
        <option v-for="author in authors">{{ author }}</option>
      </select>
      <hr />
      <button v-on:click.prevent="post">Добавить</button>
    </form>
    <div v-if="submitted">
      <h3>Модель добавлена.</h3>
    </div>
  </div>
</template>

<script>
// Imports

export default {
  data() {
    return {
      blog: {
        title: "",
        content: "",
        image: null,
        categories: [],
        author: ""
      },
      authors: ["Китай1", "Китай2", "Китай3"],
      submitted: false
    };
  },
  methods: {
    post: function() {
      this.$http
        .post("https://gleam-1cb98.firebaseio.com/posts.json", this.blog)
        .then(function(data) {
          console.log(data);
          this.submitted = true;
        });
    }
  }
};
</script>

<style scoped>
#add-blog * {
  box-sizing: border-box;
}
#add-blog {
  margin: 20px auto;
  max-width: 600px;
  padding: 20px;
}
label {
  display: block;
  margin: 20px 0 0px;
}
input[type="text"],
textarea,
select {
  display: block;
  width: 100%;
  padding: 8px;
}
textarea {
  height: 200px;
}
#preview {
  padding: 10px 20px;
  border: 1px dotted #ccc;
  margin: 30px 0;
}
h3 {
  margin-top: 10px;
}
#checkboxes input {
  display: inline-block;
  margin-right: 20px;
}
#checkboxes label {
  display: inline-block;
  margin-top: 0;
}
hr {
  display: none;
}
button {
  display: block;
  margin: 20px 0;
  background: crimson;
  color: #fff;
  border: 0;
  padding: 14px;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;
}
</style>
