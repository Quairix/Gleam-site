<template>
<div class="col-11 mx-auto col-sm-10 col-md-6 col-lg-4 products__item" :class="{'list-group-item': displayList}">
      <router-link :to="'/product/' + item.id"><img :src="item.thumbnail_url" alt="" class="products__img"></router-link>
      <div class="products__wrapper">
        <router-link :to="'/product/' + item.id" tag="h5" class="products__title"><a>{{ item.title }}</a></router-link>
        <p class="products__price">{{ item.price }}р</p>
      </div>

      <p class="products__description">{{ item.description | shortDescription}}</p>
      <p class="products__type">{{ item.type | getTypeString}}</p>
      <button class="products__btn" :disabled="item.quantity === 0" @click="addItem">Добавить в корзину</button>
    </div>
</template>

<script>
import {
  mapActions
} from 'vuex';
export default {
  props: ['item', 'displayList'],
  methods: {
    ...mapActions(['updateCart']),
    addItem() {
      const order = {
        item: Object.assign({}, this.item),
        quantity: 1,
        isAdd: true
      };
      this.updateCart(order);
    }
  },
  filters: {
    shortDescription(value) {
      if (value && value.length > 100) {
        return value.substring(0, 100) + '...';
      } else {
        return value;
      }
    },
    getTypeString(value) {
      if (value == "proector") {
        return 'Проектор';
      } else {
        if (value == "merch") {
        return 'Мерч';
        } else return '';
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.item.list-group-item:before, .item.list-group-item:after
{
    display: table;
    content: " ";
}

.item.list-group-item:after {
  clear: both;
}
</style>
