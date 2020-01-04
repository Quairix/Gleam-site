<template >
  <div>
    <div id="dashboard" v-if="isAdmin">
      <section>
        <div class="panel panel-default">
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
      <hr />
      <hr />
      <div>
        <h2>Заказы</h2>
        <div v-if="trUsers.length">
          <export-excel
          style="color:white;" 
            class="btn btn-primary"
            :data="excelData"
            :fields="json_fields"
            worksheet="My Worksheet"
            name="filename.xls"
          >Выгрузить в Excel</export-excel>
          <div v-for="u in trUsers" :item="u" :key="u.id">
            <div class="t1">Пользователь: "{{ u.id }}"
            <div v-for="o in u.orders.orders" :item="o" :key="o.id">
                <div class="t2">Заказ: "{{ o.id }}"
              <div v-for="i in o.items.items" :item="i" :key="i.id">
                <div class="t3">Товар: id {{ i.id }} - цена {{ i.price}} - количество {{i.quantity}}</div>
              </div></div>
              <hr />
            </div>
          </div></div>
        </div>
        <div v-else>
          <p>Нет заказов</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { productsRef, transactionsRef } from "../config/firebaseConfig";

export default {
  data() {
    return {
      json_fields: {
        User: "user",
        Order: "order",
        ItemId: "itemId",
        ItemCount: "itemCount",
        ItemPrice: "itemPrice"
      },
      trUsers: [],
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

  computed: {
    ...mapGetters(["isLoggedIn", "currentUser"]),

    userEmail() {
      return this.isLoggedIn ? this.currentUser.email : "";
    },
    isAdmin() {
      return this.userEmail == "user@mail.com";
    },
    excelData() {
      let dataArray = [];

      this.trUsers.forEach(u => {
        u.orders.orders.forEach(o => {
          o.items.items.forEach(i => {
            dataArray.push({
              user: u.id,
              order: o.id,
              itemId: i.id,
              itemCount: i.quantity,
              itemPrice: i.price
            });
          });
        });
      });
      //console.log(dataArray);
      return dataArray;
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

  created() {
    console.log("Data:");
    let users = [];
    transactionsRef.once("value").then(dataSnapshot => {
      dataSnapshot.forEach(childSnapshot => {
        let orders = [];
        childSnapshot.forEach(prodList => {
          let items = [];
          prodList.forEach(prod => {
            items.push({
              id: prod.child("id").val(),
              price: prod.child("price").val(),
              quantity: prod.child("quantity").val()
            });
          });
          orders.push({ id: prodList.key, items: { items } });
        });
        users.push({ id: childSnapshot.key, orders: { orders } });
      });
    });
    //console.log(users);
    this.trUsers = users;
    return users;
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

.t1{
  font-size: 20px;
  font-weight: bold;
  border-left: 1px solid black;
  padding-left: 10px;
  margin-left: 10px;
  margin-top: 5px;
}

.t2{
  margin-left: 5px;
font-size: 20px;
font-weight: initial;
}
.t3{
  margin-left: 5px;
  font-size: 12px;
}
</style>
