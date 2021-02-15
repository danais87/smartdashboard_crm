<template>
  <v-container id="dashboard" fluid grid-list-lg class="mx-0 pa-0">
    <v-row cols="12" sm="12" md="12">
      <v-spacer></v-spacer>
      <v-col cols="12" sm="2" md="2" align="center">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="startDate"
          transition="scale-transition"
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="startDate"
              label="Start Date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="startDate" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(startDate)">
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="2" md="2" align="center">
        <v-menu
          ref="menu1"
          v-model="menu1"
          :close-on-content-click="false"
          :return-value.sync="end_date"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="end_date"
              label="End Date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="end_date" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu1 = false"> Cancel </v-btn>
            <v-btn text color="primary" @click="$refs.menu1.save(end_date)">
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col>
        <br />
        <v-btn color="blue darken-1" text @click="fillData">Apply</v-btn>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-btn class="ma-2" outlined small fab color="indigo" to="/quotes">
          <v-icon>el-icon-s-grid</v-icon>
        </v-btn>

        <v-btn class="ma-2" outlined small fab color="indigo" to="/tablequote">
          <v-icon>el-icon-s-unfold</v-icon>
        </v-btn>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="6" align="center">
        <v-card max-width="500" max-height="500">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">Quotes</div>
              <LineChart
                :chart-data="chartdata"
                :options="boptions"
                :height="200"
                :width="200"
              ></LineChart>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="6" align="center">
        <v-card max-width="500" max-height="500">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">Quotes</div>
              <DoughnutChart
                :chart-data="dchartdata"
                :options="doptions"
                :height="200"
                :width="200"
              ></DoughnutChart>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src

import LineChart from "../component/dashboard/LineChart.js";
import DoughnutChart from "../component/dashboard/DoughnutChart.js";
import { API, Auth } from "aws-amplify";
import { listQuotations, listQuotes } from "../../../graphql/queries";
import Vuex from "vuex";

export default {
  name: "Home",
  components: { LineChart, DoughnutChart },
  data() {
    return {
      chartdata: null,
      boptions: null,
      dchartdata: null,
      doptions: null,
      startDate: "",
      menu: false,
      modal: false,

      end_date: new Date().toISOString().substr(0, 10),
      menu1: false,
      modal1: false,

      name: this.$route.query.name,
      // company: this.$route.query.company,
      rol: this.$route.query.rol,
    };
  },
  mounted() {
    this.fillData();
  },
  computed: {
    ...Vuex.mapState(["organizationID"]),
  },
  created() {
    const d = new Date();
    this.startDate = new Date(d.setMonth(d.getMonth() - 3))
      .toISOString()
      .substr(0, 10);
  },

  methods: {
    formattedCurrencyValue(value) {
      return (
        "$ " +
        parseFloat(value)
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,")
      );
    },

    async fillData() {
      const loading = this.$loading({
        lock: true,
        text: "Loading Quotes...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      var total_c = 0;
      var total_s = 0;
      var total_v = 0;
      this.quotes_datac = [];
      this.quotes_created = [];
      this.quotes_s = [];
      this.quotes_va = [];
      console.log(this.startDate);
      console.log(this.end_date);
      const todos = await API.graphql({
        query: listQuotes,
        variables: {
          filter: {
            PK: {
              eq: this.organizationID,
            },
            SK: {
              eq: "QUO#",
            },
            indexs: {
              eq: "4",
            },
            active: {
              eq: "1",
            },
            startDate: {
              eq: "QUO#" + this.startDate,
            },
            endDate: {
              eq: "QUO#" + this.end_date,
            },
          },
        },
      });

      this.quotes_datac = todos.data.listQuotes;
      console.log(this.quotes_datac);

      for (let i = 0; i < this.quotes_datac.length; i++) {
        console.log(this.quotes_created);
        if (this.quotes_datac[i].processStatus == "Created") {
          this.quotes_created.push(this.quotes_datac[i]);
          total_c = total_c + this.quotes_datac[i].finalAmount;
        }

        if (this.quotes_datac[i].processStatus == "Negotiations") {
          this.quotes_s.push(this.quotes_datac[i]);
          total_s = total_s + this.quotes_datac[i].finalAmount;
        }

        if (this.quotes_datac[i].processStatus == "Verbal Agreement") {
          this.quotes_va.push(this.quotes_datac[i]);
          total_v = total_v + this.quotes_datac[i].finalAmount;
        }
      }

      this.chartdata = {
        labels: ["MES"],
        datasets: [
          {
            label: "Analyzed",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            data: [total_c],
          },
          {
            label: "Negotiation",
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            data: [total_s],
          },
          {
            label: "Verbal Agreement",
            backgroundColor: "rgba(255, 206, 86, 0.2)",
            data: [total_v],
          },
        ],
      };

      this.boptions = {
        lineTension: 1,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              gridLines: {
                display: true,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
        legend: {
          display: true,
        },
        responsive: true,
        maintainAspectRatio: false,
      };

      this.dchartdata = {
        labels: ["Analyzed", "Negotiation", "Verbal Agreement"],
        datasets: [
          {
            borderWidth: 1,
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
            ],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
            ],
            data: [total_c, total_s, total_v],
          },
        ],
      };

      this.doptions = {
        responsive: true,
        maintainAspectRatio: false,
        pieceLabel: {
          mode: "percentage",
          precision: 1,
        },
      };

      this.total_qc = this.formattedCurrencyValue(total_c);
      this.total_qs = this.formattedCurrencyValue(total_s);
      this.total_va = this.formattedCurrencyValue(total_v);
      loading.close();
    },

    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },
  },
};
</script>
<style scoped>
</style>