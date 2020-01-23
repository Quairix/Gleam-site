<template>
  <div>
    <div class="main__intro">
      <p
        class="main__info-text"
      >AnMoNet - современная система для анализа вашей корпоративной вычислительной локальной сети. Она собирает данные, анализирует их и предоставляет службе администратора план по модернизации сети или ее участка.</p>
      <img
        class="main__img"
        src="https://www.networkmedia.com.hk/images/Product/Apcon/14078_Diagram_IntellaStore_II_Applications.png"
        alt
      />
    </div>
    <div class="main__info">
      <img
        class="main__info-img"
        src="https://tools.ru/catalog_files/category_10968/images/nG1-Grid.png"
      />
      <p
        class="main__info-text"
      >Система не имеет аналогов за счет формирования плана модернизации, который учитывает слабые места вашей сети и предлагает решение по их уcтранению</p>
    </div>
    <line-chart :chart-data="filldata" ></line-chart>
   <!--  <table style="margin: 30px; border: 1px solid black">
      <tr>
        <td>
          <b>Название</b>
        </td>
        <td v-for="m in moderniz" :item="m" :key="m">{{m}}</td>
      </tr>
    </table>

    <table style="margin: 30px; border: 1px solid black">
      <tr style="border: 1px solid black">
        <td>
          <b>Показатель</b>
        </td>
        <td>
          <b>Значение</b>
        </td>
      </tr>
      <tr v-for="m in gData" :item="m" :key="m.name">
        <td>{{m.name}}</td>
        <td>{{m.count}}</td>
      </tr>
    </table> -->
  </div>

  <!-- <line-chart :chart-data="datacollection"></line-chart> -->
</template>

<script>
import Vue from "vue";
import VueChart from "vue-chartjs";
import colorForString from "../color";
import LineChart from "./LineChart.js";
import {
  votingsRef
 /* ,modernizationRef,
  
  gDataRef*/
} from "../config/firebaseConfig";

Vue.use(VueChart);

/*  export default {
    components: {
      LineChart
    },
    data () {
      return {
        datacollection: null
      }
    },
    mounted () {
      this.fillData()
    },   
    methods: {
      fillData () {
        this.datacollection = {
          labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
          datasets: [
            {
              label: ' Показатель нагрузки',
              backgroundColor: '#ff5c36',
              data: [5, 10, 15, 30, 35, 58, 43, 38, 50, 40, 36]
            },
          ]
        }
      },
    },
    
  }*/
export default {
  components: {
    LineChart
  },
  data() {

    let votings = {};
   /* let moderniz = [];
    let gData = [{}];*/
    votingsRef.once("value").then(dataSnapshot => {
      dataSnapshot.forEach(o => {
        Vue.set(votings, o.node_.value_, (votings[o.node_.value_] || 0) + 1);
      });
    });
    /*modernizationRef.once("value").then(dataSnapshot => {
      dataSnapshot.forEach(o => {
        o.forEach(i => {
          moderniz.push(i.node_.value_);
        });
      });
    });
    gDataRef.once("value").then(o => {
      o.forEach(i => {
        gData.push({ name: i.key, count: i.node_.value_ });
      });
    });*/
   /* console.log(gData); //ето вывод данных в консоли для удобства. потом убрать надо
    console.log(moderniz); //ето вывод данных тоже*/
    return {
      datacollection: null,
      votings: votings,
      /*moderniz: moderniz,
      gData:gData*/
    };
  },
  computed: {
    filldata() {
      let list = [];
      /* let list_1=[];*/
      for (let movie in this.votings) {
        list.push({ movie: movie, number: this.votings[movie] });
      }
      /*for (let newPlan in this.moderniz) {
        list_1.push({ newPlan: newPlan, descrirtion: this.moderniz[newPlan]});
      }*/

      list.sort((v1, v2) => v1.number < v2.number);

      let labels = [];
      let backgroundColor = [];
      let data = [];
      /*  let data_1=[];*/

      for (let voting of list) {
        labels.push(voting.movie);
        backgroundColor.push(colorForString(voting.movie));
        data.push(voting.number);
      }

      /*for (let moderniz of list_1) {
        data_1.push(moderniz.descrirtion); 
        
      }*/

      return {
        labels,
        datasets: [
          {
            label: "Статистика нагрузки на сеть за сутки",
            backgroundColor: "#ff5c36",
            data: data
          }
        ]
      };
    }
  }
};
</script>

<style>
.hooper {
  height: 550px !important;
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

.small {
  max-height: 200px;
  margin: 150px auto;
}

/*canvas{
  width:1100px !important;
  height:500px !important;

}*/
</style>
