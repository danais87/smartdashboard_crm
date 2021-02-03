<template>
  <v-container id="dashboard" fluid grid-list-lg class="mx-0 pa-0">
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">CRM</span>
      </v-toolbar-title>
      <v-col cols="12" sm="11" md="11" align="center">
        <v-btn class="ma-2" outlined small fab color="white" to="/payments">
          <v-icon>el-icon-s-grid</v-icon>
        </v-btn>
        <v-btn class="ma-2" outlined small fab color="white" to="/dashpaylist">
          <v-icon>el-icon-pie-chart</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="12" sm="1" md="1" align="right">
        <v-spacer></v-spacer>
        <v-btn @click="logout" color="primary" dark class="mb-2">Logout</v-btn>
      </v-col>
    </v-app-bar>

    <v-row cols="12" sm="12" md="12">
      <v-spacer></v-spacer>
      <v-col cols="12" sm="2" md="2" align="center">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="start_date"
          transition="scale-transition"
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="start_date"
              label="Start Date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="start_date" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(start_date)">
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
      <v-spacer></v-spacer>
    </v-row>
    <v-layout class="" row wrap>
      <div class="small">
        <line-chart :chart-data="chartdata" :options="options"></line-chart>
      </div>
      <div class="small">
        <DoughnutChart
          :chart-data="dchartdata"
          :options="doptions"
        ></DoughnutChart>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
// @ is an alias to /src
import DefaultLayout from "../../layouts/DefaultLayout";
import LineChart from "../../components/dashboard/LineChart.js";
import DoughnutChart from "../../components/dashboard/DoughnutChart.js";
import { API, Auth } from "aws-amplify";
import { listSmInstallments, listSmInvoices } from "../../graphql/queries";
import Vuex from "vuex";

export default {
  name: "Home",
  components: { LineChart, DoughnutChart },
  data() {
    return {
      ser_pay: [],
      installments: [],
      total_qc: 0,
      total_p: 0,
      chartdata: null,
      options: null,
      dchartdata: null,
      doptions: null,
      start_date: "",
      menu: false,
      modal: false,

      end_date: new Date().toISOString().substr(0, 10),
      menu1: false,
      modal1: false,

      name: this.$route.query.name,
      rol: this.$route.query.rol,
    };
  },
  mounted() {
    this.fillData();
  },
  computed: {
    ...Vuex.mapState(["company"]),
  },
  created() {
    this.$emit(`update:layout`, DefaultLayout);
    this.setDate();
  },

  methods: {
    logout() {
      Auth.signOut()
        .then((data) => {
          console.log(data);
          this.$router.push("/login");
        })
        .catch((err) => console.log(err));
    },
    setDate() {
      const d = new Date();
      this.start_date = new Date(d.setMonth(d.getMonth() - 3))
        .toISOString()
        .substr(0, 10);
    },
   
    async fillData() {
      const loading = this.$loading({
        lock: true,
        text: "Loading...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.ser_pay = [];
      this.installments= [];
      const todos = await API.graphql({
        query: listSmInvoices,
        variables: {
          filter: {
            companyID: { eq: this.company },
          },
        },
      });

      for (let i = 0; i < todos.data.listSmInvoices.items.length; i++) {
        if (
          todos.data.listSmInvoices.items[i].createdAt.substr(0, 10) >=
            this.start_date &&
          todos.data.listSmInvoices.items[i].createdAt.substr(0, 10) <=
            this.end_date
        ){
          this.ser_pay = [...this.ser_pay, todos.data.listSmInvoices.items[i]];
        }
        
      }
      console.log(this.ser_pay);
      this.total_qc = 0;
      for (let i = 0; i < this.ser_pay.length; i++) {
        this.total_qc = this.total_qc + this.ser_pay[i].quote.items[0].payment;

        if (this.ser_pay[i].quote.items[0].is_installment == "true") {
          const all = await API.graphql({
            query: listSmInstallments,
            variables: {
              filter: { id_quote: { eq: this.ser_pay[i].quote.items[0].id } },
            },
          });
          this.installments.push({
            invo: this.ser_pay[i].name,
            quote: this.ser_pay[i].quote.items[0].name,
            inst: all.data.listSmInstallments.items,
          });
        }
      }
      var p = [];
      this.total_p = 0;
      for (let j = 0; j < this.installments.length; j++) {
        for (let i = 0; i < this.installments[j].inst.length; i++) {
          p.push({
            i: this.installments[j].invo,
            q: this.installments[j].quote,
            date: this.installments[j].inst[i].start_date,
            amount: this.installments[j].inst[i].amount,
          });
          this.total_p = this.total_p + this.installments[j].inst[i].amount;
        }
      }
      this.installments = p;
      this.chartdata = {
        labels: ["MES"],
        smooth: true,
        symbolSize: 10,
        lineStyle: {
          normal: {
            width: 3,
          },
        },
        datasets: [
          {
            label: "Payments Received",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            data: [this.total_qc],
          },
          {
            label: "Pending Payments",
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            data: [this.total_p],
          },
        ],
        label: {
          normal: {
            show: true,
            position: "top",
          },
        },
      };

      this.options = {
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
        labels: ["Payments Received", "Pending Payments"],
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
            data: [this.total_qc, this.total_p],
          },
        ],
      };

      this.doptions = {
        legend: {
          display: true,
        },
        responsive: true,
        maintainAspectRatio: false,
      };

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