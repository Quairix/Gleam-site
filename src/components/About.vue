<template>
<<<<<<< Updated upstream
  <div>
    <h1>Полигон для ядерных испытаний</h1>

    <line-chart :chart-data="filldata"></line-chart>
=======
	<div>
		<h1>Статистика нагрузки на сеть</h1>

		<div style="width:500px; margin:auto">
			<line-chart :chart-data="filldata"></line-chart>
		</div>
		<div class="row col-lg-4 col-md-4 col-sm-6" style="margin: auto" >
			<label style="padding-top:7px" >День:</label>
			<input style="margin: 0px 10px; width:120px" v-model="day" type="date" />
			<label style="padding-top:7px">Результат:</label>
			<input style="margin: 0px 10px; width:50px" v-model="dayValue" type="number" />
		</div>
		<div class="row">
			<button style="width:160px; height:50px; padding:0" class="main-form-btn" @click="add()">Добавить/обновить</button>
			<button style="margin-left:10px; width:100px; padding:0; height:50px" class="main-form-btn" @click="deleteDay()">Удалить</button>			
		</div>
	</div>
</template>

<script>
import Vue from "vue";
import VueChart from "vue-chartjs";
import LineChart from "./LineChart.js";
import { chartRef } from "../config/firebaseConfig";
Vue.use(VueChart);
export default {
	
	components: {
		LineChart
	},
	data() {
		this.load();
		return {
			day: "",
			dayValue: "",
			dayData: []
		};
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
					type:'bar',
					label: "Статистика нагрузки на сеть за сутки",
					backgroundColor:'rgba(139, 0, 0, 0.9)',
					hoverBackgroundColor:'rgba(210, 105, 30, 0.9)',
					data: data
				}
				]
			};
		}
	},
	methods: {
		load() {
			this.dayData = [];
			chartRef.once("value", snapshot => {
				snapshot.forEach(o => {
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
					chartRef.push({ day: this.day, dayValue: this.dayValue });
				}
				this.load();
				this.day = "";
				this.dayValue = "";
			}
		},
		update(key, dayString, dayNewValue) {
			const edit = chartRef.child(key);
			edit.update({ day: dayString, dayValue: dayNewValue });
		},
		deleteDay() {
			if (this.day != "") {
				this.dayData.forEach(o => {
					if (o.label == this.day) {
						const edit = chartRef.child(o.key);
						edit.remove();
            //TODO: сделать break
        }
    });
				this.load();
				this.day = "";
				this.dayValue = "";
			}
		}
	}
};
</script>
>>>>>>> Stashed changes

    <h3 style="text-align: center">Ввод данных показателей</h3>
    <p>
      <label>День:</label>
      <input v-model="day" type="text" />
    </p>
    <p>
      <label>Результат:</label>
      <input v-model="dayValue" type="number" />
    </p>

<<<<<<< Updated upstream
    <p>
      <button @click="add()">Добавить</button>
    </p>
    <p>
      <button @click="deleteDay()">Удалить</button>
    </p>
  </div>
</template>

<script>
import Vue from "vue";
import VueChart from "vue-chartjs";
import LineChart from "./LineChart.js";
import { chartRef } from "../config/firebaseConfig";

Vue.use(VueChart);

export default {
  components: {
    LineChart
  },
  data() {
    this.load();
    return {
      day: "",
      dayValue: "",
      dayData: []
    };
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
            label: "Статистика нагрузки на сеть за сутки",
            pointBackgroundColor: "#FF4dfa",
            borderColor: "#36fa6a",
            //backgroundColor:"#364dfa",
            data: data
          }
        ]
      };
    }
  },
  methods: {
    load() {
      this.dayData = [];
      chartRef.once("value", snapshot => {
        snapshot.forEach(o => {
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
          chartRef.push({ day: this.day, dayValue: this.dayValue });
        }
        this.load();
        this.day = "";
        this.dayValue = "";
      }
    },
    update(key, dayString, dayNewValue) {
      const edit = chartRef.child(key);
      edit.update({ day: dayString, dayValue: dayNewValue });
    },
    deleteDay() {
      if (this.day != "") {
        this.dayData.forEach(o => {
          if (o.label == this.day) {
            const edit = chartRef.child(o.key);
            edit.remove();
            //TODO: сделать break
          }
        });
        this.load();
        this.day = "";
        this.dayValue = "";
      }
    }
  }
};
</script>
<style>
</style>
=======
</style>
>>>>>>> Stashed changes
