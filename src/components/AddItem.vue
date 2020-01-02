<template>
  <div>
    <div id="dashboard">
      <section>
        <div class="panel panel-default" v-if="isAdmin">
          <div class="panel-heading">
            <h3 class="panel-title">Добавить товар</h3>
          </div>
          <form form id="form" @submit.prevent>
            <div class="form-group">
              <label for="productTitle">Название:</label>
              <input ref="title" class="form-control" v-model.trim="newProduct.title" type="text" />
            </div>
            <div class="form-group">
              <label for="productDescription">Описание:</label>
              <textarea class="form-control" v-model="newProduct.description" type="text"></textarea>
            </div>
            <div class="form-group">
              <label for="productPrice">Цена:</label>
              <input class="form-control" v-model="newProduct.price" type="number" />
            </div>
            <div class="form-group">
              <label for="productId">Id:</label>
              <input id="ProductId" class="form-control" v-model="newProduct.id" type="text" />
            </div>
            <div class="form-group">
              <label for="productURL">URL изображения:</label>
              <input class="form-control" v-model="newProduct.thumbnail_url" type="text" />
            </div>
            <div class="form-group">
              <label for="productType">Тип:</label>
              <input
                id="productType"
                class="form-control"
                value="proector"
                v-model="newProduct.type"
                type="text"
              />
            </div>
            <button style="color:white;" class="btn btn-primary" @click="addProduct">Добавить</button>
          </form>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { productsRef } from "../config/firebaseConfig";
export default {
  data() {
    return {
      newProduct: {
        title: "Title",
        description: "Description",
        id: 123,
        price: 1000,
        thumbnail_url:
          "https://sun9-23.userapi.com/c204628/v204628644/283e/ItIPEowth6U.jpg",
        type: "proector"
      }
    };
  },
  computed:{
    ...mapGetters(["isLoggedIn", "currentUser"]),
    
    userEmail() {
      return this.isLoggedIn ? this.currentUser.email : ''
    },
    isAdmin(){
      console.log(this.userEmail == "user@mail.com");
      return this.userEmail == "user@mail.com"
    }
  },
  methods: {
    ...mapActions(["addMessage"]),
    addProduct() {
      productsRef.push(this.newProduct);

      this.addMessage({
        messageClass: "success",
        message: "Ваш товар был добавлен!"
      });
    }
  },
  filters: {}
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
