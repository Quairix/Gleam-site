<template >
  <div>
    <div id="dashboard" v-if="isAdmin">
      <section>
        <div class="row"> 
            <div class="main-form col-lg-4 col-md-6 col-sm-8 offset-sm-1 ol-10">
              <p class="main-form-header"><span>Д</span>обавить версию</p>
              <form>
                <input ref="title" class="form-control" v-model.trim="newProduct.title" type="text" placeholder="Название">
                 <textarea class="form-control" v-model="newProduct.description" type="text" Required placeholder="Описание"></textarea>
                 <label for="productPrice">Цена ($):</label>
                  <input class="form-control" v-model="newProduct.price" type="number" placeholder="Цена">
                  <label for="productId">Id:</label>
                 <input id="ProductId" class="form-control" v-model="newProduct.id" type="text" placeholder="Id"/>
                 <label for="productURL">URL изображения:</label>
                 <input class="form-control" v-model="newProduct.thumbnail_url" type="text" placeholder="URL изображения"/>
                 <button class="main-form-btn" @click="addProduct" >Добавить</button>
              </form>
          </div>
              <div class="main-form col-lg-4 col-md-6 col-sm-8 offset-sm-2 col-10">
              <p class="main-form-header"><span>Д</span>обавить план модернизации</p>
              <form>
                 <textarea class="form-control" v-model="newPlan.description" type="text" rows="7" Required placeholder="Описание"></textarea>
                 <button class="main-form-btn" @click="addPlan" >Добавить</button>
              </form>
          </div>
        </div>    
      <hr />
      </section>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { productsRef, transactionsRef, modernizationRef } from "../config/firebaseConfig";

export default {
  data() {
    return {
      json_fields: {
        User: "user",
        Order: "order",
        ItemId: "itemId",
        ItemCount: "itemCount",
        ItemPrice: "itemPrice",

      },
      trUsers: [],
      newProduct: {
        title: "",
        description: "",
        id: 100,
        price: 100,
        thumbnail_url:
          "https://tools.ru/catalog_files/category_10968/images/nG1-Grid.png"
      },
      json_fields_1: {
        PlanDescription: "planDescription"       
      },
      newPlan: {
        description: "",
      },
    };
  },

  computed: {
    ...mapGetters(["isLoggedIn", "currentUser"]),

    userEmail() {
      return this.isLoggedIn ? this.currentUser.email : "";
    },
    isAdmin() {
      return this.userEmail == "alad_nastya@mail.ru";
    }
  },
  methods: {
    ...mapActions(["addMessage"]),
    addProduct() {
      productsRef.push(this.newProduct);

      this.addMessage({
        messageClass: "success",
        message: "Товар был добавлен!"
      });
    },
     addPlan() {
      modernizationRef.push(this.newPlan);

      this.addMessage({
        messageClass: "success",
        message: "План модернизации был добавлен!"
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
.main-form-header {
  text-align: center;
  font-size: 20px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 600;
}
</style>
