<template >
  <div>
    <div id="dashboard" v-if="isAdmin">
      <section>
        <div class="row">
          <div
            class="main-form col-lg-4 offset-lg-2 col-md-6 offset-md-3 col-sm-8 offset-sm-1 col-10"
          >
            <p class="main-form-header">
              <span>Д</span>обавить версию
            </p>
            <form>
              <input
                ref="title"
                class="form-control"
                v-model.trim="newProduct.title"
                type="text"
                placeholder="Название"
              />
              <textarea
                class="form-control"
                v-model="newProduct.description"
                type="text"
                required
                placeholder="Описание"
              ></textarea>
              <label for="productPrice">Цена ($):</label>
              <input
                class="form-control"
                v-model="newProduct.price"
                type="number"
                placeholder="Цена"
              />
              <label for="productId">Id:</label>
              <input
                id="ProductId"
                class="form-control"
                v-model="newProduct.id"
                type="text"
                placeholder="Id"
              />
              <label for="productURL">URL изображения:</label>
              <input
                class="form-control"
                v-model="newProduct.thumbnail_url"
                type="text"
                placeholder="URL изображения"
              />
              <button class="main-form-btn" @click="addProduct">Добавить</button>
            </form>
          </div>
          <div
            class="main-form col-lg-4 offset-lg-1 col-md-6 offset-md-3 col-sm-8 offset-sm-2 col-10"
          >
            <p class="main-form-header">
              <span>Д</span>обавить план модернизации
            </p>
            <form>
              <textarea
                class="form-control"
                v-model="newPlan.description"
                type="text"
                rows="7"
                required
                placeholder="Описание"
              ></textarea>
              <button class="main-form-btn" @click="addPlan">Добавить</button>
            </form>
          </div>
        </div>
        <hr />

        <div class="row">
          <div class="col-lg-12 offset-lg-1">
            <table style="width: 80%">
              <tr v-for="m in moderniz" :item="m" :key="m">
                <td>{{m}}</td>
              </tr>
            </table>

            <table style=" margin-top: 20px; border: 1px solid black; width: 80% ">
              <tr style="border: 1px solid black">
                <td>
                  <b>Оборудование</b>
                </td>
                <td></td>
              </tr>
              <tr v-for="m in devices" :item="m" :key="m">
                <td>
<<<<<<< Updated upstream
                  <input :id="m" type="text" :value="m" />
                </td>
                <td>
                  <button @click="update(m)">Изменить</button>
                  <button @click="deleteDevice(m)">Удалить</button>
=======
                  <input class="form-control" style="width:200px;margin-left:200px; padding:0px" :id="m" type="text" :value="m" />
                </td>
                <td>
                   <div class="row" style="align-self: flex-start;">
                  <button class="main-form-btn"   style="height:30px;margin:10px;padding:4px; font-size:12px;" @click="update(m)">Изменить</button>
                  <button class="main-form-btn" style="height:30px;margin:10px; padding:4px; font-size:12px;" @click="deleteDevice(m)">Удалить</button>
                </div>
>>>>>>> Stashed changes
                </td>
              </tr>
              <tr style="border: 1px solid black">
                <td>
<<<<<<< Updated upstream
                  <input type="text" v-model="newDevice" />
                </td>
                <td>
                  <button @click="add()">Добавить</button>
=======
                  <input class="form-control" style="width:200px; margin-left:200px; padding:0px" type="text" v-model="newDevice" />
                </td>
                <td>
                  <button class="main-form-btn" style="height:30px; margin:10px; padding:4px; font-size:12px;" @click="add()">Добавить</button>
>>>>>>> Stashed changes
                </td>
              </tr>
            </table>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {
  productsRef,
  transactionsRef,
  modernizationRef,
  devicesRef
} from "../config/firebaseConfig";
import { db } from "../config/firebaseConfig";
import colorForString from "../color";
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
<<<<<<< Updated upstream

Vue.use(VueAxios, axios);

=======
Vue.use(VueAxios, axios);
>>>>>>> Stashed changes
export default {
  data() {
    let moderniz = [];
    let devices = [];
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
    modernizationRef.once("value").then(dataSnapshot => {
      dataSnapshot.forEach(o => {
        o.forEach(i => {
          moderniz.push(i.node_.value_);
        });
      });
    });
    devicesRef.once("value").then(o => {
      o.forEach(i => {
        devices.push(i.key);
      });
    });
    return {
      moderniz: moderniz,
      devices: devices,
      newDevice: "",
      trUsers: [],
      newProduct: {
        title: "",
        description: "",
        id: 100,
        price: 100,
        thumbnail_url:
          "https://tools.ru/catalog_files/category_10968/images/nG1-Grid.png"
      },
      newPlan: {
        description: ""
      }
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
    colorForString,
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
    addPlan() {
      modernizationRef.push(this.newPlan);
      this.addMessage({
        messageClass: "success",
        message: "План модернизации был добавлен!"
      });
    },
    add() {
      if (this.newDevice != "") {
        db.ref("devices/" + this.newDevice).push({
          day: "2020-01-01",
          dayValue: "0"
        });
        this.load(db.ref("devices"));
        this.newDevice = "";
      }
    },
    load(ref) {
      this.devices = [];
      ref.once("value", snapshot => {
        snapshot.forEach(o => {
          this.devices.push(o.key);
        });
      });
    },
    async update(key) {
      let data = [];
      await db.ref("devices/" + key).once("value", o => {
        o.forEach(d => {
          data.push(d.val());
        });
      });
      console.log(data);
      console.log(data.length);
      data.forEach(async o=>{
      await db.ref("devices/" + document.getElementById(key).value).push(o);});
      console.log("id==" + document.getElementById(key).value);
      const edit = db.ref("devices").child(key);
      edit.remove();
      this.load(db.ref("devices"));
      //TODO: сделать break
    },
    deleteDevice(m) {
      const edit = db.ref("devices").child(m);
      edit.remove();
      this.load(db.ref("devices"));
      this.day = "";
      this.dayValue = "";
    }
  },
  created() {
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
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
.t1 {
  font-size: 20px;
  font-weight: bold;
  border-left: 1px solid black;
  padding-left: 10px;
  margin-left: 10px;
  margin-top: 5px;
}
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
.t2 {
  margin-left: 5px;
  font-size: 20px;
  font-weight: initial;
}
.t3 {
  margin-left: 5px;
  font-size: 12px;
}
.main-form-header {
  text-align: center;
  font-size: 20px;
  font-family: "Open Sans", sans-serif;
  font-weight: 600;
}

table {
  text-align: center;
  border: 1px dashed #626262;
  border-collapse: separate;
  border-spacing: 10px;
  background: -webkit-linear-gradient(bottom left, #eecfba, #c5dde8);
  background: -o-linear-gradient(bottom left, #eecfba, #c5dde8);
  background: linear-gradient(to top right, #eecfba, #c5dde8);
}
th {
  font-weight: normal;
  color: #039;
  border-bottom: 1px dashed #69c;
  padding: 12px 17px;
}
td {
  color: #669;
  padding: 7px 17px;
}
tr:hover td {
  background: #ccddff;
}
</style>