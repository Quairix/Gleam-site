<template>  
<div>
          <div id="dashboard">
  <p>Добавить товар</p>
        <section>
            <div class="col1">
                <div class="profile">
                    <h5>{{ ProductItem.name }}</h5>
                    <p>{{ ProductItem.title }}</p>
                    <div class="create-post">
                        <p>create a post</p>
                        <form @submit.prevent>
                            <textarea></textarea>
                            <button class="button">post</button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col2">
                <div>
                    <p class="no-results">There are currently no posts</p>
                </div>
            </div>
        </section>
    </div>
</div>
</template>
<script>
    import {
  mapActions
} from 'vuex';
export default {
  props: ['item', 'displayList'],
  methods: {
    ...mapActions(['addMessage', 'saveToProducts']),
    add(){
    this.saveToProducts({
            ProductItem: this.ProductItem
          }).then(() => {
            this.addMessage({
              messageClass: 'success',
              message: 'Ваш товар был добавлен!'
            });
            this.saveShoppingCart({
              cartItemList: [],
              uid: this.currentUser.uid
            });
            this.clearCart();
            this.$router.push('/');
          });
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
<style>
.CENA{
  width: 200px;
}

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
