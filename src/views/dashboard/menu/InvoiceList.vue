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
                    <v-select
                      v-model="selectedEmails"
                      :items="send_email[0].emails"
                      label="Select"
                      multiple
                      chips
                      persistent-hint
                      item-text="email"
                      item-value="email"
                    ></v-select>
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
                    <v-btn
                      color="blue darken-1"
                      text
                      x-small
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
                    <v-card outlined elevation="1">
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
                        <b>Recurrent: </b>
                        {{ item.service.is_recurrent }}
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
                            <v-col sm="3" md="3">
                              <br /><br />
                              <el-form-item size="large">
                                <el-button type="primary" @click="aply_calc()"
                                  >Calculate</el-button
                                >
                              </el-form-item>
                            </v-col>
                          </v-row>
                          <v-row v-if="calc == true">
                            <v-dialog v-model="dialog_v" max-width="500px">
                              <v-card>
                                <v-card-title>
                                  <span class="headline">Installment</span>
                                </v-card-title>
                                <v-card-text>
                                  <v-container>
                                    <v-row>
                                      <v-col cols="12" sm="6" md="4">
                                        <v-menu
                                          ref="menu"
                                          v-model="menu"
                                          :close-on-content-click="false"
                                          :return-value.sync="
                                            editedItem_v.startDate
                                          "
                                          transition="scale-transition"
                                          offset-y
                                          min-width="290px"
                                        >
                                          <template
                                            v-slot:activator="{ on, attrs }"
                                          >
                                            <v-text-field
                                              v-model="editedItem_v.startDate"
                                              label="Picker in menu"
                                              prepend-icon="mdi-calendar"
                                              readonly
                                              v-bind="attrs"
                                              v-on="on"
                                            ></v-text-field>
                                          </template>
                                          <v-date-picker
                                            v-model="editedItem_v.startDate"
                                            no-title
                                            scrollable
                                          >
                                            <v-spacer></v-spacer>
                                            <v-btn
                                              text
                                              color="primary"
                                              @click="menu = false"
                                            >
                                              Cancel
                                            </v-btn>
                                            <v-btn
                                              text
                                              color="primary"
                                              @click="
                                                $refs.menu.save(
                                                  editedItem_v.startDate
                                                )
                                              "
                                            >
                                              OK
                                            </v-btn>
                                          </v-date-picker>
                                        </v-menu>
                                      </v-col>
                                      <v-col cols="4" sm="4" md="4">
                                        <v-text-field
                                          v-model="editedItem_v.amount"
                                          label="Amount"
                                        ></v-text-field>
                                      </v-col>
                                    </v-row>
                                  </v-container>
                                </v-card-text>
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="close_v"
                                    >Cancel</v-btn
                                  >
                                  <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="save_v"
                                    >Save</v-btn
                                  >
                                </v-card-actions>
                              </v-card>
                            </v-dialog>
                            <v-col
                              class="d-flex"
                              cols="12"
                              sm="12"
                              md="12"
                              v-if="vari == 'new'"
                            >
                              <v-data-table
                                :headers="headers_v"
                                :items="installments"
                                class="elevation-1"
                                :items-per-page="-1"
                              >
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
                                <template v-slot:[`item.actions`]="{ item }">
                                  <el-button
                                    type="primary"
                                    icon="el-icon-edit"
                                    size="mini"
                                    circle
                                    @click="editItem_v(item)"
                                  ></el-button>
                                  <el-button
                                    type="danger"
                                    icon="el-icon-delete"
                                    size="mini"
                                    circle
                                    @click="deleteItem_v(item)"
                                  ></el-button>
                                </template>
                              </v-data-table>
                            </v-col>
                            <v-col
                              class="d-flex"
                              cols="4"
                              sm="5"
                              md="5"
                              v-if="vari == 'edit'"
                            >
                              <v-data-table
                                :headers="headers_v"
                                :items="editedItem"
                                class="elevation-1"
                                :items-per-page="-1"
                                v-if="editedItem.is_variant == 'Y'"
                              >
                                <template v-slot:top>
                                  <v-toolbar flat color="white">
                                    <v-toolbar-title>Variants</v-toolbar-title>
                                    <v-divider
                                      class="mx-4"
                                      inset
                                      vertical
                                    ></v-divider>
                                    <v-spacer></v-spacer>
                                  </v-toolbar>
                                </template>
                                <template v-slot:[`item.actions`]="{ item }">
                                  <el-button
                                    type="primary"
                                    icon="el-icon-edit"
                                    size="mini"
                                    circle
                                    @click="editItem_v(item)"
                                  ></el-button>
                                  <el-button
                                    type="danger"
                                    icon="el-icon-delete"
                                    size="mini"
                                    circle
                                    @click="deleteItem_v(item)"
                                  ></el-button>
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
            sort-by="name"
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
import { API, Auth } from "aws-amplify";
import {
  createSmInvoice,
  updateSmInvoice,
  updateLeads,
  createServicesLineQ,
  createSmInstallment,
  deleteSmInstallment,
  updateServicesLineQ,
  deleteSmInvoice,
} from "../../../graphql/mutations";
import {
  listSmInvoices,
  getServicesLineQ,
  getSType,
  getCompany,
  listSmInstallments,
  listServicesLineQs,
  listAccounts,
  getOrganization,
  listQuotes,
  listPhoneNumber,
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
    dialog_service: false,
    value_opt: [],
    dialog_detalle: false,
    dialog_lead: false,
    showlibrary: false,
    dialog_email: false,
    accounts: [],
    apiRequest: false,
    valid: true,
    headers_v: [
      {
        text: "Start Date",
        align: "start",
        sortable: true,
        value: "startDate",
      },
      { text: "Amount", align: "start", sortable: true, value: "amount" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    headers: [
      { text: "Name", sortable: true, value: "orderNumber", align: "start" },
      {
        text: "Contact",
        sortable: true,
        value: "customerName",
        align: "start",
      },
      {
        text: "Email Sent",
        sortable: true,
        value: "email_sent",
        align: "start",
      },
      {
        text: "Sent Date",
        sortable: true,
        value: "sent_date",
        align: "start",
      },
      {
        text: "Final Amount",
        sortable: true,
        value: "final_amount",
        align: "right",
      },
      { text: "Actions", value: "actions", sortable: false },
    ],
    sheaders: [
      { text: "Name", align: "start", sortable: true, value: "name" },

      { text: "Price", align: "right", sortable: true, value: "price" },
      { text: "Type", sortable: true, value: "type_name", align: "start" },
      {
        text: "Other Type",
        sortable: true,
        value: "other_type",
        align: "start",
      },
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
    dialogs(val) {
      val || this.closeservice();
    },
    dialog_detalle(val) {
      val || this.closedetalle();
    },
    dialog_service(val) {
      val || this.closeservice();
    },
    dialog_v(val) {
      val || this.close_v();
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
    console.log(this.startDate);
    this.getAccounts();
    this.getCatalogs();
    this.GetLeads();
    this.getInvoices();
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

    handleCurrentChange(val) {
      this.currentRow = val;
    },

    handleChange(value_opt) {
      this.values_services = value_opt;
      console.log(this.values_services);
    },

    async getAccounts() {
      const todos = await API.graphql({
        query: listAccounts,
        variables: {
          filter: {
            PK: {
              eq: this.organizationID,
            },
            SK: {
              eq: "ACC#",
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
      this.accounts = todos.data.listAccounts;
    },

    async getCatalogs() {
      const loading = this.$loading({
        lock: true,
        text: "Get Catalogs",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      console.log(this.organizationID);
      this.types = [];
      this.discount = [];
      this.librarys = [];
      this.options = [];

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

      this.organization = todos.data.getOrganization[0];
      console.log(this.organization);

      //ServiceTypes
      if (this.organization.l_productType[0]) {
        for (
          let i = 0;
          i < JSON.parse(this.organization.l_productType).length;
          i++
        ) {
          if (JSON.parse(this.organization.l_productType)[i].name != "") {
            let name = JSON.parse(this.organization.l_productType)[i].name;
            let description = JSON.parse(this.organization.l_productType)[i]
              .description;
            let abbreviation = JSON.parse(this.organization.l_productType)[i]
              .abbreviation;
            let status = JSON.parse(this.organization.l_productType)[i].status;
            const todo = {
              name,
              description,
              abbreviation,
              status,
            };
            this.types = [...this.types, todo];
          }
        }
      }
      //Discount
      if (this.organization.l_discount[0]) {
        for (
          let i = 0;
          i < JSON.parse(this.organization.l_discount).length;
          i++
        ) {
          if (JSON.parse(this.organization.l_discount)[i].discount_code != "") {
            let discount_code = JSON.parse(this.organization.l_discount)[i]
              .discount_code;
            let discount_name = JSON.parse(this.organization.l_discount)[i]
              .discount_name;
            let discount_desc = JSON.parse(this.organization.l_discount)[i]
              .discount_desc;
            let discount_type = JSON.parse(this.organization.l_discount)[i]
              .discount_type;
            let discount_value = JSON.parse(this.organization.l_discount)[i]
              .discount_value;
            let valid_from = JSON.parse(this.organization.l_discount)[i]
              .valid_from;
            let valid_to = JSON.parse(this.organization.l_discount)[i].valid_to;
            let status = JSON.parse(this.organization.l_discount)[i].status;
            const todo = {
              discount_code,
              discount_name,
              discount_desc,
              discount_type,
              discount_value,
              valid_from,
              valid_to,
              status,
            };
            this.discount = [...this.discount, todo];
          }
        }
      }
      console.log(this.discount);
      //Library
      if (this.organization.l_quoteLibrary[0]) {
        for (
          let i = 0;
          i < JSON.parse(this.organization.l_quoteLibrary).length;
          i++
        ) {
          if (
            JSON.parse(this.organization.l_quoteLibrary)[i].description != ""
          ) {
            let title = JSON.parse(this.organization.l_quoteLibrary)[i].title;
            let description = JSON.parse(this.organization.l_quoteLibrary)[i]
              .description;
            let abbreviation = JSON.parse(this.organization.l_quoteLibrary)[i]
              .abbreviation;
            let status = JSON.parse(this.organization.l_quoteLibrary)[i].status;
            const todo = {
              title,
              description,
              abbreviation,
              status,
            };
            this.librarys = [...this.librarys, todo];
          }
        }
      }
      //Quote Status
      if (this.organization.l_quoteStatus[0]) {
        for (
          let i = 0;
          i < JSON.parse(this.organization.l_quoteStatus).length;
          i++
        ) {
          if (
            JSON.parse(this.organization.l_quoteStatus)[i].description != ""
          ) {
            let description = JSON.parse(this.organization.l_quoteStatus)[i]
              .description;
            let abbreviation = JSON.parse(this.organization.l_quoteStatus)[i]
              .abbreviation;
            let status = JSON.parse(this.organization.l_quoteStatus)[i].status;
            const todo = {
              description,
              abbreviation,
              status,
            };
            this.options = [...this.options, todo];
          }
        }
      }
      loading.close();
    },

    async getInvoices() {
      const loading = this.$loading({
        lock: true,
        text: "Loading Invoices",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.invoices = [];

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
              eq: "4_order",
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
      this.invoices = todos.data.listQuotes;
      console.log(this.invoices);
      loading.close();
    },

    async createQuotes(item) {
      const loading = this.$loading({
        lock: true,
        text: "Create Quote",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      const seq = await API.graphql({
        query: listSmInvoices,
        variables: { filter: { companyID: { eq: this.company } } },
      });
      const sequence = seq.data.listSmInvoices.items;
      const c = sequence.length++;
      console.log(this.editedItemLeads.id);
      console.log(this.lead.id);
      if (this.lead.id != undefined) {
        this.editedItemLeads = this.lead;
      }

      const name = "Q" + c;
      const services = this.q_services;
      const lead_id = this.editedItemLeads.id;
      const lead_name = this.editedItemLeads.name;
      const discount_id = this.discount_id;
      const conclusion = this.conclusion;
      const comments = item.comments;
      const subject = item.subject;
      const companyID = this.company;
      const is_discount = this.is_discount;
      const discount_code = this.discount_code;
      const discount_type = this.discount_type;
      const discount_value = this.discount_value;
      const discount_amount = this.discount_amount;
      const quotation_amount = this.total;
      const final_amount = this.total_disc;
      const is_installment = this.is_installment;
      const payment = this.payment;
      const number = this.number;

      const todo = {
        name,
        companyID,
        lead_id,
        lead_name,
        conclusion,
        comments,
        subject,
        is_discount,
        discount_id,
        discount_code,
        discount_type,
        discount_value,
        discount_amount,
        quotation_amount,
        final_amount,
        is_installment,
        payment,
        number,
      };

      if (!name || !services || !lead_name) return alert("error en datos");

      this.quotes = [...this.quotes, todo];
      const a = await API.graphql({
        query: createSmInvoice,
        variables: { input: todo },
      });
      const quoteID = a.data.createQuotation.id;
      const id = lead_id;
      const l = { quoteID, id };
      await API.graphql({
        query: updateLeads,
        variables: { input: l },
      });
      let price = 0;
      let variants = "";
      console.log(this.q_services);
      for (let i = 0; i < this.q_services.length; i++) {
        const name = this.q_services[i].service.name;
        const description = this.q_services[i].service.description;
        const type_id = this.q_services[i].service.type_id;
        const type_name = this.q_services[i].service.type_name;
        const other_type = this.q_services[i].service.other_type;
        const is_variant = this.q_services[i].service.is_variant;
        const is_recurrent = this.q_services[i].service.is_recurrent;
        const comments = this.q_services[i].service.comments;

        if (this.q_services[i].variant.length == 0) {
          variants = "";
        } else {
          variants = this.q_services[i].variant.type;
        }

        if (this.q_services[i].variant.length == 0) {
          price = parseFloat(this.q_services[i].service.price);
        } else {
          price = parseFloat(this.q_services[i].variant.price);
        }

        const t = {
          name,
          description,
          price,
          type_id,
          other_type,
          type_name,
          companyID,
          is_variant,
          is_recurrent,
          variants,
          comments,
          quoteID,
        };
        await API.graphql({
          query: createServicesLineQ,
          variables: { input: t },
        });
      }
      console.log(this.installments);

      if (this.installments != null) {
        let inst = "";
        for (let i = 0; i < this.installments.length; i++) {
          const startDate = this.installments[i].startDate;
          const amount = this.installments[i].amount;
          const id_quote = quoteID;
          inst = {
            startDate,
            amount,
            id_quote,
            companyID,
          };
          await API.graphql({
            query: createSmInstallment,
            variables: { input: inst },
          });
        }
      }

      this.name = "";
      this.q_services = [];
      this.installments = [];
      this.is_installment = false;
      this.calc = false;
      this.number = 1;
      this.payment = 1;
      this.conclusion = "";
      loading.close();
      this.getInvoices();
    },

    async updateQuote(item) {
      const loading = this.$loading({
        lock: true,
        text: "Update Quote",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      console.log(item);
      console.log(this.editedItemLeads.id);
      console.log(this.lead.id);
      if (this.lead.id != undefined) {
        this.editedItemLeads = this.lead;
      }
      const name = item.name;
      const service = this.q_services;
      const installments = this.installments;
      const lead_id = this.editedItemLeads.id;
      const lead_name = this.editedItemLeads.name;
      var id = item.id;
      const discount_id = this.discount_id;
      const conclusion = this.conclusion;
      const comments = item.comments;
      const subject = item.subject;
      const is_discount = this.is_discount;
      const discount_code = this.discount_code;
      const discount_type = this.discount_type;
      const discount_value = this.discount_value;
      const discount_amount = this.discount_amount;
      const quotation_amount = this.total;
      const final_amount = this.total_disc;
      const companyID = this.company;
      const payment = this.payment;
      const number = this.number;
      const is_installment = this.is_installment;

      if (!service || !lead_id) return alert("error en datos");

      const todo = {
        name,
        lead_id,
        lead_name,
        conclusion,
        comments,
        subject,
        is_discount,
        discount_id,
        discount_code,
        discount_type,
        discount_value,
        discount_amount,
        quotation_amount,
        final_amount,
        payment,
        number,
        companyID,
        is_installment,
      };
      const delete_id = {
        id: id,
      };
      await API.graphql({
        query: deleteSmInvoice,
        variables: { input: delete_id },
      });

      this.quotes = [...this.quotes, todo];
      const a = await API.graphql({
        query: createSmInvoice,
        variables: { input: todo },
      });

      const quoteID = a.data.createSmInvoice.id;
      id = lead_id;

      const l = { quoteID, id };

      await API.graphql({
        query: updateLeads,
        variables: { input: l },
      });

      const all_servi = await API.graphql({
        query: listServicesLineQs,
        variables: { filter: { quoteID: { eq: item.id } } },
        limit: 5000,
      });
      for (let i = 0; i < all_servi.data.listServicesLineQs.items.length; i++) {
        const id = all_servi.data.listServicesLineQs.items[i].id;
        const update_serv = { quoteID, id };
        await API.graphql({
          query: updateServicesLineQ,
          variables: { input: update_serv },
        });
      }

      let price = 0;
      let variants = "";
      let id_quote = quoteID;
      for (let i = 0; i < service.length; i++) {
        const servicio = await API.graphql({
          query: getServices,
          variables: { id: service[i].service.id },
        });
        console.log(servicio);
        if (servicio.data.getServices != null) {
          const name = servicio.data.getServices.name;
          const description = servicio.data.getServices.description;
          const type_id = servicio.data.getServices.type_id;
          const type_name = servicio.data.getServices.type_name;
          const other_type = servicio.data.getServices.other_type;
          const is_recurrent = servicio.data.getServices.is_recurrent;
          const comments = servicio.data.getServices.comments;
          const quoteID = id_quote;
          let is_variant = "";
          if (service[i].variant.length == 0) {
            is_variant = "N";
            variants = "";
            price = parseFloat(servicio.data.getServices.price);
          } else {
            is_variant = servicio.data.getServices.is_variant;
            variants = service[i].variant.type;
            price = parseFloat(service[i].variant.price);
          }

          const t = {
            name,
            description,
            price,
            type_id,
            other_type,
            type_name,
            companyID,
            is_variant,
            is_recurrent,
            variants,
            comments,
            quoteID,
          };
          const sq = await API.graphql({
            query: createServicesLineQ,
            variables: { input: t },
          });
          console.log(sq);
        }
      }

      if (this.is_installment == true) {
        const all_inst = await API.graphql({
          query: listSmInstallments,
          variables: { filter: { id_quote: { eq: item.id } } },
        });

        if (all_inst != null) {
          this.ser_var = all_inst.data.listSmInstallments.items;
          if (this.ser_var.length > 0) {
            for (let i = 0; i < this.ser_var.length; i++) {
              const id = this.ser_var[i].id;
              const todo = {
                id,
              };
              await API.graphql({
                query: deleteSmInstallment,
                variables: { input: todo },
              });
            }
          }
        }

        for (let i = 0; i < installments.length; i++) {
          const startDate = installments[i].startDate;
          const amount = installments[i].amount;
          const id_quote = quoteID;
          const todo = {
            startDate,
            amount,
            id_quote,
            companyID,
          };
          await API.graphql({
            query: createSmInstallment,
            variables: { input: todo },
          });
        }
      }

      this.name = "";
      this.lead_id = "";
      this.conclusion = "";
      this.SetConclusion(this.conclusion);
      await this.getInvoices();
      loading.close();
    },

    async updateServices(item) {
      const id_servi = await API.graphql({
        query: getServicesLineQ,
        variables: { id: item.id },
        limit: 5000,
      });
      if (id_servi.data.getServicesLineQ != null) {
        const loading = this.$loading({
          lock: true,
          text: "Update Service",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        this.total = 0;
        this.total_s = 0;

        const name = item.name;
        const description = item.description;
        const price = item.price;
        const type_id = item.type_id;
        const id = item.id;
        const other_type = item.other_type;
        const comments = item.comments;

        if (!name || !description || !price) return;

        if (other_type == "" || other_type == null) {
          const typename = await API.graphql({
            query: getSType,
            variables: { id: type_id },
          });

          this.type_name = typename.data.getSType.name;
        }
        const type_name = this.type_name;
        const todo = {
          name,
          description,
          price,
          type_id,
          type_name,
          id,
          other_type,
          comments,
        };

        await API.graphql({
          query: updateServicesLineQ,
          variables: { input: todo },
        });
        this.editedServiceItem.type_name = type_name;

        console.log(this.item_editquote.id);
        const qs = await API.graphql({
          query: listServicesLineQs,
          variables: { filter: { quoteID: { eq: item.quoteID } } },
          limit: 5000,
        });
        let lineq = qs.data.listServicesLineQs.items;

        console.log(lineq);
        this.q_services = [];
        let vari = [];
        let servi = [];
        for (let i = 0; i < lineq.length; i++) {
          vari = [];
          servi = [];
          servi = lineq[i];
          if (lineq[i].variants == "") {
            vari = [];
          } else {
            vari.type = lineq[i].variants;
            vari.price = lineq[i].price;
          }
          this.q_services.push({
            service: servi,
            variant: vari,
          });
        }
        console.log(this.q_services);

        for (let i = 0; i < this.q_services.length; i++) {
          const servicio = await API.graphql({
            query: getServicesLineQ,
            variables: { id: this.q_services[i].service.id },
            limit: 5000,
          });
          this.total_s += parseFloat(servicio.data.getServicesLineQ.price);
        }

        this.total = this.total_s;

        this.getInvoices();
        loading.close();
      } else {
        console.log("cambair local");
        this.total = 0;
        this.total_s = 0;

        Object.assign(this.q_services[this.editedIndexServi].service, item);

        for (let i = 0; i < this.q_services.length; i++) {
          this.total_s += parseFloat(this.q_services[i].service.price);
        }
        this.total = this.total_s;
      }
    },

    OpenSentEmail(item) {
      this.dialog_email = true;
      this.list_email = [];
      this.send_email = [];

      for (
        let i = 0;
        i < item.leads.items[0].smLeadsdetails.items.length;
        i++
      ) {
        if (item.leads.items[0].smLeadsdetails.items[i].type == "E") {
          let email = item.leads.items[0].smLeadsdetails.items[i].value;
          let e_type = item.leads.items[0].smLeadsdetails.items[i].value_type;
          const todo = {
            email,
            e_type,
          };
          this.list_email = [...this.list_email, todo];
        }
      }
      this.send_email.push({
        name: item.leads.items[0].name + " " + item.leads.items[0].lastname,
        emails: this.list_email,
        quoteID: item.id,
      });
      this.SetBody(item);
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

    async invokeLambda(item) {
      console.log(this.body);

      var AWS = require("aws-sdk");

      const company = await API.graphql({
        query: getCompany,
        variables: { id: this.company },
      });

      const com = company.data.getCompany;

      var REGION = com.region;
      var identityPoolId = com.IdentityPoolId;

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

      for (let i = 0; i < this.selectedEmails.length; i++) {
        var pullParams = {
          FunctionName: com.FunctionName,
          InvocationType: "RequestResponse",
          Payload:
            '{ "toAddresses": "' +
            this.selectedEmails[i] +
            '","source":"' +
            com.source +
            '","subject":"' +
            "Your Quote from BizPlanEasy" +
            '","body":"' +
            this.body +
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
              const email_sent = "Y";
              const sent_date = new Date().toLocaleString();
              const id = item;
              const todo = { email_sent, sent_date, id };
              await API.graphql({
                query: updateSmInvoice,
                variables: { input: todo },
              });
              this.alert = true;
            }
          }
        });
      }
      await this.close_email();
    },

    async editItem(item) {
      this.q_services = [];
      this.installments = [];
      this.list_phone = [];
      this.list_email = [];
      this.list_address = [];

      if (item.processStatus == "Created") {
        this.editedIndex = this.quotes_created.indexOf(item);
      }
      if (item.processStatus == "Negotiations") {
        this.editedIndex = this.quotes_s.indexOf(item);
      }
      if (item.processStatus == "Verbal Agreement") {
        this.editedIndex = this.quotes_va.indexOf(item);
      }

      this.editedItem_c = Object.assign({}, item);
      this.conclusion = item.conclusion;
      this.number = item.numInstallments;
      this.payment = item.downPayment;
      console.log(this.editedItem_c);

      const seq = await API.graphql({
        query: listQuotes,
        variables: {
          filter: {
            PK: {
              eq: this.organizationID,
            },
            SK: {
              eq: item.SK,
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
      var leads = [];
      var installments = [];
      var services = [];
      let vari = [];
      let servi = [];
      var itemsquote = [];
      this.editedItemLeads = [];

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
      console.log(services);

      for (let j = 0; j < services.length; j++) {
        vari = [];
        servi = [];
        servi = services[j];
        this.q_services.push({
          service: servi,
          variant: vari,
        });
      }
      for (let k = 0; k < installments.length; k++) {
        this.is_installment = true;
        this.calc = true;
        this.installments.push(installments[k]);
      }

      for (let l = 0; l < leads.length; l++) {
        this.editedItemLeads = leads[l];
      }

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
      console.log(JSON.parse(item.l_discount));
      console.log(JSON.parse(item.l_discount[0]).discount_code);

      if (JSON.parse(item.l_discount[0])) {
        this.discount_id = JSON.parse(item.l_discount[0]).discount_code;
      }

      this.total = item.quotationAmount;
      this.total_disc = item.finalAmount;

      this.dialog = true;
    },

    closedetalle() {
      this.dialog_detalle = false;
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
        await this.updateQuote(this.editedItem);
        //Object.assign(this.quotes[this.editedIndex], this.editedItem);
      } else {
        console.log("crear");
        console.log(this.editedItem);
        await this.createQuotes(this.editedItem);
      }
      this.close();
    },

    editServiceItem(item) {
      console.log(item);
      this.editedIndexServi = this.q_services.indexOf(item);
      this.editedServiceItem = Object.assign({}, item.service);
      console.log(this.editedServiceItem);
      this.dialog_service = true;
    },

    deleteServiceItem(item) {
      const index = this.services.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.services.splice(index, 1);
    },

    saveservice() {
      console.log("edit");
      this.updateServices(this.editedServiceItem);
      this.closeservice();
    },

    closeservice() {
      this.dialog_service = false;
      this.$nextTick(() => {
        this.editedServiceItem = Object.assign({}, this.defaulServicetItem);
        // this.editedIndex = -1;
      });
    },

    editItem_v(item) {
      console.log(item);
      this.editedIndex_v = this.installments.indexOf(item);
      this.editedItem_v = Object.assign({}, item);
      this.dialog_v = true;
    },

    deleteItem_v(item) {
      const index = this.installments.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.installments.splice(index, 1);
    },

    close_v() {
      this.dialog_v = false;
      this.$nextTick(() => {
        this.editedItem_v = Object.assign({}, this.defaultItem_v);
        this.editedIndex_v = -1;
      });
    },

    async save_v() {
      console.log("edit");
      this.updateInstallment();
      this.close_v();
    },

    async updateInstallment() {
      Object.assign(this.installments[this.editedIndex_v], this.editedItem_v);
    },

    deleteItemLead() {
      console.log("delete");
      this.editedItemLeads.name = "";
    },

    close_email() {
      this.dialog_email = false;
      this.send_email = {};
      this.selectedEmails = [];
    },

    editItemLead() {
      this.editedIndexLead = 1;
      this.list_email = [];
      this.list_phone = [];
      this.list_address = [];
      this.SetPhone(this.list_phone);
      this.SetEmails(this.list_email);
      this.SetAddress(this.list_address);
      console.log(this.listphone);

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
      console.log(this.listphone);
      this.dialog_lead = true;
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