<template >
  <div> 
    <div id="dashboard" v-if="isAdmin">
      <section>
        <div class="panel panel-default" >
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
        
  <button type="button" v-on:click="onexport">Excel download</button>
        <h2>Transactions</h2>
        <div v-if="trUsers.length">
          <div v-for="u in trUsers" :item="u" :key="u.id">
            <h4>User: {{ u.id }}</h4>
            <div v-for="o in u.orders.orders" :item="o" :key="o.id">
              <p>
                <b>Order: {{ o.id }}</b>
              </p>
              <div v-for="i in o.items.items" :item="i" :key="i.id">
                <p>Item: id {{ i.id }} - price {{ i.price}}</p>
              </div>
              <hr />
            </div>
          </div>
        </div>
        <div v-else>
          <p>No orders</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { productsRef, transactionsRef } from "../config/firebaseConfig";

import XLSX from 'xlsx'
export default {
  data() {
    return {
      trUsers: [],
      newProduct: {
        title: "Title",
        description: "Description",
        id: 123,
        price: 1000,
        thumbnail_url:
          "https://sun9-23.userapi.com/c204628/v204628644/283e/ItIPEowth6U.jpg",
        type: "proector"
      },
    };
  },

  computed: {
    ...mapGetters(["isLoggedIn", "currentUser"]),

    userEmail() {
      return this.isLoggedIn ? this.currentUser.email : "";
    },
    isAdmin() {
      return this.userEmail == "user@mail.com";
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
    },
      onexport () { // On Click Excel download button
    
      // export json to Worksheet of Excel
      // only array possible
      var trWS = XLSX.utils.json_to_sheet(this.trUsers) 

      // A workbook is the name given to an Excel file
      var wb = XLSX.utils.book_new() // make Workbook of Excel

      // add Worksheet to Workbook
      // Workbook contains one or more worksheets
      XLSX.utils.book_append_sheet(wb, trWS, 'tr')  

      // export Excel file
      XLSX.writeFile(wb, 'book.xlsx') // name of the file is 'book.xlsx'
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
    console.log(users);
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
</style>
