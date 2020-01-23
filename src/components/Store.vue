<template>
  <div>
    <div class="container" :class="{loadingItem: isProductLoading}">
      <div class="row text-center" v-if="isProductLoading">
        <grid-loader :loading="isProductLoading" :color="loaderColor" :size="loaderSize"></grid-loader>
      </div>
      <div class="row" v-if="!isProductLoading">
        <hooper :autoPlay="false" :itemsToShow="1">
          <slide v-for="prod in products" :item="prod" :key="prod.id" :displayList="displayList">
            <app-product-item :item="prod"></app-product-item>
          </slide>
          <hooper-navigation slot="hooper-addons"></hooper-navigation>
        </hooper>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProductItem from "./product/ProductItem.vue";
import GridLoader from "vue-spinner/src/GridLoader.vue";
import { Hooper, Slide, Navigation as HooperNavigation } from "hooper";

export default {
  data() {
    return {
      loaderColor: "#ff5c36",
      loaderSize: "30px",
      displayList: false
    };
  },
  computed: {
    ...mapGetters(["products", "isProductLoading"])
  },
  components: {
    appProductItem: ProductItem,
    GridLoader,
    Hooper,
    Slide,
    HooperNavigation
  }
};
</script>

<style>
.loadingItem {
  align-items: center;
  justify-content: center;
  display: flex;
}

.action-panel {
  margin-bottom: 10px;
  margin-right: 5px;
}
</style>
