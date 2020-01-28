<template>
  <div style="text-align:center">
    <h1>Статистика нагрузки на сеть</h1>
    <div class="row text-center" v-if="!isLoaded">Загрузка...</div>
    <div class="row" v-if="isLoaded">
<<<<<<< Updated upstream
      <div class="col-lg-7" style="width:60%; margin:auto">
=======
      <div style="width:40%; margin:auto">
>>>>>>> Stashed changes
        <line-chart :chart-data="filldata"></line-chart>
      </div>
      <div class="row col-lg-3 col-md-2 col-sm-6" style="align-self: flex-start;">
        <div class="row" style="align-self: flex-start;">
          <div style="padding:7px 0 45px 0;">
            <h5 style="display:inline-block">Оборудование:</h5>
            <select class="form-control" @change="onChange($event)">
               <option disabled selected>Выберите оборудование</option>
              <option v-for="d in devices" :key="d" :value="d">{{d}}</option>
            </select>
          </div>
        </div>
        <div class="row" style="align-self: flex-start;">
          <p>
            <label>День:</label>
<<<<<<< Updated upstream
            <input style="width:120px" v-model="day" type="date" />
          </p>
          <p style="padding-top:7px">
            <label>Результат:</label>
            <input style="width:50px" v-model="dayValue" type="number" />
=======
            <input class="form-control" style="width:170px" v-model="day" type="date" />
          </p>
          <p style="padding-top:7px">
            <label>Нагрузка на устройство:</label>
            <input class="form-control" style="width:100px" v-model="dayValue" type="number" />
>>>>>>> Stashed changes
          </p>
        </div>
        <div class="row" style="align-self: flex-start;">
          <button
            style="width:160px; height:50px; padding:0"
            class="main-form-btn"
            @click="add()"
          >Добавить/обновить</button>
          <button
            style="margin-left:10px; width:100px; padding:0; height:50px"
            class="main-form-btn"
            @click="deleteDay()"
          >Удалить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueChart from "vue-chartjs";
import LineChart from "./LineChart.js";
import { db, devicesRef } from "../config/firebaseConfig";
Vue.use(VueChart);
export default {
  components: {
    LineChart
  },
  data() {
    return {
      isLoaded: false,
      day: "",
      dayValue: "",
      dayData: [],
      devices: [],
      chartRef: ''
    };
  },
  mounted() {
    this.getDevices();
  },
  computed: {
    filldata() {
      let labels = [];
      let data = [];
      let list = [];
      for (let m of this.dayData) {
        list.push({ label: m.label, value: m.value });
      }
      list.sort(function(a, b) {
        if (a.label > b.label) {
          return 1;
        }
        if (b.label > a.label) {
          return -1;
        }
        return 0;
      });
      for (let d of list) {
        labels.push(d.label);
        data.push(d.value);
      }
      return {
        labels,
        datasets: [
          {
            type: "bar",
            label: "Статистика нагрузки на сеть за сутки",
            backgroundColor: "rgba(139, 0, 0, 0.9)",
            hoverBackgroundColor: "rgba(139, 0, 0, 0.6)",
            data: data
          }
        ]
      };
    }
  },
  methods: {
    getDevices() {
      let devices = [];
      devicesRef.once("value", s => {
        s.forEach(o => {
          devices.push(o.key);
        });
      });
      this.isLoaded = true;
      //this.load(this.devices.find(x => x !== undefined));
      this.devices = devices;
      //console.log(this.devices.find(x => x !== undefined));
    },
    onChange(ref) {
      this.chartRef = ref.target.value;
      this.load(db.ref("devices/" + this.chartRef));
    },
    load(ref) {
      this.dayData = [];
      ref.once("value", s => {
        s.forEach(o => {
          this.dayData.push({
            key: o.key,
            label: o.val().day,
            value: o.val().dayValue
          });
        });
      });
    },
    add() {
      if (this.day != "") {
        let doAdd = true;
        this.dayData.forEach(o => {
          if (o.label == this.day) {
            this.update(o.key, o.label, this.dayValue);
            doAdd = false;
            //TODO: сделать break
          }
        });
        if (doAdd) {
          db.ref("devices/" + this.chartRef).push({ day: this.day, dayValue: this.dayValue });
        }
        this.load(db.ref("devices/" + this.chartRef));
        this.day = "";
        this.dayValue = "";
      }
    },
    update(key, dayString, dayNewValue) {
      const edit = db.ref("devices/" + this.chartRef).child(key);
      edit.update({ day: dayString, dayValue: dayNewValue });
    },
    deleteDay() {
      if (this.day != "") {
        this.dayData.forEach(o => {
          if (o.label == this.day) {
            const edit = db.ref("devices/" + this.chartRef).child(o.key);
            edit.remove();
            //TODO: сделать break
          }
        });
        this.load(db.ref("devices/" + this.chartRef));
        this.day = "";
        this.dayValue = "";
      }
    }
  }
};
<<<<<<< Updated upstream
</script>
=======
</script>
>>>>>>> Stashed changes
