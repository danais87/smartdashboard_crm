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
            <el-col :span="24" autofocus
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
          <br />
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
            <v-col cols="12" sm="6" md="6">
              <div class="grid-content bg-purple-dark">
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

                <v-col>
                  <div id="paypal-button-container" style="width: 20%"></div>
                </v-col>

                <v-col>
                  Card Type: Visa

                    Card Number: 4032032361134577

                    Expiration Date: 02/2025

                    CVV: 611
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
  listInvoices,
  listQuotes,
} from "../../../graphql/queries";
import Vuex from "vuex";
import { createRecord, updateRecord } from "../../../graphql/mutations";
import { uuid } from "vue-uuid";

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
    };
  },
  mounted() {},

  async created() {
    console.log(this.id);
    await this.ConfirmQuote(this.id);
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
              eq: id_quote,
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
        for (let i = 0; i < JSON.parse(this.item.l_installments).length; i++) {
          let startDate = JSON.parse(this.item.l_installments)[i].startDate;
          let amount = JSON.parse(this.item.l_installments)[i].amount;
          let type = JSON.parse(this.item.l_installments)[i].type;
          let isPaid = JSON.parse(this.item.l_installments)[i].isPaid;
          let customerName = JSON.parse(this.item.l_installments)[i]
            .customerName;
          let scale = JSON.parse(this.item.l_installments)[i].scale;
          const todo = {
            startDate,
            amount,
            type,
            isPaid,
            customerName,
            scale,
          };
          this.installments.push(todo);
        }
      }
      console.log(this.installments);

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

      this.total = quotes[0].quotationAmount;
      this.total_disc = quotes[0].finalAmount;

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
            const payment = this.formattedCurrencyValue(this.item.downPayment);
            const balance = this.formattedCurrencyValue(
              this.item.finalAmount - this.item.downPayment
            );

            return actions.order.create({
              payer: {
                name: {
                  given_name: this.editedItemLeads.name,
                  surname: "Customer",
                },
                address: {
                  address_line_1: "123 ABC Street",
                  address_line_2: "Apt 2",
                  admin_area_2: "San Jose",
                  admin_area_1: "CA",
                  postal_code: "95121",
                  country_code: "US",
                },
                email_address: "customer@domain.com",
                phone: {
                  phone_type: "MOBILE",
                  phone_number: {
                    national_number: "14082508100",
                  },
                },
              },
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
        .render("#paypal-button-container");
    },

    async createInvoice() {
      console.log(this.item);
      const loading = this.$loading({
        lock: true,
        text: "Create Invoice",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      const seq = await API.graphql({
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
              eq: "table",
            },
            active: {
              eq: "1",
            },
          },
        },
      });
      //CREATE INVOICE
      var sequence = seq.data.listInvoices.length;
      const c = sequence++;
      var PK = this.organizationID;
      const id = uuid.v1();
      var SK = "INV#" + id;
      const GSP1PK1 = this.editedItemLeads.SK;
      const GSP1SK1 = SK;
      const payDate = new Date().toISOString().substr(0, 10);
      const GSP3PK1 = this.organizationID + "#INV";
      const GSP3SK1 = "STATUS#";
      var GSP4PK1 = this.organizationID;
      var GSP4SK1 = "INV#" + payDate;
      const entityType = "INVOICE";
      const createdAt = new Date().toISOString().substr(0, 10);
      const updateAt = new Date().toISOString().substr(0, 10);
      const createdBy = this.usuario;
      const active = "1";
      const smName = "INV" + c;
      const subject = this.item.subject;
      const introduction = this.item.introduction;
      const conclusion = this.item.conclusion;
      const internalComments = this.item.internalComments;
      const isDiscount = this.item.isDiscount;
      const isInstallment = this.item.isInstallment;
      const downPayment = this.item.downPayment;
      const numInstallments = this.item.numInstallments;
      const discountAmount = this.item.discountAmount;
      const l_discount = this.item.l_discount;
      const quotationAmount = this.item.quotationAmount;
      const finalAmount = this.item.finalAmount;
      const processStatus = this.item.processStatus;
      const quoteID = this.item.SK;
      const balance = this.item.finalAmount - this.item.downPayment;
      const paidAmount = this.item.downPayment;
      const customerName = this.item.customerName;
      const acquisition = this.item.acquisition;
      const todo = {
        PK,
        id,
        SK,
        GSP1PK1,
        GSP1SK1,
        GSP3PK1,
        GSP4PK1,
        GSP4SK1,
        GSP3SK1,
        entityType,
        createdAt,
        updateAt,
        createdBy,
        active,
        balance,
        paidAmount,
        smName,
        payDate,
        customerName,
        acquisition,
        conclusion,
        internalComments,
        subject,
        introduction,
        isDiscount,
        l_discount,
        discountAmount,
        quotationAmount,
        finalAmount,
        isInstallment,
        processStatus,
        quoteID,
        downPayment,
        numInstallments,
      };

      const invo = await API.graphql({
        query: createRecord,
        variables: { input: todo },
      });
      console.log(invo);

      // UPDATE QUOTE
      PK = this.item.PK;
      SK = this.item.SK;
      const purchased = "Y";
      const quote = {
        SK,
        PK,
        purchased,
      };
      await API.graphql({
        query: updateRecord,
        variables: { input: quote },
      });

      //CREATE TASK
      console.log(this.q_services);
      for (let i = 0; i < this.q_services.length; i++) {
        const id = uuid.v1();
        const PK = this.organizationID;
        const SK = "TSK#" + id;
        const GSP1PK1 = this.editedItemLeads.SK;
        const GSP1SK1 = SK;
        const GSP2PK1 = this.item.SK;
        const GSP2SK1 = SK;
        const GSP3PK1 = this.organizationID + "#TSK";
        const GSP3SK1 = "STATUS#" + "IP";
        const GSP4PK1 = this.organizationID;
        const GSP4SK1 = "TSK#" + new Date().toISOString().substr(0, 10);
        const taskStatus = "In Progress";
        const taskStart = new Date().toISOString().substr(0, 10);
        const updateAt = new Date().toISOString().substr(0, 10);
        const createdAt = new Date().toISOString().substr(0, 10);
        const active = "1";
        const entityType = "TASK";
        const smName = this.q_services[i].smName;
        const customerName = this.q_services[i].customerName;
        const productType = this.q_services[i].productType;
        const estimatedHours = this.q_services[i].estimatedHours;
        const todo = {
          PK,
          SK,
          GSP1PK1,
          GSP1SK1,
          GSP2PK1,
          GSP2SK1,
          GSP3PK1,
          GSP3SK1,
          GSP4PK1,
          GSP4SK1,
          entityType,
          taskStatus,
          taskStart,
          updateAt,
          createdAt,
          active,
          smName,
          customerName,
          productType,
          estimatedHours,
        };
        await API.graphql({
          query: createRecord,
          variables: { input: todo },
        });
      }

      //CREATE INSTALLMENT
      var inst = "";
      for (let i = 0; i < this.installments.length; i++) {
        if (this.installments[i].type == "DPAY") {
          const id = uuid.v1();
          const PK = this.organizationID;
          const SK = "INS#" + id;
          const GSP1PK1 = this.editedItemLeads.SK;
          const GSP1SK1 = SK;
          const GSP2PK1 = this.item.SK;
          const GSP2SK1 = SK;
          const GSP3PK1 = this.organizationID + "#INS";
          const GSP3SK1 = "STATUS#Y";
          const GSP4PK1 = this.organizationID;
          const GSP4SK1 = "INS#" + this.installments[i].startDate;
          const entityType = "INSTALLMENT";
          const createdAt = new Date().toISOString().substr(0, 10);
          const updateAt = new Date().toISOString().substr(0, 10);
          const createdBy = this.usuario;
          const active = "1";
          const startDate = this.installments[i].startDate;
          const amount = this.installments[i].amount;
          const type = this.installments[i].type;
          const scale = this.installments[i].scale;
          const isPaid = "Y";
          const payDate = new Date().toISOString().substr(0, 10);
          const customerName = this.item.customerName;
          inst = {
            id,
            PK,
            SK,
            GSP1PK1,
            GSP1SK1,
            GSP2PK1,
            GSP2SK1,
            entityType,
            createdAt,
            createdBy,
            active,
            startDate,
            amount,
            type,
            scale,
            customerName,
            GSP3PK1,
            GSP3SK1,
            GSP4PK1,
            GSP4SK1,
            isPaid,
            payDate,
            updateAt,
          };
          await API.graphql({
            query: createRecord,
            variables: { input: inst },
          });
        } else {
          const id = uuid.v1();
          const SK = "INS#" + id;
          const GSP1PK1 = this.editedItemLeads.SK;
          const GSP1SK1 = SK;
          const GSP2PK1 = this.item.SK;
          const GSP2SK1 = SK;
          const GSP3PK1 = this.organizationID + "#INS";
          const GSP3SK1 = "STATUS#N";
          const GSP4PK1 = this.organizationID;
          const GSP4SK1 = "INS#" + this.installments[i].startDate;
          const entityType = "INSTALLMENT";
          const createdAt = new Date().toISOString().substr(0, 10);
          const updateAt = new Date().toISOString().substr(0, 10);
          const createdBy = this.usuario;
          const active = "1";
          const startDate = this.installments[i].startDate;
          const amount = this.installments[i].amount;
          const type = this.installments[i].type;
          const scale = this.installments[i].scale;
          const isPaid = "N";
          const customerName =this.item.customerName;
          inst = {
            id,
            PK,
            SK,
            GSP1PK1,
            GSP1SK1,
            GSP2PK1,
            GSP2SK1,
            GSP3PK1,
            GSP3SK1,
            GSP4PK1,
            GSP4SK1,
            entityType,
            createdAt,
            createdBy,
            active,
            startDate,
            amount,
            type,
            scale,
            isPaid,
            customerName,
            updateAt,
          };
          await API.graphql({
            query: createRecord,
            variables: { input: inst },
          });
        }
      }

      loading.close();
      this.$router.push({
        path: "../invoice",
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
      /*this.selectedEmails = [
        ...this.selectedEmails,
        this.order.payer["email_address"],
      ];*/

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