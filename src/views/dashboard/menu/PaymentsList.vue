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
                  <v-list>
                    <v-list-item-group v-model="selectedEmails" multiple>
                      <template v-for="(item, i) in send_email[0].emails">
                        <v-divider
                          v-if="!item.email"
                          :key="`divider-${i}`"
                        ></v-divider>

                        <v-list-item
                          v-else
                          :key="`item-${i}`"
                          :value="item.email"
                        >
                          <template v-slot:default="{ active }">
                            <v-list-item-action>
                              <v-checkbox :input-value="active"></v-checkbox>
                            </v-list-item-action>
                            <v-list-item-content>
                              <v-list-item-title
                                v-text="item.email"
                              ></v-list-item-title>
                            </v-list-item-content>
                          </template>
                        </v-list-item>
                      </template>
                    </v-list-item-group>
                  </v-list>
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
      <v-dialog v-model="dialog">
          <v-card>
            <el-container style=" solid #eee">
              <el-container>
                <el-header style="text-align: center; font-size: 16px">
                  <v-row>
                    <v-col cols="12" sm="4" md="4">
                      <span>Invoice : {{ editedItem.smName }}</span>
                      </v-col>
                      <v-spacer></v-spacer>
                      <v-col cols="12" sm="6" md="6">
                      <v-btn color="blue darken-1" text @click="close"
                        >Cancel</v-btn
                      >
                      <v-btn color="blue darken-1" text @click="close"
                        >Save</v-btn
                      >
                      </v-col>
                    </v-col>
                  </v-row>
                </el-header>
                <el-main>
                  <v-col v-if="editedItemLeads.name != ''">
                    <v-card outlined elevation="1">
                      <v-card-text>
                        <v-row>
                          <v-col sm="4" md="4">
                            <v-list-item three-line>
                              <v-list-item-content>
                                <v-list-item-subtitle>
                                  Name: {{ editedItemLeads.name }}
                                  {{ editedItemLeads.lastname }}
                                </v-list-item-subtitle>
                              </v-list-item-content>
                            </v-list-item>
                          </v-col>

                          <v-col sm="4" md="4">
                            <v-list-item
                              three-line
                              v-for="item in listemails"
                              :key="item.id"
                            >
                              <v-list-item-content>
                                <v-list-item-subtitle>
                                  {{ item.e_type }}: {{ item.email }}
                                </v-list-item-subtitle>
                              </v-list-item-content>
                            </v-list-item>
                          </v-col>
                          <v-col sm="4" md="4">
                            <v-list-item
                              three-line
                              v-for="item in listphone"
                              :key="item.id"
                            >
                              <v-list-item-content>
                                <v-list-item-subtitle>
                                  {{ item.p_type }}: {{ item.phone }}
                                </v-list-item-subtitle>
                              </v-list-item-content>
                            </v-list-item>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="editedItem.subject"
                      label="Subject:"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-btn color="blue darken-1" text x-small
                      >[load it from library]</v-btn
                    >
                    <v-textarea
                      outlined
                      name="Introduction"
                      v-model="conclusion"
                      required
                      label="Introduction Notes:"
                    ></v-textarea>
                  </v-col>
                  <v-col v-for="item in q_services" :key="item.variant.id">
                    <v-card outlined elevation="1" color="#00E676">
                      <br />
                      <v-row>
                        <v-col sm="2" md="4">
                          {{ item.service.smName }}
                        </v-col>

                        <v-spacer></v-spacer>
                        <v-col sm="2" md="4"
                          ><b>Price:</b> ${{ item.service.price }}</v-col
                        >
                      </v-row>
                      <v-card-text
                        ><b>Description: </b>{{ item.service.description }}
                        <v-spacer></v-spacer>
                        <b>Product Type: </b>
                        {{ item.service.productType }}
                        <v-spacer></v-spacer>
                        <b>Internal Comments: </b>{{ item.service.comments }}
                      </v-card-text>
                    </v-card>
                  </v-col>

                  <v-col>
                    <el-header class="total" style="alaing: center"
                      >TOTAL: ${{ total }}</el-header
                    >
                  </v-col>
                  <v-row>
                    <v-col sm="4" md="6">
                      <v-select
                        v-model="discount_id"
                        :items="discount"
                        label="Discount"
                        item-text="discount_code"
                        item-value="id"
                        required
                        disabled
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-col>
                    <el-header class="total" style="alaing: center"
                      >TOTAL: ${{ total_disc }}</el-header
                    >
                  </v-col>
                  <v-col>
                    <el-card class="box-card">
                      <div slot="header" class="clearfix">
                        <span>Installment:</span>
                      </div>
                      <div class="text item">
                        <el-checkbox
                          v-model="is_installment"
                          label="Is Installment?"
                          border
                          disabled
                        ></el-checkbox>
                      </div>
                      <br />
                      <div v-if="is_installment == true" class="text item">
                        <el-form
                          ref="form"
                          label-width="100px"
                          :label-position="labelPosition"
                        >
                          <v-row>
                            <v-col sm="3" md="3">
                              <el-form-item label="Down Payment ($)">
                                <el-input v-model="payment"></el-input>
                              </el-form-item>
                            </v-col>
                            <v-col sm="3" md="3">
                              <el-form-item label="Installments">
                                <el-input v-model="number"></el-input>
                              </el-form-item>
                            </v-col>
                          </v-row>
                          <v-row v-if="calc == true">
                            <v-col
                              class="d-flex"
                              cols="12"
                              sm="12"
                              md="12"
                              v-if="vari == 'new'"
                            >
                              <v-data-table
                                :headers="headers_i"
                                :items="installments"
                                class="elevation-1"
                                :items-per-page="-1"
                              >
                                <template v-slot:[`item.scale`]="{ item }">
                                  <v-chip
                                    class="ma-2"
                                    :color="getColor(item.scale)"
                                    outlined
                                    light
                                    small
                                    >{{ item.scale }}</v-chip
                                  >
                                </template>
                                <template v-slot:top>
                                  <v-toolbar flat color="white">
                                    <v-toolbar-title
                                      >Installments</v-toolbar-title
                                    >
                                    <v-divider
                                      class="mx-4"
                                      inset
                                      vertical
                                    ></v-divider>
                                    <v-spacer></v-spacer>
                                  </v-toolbar>
                                </template>
                                <template v-slot:[`item.amount`]="{ item }"
                                  >${{ formattedValInstal(item.amount) }}
                                </template>
                              </v-data-table>
                            </v-col>
                          </v-row>
                        </el-form>
                      </div>
                    </el-card>
                  </v-col>
                  <br />
                  <v-col>
                    <v-textarea
                      outlined
                      name="Comments"
                      v-model="editedItem.internalComments"
                      required
                      label="Internal Comments:"
                    ></v-textarea>
                  </v-col>
                </el-main>
              </el-container>
            </el-container>
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
        <v-col cols="12" sm="6" md="6">
          <v-card>
            <v-toolbar flat color="blue lighten-3" dark>
              <v-col sm="7" md="7">Payments Received</v-col>
              <v-col sm="5" md="5" align="right">{{ total_pr }} </v-col>
            </v-toolbar>
            <v-card-text>
              <v-data-table
                :headers="headers"
                :items="received_payment"
                sort-by="full_name"
                class="elevation-1"
                :search="search_l"
                :items-per-page="-1"
                @click:row="handleClick"
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
                <template v-slot:[`item.scale`]="{ item }">
                  <v-chip
                    class="ma-2"
                    :color="getColorType()"
                    outlined
                    light
                    small
                    >{{ item.scale }}</v-chip
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
                      v-model="search_l"
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
        <v-col cols="12" sm="6" md="6">
          <v-card>
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
                <template v-slot:[`item.payment`]="{ item }">
                  <v-chip class="ma-2" color="green" outlined light small>{{
                    formattedCurrencyValue(item.payment)
                  }}</v-chip>
                </template>
                <template v-slot:[`item.scale`]="{ item }">
                  <v-chip
                    class="ma-2"
                    :color="getColorType()"
                    outlined
                    light
                    small
                    >{{ item.scale }}</v-chip
                  >
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
                    type="primary"
                    icon="el-icon-edit"
                    circle
                    size="mini"
                    @click="editItem(item)"
                  ></el-button>
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
  getOrganization,
  listCustomers,
  listInstallments,
  listPhoneNumber,
  listQuotes,
} from "../../../graphql/queries";

import Vuex from "vuex";
import { updateRecord } from "../../../graphql/mutations";

export default {
  name: "Quote",
  components: {},
  data: () => ({
    props: { multiple: true, expandTrigger: "hover", checkStrictly: true },
    alert: false,
    labelPosition: "top",
    vari: [],
    startDate: new Date(),
    menu: false,
    modal: false,
    end_date: new Date().toISOString().substr(0, 10),
    menu1: false,
    modal1: false,
    total: 0,
    total_pp: 0,
    total_pr: 0,
    search_c: "",
    search_s: "",
    search_l: "",
    show: false,
    name: "",
    send_email: {
      emails: [],
      name: "",
      quoteID: "",
    },
    selectedEmails: [],
    received_payment: [],
    pend_payment: [],
    data: [],
    list_email: [],
    dialog: false,
    dialog_email: false,
    headers: [
      { text: "Client", sortable: true, value: "full_name", align: "start" },
      { text: "Pay Date", sortable: true, value: "date", align: "start" },
      {
        text: "#",
        align: "start",
        sortable: true,
        value: "scale",
      },
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
      { text: "Client", sortable: true, value: "full_name", align: "start" },
      { text: "Pay Date", sortable: true, value: "date", align: "start" },
      {
        text: "Amount",
        sortable: true,
        value: "payment",
        align: "right",
      },
      {
        text: "#",
        align: "start",
        sortable: true,
        value: "scale",
      },
      {
        text: "Actions",
        sortable: true,
        value: "actions",
        align: "right",
      },
    ],
    editedIndex: -1,
    payment: 1,
    values_services: [],
    editedItem: {
      id: "",
      date: "",
      payment: "",
      scale: "",
    },
    defaultItem: {
      id: "",
      date: "",
      payment: "",
      scale: "",
    },
    item_inst: [],
    quotes: [],
    item: [],
    editedItem_c: [],
    editedItemLeads: [],
    is_installment: false,
    total_disc: 0,
    conclusion: "",
    q_services: [],
    discount: [],
    discount_id: 0,
    number:0,
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
  },

  methods: {
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

    formattedCurrencyValue(value) {
      return (
        "$ " +
        parseFloat(value)
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,")
      );
    },

    handleClick(value) {
      this.editItem(value);
      console.log(value);
    },

    OpenPayment(item) {
      console.log(item.quoteID);
      this.$router.push({
        path: "menu/paymentinstallments",
        query: {
          inst: item.instSK,
          quote: item.quoteID,
        },
      });
    },

    async getInvoice() {
      const loading = this.$loading({
        lock: true,
        text: "Get Payments...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      this.quotes = [];
      var datas = [];
      this.item_inst = [];
      this.received_payment = [];
      this.pend_payment = [];
      this.item = [];
      this.total_pr = 0;
      this.total_pp = 0;
      console.log(this.startDate);
      console.log(this.end_date);
      const todos = await API.graphql({
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
      datas = todos.data.listInstallments;
      console.log(datas);

      for (let i = 0; i < datas.length; i++) {
        this.item_inst = [...this.item_inst, datas[i]];
      }
      console.log(this.item_inst);
      for (let i = 0; i < this.item_inst.length; i++) {
        if (this.item_inst[i].isPaid != "Y") {
          this.pend_payment.push({
            type: this.item_inst[i].type,
            name: "",
            date: this.item_inst[i].startDate,
            full_name: this.item_inst[i].customerName,
            customerID: this.item_inst[i].GSP1PK1,
            quoteID: this.item_inst[i].GSP2PK1,
            payment: this.item_inst[i].amount,
            scale: this.item_inst[i].scale,
            instSK: this.item_inst[i].SK,

          });
          this.total_pp = this.total_pp + this.item_inst[i].amount;
        }
        if (this.item_inst[i].isPaid == "Y") {
          this.received_payment.push({
            type: this.item_inst[i].type,
            name: "",
            date: this.item_inst[i].payDate,
            full_name: this.item_inst[i].customerName,
            customerID: this.item_inst[i].GSP1PK1,
            quoteID: this.item_inst[i].GSP2PK1,
            payment: this.item_inst[i].amount,
            scale: this.item_inst[i].scale,
            instSK: this.item_inst[i].SK,

          });
          this.total_pr = this.total_pr + this.item_inst[i].amount;
        }
      }
      console.log(this.pend_payment);
      this.total_pr = this.formattedCurrencyValue(this.total_pr);
      this.total_pp = this.formattedCurrencyValue(this.total_pp);
      loading.close();
    },

    async editItem(item) {
      this.q_services = [];
      this.installments = [];
      this.list_phone = [];
      this.list_email = [];
      this.list_address = [];
      console.log(item);
      this.editedItem = item;


      const seq = await API.graphql({
        query: listQuotes,
        variables: {
          filter: {
            PK: {
              eq: this.organizationID,
            },
            SK: {
              eq: item.quoteID,
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
      console.log(seq.data.listQuotes);
      var datas = seq.data.listQuotes;
      var quotes = [];

      var inst = [];
      var services = [];
      let vari = [];
      let servi = [];
      this.editedItemLeads = [];

      for (let i = 0; i < datas.length; i++) {
        if (datas[i].entityType == "QUOTE") {
          quotes.push(datas[i]);
        }
        if (datas[i].entityType == "INSTALLMENT") {
          inst.push(datas[i]);
        }
        if (datas[i].entityType == "QUOTEITEM") {
          services.push(datas[i]);
        }
      }
       console.log(quotes);

      for (let j = 0; j < services.length; j++) {
        vari = [];
        servi = [];
        servi = services[j];
        this.q_services.push({
          service: servi,
          variant: vari,
        });
      }

      for (let k = 0; k < inst.length; k++) {
        this.is_installment = true;
        this.calc = true;
        this.installments.push(inst[k]);
      }

      const l = await API.graphql({
        query: listCustomers,
        variables: {
          filter: {
            PK: {
              eq: this.organizationID,
            },
            SK: {
              eq: item.customerID,
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

      const todos = await API.graphql({
        query: listPhoneNumber,
        variables: { filter: { GSP1PK1: { eq: this.editedItemLeads.SK } } },
      });
      this.phones = todos.data.listPhoneNumber;
      console.log(this.phones);

      if (this.phones.length > 0) {
        for (let i = 0; i < this.phones.length; i++) {
          let phone = this.phones[i].value;
          let p_type = this.phones[i].type;
          const todo = {
            phone,
            p_type,
          };
          this.list_phone = [...this.list_phone, todo];
        }
      }

      if (JSON.parse(this.editedItemLeads.l_smAddress)[0]) {
        for (
          let i = 0;
          i < JSON.parse(this.editedItemLeads.l_smAddress).length;
          i++
        ) {
          let country = JSON.parse(this.editedItemLeads.l_smAddress)[i].country;
          let state = JSON.parse(this.editedItemLeads.l_smAddress)[i].state;
          let city = JSON.parse(this.editedItemLeads.l_smAddress)[i].city;
          let street_address = JSON.parse(this.editedItemLeads.l_smAddress)[i]
            .street_address;
          let zip_code = JSON.parse(this.editedItemLeads.l_smAddress)[i]
            .zip_code;
          let a_type = JSON.parse(this.editedItemLeads.l_smAddress)[i].a_type;
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

      if (quotes.l_discount != null) {
        if (JSON.parse(item.installment.l_discount)[0]) {
          this.discount_id = JSON.parse(
            item.installment.l_discount
          )[0].discount_code;
        }
      }

      this.conclusion = quotes.conclusion;
      this.number = quotes.numInstallments;
      this.payment = quotes.downPayment;
      this.total = quotes.quotationAmount;
      this.total_disc = quotes.finalAmount;

      this.dialog = true;
    },

    async OpenSentEmail(item) {
      console.log(item);
      this.editedItem_c = item;
      const todos = await API.graphql({
        query: listCustomers,
        variables: {
          filter: {
            PK: {
              eq: this.organizationID,
            },
            SK: {
              eq: item.customerID,
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
          this.selectedEmails.push(
            JSON.parse(this.editedItemLeads.l_email)[i].email
          );
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
      const quotePK = this.organizationID;
      const quoteSK = this.editedItem_c.quoteID;
      const smName = "";
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

    async updateInstallment(item) {
      const amount = item.payment;
      const startDate = item.date;
      const scale = item.scale;

      if (!amount || !startDate || !scale)
        return alert("error update installment");

      const SK = item.instSK;
      const PK = this.organizationID;
      const updateAt = new Date().toISOString().substr(0, 10);

      const org = {
        SK,
        PK,
        amount,
        startDate,
        scale,
        updateAt,
      };

      await API.graphql({
        query: updateRecord,
        variables: { input: org },
      });

      this.getInvoice();
    },

    async save() {
      console.log("edit");
      await this.updateInstallment(this.editedItem);
      this.close();
    },

    close() {
      this.dialog = false;
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
      if (item == "INST") return "blue";
      else if (item == "DPAY") return "green";
      else return "orange";
    },
    getColorType() {
      return "orange";
    },
  },
};
</script>
