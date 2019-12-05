<template>
<div>
  <nav class="navbar navbar-expand-sm" role="navigation">
    <div class="container">
      <!-- Brand and toggle get grouped for better mobile display -->
      <router-link to="/" class="navbar-brand mr-auto">Gleam</router-link>
      <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTop"
          aria-controls="navbarTop"
          aria-expanded="false"
          aria-label="Toggle navigation"
          @click="toggleNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- <ul class="social__list">
        <li><a class="social__links social__links--vk" href="vk.com">Вконтакте</a></li>
        <li><a class="social__links social__links--tw" href="twitter.com">Твиттер</a></li>
        <li><a class="social__links social__links--inst" href="instagram.com">Инстаграм</a></li>
      </ul> -->

      <div class="collapse navbar-collapse" id="navbarTop" :class="{show: isNavOpen}">
        <ul class="navbar-nav mr-auto">
          <li class="navbar-nav__links"><router-link class="main-nav__link" to="/">Главная</router-link></li>
          <li class="navbar-nav__links"><router-link class="main-nav__link" to="/store">Товары</router-link></li>
          <li class="navbar-nav__links"><router-link class="main-nav__link" to="/about">О нас</router-link></li>
          <li class="navbar-nav__links"><router-link class="main-nav__link" to="/support">Тех. поддержка</router-link></li>
        </ul>
        <ul class="nav navbar-nav">
          <router-link to="/login" tag="li" v-if="!isLoggedIn" class="nav-item" active-class="active">
            <a class="nav-link">Вход</a>
          </router-link>
          <li v-if="isLoggedIn" class="li-pointer nav-item">
            <a @click="logout" class="nav-link">Выход {{ userEmail }}</a>
          </li>
          <router-link to="/register" tag="li" v-if="!isLoggedIn" class="nav-item" active-class="active">
            <a class="nav-link">Регистрация</a>
          </router-link>
          <li>
            <router-link to="/cart" class="btn btn-success navbar-btn" tag="button">
              Корзина <span class="badge badge-light">{{ numItems }} (Руб {{ cartValue }})</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <!-- /.container -->
  </nav>
  <div class="container">
    <ul class="main-nav__list">
      <li><router-link class="main-nav__link" to="/">Главная</router-link></li>
      <li><router-link class="main-nav__link" to="/store">Товары</router-link></li>
      <li><router-link class="main-nav__link" to="/about">О нас</router-link></li>
      <li><router-link class="main-nav__link" to="/support">Тех. поддержка</router-link></li>
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


<style scoped lange="sass">
.navbar-btn a {
  color: white;
}

.li-pointer {
  cursor: pointer;
}

.li-pointer:hover {
  cursor: pointer;
}
</style>
