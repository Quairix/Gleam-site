<template>
  <div>
    <h1>Полигон для ядерных испытаний</h1>

    <line-chart :chart-data="filldata"></line-chart>

    <h3 style="text-align: center">Ввод данных показателей</h3>
    <label>День-число:</label>
    <input v-model="day" type="text" />
    <input v-model="day_value" type="number" />

    <button @click="add()">Добавить</button>
  </div>
</template>

<script>
import Vue from "vue";
import VueChart from "vue-chartjs";
import colorForString from "../color";
import LineChart from "./LineChart.js";
import { chartRef } from "../config/firebaseConfig";

Vue.use(VueChart);

export default {
  components: {
    LineChart
  },
  data() {
    let votings = [];
    chartRef.once("value", snapshot => {
      snapshot.forEach(o => {
        votings.push({ label: o.val().day, value: o.val().day_value });
      });
    });
    return {
      day: "",
      day_value: "",
      votings: votings
    };
  },
  computed: {
    filldata() {
      let labels = [];
      let backgroundColor = [];
      let data = [];

      for (let voting of this.votings) {
        labels.push(voting.label);
        backgroundColor.push(colorForString(voting.label));
        data.push(voting.value);
      }
      return {
        labels,
        datasets: [
          {
            label: "Статистика нагрузки на сеть за сутки",
            backgroundColor: "#364dfa",
            data: data
          }
        ]
      };
    }
  },
  methods: {
    add() {
      this.votings.push({ label: this.day, value: this.day_value });
      chartRef.push({ day: this.day, day_value: this.day_value });
      this.day = "";
      this.day_value = "";
    }
  }
};
</script>
<style>
</style>
