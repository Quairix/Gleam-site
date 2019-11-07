import addBlog from './components/addBlog.vue';
import showBlogs from './components/showBlogs.vue';
import singleBlog from './components/singleBlog.vue';
import mainPage from './components/mainPage.vue';

export default [
    { path: '/list', component: showBlogs},
    { path: '/add', component: addBlog},
    { path: '/blog/:id', component: singleBlog},
    { path: '/', component: mainPage}
]
