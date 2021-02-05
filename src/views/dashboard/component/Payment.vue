<template>
  <v-container id="dashboard" fluid grid-list-lg class="mx-0 pa-0">
    <v-card v-if="show == true" class="mx-auto" max-width="1000" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-img
                :src="require('../../../assets/bizPlanEasyLogo.png')"
                contain
                height="65"
            /></v-col>
            <v-spacer></v-spacer>
            <v-col cols="12" sm="6" md="4" align="right">
              <a href="mailto:support@bizplaneasy.com"
                >support@bizplaneasy.com</a
              ><br />
              <a href="tel:8775332075">877-533-2075</a>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <el-row>
            <el-col :span="24"
              ><div class="grid-content bg-purple-dark">
                <br />
                <h4 style="font-size: 20px" align="center">
                  <i class="el-icon-lock" aria-hidden="true"></i> &nbsp; Secure
                  Checkout
                </h4>
                <br /></div
            ></el-col>
          </el-row>
          <v-row>
            <v-col cols="12" sm="12" md="12"
              ><div class="grid-content bg-purple-dark">
                <h5>
                  <span>
                    <i class="fa fa-user text-primary" aria-hidden="true"></i
                    >Order Summary
                  </span>
                </h5>
                <v-divider></v-divider>
                <div v-for="el in q_services" :key="el.id">
                  <v-row class="pa-md-4 mx-lg-auto">
                    <v-col cols="12" sm="6" md="6">
                      <h4>{{ el.smName }}</h4>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <p align="right" color="primary">
                        {{ formattedCurrencyValue(el.price) }}
                      </p>
                    </v-col>
                  </v-row>
                  <v-divider></v-divider>
                </div>
                <v-row class="pa-md-4 mx-lg-auto">
                  <v-col cols="12" sm="6" md="6">
                    <h3>TOTAL</h3>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <p align="right">
                      {{ formattedCurrencyValue(item.finalAmount) }}
                    </p>
                  </v-col>
                </v-row>
                <v-row class="pa-md-4 mx-lg-auto">
                  <v-col cols="12" sm="8" md="8"
                    ><strong class="primary--text text--lighten-1"
                      >Amount to be paid now (Downpayment):</strong
                    >
                  </v-col>
                  <v-col cols="12" sm="4" md="4">
                    <strong
                      ><h4 align="right">
                        {{ formattedCurrencyValue(item.downPayment) }}
                      </h4></strong
                    ></v-col
                  >
                </v-row>
                <div id="agree_text" style="font-size: 14px; padding: 10px">
                  <v-checkbox v-model="checkbox">
                    <template v-slot:label>
                      <div>
                        <strong>By clicking, you agree to </strong>
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on }">
                            <a
                              target="_blank"
                              href="privacy_policy.php"
                              @click.stop
                              v-on="on"
                            >
                              BizPlanEasy Privacy Policy
                            </a>
                          </template>
                          Opens in new window
                        </v-tooltip>
                        &
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on }">
                            <a
                              target="_blank"
                              href="terms.php"
                              @click.stop
                              v-on="on"
                            >
                              Terms of Service
                            </a>
                          </template>
                          Opens in new window
                        </v-tooltip>
                      </div>
                    </template>
                  </v-checkbox>
                </div>
                <div
                  style="
                    margin-top: 20px;
                    border-radius: 15px;
                    background-color: #fefedc;
                  "
                >
                  <h5 style="padding-left: 15px">
                    <span>
                      <i
                        class="fas fa-dollar-sign text-primary"
                        aria-hidden="true"
                      ></i>
                      Installment Schedule</span
                    >
                  </h5>
                  <v-divider></v-divider>
                  <v-row class="pa-md-4 mx-lg-auto">
                    <v-col cols="12" sm="6" md="6">
                      <h4>Installment Date</h4>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <p align="right" color="primary">Amount</p>
                    </v-col>
                  </v-row>
                  <v-divider></v-divider>
                  <div v-for="inst in installments" :key="inst.id">
                    <v-row class="pa-md-4 mx-lg-auto">
                      <v-col cols="12" sm="6" md="6">
                        <h4>{{ inst.startDate }}</h4>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <p align="right" color="primary">
                          {{ formattedCurrencyValue(inst.amount) }}
                        </p>
                      </v-col>
                    </v-row>
                    <v-divider></v-divider>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-list-item-content>
      </v-list-item>
    </v-card>
    <v-col align="center">
      <div ref="paypal" style="width: 20%"></div>
    </v-col>
  </v-container>
</template>

<script>
import { API } from "aws-amplify";
import {
  getCompany,
  getOrganization,
  getQuotation,
  getQuote,
  listPhoneNumber,
  listQuoteItems,
  listQuotes,
  listServicesLineQs,
  listSmInstallments,
  listSmInvoices,
} from "../../../graphql/queries";
import Vuex from "vuex";
import {
  createSmInvoice,
  createSmTaskMonitor,
  updateQuotation,
  updateRecord,
  updateServicesLineQ,
} from "../../../graphql/mutations";

export default {
  name: "Payment",
  components: {},
  data() {
    return {
      checkbox: true,
      paidFor: false,
      error: "",
      id: this.$route.query.id,
      organizationID: this.$route.query.orgid,
      item: {},
      q_services: [],
      show: false,
      card_options: [
        {
          value: "Visa",
          label: "Visa",
        },
        {
          value: "MasterCard",
          label: "MasterCard",
        },
        {
          value: "Discover",
          label: "Discover",
        },
        {
          value: "Amex",
          label: "Amex",
        },
      ],
      card_month: [
        {
          value: "01",
          label: "01",
        },
        {
          value: "02",
          label: "02",
        },
        {
          value: "03",
          label: "03",
        },
        {
          value: "04",
          label: "04",
        },
        {
          value: "05",
          label: "05",
        },
        {
          value: "06",
          label: "06",
        },
        {
          value: "07",
          label: "07",
        },
        {
          value: "08",
          label: "08",
        },
        {
          value: "09",
          label: "09",
        },
        {
          value: "10",
          label: "10",
        },
        {
          value: "11",
          label: "11",
        },
        {
          value: "12",
          label: "12",
        },
      ],
      card_year: [
        {
          value: "2019",
          label: "2019",
        },
        {
          value: "2020",
          label: "2020",
        },
        {
          value: "2021",
          label: "2021",
        },
        {
          value: "2022",
          label: "2022",
        },
        {
          value: "2023",
          label: "2023",
        },
        {
          value: "2024",
          label: "2024",
        },
        {
          value: "2025",
          label: "2025",
        },
        {
          value: "2026",
          label: "2026",
        },
        {
          value: "2027",
          label: "2027",
        },
        {
          value: "2028",
          label: "2028",
        },
        {
          value: "2029",
          label: "2029",
        },
        {
          value: "2030",
          label: "2030",
        },
      ],
      headers_e: [
        { text: "name", align: "start", sortable: true, value: "name" },
        { text: "price", align: "start", sortable: true, value: "price" },
      ],
      card_name: "",
      card_number: "",
      card_cvv: "",
      editedItemLeads: [],
      order: "",
      phones: [],
      installments: [],
      selectedEmails: [],
      product: {
        price: 100,
        description: "dsadasdas",
      },
    };
  },
  mounted() {
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AQ0B-cxEGdNi2dOEqb9vks-J91RWIsabXcVecRoKeRBjnwA3a-zgq39Y2ZtRoSzK1g7lICLOIC6EuzAb";
    script.addEventListener("load", this.setLoaded);
    document.body.appendChild(script);
  },
  created() {
    console.log(this.id);
    this.ConfirmQuote(this.id);
  },
  computed: {
    ...Vuex.mapState(["response", "usuario", "bodyquote"]),
  },
  methods: {
    ...Vuex.mapMutations([
      "SetResponse",
      "SetBodyQuote",
      "SetPhone",
      "SetEmails",
      "SetAddress",
    ]),

    async ConfirmQuote(id_quote) {
      const seq = await API.graphql({
        query: listQuotes,
        variables: {
          filter: {
            PK: {
              eq: this.organizationID,
            },
            SK: {
              eq: "QUO#" + id_quote,
            },
            indexs: {
              eq: "2",
            },
            active: {
              eq: "1",
            },
          },
        },
      });

      var datas = seq.data.listQuotes;
      console.log(datas.length);
      if (datas.length > 0) {
        this.show = true;
      }
      var quotes = [];
      var leads = [];
      var installments = [];
      var services = [];
      let vari = [];
      let servi = [];
      this.editedItemLeads = [];
      this.phones = [];

      for (let i = 0; i < datas.length; i++) {
        if (datas[i].entityType == "QUOTE") {
          quotes.push(datas[i]);
        }
        if (datas[i].entityType == "CUSTOMER") {
          leads.push(datas[i]);
        }
        if (datas[i].entityType == "INSTALLMENT") {
          installments.push(datas[i]);
        }
        if (datas[i].entityType == "QUOTEITEM") {
          services.push(datas[i]);
        }
      }
      this.item = quotes[0];
      console.log(this.item);
      for (let j = 0; j < services.length; j++) {
        this.q_services.push(services[j]);
      }
      console.log(this.q_services);
      if (this.item.isInstallment == "true") {
        for (let k = 0; k < installments.length; k++) {
          this.installments.push(installments[k]);
        }
      }

      for (let l = 0; l < leads.length; l++) {
        this.editedItemLeads = leads[l];
      }

      this.editedItemLeads.name = JSON.parse(
        this.editedItemLeads.l_smName
      )[0].fullName;

      this.total = quotes[0].quotationAmount;
      this.total_disc = quotes[0].finalAmount;

      this.SetBodyQuote(datas);
    },

    formattedCurrencyValue(value) {
      return (
        "$ " +
        parseFloat(value)
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,")
      );
    },

    setLoaded() {
      window.paypal
        .Buttons({
          style: {
            size: "responsive",
            color: "gold",
            shape: "pill",
            fundingicons: "true",
          },
          funding: {
            allowed: [window.paypal.FUNDING.CARD],
          },
          createOrder: (data, actions) => {
            const final_amount = this.formattedCurrencyValue(
              this.item.finalAmount
            );
            const payment = this.formattedCurrencyValue(this.item.downPayment);
            const balance = this.formattedCurrencyValue(
              this.item.finalAmount - this.item.downPayment
            );

            return actions.order.create({
              purchase_units: [
                {
                  description:
                    "BizPlanEasy Services-Quote #: " +
                    this.item.smName +
                    ";(Total Amount: " +
                    final_amount +
                    "); (This Payment: " +
                    payment +
                    "),(Balance:" +
                    balance +
                    ")",
                  amount: {
                    currency_code: "USD",
                    value: this.item.downPayment,
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            this.order = await actions.order.capture();
            this.paidFor = true;
            console.log(this.order);

            this.invokeLambda(this.item.id);
            this.createInvoice();
          },
          onError: (err) => {
            this.error = err;
            console.log(this.error);
          },
        })
        .render(this.$refs.paypal);
    },

    async createInvoice() {
      const loading = this.$loading({
        lock: true,
        text: "Create Invoice",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      const seq = await API.graphql({
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
              eq: "table_order",
            },
            active: {
              eq: "1",
            },
          },
        },
      });
      const sequence = seq.data.listQuotes;
      const c = sequence.length++;
      const PK = this.item.PK;
      const SK = this.item.SK;
      const paymentStatus = "GS";
      const orderNumber = "INV#" + c;
      const processStatus = "Invoice";

      const todo = {
        PK,
        SK,
        paymentStatus,
        orderNumber,
        processStatus,
      };

      const invo = await API.graphql({
        query: updateRecord,
        variables: { input: todo },
      });

      console.log(this.item);
      const quote = await API.graphql({
        query: listQuotes,
        variables: {
          filter: {
            PK: {
              eq: this.organizationID,
            },
            SK: {
              eq: this.item.SK,
            },
            indexs: {
              eq: "2",
            },
            active: {
              eq: "1",
            },
          },
        },
      });
      console.log(quote);
      var datas = quote.data.listQuotes;
      var installments = [];
      var services = [];
      for (let i = 0; i < datas.length; i++) {
        if (datas[i].entityType == "INSTALLMENT") {
          installments.push(datas[i]);
        }
        if (datas[i].entityType == "QUOTEITEM") {
          services.push(datas[i]);
        }
      }
      //update QUOTEITEM
      console.log(services);
      for (let i = 0; i < services.length; i++) {
        const PK = services[i].PK;
        const SK = services[i].SK;
        const GSP3PK1 = this.organizationID + "#TASK";
        const GSP3SK1 = "STATUS#" + "IP";
        const GSP4PK1 = this.organizationID;
        const GSP4SK1 = new Date().toISOString().substr(0, 10);
        const taskStatus = "In Progress";
        const taskStart = new Date().toISOString().substr(0, 10);
        const todo = {
          PK,
          SK,
          GSP3PK1,
          GSP3SK1,
          GSP4PK1,
          GSP4SK1,
          taskStatus,
          taskStart,
          paymentStatus,
          orderNumber,
          processStatus,
        };
        await API.graphql({
          query: updateRecord,
          variables: { input: todo },
        });
      }

      //update INSTALLMENT
      for (let i = 0; i < installments.length; i++) {
        var inst = "";

        if (installments[i].type == "DPAY") {
          const PK = installments[i].PK;
          const SK = installments[i].SK;
          const GSP3PK1 = this.organizationID + "#PAY";
          const GSP3SK1 = "STATUS#N";
          const GSP4PK1 = this.organizationID;
          const GSP4SK1 = installments[i].startDate;
          const isPaid = "Y";
          inst = {
            PK,
            SK,
            GSP3PK1,
            GSP3SK1,
            GSP4PK1,
            GSP4SK1,
            isPaid,
          };
        } else {
          const PK = installments[i].PK;
          const SK = installments[i].SK;
          const GSP3PK1 = this.organizationID + "#PAY";
          const GSP3SK1 = "STATUS#N";
          const GSP4PK1 = this.organizationID;
          const GSP4SK1 = installments[i].startDate;
          inst = {
            PK,
            SK,
            GSP3PK1,
            GSP3SK1,
            GSP4PK1,
            GSP4SK1,
          };
        }
        await API.graphql({
          query: updateRecord,
          variables: { input: inst },
        });
      }

      console.log(invo);
      loading.close();
      this.$router.push({
        path: "./menu/invoice",
      });
    },

    async invokeLambda(item) {
      var AWS = require("aws-sdk");

      const todos = await API.graphql({
        query: getOrganization,
        variables: {
          filter: {
            active: { eq: "1" },
            SK: {
              eq: "#META#",
            },
            PK: { eq: this.organizationID },
          },
        },
      });

      const com = todos.data.getOrganization[0];

      var REGION = com.funcRegion;
      var identityPoolId = com.funcIdentityPoolId;

      AWS.config.update({
        region: REGION,
      });

      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: identityPoolId,
      });

      var lambda = new AWS.Lambda({
        region: REGION,
        apiVersion: "2015-03-31",
      });

      this.selectedEmails = [...this.selectedEmails, "ucidanais@gmail.com"];
      this.selectedEmails = [...this.selectedEmails, "alberto@bizplaneasy.com"];
      this.selectedEmails = [...this.selectedEmails, "info@bizplaneasy.com"];
      this.selectedEmails = [
        ...this.selectedEmails,
        this.order.payer["email_address"],
      ];
      console.log(this.selectedEmails);

      for (let i = 0; i < this.selectedEmails.length; i++) {
        var pullParams = {
          FunctionName: com.funcName,
          InvocationType: "RequestResponse",
          Payload:
            '{ "toAddresses": "' +
            this.selectedEmails[i] +
            '","source":"' +
            com.funcSource +
            '","subject":"' +
            "Thank you for your payment [BizPlanEasy Order #: " +
            this.item.smName +
            "]" +
            '","body":"' +
            this.bodyquote +
            '"}',
          LogType: "None",
        };
        var pullResults = null;
        await lambda.invoke(pullParams, async function (error, data) {
          if (error) {
            prompt(error);
          } else {
            pullResults = JSON.parse(data.Payload);
            console.log(pullResults);
            if (pullResults.MessageId) {
              this.alert = true;
            }
          }
        });
      }
    },
  },
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #cfd6e0;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.v-application .pa-md-4 {
  padding: 5px !important;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>