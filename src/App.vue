<template>
<div class="d-flex flex-column sticky-footer-wrapper">
    <main class="flex-fill">
      <app-header></app-header>
      <message-component></message-component>
      <div class="container mt-3">
          <div class="row">
            <div class="col-md-12">
              <router-view></router-view>
              
            </div>
          </div>
      </div>
    </main>

    <footer>
      <ul class="social__list">
        <li><a class="social__links social__links--vk" href="vk.com">Вконтакте</a></li>
        <li><a class="social__links social__links--tw" href="twitter.com">Твиттер</a></li>
        <li><a class="social__links social__links--inst" href="instagram.com">Инстаграм</a></li>
      </ul>
      <p class="footer__copyright">© 2020 Gleam <a class="footer__link" href="https://vk.com/gleamprojector" target="_blank">https://vk.com/gleamprojector</a></p>
    </footer>
</div>

</template>

<script>
  import { mapActions } from 'vuex';
  import Header from './components/header.vue';
  import MessageComponent from './components/common/MessageComponent.vue';
  export default {
    components: {
      appHeader: Header,
      MessageComponent
    },
    methods: {
      ...mapActions(['getShoppingCart', 'listenToProductList'])
    },
    created() {
      let uid = this.$store.getters.currentUser.uid;
      this.listenToProductList();
      this.getShoppingCart({uid, currentCart: this.$store.getters.cartItemList});
    }
  }
</script>
