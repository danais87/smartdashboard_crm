<template>
  <v-container id="dashboard" fluid grid-list-lg class="mx-0 pa-0">
    <v-app>
      <v-dialog
        v-model="dialog_email"
        max-width="500px"
        v-if="send_email.length > 0"
      >
        <v-card>
          <v-card-title>
            <span class="headline">Select Email:</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col sm="6" md="6">
                  <b>Name:</b> {{ send_email[0].name }}
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-data-table
                    v-model="selectedEmails"
                    :headers="headers_e"
                    :items="send_email[0].emails"
                    item-text="email"
                    item-value="email"
                    show-select
                    selectable-key="isSelectable"
                    hide-default-footer
                    class="elevation-1"
                  >
                  </v-data-table>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close_email"
              >Cancel</v-btn
            >
            <v-btn
              color="blue darken-1"
              text
              @click="invokeLambda(send_email[0].quoteID)"
              >Send</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
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
              <v-btn text color="primary" @click="menu1 = false">
                Cancel
              </v-btn>
              <v-btn text color="primary" @click="$refs.menu1.save(end_date)">
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col>
          <br />
          <v-btn color="blue darken-1" text @click="getInvoice">Apply</v-btn>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
      <v-row>
        <v-col sm="6" md="6">
          <v-card max-width="600">
            <v-toolbar flat color="blue lighten-3" dark>
              <v-col sm="7" md="7">Payments Received</v-col>
              <v-col sm="5" md="5" align="right">{{ total_pr }} </v-col>
            </v-toolbar>
            <v-card-text>
              <v-data-table
                :headers="headers"
                :items="received_payment"
                sort-by="name"
                class="elevation-1"
                :search="search_l"
                :items-per-page="-1"
              >
                <template v-slot:[`item.type`]="{ item }">
                  <v-chip
                    class="ma-2"
                    :color="getColor(item.type)"
                    outlined
                    light
                    small
                    >{{ item.type }}</v-chip
                  >
                </template>
                <template v-slot:[`item.payment`]="{ item }">
                  <v-chip class="ma-2" color="green" outlined light small>{{
                    formattedCurrencyValue(item.payment)
                  }}</v-chip>
                </template>
                <template v-slot:top>
                  <v-toolbar flat color="white">
                    <el-alert
                      v-if="alert != false"
                      title="Success"
                      type="success"
                      description="Email sent!!"
                      show-icon
                    ></el-alert>
                    <v-text-field
                      v-model="search_s"
                      append-icon="mdi-magnify"
                      label="Search"
                      single-line
                      hide-details
                    ></v-text-field>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                  </v-toolbar>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col sm="6" md="6">
          <v-card max-width="600">
            <v-toolbar flat color="blue lighten-3" dark>
              <v-col sm="7" md="7">Pending Payments</v-col>
              <v-col sm="5" md="5" align="right">{{ total_pp }} </v-col>
            </v-toolbar>
            <v-card-text>
              <v-data-table
                id="c"
                :headers="headers_ins"
                :items="pend_payment"
                sort-by="date"
                class="elevation-1"
                :search="search_c"
                :items-per-page="-1"
              >
                <template v-slot:[`item.amount`]="{ item }">
                  <v-chip class="ma-2" color="green" outlined light small>{{
                    formattedCurrencyValue(item.amount)
                  }}</v-chip>
                </template>
                <template v-slot:top>
                  <v-toolbar flat color="white">
                    <v-text-field
                      id="c"
                      v-model="search_c"
                      append-icon="mdi-magnify"
                      label="Search"
                      single-line
                      hide-details
                    ></v-text-field>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                  </v-toolbar>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                  <el-button
                    type="info"
                    icon="el-icon-message"
                    circle
                    @click="OpenSentEmail(item)"
                    size="mini"
                  ></el-button>
                  <el-button
                    id="c"
                    type="success"
                    icon="el-icon-shopping-cart-full"
                    circle
                    @click="OpenPayment(item)"
                    size="mini"
                  ></el-button>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-app>
  </v-container>
</template>


<script>
import { API, Auth } from "aws-amplify";

import {
  getCompany,
  getOrganization,
  listCustomers,
  listInstallments,
  listQuotes,
  listSmInstallments,
  listSmInvoices,
} from "../../../graphql/queries";

import Vuex from "vuex";
import { updateRecord } from "../../../graphql/mutations";

export default {
  name: "Quote",
  components: {},
  data: () => ({
    props: { multiple: true, expandTrigger: "hover", checkStrictly: true },
    singleSelect: false,
    alert: false,
    startDate: new Date(),
    menu: false,
    modal: false,
    end_date: new Date().toISOString().substr(0, 10),
    menu1: false,
    modal1: false,
    labelPosition: "top",
    total_disc: 0,
    total: 0,
    total_v: 0,
    total_s: 0,
    total_rc: 0,
    total_pp: 0,
    total_pr: 0,
    expanded: [],
    is_installment: false,
    singleExpand: false,
    dialog_v: false,
    search_c: "",
    search_s: "",
    search_l: "",
    discount_id: "",
    lead_id: "",
    show: false,
    name: "",
    is_discount: "",
    q_leads: [],
    q_discount: [],
    q_services: [],
    send_email: {
      emails: [],
      name: "",
      quoteID: "",
    },
    selectedEmails: [],
    currentRow: null,
    services: [],
    received_payment: [],
    pend_pay: [],
    recurrent: [],
    lista: [],
    types: [],
    discount: [],
    pend_payment: [],
    install: [],
    data: [],
    list_email: [],
    list_phone: [],
    list_address: [],
    select_service: "",
    select_type: "",
    dialog: false,
    dialogs: false,
    dialog_service: false,
    value_opt: [],
    dialog_detalle: false,
    dialog_lead: false,
    showlibrary: false,
    dialog_email: false,
    accounts: [],
    apiRequest: false,
    valid: true,
    headers: [
      { text: "Invoice", sortable: true, value: "name", align: "start" },
      { text: "Client", sortable: true, value: "full_name", align: "start" },
      { text: "Pay Date", sortable: true, value: "date", align: "start" },
      { text: "Payment Type", sortable: true, value: "type", align: "start" },
      {
        text: "Payment",
        sortable: true,
        value: "payment",
        align: "right",
      },
    ],
    headers_e: [
      { text: "Email", sortable: true, value: "email", align: "start" },
    ],
    headers_ins: [
      { text: "Name", sortable: true, value: "name", align: "start" },
      { text: "Client", sortable: true, value: "full_name", align: "start" },
      { text: "Pay Date", sortable: true, value: "date", align: "start" },
      {
        text: "Amount",
        sortable: true,
        value: "payment",
        align: "right",
      },
      {
        text: "Actions",
        sortable: true,
        value: "actions",
        align: "right",
      },
    ],
    headers_i: [
      {
        text: "Start Date",
        align: "start",
        sortable: true,
        value: "startDate",
      },
      { text: "Amount", align: "start", sortable: true, value: "amount" },
    ],
    item_editquote: [],
    editedIndex: -1,
    editedIndexLead: -1,
    editedIndex_v: -1,
    editedIndexServi: -1,
    editedItem: {
      id: "",
      name: "",
      lead_id: "",
      lead_name: "",
      email_sent: "",
      sent_date: "",
      is_discount: "",
      discount_id: "",
      discount_code: "",
      discount_type: "",
      discount_value: "",
      discount_amount: "",
      quotation_amount: "",
      final_amount: "",
      services: "",
      leads: "",
      is_installment: "",
      payment: "",
      number: "",
      createdAt: "",
      conclusion: "",
      comments: "",
      subject: "",
      process_status: "",
    },
    defaultItem: {
      id: "",
      name: "",
      lead_id: "",
      lead_name: "",
      email_sent: "",
      sent_date: "",
      is_discount: "",
      discount_id: "",
      discount_code: "",
      discount_type: "",
      discount_value: "",
      discount_amount: "",
      quotation_amount: "",
      final_amount: "",
      services: "",
      is_installment: "",
      payment: "",
      number: "",
      createdAt: "",
      conclusion: "",
      comments: "",
      subject: "",
      process_status: "",
    },
    editedItem_s: {
      id: "",
      name: "",
      lead_id: "",
      lead_name: "",
      email_sent: "",
      sent_date: "",
      is_discount: "",
      discount_id: "",
      discount_code: "",
      discount_type: "",
      discount_value: "",
      discount_amount: "",
      quotation_amount: "",
      final_amount: "",
      services: "",
      leads: "",
      is_installment: "",
      payment: "",
      number: "",
      createdAt: "",
      conclusion: "",
      comments: "",
      subject: "",
      process_status: "",
    },
    defaultItem_s: {
      id: "",
      name: "",
      lead_id: "",
      lead_name: "",
      email_sent: "",
      sent_date: "",
      is_discount: "",
      discount_id: "",
      discount_code: "",
      discount_type: "",
      discount_value: "",
      discount_amount: "",
      quotation_amount: "",
      final_amount: "",
      services: "",
      is_installment: "",
      payment: "",
      number: "",
      createdAt: "",
      conclusion: "",
      comments: "",
      subject: "",
      process_status: "",
    },
    payment: 1,
    number: 1,
    editedServiceItem: {
      id: "",
      name: "",
      description: "",
      price: 0,
      select_type: "",
      type_name: "",
      type_id: "",
      status: "A",
      is_recurrent: "",
      is_variant: "",
      other_type: "",
      variants: [],
      comments: "",
    },
    values_services: [],
    defaulServicetItem: {
      id: "",
      name: "",
      description: "",
      price: 0,
      select_type: "",
      type_name: "",
      type_id: "",
      status: "A",
      is_recurrent: "",
      is_variant: "",
      other_type: "",
      variants: [],
      comments: "",
    },
    editedItem_v: {
      id: "",
      startDate: "",
      amount: "",
    },
    defaultItem_v: {
      id: "",
      startDate: "",
      amount: "",
    },

    editedItemLeads: {
      id: "",
      name: "",
      lastname: "",
      street_address: "",
      country: "",
      city: "",
      state: "",
      zip_code: "",
      a_type: "",
      phone: "",
      p_type: "",
      e_type: "",
      status: "A",
      account_id: "",
      account_name: "",
      lead_status: "NS",
      smLeadsdetails: [],
    },
    defaultItemLeads: {
      id: "",
      name: "",
      lastname: "",
      street_address: "",
      country: "",
      city: "",
      state: "",
      zip_code: "",
      a_type: "",
      phone: "",
      p_type: "",
      e_type: "",
      status: "A",
      account_id: "",
      account_name: "",
      lead_status: "NS",
      smLeadsdetails: [],
    },
    vari: "new",
    calc: false,
    conclusion: "",
    process_status: "C",
    item_inst: [],
    quotes: [],
    item: [],
    editedItem_c: [],
  }),

  computed: {
    ...Vuex.mapState([
      "organizationID",
      "leads",
      "lead",
      "leads_seek",
      "listphone",
      "listemails",
      "listaddress",
      "bodyinst",
    ]),
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialog_email(val) {
      val || this.close_email();
    },
  },

  created() {
    const d = new Date();
    this.startDate = new Date(d.setMonth(d.getMonth() - 1))
      .toISOString()
      .substr(0, 10);
    console.log(this.body);
    this.getInvoice();
    this.GetLeads_Seek();
  },

  methods: {
    ...Vuex.mapActions(["GetLeads", "GetLeads_Seek"]),
    ...Vuex.mapMutations([
      "SetPhone",
      "SetEmails",
      "SetAddress",
      "SetLead",
      "SetBodyInst",
      "SetConclusion",
    ]),

    formattedValInstal(value) {
      return parseFloat(value)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,");
    },

    handleClick(value) {
      this.editItem(value);
      console.log(value);
    },

    formattedCurrencyValue(value) {
      return "$ " + parseFloat(value).toFixed(2);
    },

    handleCurrentChange(val) {
      this.currentRow = val;
    },

    handleChange(value_opt) {
      this.values_services = value_opt;
      console.log(this.values_services);
    },

    OpenPayment(item) {
      console.log(item);
      this.$router.push({
        path: "/paymentinst",
        query: {
          inst: item,
        },
      });
    },

    async getInvoice() {
      const loading = this.$loading({
        lock: true,
        text: "Get Task...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      var installments = [];
      this.quotes = [];
      this.received_payment = [];
      this.pend_payment = [];
      this.item = [];
      var leads = [];
      this.total_pr = 0;
      this.total_pp = 0;

      const todos = await API.graphql({
        query: listInstallments,
        variables: {
          filter: {
            PK: {
              eq: this.organizationID,
            },
            SK: {
              eq: "ORD#",
            },
            indexs: {
              eq: "4_ins",
            },
            active: {
              eq: "1",
            },
            startDate: {
              eq: this.startDate,
            },
            endDate: {
              eq: this.end_date,
            },
          },
        },
      });
      var datas = todos.data.listInstallments;
      console.log(datas);
      for (let i = 0; i < datas.length; i++) {
        if (datas[i].entityType == "QUOTE") {
          this.quotes.push(datas[i]);
        }
        if (datas[i].entityType == "INSTALLMENT") {
          installments.push(datas[i]);
        }
      }
      for (let i = 0; i < this.quotes.length; i++) {
        this.item_inst = [];

        for (let k = 0; k < installments.length; k++) {
          if (installments[k].GSP2PK1 == this.quotes[i].SK) {
            this.item_inst = [...this.item_inst, installments[k]];
          }
        }

        this.item.push({
          quote: this.quotes[i],
          inst: this.item_inst,
        });
      }
      console.log(this.item);
      for (let i = 0; i < this.item.length; i++) {
        console.log(this.item[i].quote.orderNumber);
        if (this.item[i].quote.orderNumber != undefined) {
          this.received_payment.push({
            type: "DP",
            name: this.item[i].quote.orderNumber,
            date: this.item[i].quote.createdAt.substr(0, 10),
            full_name: this.item[i].quote.customerName,
            payment: this.item[i].quote.downPayment,
            quote: this.item[i].quote,
          });
        }
      }
      console.log(this.received_payment);
      for (let i = 0; i < this.item.length; i++) {
        if (this.item[i].quote.orderNumber != undefined) {
          for (let j = 0; j < this.item[i].inst.length; j++) {
            if (this.item[i].inst[j].isPaid != "Y") {
              this.pend_payment.push({
                type: "IN",
                name: this.item[i].quote.orderNumber,
                date: this.item[i].inst[j].startDate,
                full_name: this.item[i].quote.customerName,
                payment: this.item[i].inst[j].amount,
                quote: this.item[i].quote,
              });
            }
          }
        }
      }
      console.log(this.pend_payment);
      this.total_pr = this.formattedCurrencyValue(this.total_pr);
      this.total_pp = this.formattedCurrencyValue(this.total_pp);
      loading.close();
    },

    async editItem(item) {
      this.list_phone = [];
      this.list_email = [];
      this.list_address = [];

      this.editedItem = Object.assign({}, item);
      console.log(this.editedItem);

      this.editedItemLeads = item.item.quote.items[0].leads.items[0];

      for (
        let i = 0;
        i < this.editedItemLeads.smLeadsdetails.items.length;
        i++
      ) {
        if (this.editedItemLeads.smLeadsdetails.items[i].type == "E") {
          let email = this.editedItemLeads.smLeadsdetails.items[i].value;
          let e_type = this.editedItemLeads.smLeadsdetails.items[i].value_type;
          const todo = {
            email,
            e_type,
          };
          this.list_email = [...this.list_email, todo];
        }

        if (this.editedItemLeads.smLeadsdetails.items[i].type == "P") {
          let phone = this.editedItemLeads.smLeadsdetails.items[i].value;
          let p_type = this.editedItemLeads.smLeadsdetails.items[i].value_type;
          const todo = {
            phone,
            p_type,
          };
          this.list_phone = [...this.list_phone, todo];
        }

        if (this.editedItemLeads.smLeadsdetails.items[i].type == "A") {
          let country = this.editedItemLeads.smLeadsdetails.items[i].value;
          let state = this.editedItemLeads.smLeadsdetails.items[i].value1;
          let city = this.editedItemLeads.smLeadsdetails.items[i].value2;
          let street_address = this.editedItemLeads.smLeadsdetails.items[i]
            .value3;
          let zip_code = this.editedItemLeads.smLeadsdetails.items[i].value4;
          let a_type = this.editedItemLeads.smLeadsdetails.items[i].value_type;
          const todo = {
            country,
            state,
            city,
            street_address,
            zip_code,
            a_type,
          };
          this.list_address = [...this.list_address, todo];
        }
      }
      this.SetPhone(this.list_phone);
      this.SetEmails(this.list_email);
      this.SetAddress(this.list_address);

      this.is_installment = true;
      const all = await API.graphql({
        query: listSmInstallments,
        variables: { filter: { id: { eq: item.id } } },
      });
      this.install = all.data.listSmInstallments.items;
      console.log(this.install);
      this.dialog = true;
    },

    async OpenSentEmail(item) {

      this.editedItem_c = item;
      const todos = await API.graphql({
        query: listCustomers,
        variables: {
          filter: {
            PK: {
              eq: this.organizationID,
            },
            SK: {
              eq: item.quote.customerID,
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

      this.editedItemLeads = todos.data.listCustomers[0];
      this.dialog_email = true;
      this.list_email = [];
      this.send_email = [];

      if (JSON.parse(this.editedItemLeads.l_email)[0]) {
        for (
          let i = 0;
          i < JSON.parse(this.editedItemLeads.l_email).length;
          i++
        ) {
          let e_type = JSON.parse(this.editedItemLeads.l_email)[i].e_type;
          let email = JSON.parse(this.editedItemLeads.l_email)[i].email;
          const todo = {
            email,
            e_type,
          };
          this.list_email = [...this.list_email, todo];
        }
      }
      this.send_email.push({
        name: JSON.parse(this.editedItemLeads.l_smName)[0].fullName,
        emails: this.list_email,
        quoteID: item.quote,
      });
      this.SetBodyInst(item);
    },

    async invokeLambda() {
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
      const quotePK = this.editedItem_c.quote.PK;
      const quoteSK = this.editedItem_c.quote.SK;
      const smName = this.editedItem_c.quote.smName;
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
      this.selectedEmails = [...this.selectedEmails, "info@bizplaneasy.com"];
      console.log(this.selectedEmails)
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
            "Your Payment for Quote: (" +
            smName +
            ") from BizPlanEasy" +
            '","body":"' +
            this.bodyinst +
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
              const emailSent = "Y";
              const sentDate = new Date().toLocaleString();
              const sentBy = this.usuario;
              const PK = quotePK;
              const SK = quoteSK;
              const todo = { emailSent, sentDate, sentBy, PK, SK };
              await API.graphql({
                query: updateRecord,
                variables: { input: todo },
              });
              this.alert = true;
            }
          }
        });
      }
      await this.close_email();
    },

    deleteItem(item) {
      const index = this.services.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.services.splice(index, 1);
    },

    close() {
      this.list_phone = [];
      this.list_email = [];
      this.list_address = [];
      this.conclusion = "";
      const lead = "";
      this.SetPhone(this.list_phone);
      this.SetEmails(this.list_email);
      this.SetAddress(this.list_address);
      this.SetLead(lead);
      this.dialog = false;
      this.editedItemLeads = "";
      this.install = [];
      this.is_installment = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    openDialog() {
      this.dialog = true;
    },

    close_email() {
      this.dialog_email = false;
      this.send_email = {};
      this.selectedEmails = [];
    },

    getColor(item) {
      if (item == "IN") return "blue";
      else if (item == "DP") return "green";
      else return "orange";
    },
  },
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
  text-align: center;
}
.total {
  text-align: right;
}
.el-menu {
  color: #333;
  line-height: 60px;
}
.element.style {
  padding: 0%;
}
.v-application ul,
.v-application ol {
  padding-left: 0px;
}
.el-aside {
  color: #333;
}

.el-input--suffix .el-input__inner {
  padding-right: 200px;
}
.el-submenu .el-menu-item {
  padding: 0 25px;
}

.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
  text-align: center;
}
.total {
  text-align: right;
}
.el-menu {
  color: #333;
  line-height: 60px;
}
.element.style {
  padding: 0%;
}
.v-application ul,
.v-application ol {
  padding-left: 0px;
}
.el-aside {
  color: #333;
}

.el-input--suffix .el-input__inner {
  padding-right: 200px;
}
.el-submenu .el-menu-item {
  padding: 0 25px;
}
.row {
  margin-left: 5px;
  flex: unset;
}
.col {
  padding: 2px;
}
.v-card__subtitle,
.v-card__text,
.v-card__title {
  padding: 5px;
}

.v-list-item {
  min-height: 0px;
}
</style>