<template>
  <v-container id="dashboard" fluid grid-list-lg class="mx-0 pa-0">
    <v-app>
      <v-row>
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
        <v-col sm="2" md="2" align="center">
          <br />
          <v-btn color="blue darken-1" text @click="getInvoices">Apply</v-btn>
        </v-col>
        <v-spacer></v-spacer>

        <v-dialog v-model="dialog">
          <v-card>
            <el-container style=" solid #eee">
              <el-container>
                <el-header style="text-align: center; font-size: 16px">
                  <span>Invoice : {{ editedItem.orderNumber }}</span>
                  <v-btn color="blue darken-1" text @click="close"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="close">Save</v-btn>
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
                  <v-col v-for="item in q_services" :key="item.variant.id" >
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
        <v-col sm="12" md="12">
          <v-data-table
            :headers="headers"
            :items="invoices"
            sort-by="orderNumber"
            class="elevation-1"
            :search="search"
            @click:row="handleClick"
            :items-per-page="-1"
          >
            <template v-slot:[`item.final_amount`]="{ item }">
              <v-chip class="ma-2" color="green" outlined light small>{{
                formattedCurrencyValue(item.finalAmount)
              }}</v-chip>
            </template>
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>Invoices</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="search"
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
                type="success"
                icon="el-icon-download"
                circle
                @click="DownLoad(item)"
                size="mini"
              ></el-button>
              <el-button
                type="warning"
                icon="el-icon-chat-line-square"
                circle
                @click="sendMessege(item)"
                size="mini"
              ></el-button>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-app>
  </v-container>
</template>


<script>
import { API } from "aws-amplify";
import {
  listQuotes,
  listPhoneNumber,
  listCustomers,
  listInvoices,
} from "../../../graphql/queries";

import DialogLeads from "../dialogs/DialogLeads";
import DialogLibrary from "../dialogs/DialogLibrary";
import Vuex from "vuex";

export default {
  name: "Invoices",
  components: { DialogLeads, DialogLibrary },
  data: () => ({
    props: { multiple: true, expandTrigger: "hover", checkStrictly: true },
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
    expanded: [],
    is_installment: false,
    singleExpand: false,
    dialog_v: false,
    search: "",
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
    invoices: [],
    lista: [],
    types: [],
    discount: [],
    installments: [],
    data: [],
    list_email: [],
    list_phone: [],
    list_address: [],
    select_service: "",
    select_type: "",
    dialog: false,
    dialogs: false,
    value_opt: [],
    dialog_detalle: false,
    dialog_lead: false,
    showlibrary: false,
    dialog_email: false,
    accounts: [],
    apiRequest: false,
    valid: true,

    headers_i: [
      {
        text: "Start Date",
        align: "start",
        sortable: true,
        value: "startDate",
      },
      { text: "Amount", align: "start", sortable: true, value: "amount" },
      {
        text: "Type of Payment",
        align: "start",
        sortable: true,
        value: "type",
      },
    ],
    headers: [
      { text: "Name", sortable: true, value: "smName", align: "start" },
      {
        text: "Contact",
        sortable: true,
        value: "customerName",
        align: "start",
      },
      {
        text: "Final Amount",
        sortable: true,
        value: "final_amount",
        align: "right",
      },
      {
        text: "Purchase Date",
        sortable: true,
        value: "payDate",
        align: "right",
      },
      {
        text: "Paid",
        sortable: true,
        value: "paidAmount",
        align: "right",
      },
      {
        text: "Balance",
        sortable: true,
        value: "balance",
        align: "right",
      },
      { text: "Actions", value: "actions", sortable: false },
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
  }),

  computed: {
    ...Vuex.mapState([
      "organizationID",
      "leads",
      "lead",
      "listphone",
      "listemails",
      "listaddress",
      "body",
    ]),
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    const loading = this.$loading({
      lock: true,
      text: "Loading Invoices...",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)",
    });
    const d = new Date();
    this.startDate = new Date(d.setMonth(d.getMonth() - 1))
      .toISOString()
      .substr(0, 10);
    console.log(this.startDate);
    this.GetLeads();
    this.getInvoices();
    loading.close();
  },

  methods: {
    ...Vuex.mapActions(["GetLeads"]),
    ...Vuex.mapMutations([
      "SetPhone",
      "SetEmails",
      "SetAddress",
      "SetLead",
      "SetBody",
      "SetConclusion",
    ]),

    handleClick(value) {
      this.editItem(value);
      console.log(value);
    },

    formattedCurrencyValue(value) {
      return (
        "$ " +
        parseFloat(value)
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,")
      );
    },

    formattedValInstal(value) {
      return parseFloat(value)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,");
    },

    DownLoad(item) {
      this.SetBody(item);
      const doc = new jspdf();
      let margins = {
        top: 80,
        bottom: 60,
        left: 40,
        width: 522,
      };
      doc.fromHTML(this.body, margins.left, margins.top, {
        width: margins.width,
      });

      doc.save("test.pdf");
    },

    async getInvoices() {
      const todos = await API.graphql({
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
              eq: "4_order",
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
      this.invoices = todos.data.listInvoices;
    },

    async editItem(item) {
      this.q_services = [];
      this.installments = [];
      this.list_phone = [];
      this.list_email = [];
      this.list_address = [];
      console.log(item);
      this.editedItem = item;

      this.conclusion = item.conclusion;
      this.number = item.numInstallments;
      this.payment = item.downPayment;

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
      console.log(services);
      console.log(inst);
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
              eq: item.GSP1PK1,
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

      if (JSON.parse(item.l_discount)[0]) {
        this.discount_id = JSON.parse(item.l_discount)[0].discount_code;
      }

      this.total = item.quotationAmount;
      this.total_disc = item.finalAmount;

      this.dialog = true;
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
      this.editedItemLeads.name = "";
      this.editedItemLeads.lastname = "";
      this.q_services = [];
      this.discount_id = "";
      this.total = "";
      this.total_disc = "";
      this.installments = [];
      this.is_installment = false;
      this.calc = false;
      this.number = 1;
      this.payment = 1;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async save() {
      console.log(this.editedIndex);
      if (this.editedIndex > -1) {
        console.log("edit");
      } else {
        console.log("crear");
        console.log(this.editedItem);
      }
      this.close();
    },

    getColor(item) {
      if (item == "INST") return "blue";
      else if (item == "DPAY") return "green";
      else return "orange";
    },
  },
};
</script>

<style scoped>
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
.col,
.col-sm-2 .col-md-2 .col-12 {
  padding: 2px;
}
.v-card__subtitle .v-card__text .v-card__title {
  padding: 5px;
}

.v-list-item {
  min-height: 0px;
}
</style>