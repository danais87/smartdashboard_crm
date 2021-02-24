<template>
  <v-container id="dashboard" fluid grid-list-lg class="mx-0 pa-0">
    <v-alert v-if="show == false" type="error"
      >error no existe el quote</v-alert
    >
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
                <el-col cols="12" :md="12" :sm="12">
                  <h4 style="font-size: 20px">Quote #: {{ item.smName }}</h4>
                </el-col>
                <el-col cols="12" :md="12" :sm="12">
                  <h4 style="font-size: 20px">
                    <i class="el-icon-lock" aria-hidden="true"></i> &nbsp;
                    Secure Checkout
                  </h4>
                </el-col>
                <br /><br /></div
            ></el-col>
          </el-row>
          <v-row>
            <v-col cols="12" sm="6" md="6"
              ><div class="grid-content bg-purple-dark">
                <v-row class="pa-md-4 mx-lg-auto">
                  <v-col cols="12" sm="6" md="6">
                    <h4>
                      <span>
                        <i
                          class="fa fa-user text-primary"
                          aria-hidden="true"
                        ></i
                        >Client: {{ item.customerName }}
                      </span>
                    </h4>
                  </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row class="pa-md-4 mx-lg-auto">
                  <v-col cols="12" sm="6" md="6">
                    <h3>Invoice Total Amount</h3>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <p align="right">
                      {{ formattedCurrencyValue(item.finalAmount) }}
                    </p>
                  </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row class="pa-md-4 mx-lg-auto">
                  <v-col cols="12" sm="8" md="8">
                    <h3>Amount you have paid so far( Thank you)</h3>
                  </v-col>
                  <v-col cols="12" sm="4" md="4">
                    <p align="right">
                      {{ formattedCurrencyValue(total) }}
                    </p>
                  </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-divider></v-divider>
                <v-row class="pa-md-4 mx-lg-auto">
                  <v-col cols="12" sm="6" md="6">
                    <h3>Balance</h3>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <p align="right">
                      {{ formattedCurrencyValue(balance) }}
                    </p>
                  </v-col>
                </v-row>
                <v-divider></v-divider>

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
                    <v-col cols="12" sm="3" md="3">
                      <h4>Installment Date</h4>
                    </v-col>
                    <v-col cols="12" sm="3" md="3">
                      <h4>Is Pay</h4>
                    </v-col>
                    <v-col cols="12" sm="3" md="3">
                      <h4>Pay Date</h4>
                    </v-col>
                    <v-col cols="12" sm="3" md="3">
                      <p align="right" color="primary">Amount</p>
                    </v-col>
                  </v-row>
                  <v-divider></v-divider>
                  <div v-for="inst in installments" :key="inst.id">
                    <v-row class="pa-md-4 mx-lg-auto">
                      <v-col cols="12" sm="3" md="3">
                        <h4>{{ inst.startDate }}</h4>
                      </v-col>
                      <v-col cols="12" sm="3" md="3">
                        <h4>{{ inst.isPaid }}</h4>
                      </v-col>
                      <v-col cols="12" sm="3" md="3">
                        <h4>{{ inst.payDate }}</h4>
                      </v-col>
                      <v-col cols="12" sm="3" md="3">
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
            <v-col cols="12" sm="6" md="6">
              <div class="grid-content bg-purple-dark">
                <v-row class="pa-md-4 mx-lg-auto">
                  <v-col cols="12" sm="8" md="8"
                    ><strong class="primary--text text--lighten-1"
                      >Amount to pay today:</strong
                    >
                  </v-col>
                  <v-col cols="12" sm="4" md="4">
                    <strong
                      ><h4 align="right">
                        {{ formattedCurrencyValue(install.amount) }}
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
                <v-col>
                  <div id="paypal_sdk" style="width: 20%"></div>
                </v-col>
              </div>
            </v-col>
          </v-row>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </v-container>
</template>

<script>
import { API } from "aws-amplify";
import {
  getOrganization,
  listCustomers,
  listQuotes,
} from "../../../graphql/queries";
import Vuex from "vuex";
import { updateRecord } from "../../../graphql/mutations";

export default {
  name: "Payment",
  components: {},

  data() {
    return {
      checkbox: true,
      paidFor: false,
      error: "",
      inst: this.$route.query.inst,
      quoteID: this.$route.query.quote,
      item: {},
      show: false,
      p_inst: 0,
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
      total: "",
      balance: "",
      card_name: "",
      card_number: "",
      card_cvv: "",
      order: "",
      installments: [],
      q_services: [],
      editedItemLeads: [],
      selectedEmails: [],
      install: [],
      product: {
        price: 100,
        description: "dsadasdas",
      },
    };
  },
  mounted() {},
  async created() {
    await this.ConfirmQuote(this.inst, this.quoteID);
    console.log(this.quoteID);
    console.log(this.inst);
  },
  computed: {
    ...Vuex.mapState(["response", "usuario", "bodyquote", "organizationID"]),
  },
  methods: {
    ...Vuex.mapMutations(["SetResponse", "SetBodyQuote"]),

    async ConfirmQuote(instID, quoteID) {
      const seq = await API.graphql({
        query: listQuotes,
        variables: {
          filter: {
            PK: {
              eq: this.organizationID,
            },
            SK: {
              eq: quoteID,
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
      var installments = [];
      var services = [];

      this.editedItemLeads = [];
      this.phones = [];

      for (let i = 0; i < datas.length; i++) {
        if (datas[i].entityType == "QUOTE") {
          quotes.push(datas[i]);
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

      for (let k = 0; k < installments.length; k++) {
        if ((installments[k].SK == instID)) {
          this.install = installments[k];
        }
        this.installments.push(installments[k]);
      }

      console.log(this.install);

      const l = await API.graphql({
        query: listCustomers,
        variables: {
          filter: {
            PK: {
              eq: this.organizationID,
            },
            SK: {
              eq: this.item.GSP1PK1,
            },
            indexs: {
              eq: "table",
            },
            active: {
              eq: "1",
            },
          },
        },
      });

      console.log(l);

      this.editedItemLeads = l.data.listCustomers[0];

      this.editedItemLeads.name = JSON.parse(
        this.editedItemLeads.l_smName
      )[0].fullName;

      for (let i = 0; i < this.installments.length; i++) {
        if (this.installments[i].is_paid) {
          this.p_inst = this.p_inst + this.installments[i].amount;
        }
      }

      this.total_disc = quotes[0].finalAmount;
      this.total = quotes[0].downPayment + this.p_inst;
      this.balance =
        quotes[0].finalAmount - this.p_inst - quotes[0].downPayment;

      this.SetBodyQuote(datas);

      const script = document.createElement("script");
      script.src =
        "https://www.paypal.com/sdk/js?client-id=AQ0B-cxEGdNi2dOEqb9vks-J91RWIsabXcVecRoKeRBjnwA3a-zgq39Y2ZtRoSzK1g7lICLOIC6EuzAb";
      script.addEventListener("load", this.setLoaded);
      document.body.appendChild(script);
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
            const payment = this.formattedCurrencyValue(this.install.amount);
            const balance = this.formattedCurrencyValue(this.balance);

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
                    value: this.install.amount,
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            this.order = await actions.order.capture();
            this.paidFor = true;
            console.log(this.order);

            this.invokeLambda(this.item);
          },
          onError: (err) => {
            this.error = err;
            console.log(this.error);
          },
        })
        .render("#paypal_sdk");
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
        const instPK = this.organizationID;
        const instSK = this.install.SK;
        await lambda.invoke(pullParams, async function (error, data) {
          if (error) {
            prompt(error);
          } else {
            pullResults = JSON.parse(data.Payload);
            console.log(pullResults);
            if (pullResults.MessageId) {
              const isPaid = "Y";
              const payDate = new Date().toISOString().substr(0, 10);
              const SK = instSK;
              const PK = instPK;
              const todo = { isPaid, payDate, SK, PK };
              await API.graphql({
                query: updateRecord,
                variables: { input: todo },
              });
              this.alert = true;
            }
          }
        });
      }
      this.$router.push({
        path: "./menu/payments",
      });
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