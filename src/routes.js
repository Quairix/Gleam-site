import Store from './components/Store.vue';
import Index from './components/Index.vue';
import About from './components/About.vue';
import Support from './components/Support.vue';
import ShoppingCart from './components/ShoppingCart.vue';
import ProductDetails from './components/ProductDetails.vue';
import Login from './components/auth/Login.vue';
import Register from './components/auth/Register.vue';
import AddItem from './components/AddItem.vue';

export const routes = [
	{path: '/', component: Index, name: 'indexpage'},
	{path: '/store', component: Store, name: 'mainpage'},
	{path: '/about', component: About, name: 'about'},
	{path: '/support', component: Support, name: 'support'},
	{path: '/product/:id', component: ProductDetails, name: 'product'},
	{path: '/cart', component: ShoppingCart, name: 'shoppingcart'},
	{path: '/login', component: Login, name: 'login', onlyGuest: true },
	{path: '/register', component: Register, name: 'register', onlyGuest: true},
	{path: '/add', component: AddItem, name: 'add', onlyGuest: true},
	{path: '*', redirect: '/' }
];