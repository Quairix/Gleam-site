<template>
    <div id="single-blog">
        <h1>{{ blog.title }}</h1>
        <h3>{{ blog.price }}</h3>
        <article>{{ blog.content }}</article>
        <p>Производитель: {{ blog.author }}</p>
        <p>Категории:</p>
        <ul>
            <li v-for="category in blog.categories">{{ category }}</li>
        </ul>
        </div>
    </div>
</template>

<script>
// Imports
import searchMixin from '../mixins/searchMixin';

export default {
    data () {
        return {
            id: this.$route.params.id,
            blog: {}
        }
    },
    created() {
        this.$http.get('https://gleam-1cb98.firebaseio.com/posts/' + this.id + '.json').then(function(data){
            return data.json();
        }).then(function(data){
            this.blog = data;
        });
    }
}
</script>

<style>
#single-blog{
    max-width: 960px;
    margin: 0 auto;
    padding: 20px;
    background: #eee;
    border: 1px dotted #aaa;
}
</style>
