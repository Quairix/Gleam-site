<template>
<div class="container table-responsive">
  <table id="cart" class="table table-hover table-sm cart__table">
    <thead>
      <tr>
        <th style="width:50%">Продукт</th>
        <th style="width:10%">Цена</th>
        <th style="width:8%">Количество</th>
        <th style="width:22%" class="text-center">Всего</th>
        <th style="width:10%"></th>
      </tr>
    </thead>

    <transition-group name="list-shopping-cart" tag="tbody">
      <app-cart-item v-for="cartItem in cartItemList" :cartItem="cartItem" :key="cartItem.id"></app-cart-item>
    </transition-group>
  </table>

  <div class="cart__result-wrapper">
    <strong class="cart__result">Всего {{ cartValue }}р</strong>
    <button class="cart__save" @click="saveShoppingCartLocal">
      <i class="fa fa-angle-left"></i> продолжить покупки
    </button>
    
    <button class="cart__checkout" @click="checkout">
        <span class="text-nowrap">Оформить <i class="fa fa-angle-right d-inline"></i></span>
    </button>
  </div>
</div>
</template>

<script>
import {
  mapActions,
  mapGetters
} from 'vuex';
import CartItem from './cart/CartItem.vue';
export default {
  computed: {
    ...mapGetters(['cartItemList', 'isLoggedIn', 'products', 'currentUser', 'cartValue'])
  },
  components: {
    appCartItem: CartItem
  },
  methods: {
    ...mapActions(['saveShoppingCart', 'addMessage', 'saveToTransaction', 'clearCart']),
    checkValidCart(itemList, prodList) {
      let isValid = true;
      let message = "";

      itemList.map(item => {
        for (let prodIdx = 0; prodIdx < prodList.length; prodIdx++) {
          if (prodList[prodIdx].id == item.id) {
            // if (prodList[prodIdx].quantity < item.quantity) {
            //   message = `Только ${prodList[prodIdx].quantity} ${item.title} доступно в наличии`;
            //   isValid = false;
            //   return;
            // }
            break;
          }
        }
      });
      return {
        isValid,
        message
      }
    },
    saveShoppingCartLocal() {
      if (this.isLoggedIn) {
        let {
          isValid,
          message
        } = this.checkValidCart(this.cartItemList, this.products);

        if (isValid) {
          this.saveShoppingCart({
            cartItemList: this.cartItemList,
            uid: this.currentUser.uid
          }).then(() => {
            this.addMessage({
              messageClass: 'success',
              message: 'Ваша корзина сохранена'
            });
            this.$router.push('/');
          });
        } else {
          this.addMessage({
            messageClass: 'danger',
            message: message
          });
        }
      } else {
        this.addMessage({
          messageClass: 'warning',
          message: 'Авторизуйтесь, что бы сохранить вашу корзину'
        });
      }
    },
    checkout() {
      if (this.isLoggedIn) {
        if (!this.cartItemList || this.cartItemList.length == 0) {
          this.addMessage({
            messageClass: 'warning',
            message: 'Ваша корзина пустаЯ!'
          });
          return;
        }
        let {
          isValid,
          message
        } = this.checkValidCart(this.cartItemList, this.products);

        if (isValid) {
          this.saveToTransaction({
            cartItemList: this.cartItemList,
            uid: this.currentUser.uid
          }).then(() => {
            this.addMessage({
              messageClass: 'success',
              message: 'Ваш заказ был отправлен на обработку!'
            });
            this.saveShoppingCart({
              cartItemList: [],
              uid: this.currentUser.uid
            });
            this.clearCart();
            this.$router.push('/');
          });
        } else {
          this.addMessage({
            messageClass: 'danger',
            message: message
          });
        }
      } else {
        this.addMessage({
          messageClass: 'warning',
          message: 'Пожалуйства авторизуйтесь для покупки'
        });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.list-shopping-cart-leave-active {
  transition: all 0.4s;
}

.list-shopping-cart-leave-to {
  opacity: 0;
  transform: translateX(50px);
}

.table-sm {
  font-size: 0.875rem;
  /deep/ h4 {
    font-size: 1.25rem;
  }
}
</style>
