<template>
  <div>
    <nav class="navbar navbar-expand-sm" role="navigation">
      <div class="container">
        <!-- Brand and toggle get grouped for better mobile display -->
        <button
        class="header-top__toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTop"
        aria-controls="navbarTop"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @click="toggleNavbar">
        <span class="header-top__toggler-icon"></span>
      </button>
      <router-link to="/" class="header-top__logo">AnMoNet</router-link>     
      
      <div class="collapse navbar-collapse" id="navbarTop" :class="{show: isNavOpen}">        
     <ul class="header-top__nav-list">
            <li class="header-top__nav-item"><router-link class="header-top__nav__link" to="/">О продукте</router-link></li>
            <li class="header-top__nav-item"><router-link class="header-top__nav__link" to="/store">Купить</router-link></li>
            <li class="header-top__nav-item"><router-link class="header-top__nav__link" to="/support">Справка</router-link></li>
          </ul> 
          <ul class="header-top__user-list">
          <router-link to="/login" tag="li" v-if="!isLoggedIn" class="nav-item" active-class="active">
            <a class="header-top__user-link">Вход</a>
          </router-link>
          <li v-if="isLoggedIn" class="header-top__user-logout">
            <span>{{ userEmail }}</span>
            <a @click="logout" href="#" class="header-top__user-link">Выход</a>
          </li>
          <router-link to="/register" tag="li" v-if="!isLoggedIn" class="nav-item" active-class="active">
            <a class="header-top__user-link">Регистрация</a>
          </router-link>
          <li class="header-top__cart-wrapper">
            <router-link to="/cart" class="header-top__cart" tag="button">
              Корзина <span> ({{ cartValue }}$ )</span>
            </router-link>
          </li>
        </ul>      
  </div>
      </div>  

    <!-- /.container -->
  </nav>
 <div class="container">    
         <ul class="header-bot__list">
          <li><router-link class="header-bot__link" to="/">О продукте</router-link></li>
          <li><router-link class="header-bot__link" to="/store">Купить</router-link></li>
          <li><router-link class="header-bot__link" to="/support">Справка</router-link></li>
          <li v-if="isAdmin"><router-link class="header-bot__link" to="/add">Управление</router-link></li>
          <li v-if="isAdmin"><router-link class="header-bot__link" to="/indicators">Показатели</router-link></li>
        </ul>
</div>
</div>
</template>

<script>
import {
  mapActions, mapGetters
} from 'vuex';
export default {
  data() {
    return {
      isNavOpen: false
    }
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'cartValue', 'currentUser', 'cartItemList']),
    numItems() {
      return this.cartItemList.reduce((total, item) => {
        total += item.quantity;
        return total
      }, 0);
    },
    userEmail() {
      return this.isLoggedIn ? this.currentUser.email : ''
    },
    isAdmin(){
      return this.userEmail == "alad_nastya@mail.ru"
    }
  },
  methods: {
    ...mapActions(['logout']),
    toggleNavbar() {
      this.isNavOpen = !this.isNavOpen
    }
  }
}
</script>