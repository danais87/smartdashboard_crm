<template>
  <v-container id="dashboard" fluid tag="section">
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
      <v-spacer></v-spacer>
    </v-row>
    <v-row>
      <v-col cols="2" sm="2" lg="2">
        <base-material-stats-card
          color="info"
          icon="mdi-poll"
          title="Quote - Invoice"
          :value="percent"
          sub-icon="mdi-clock"
          sub-text="Invoice represent"
        />

        <br /><br />
        <base-material-stats-card
          color="primary"
          icon="mdi-poll"
          title="Outstanding Invoices"
          :value="total_pp"
          sub-icon="mdi-tag"
          sub-text="Pending Payments"
        />
      </v-col>

      <v-col cols="12" sm="4" lg="4">
        <v-card max-width="400" max-height="400">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">New Leads</div>
              <DoughnutChart
                :chart-data="dchartdata"
                :options="doptions"
                :height="200"
                :width="200"
              ></DoughnutChart>
            </v-list-item-content>
          </v-list-item>
        </v-card>
        <br /><br />
      </v-col>
      <v-col cols="12" sm="4" lg="4">
        <v-card max-width="400" max-height="400">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">Revenue</div>
              <DoughnutChart
                :height="200"
                :width="200"
                :chart-data="ichartdata"
                :options="ioptions"
              ></DoughnutChart>
            </v-list-item-content>
          </v-list-item>
        </v-card>
        <br /><br />
      </v-col>

      <v-col cols="12" sm="4" lg="4">
        <v-card max-width="400" max-height="400">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">Marketing Investment</div>
              <LineChart
                :height="200"
                :width="200"
                :chart-data="invochartdata"
                :options="invooptions"
              ></LineChart>
            </v-list-item-content>
          </v-list-item>
        </v-card>
        <br /><br />
      </v-col>
      <v-col cols="12" sm="4" lg="4">
        <v-card max-width="400" max-height="400">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">CAMPAIGNS - SALES</div>
              <DoughnutChart
                :height="200"
                :width="200"
                :chart-data="campchartdata"
                :options="campoptions"
              ></DoughnutChart>
            </v-list-item-content>
          </v-list-item>
        </v-card>
        <br /><br />
      </v-col>
      <v-col cols="12" sm="4" lg="4">
        <v-card max-width="400" max-height="400">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">Sales by Category</div>
              <DoughnutChart
                :height="200"
                :width="200"
                :chart-data="schartdata"
                :options="soptions"
              ></DoughnutChart>
            </v-list-item-content>
          </v-list-item>
        </v-card>
        <br /><br />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { API } from "aws-amplify";
import {
  listCustomers,
  listInstallments,
  listCampaings,
  listQuoteItems,
  listQuotes,
  listInvoices,
} from "../../graphql/queries";
import Card from "../../components/base/CardS.vue";
import ChartCard from "../../components/base/ChartCard.vue";
import StatsCard from "../../components/base/StatsCard.vue";
import DoughnutChart from "../../views/dashboard/component/dashboard/DoughnutChart";
import LineChart from "../../views/dashboard/component/dashboard/LineChart";
import Vuex from "vuex";

export default {
  name: "DashboardDashboard",
  components: { Card, ChartCard, StatsCard, DoughnutChart, LineChart },
  data() {
    return {
      total_pp: 0,
      startDate: new Date(),
      menu: false,
      modal: false,
      end_date: new Date().toISOString().substr(0, 10),
      menu1: false,
      modal1: false,
      dailySalesChart: {
        data: {
          labels: ["M", "T", "W", "T", "F", "S", "S"],
          series: [[12, 17, 7, 17, 23, 18, 38]],
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 0,
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
      },
      dataCompletedTasksChart: {
        data: {
          labels: ["12am", "3pm", "6pm", "9pm", "12pm", "3am", "6am", "9am"],
          series: [[230, 750, 450, 300, 280, 240, 200, 190]],
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 0,
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
      },
      emailsSubscriptionChart: {},
      preferencesChart: {
        data: {
          labels: ["62%", "32%", "6%"],
          series: [62, 32, 6],
        },
        options: {},
      },
      headers: [
        {
          sortable: false,
          text: "ID",
          value: "id",
        },
        {
          sortable: false,
          text: "Name",
          value: "name",
        },
        {
          sortable: false,
          text: "Salary",
          value: "salary",
          align: "right",
        },
        {
          sortable: false,
          text: "Country",
          value: "country",
          align: "right",
        },
        {
          sortable: false,
          text: "City",
          value: "city",
          align: "right",
        },
      ],
      items: [
        {
          id: 1,
          name: "Dakota Rice",
          country: "Niger",
          city: "Oud-Tunrhout",
          salary: "$35,738",
        },
        {
          id: 2,
          name: "Minerva Hooper",
          country: "Curaçao",
          city: "Sinaai-Waas",
          salary: "$23,738",
        },
        {
          id: 3,
          name: "Sage Rodriguez",
          country: "Netherlands",
          city: "Overland Park",
          salary: "$56,142",
        },
        {
          id: 4,
          name: "Philip Chanley",
          country: "Korea, South",
          city: "Gloucester",
          salary: "$38,735",
        },
        {
          id: 5,
          name: "Doris Greene",
          country: "Malawi",
          city: "Feldkirchen in Kārnten",
          salary: "$63,542",
        },
      ],
      tabs: 0,
      tasks: {
        0: [
          {
            text:
              'Sign contract for "What are conference organizers afraid of?"',
            value: true,
          },
          {
            text:
              "Lines From Great Russian Literature? Or E-mails From My Boss?",
            value: false,
          },
          {
            text:
              "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",
            value: false,
          },
          {
            text: "Create 4 Invisible User Experiences you Never Knew About",
            value: true,
          },
        ],
        1: [
          {
            text:
              "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",
            value: true,
          },
          {
            text:
              'Sign contract for "What are conference organizers afraid of?"',
            value: false,
          },
        ],
        2: [
          {
            text:
              "Lines From Great Russian Literature? Or E-mails From My Boss?",
            value: false,
          },
          {
            text:
              "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",
            value: true,
          },
          {
            text:
              'Sign contract for "What are conference organizers afraid of?"',
            value: true,
          },
        ],
      },
      list: {
        0: false,
        1: false,
        2: false,
      },
      percent: 0,
      total_i: 0,
      total_q: 0,
      dchartdata: null,
      doptions: null,
      ichartdata: null,
      ioptions: null,
      tchartdata: null,
      toptions: null,
      schartdata: null,
      soptions: null,
      invochartdata: null,
      invooptions: null,
      campchartdata: null,
      campoptions: null,
    };
  },
  created() {
    const d = new Date();
    this.startDate = new Date(d.setMonth(d.getMonth() - 1))
      .toISOString()
      .substr(0, 10);
  },
  mounted() {
    this.GetListServices();
    this.fillData();

  },
  computed: {
    ...Vuex.mapState([
      "response",
      "usuario",
      "bodyquote",
      "organizationID",
      "serviceTypes",
    ]),
  },

  methods: {
    ...Vuex.mapActions(["GetCatalogs","GetListServices"]),
    complete(index) {
      this.list[index] = !this.list[index];
    },

    async fillData() {
      const loading = this.$loading({
        lock: true,
        text: "Loading...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      this.total_q = 0;
      this.total_i = 0;
      var total_s = 0;
      var total_t = 0;
      this.total_pp = 0;
      this.percent = 0;
      var total_l = 0;
      var list_invo = [];

      const list_quote = await API.graphql({
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

      this.quotes_datac = list_quote.data.listQuotes;

      console.log(this.quotes_datac);
      var ventas = [];
      for (let i = 0; i < this.quotes_datac.length; i++) {
        this.total_q = this.total_q + this.quotes_datac[i].finalAmount;
      }

      const list_invoices = await API.graphql({
        query: listInvoices,
        variables: {
          filter: {
            PK: {
              eq: this.organizationID,
            },
            SK: {
              eq: "INV#",
            },
            indexs: {
              eq: "4",
            },
            active: {
              eq: "1",
            },
            startDate: {
              eq: "INV#" + this.startDate,
            },
            endDate: {
              eq: "INV#" + this.end_date,
            },
          },
        },
      });

      list_invo = list_invoices.data.listInvoices;
      console.log(list_invo);

      for (let i = 0; i < list_invo.length; i++) {
        this.total_i = this.total_i + list_invo[i].finalAmount;
        ventas.push(list_invo[i]);
      }

      if (this.total_i != 0) {
        this.percent = (this.total_i * 100) / (this.total_i + this.total_q);
        this.percent = this.formattedCurrencyValue(this.percent);
      } else {
        this.percent = 0;
        this.percent = this.formattedCurrencyValue(this.percent);
      }

      const inst = await API.graphql({
        query: listInstallments,
        variables: {
          filter: {
            PK: {
              eq: this.organizationID,
            },
            SK: {
              eq: "INS#",
            },
            indexs: {
              eq: "4",
            },
            active: {
              eq: "1",
            },
            startDate: {
              eq: "INS#" + this.startDate,
            },
            endDate: {
              eq: "INS#" + this.end_date,
            },
          },
        },
      });
      var datas = inst.data.listInstallments;

      for (let i = 0; i < datas.length; i++) {
        if (datas[i].isPaid != "Y") {
          this.total_pp = this.total_pp + datas[i].amount;
        }
      }

      this.total_pp =
        "$ " +
        parseFloat(this.total_pp)
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,");

      const leads = await API.graphql({
        query: listCustomers,
        variables: {
          filter: {
            PK: {
              eq: this.organizationID,
            },
            SK: {
              eq: "CUS#",
            },
            indexs: {
              eq: "4_cus",
            },
            active: {
              eq: "1",
            },
            startDate: {
              eq: "CUS#" + this.startDate,
            },
            endDate: {
              eq: "CUS#" + this.end_date,
            },
          },
        },
      });
      total_l = leads.data.listCustomers.length;

      this.dchartdata = {
        labels: [
          "Leads: " + "(" + total_l + ")",
          "Quote: " + "(" + this.quotes_datac.length + ")",
        ],
        datasets: [
          {
            borderWidth: 1,
            borderColor: ["rgba(255,99,132,1)", "rgba(54, 162, 235, 1)"],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
            ],
            data: [total_l, this.quotes_datac.length],
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

      this.ichartdata = {
        labels: [
          "Invoices: " + "(" + this.formattedValue(this.total_i) + ")",
          "Quote: " + "(" + this.formattedValue(this.total_q) + ")",
        ],
        datasets: [
          {
            label: [this.total_i, this.total_q],
            borderWidth: 1,
            borderColor: ["rgba(153, 102, 255, 1)", "rgba(54, 162, 235, 1)"],
            backgroundColor: [
              "rgba(153, 102, 255, 0.2)",
              "rgba(54, 162, 235, 0.2)",
            ],
            data: [this.total_i, this.total_q],
          },
        ],
      };

      this.ioptions = {
        responsive: true,
        maintainAspectRatio: false,
      };

      this.tchartdata = {
        labels: [
          "Services: " + "(" + total_s + ")",
          "Task: " + "(" + total_t + ")",
        ],
        datasets: [
          {
            borderWidth: 1,
            borderColor: ["rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)"],
            backgroundColor: [
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
            ],
            data: [total_s, total_t],
          },
        ],
      };

      this.toptions = {
        legend: {
          display: true,
        },
        responsive: true,
        maintainAspectRatio: false,
      };

      const quoteItem = await API.graphql({
        query: listQuoteItems,
        variables: {
          filter: {
            PK: {
              eq: this.organizationID,
            },
            SK: {
              eq: "QIT#",
            },
            indexs: {
              eq: "4_cus",
            },
            active: {
              eq: "1",
            },
            startDate: {
              eq: "TASK#" + this.startDate,
            },
            endDate: {
              eq: "TASK#" + this.end_date,
            },
          },
        },
      });
      var serv = quoteItem.data.listQuoteItems;
      console.log(serv);
      console.log(this.serviceTypes);
      var ser_pay = [];
      for (let i = 0; i < this.serviceTypes.length; i++) {
        var c = 0;
        var name = "";
        for (let j = 0; j < serv.length; j++) {
          if (this.serviceTypes[i].name == serv[j].productType) {
            c++;
            name = serv[j].productType;
          }
        }
        if (c != 0) {
          ser_pay.push({
            type: name,
            total: c,
          });
        }
      }
      console.log(ser_pay);
      var labels = [];
      var data = [];
      for (let i = 0; i < ser_pay.length; i++) {
        labels.push(ser_pay[i].type + ": (" + ser_pay[i].total + ")");
        data.push(ser_pay[i].total);
      }
      console.log(labels);
      console.log(data);

      this.schartdata = {
        labels: labels,
        datasets: [
          {
            borderWidth: 1,
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            data: data,
          },
        ],
      };

      this.soptions = {
        legend: {
          display: true,
        },
        responsive: true,
        maintainAspectRatio: false,
      };

      const invest = await API.graphql({
        query: listCampaings,
        variables: {
          filter: {
            PK: {
              eq: this.organizationID,
            },
            SK: {
              eq: "CPG#",
            },
            indexs: {
              eq: "4_cus",
            },
            active: {
              eq: "1",
            },
            startDate: {
              eq: "CPG#" + this.startDate,
            },
            endDate: {
              eq: "CPG#" + this.end_date,
            },
          },
        },
      });
      console.log(invest);

      var inv = invest.data.listCampaings;
      var total_camaping = 0;

      for (let i = 0; i < inv.length; i++) {
        total_camaping += inv[i].price;
      }

      var groupByInver = function (miarray) {
        return miarray.reduce(function (groups, item) {
          let a = item.startDate.split("-");
          var val = a[0] + "-" + a[1];
          groups[val] = groups[val] || { date: val, pv: 0 };
          groups[val].pv += item.price;
          return groups;
        }, {});
      };

      var array = Object.values(groupByInver(inv));
      console.log(array);

      var groupByInvo = function (miarray) {
        return miarray.reduce(function (groups, item) {
          let a = item.createdAt.split("-");
          var val = a[0] + "-" + a[1];
          groups[val] = groups[val] || { date: val, pv: 0 };
          groups[val].pv += item.finalAmount;
          return groups;
        }, {});
      };
      var array_invo = Object.values(groupByInvo(ventas));
      console.log(array_invo);

      var labels_inv = [];
      var data_inv = [];
      var data_invo = [];
      for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array_invo.length; j++) {
          if (array[i].date == array_invo[j].date) {
            labels_inv.push(array[i].date);
            data_inv.push(array[i].pv);
            data_invo.push(array_invo[j].pv);
          } else {
            labels_inv.push(array[i].date);
            data_inv.push(array[i].pv);
            data_invo.push(0);
          }
        }
      }
      console.log(data_inv);
      console.log(data_invo);

      this.invochartdata = {
        labels: labels_inv,
        datasets: [
          {
            label: "CAMPAIGNS",
            backgroundColor: "rgba(153, 102, 255, 0.2)",
            data: data_inv,
          },
          {
            label: "SALES",
            backgroundColor: "rgba(255, 159, 64, 0.2)",
            data: data_invo,
          },
        ],
      };

      this.invooptions = {
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
              stacked: true,
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
              categoryPercentage: 0.6,
              stacked: true,
            },
          ],
        },
        legend: {
          display: true,
        },
        responsive: true,
        maintainAspectRatio: false,
      };

      this.campchartdata = {
        labels: [
          "CAMPAIGNS(" + this.formattedValue(total_camaping) + ")",
          "SALES(" + this.formattedValue(this.total_i) + ")",
        ],
        datasets: [
          {
            borderWidth: 1,
            borderColor: ["rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"],
            backgroundColor: [
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            data: [total_camaping, this.total_i],
          },
        ],
      };

      this.campoptions = {
        legend: {
          display: true,
        },
        responsive: true,
        maintainAspectRatio: false,
      };

      loading.close();
    },

    formattedCurrencyValue(value) {
      return (
        parseFloat(value)
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,") + " %"
      );
    },

    formattedValue(value) {
      return (
        "$ " +
        parseFloat(value)
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,")
      );
    },
  },
};
</script>
