<template>
  <div class="container">
    <div v-if="isProductLoading" class="text-center">
      <grid-loader :loading="isProductLoading" :color="loaderColor" :size="loaderSize" class="d-inline-block" />
    </div>
    <div v-else class="product">
      <img class="product__img" :src="item.thumbnail_url">
      <div class="product__wrapper">
        <h2 class="product__title">{{ item.title }}</h2>
        <h3 class="product__price">{{ item.price }} р</h3>
        <p class="product__description">{{ item.description }}</p>
        <button @click="addItem" :disabled="item.quantity === 0" class="product__btn">Добавить в корзину</button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapActions,
  mapGetters
} from 'vuex';
import GridLoader from 'vue-spinner/src/GridLoader.vue';

export default {
  components: {
    GridLoader
  },
  data() {
    return {
      loaderColor: "#5cb85c",
      loaderSize: "50px",
    }
  },
  computed: {
    ...mapGetters(['isProductLoading', 'products']),
    item() {
      let id = this.$route.params.id;
      if (Object.keys(this.products).length >= id) {
        return this.products[id];
      }
      return {};
    }
  },
  methods: {
    ...mapActions(['updateCart']),
    addItem() {
      const order = {
        item: Object.assign({}, this.item),
        quantity: 1,
        isAdd: true
      };
      // console.log(order);
      this.updateCart(order);
    }
  }
}
</script>

<style scoped>
.caption-full {
  padding-right: 10px;
  padding-left: 10px;
}

.ratings {
  padding-right: 10px;
  padding-left: 10px;
  color: #d17581;
}
</style>
