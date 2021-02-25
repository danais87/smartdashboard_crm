<template>
  <v-container id="dashboard" fluid grid-list-lg class="mx-0 pa-0">
    <v-app>
      <v-dialog v-model="dialog_delete" max-width="400">
        <v-card>
          <v-card-title class="headline">
            Are you sure you want to delete this item?
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog_delete = false">
              Cancel
            </v-btn>
            <v-btn color="green darken-1" text @click="deleteCampingItem">
              Yes
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialog_conf_delete" persistent max-width="400">
        <v-card>
          <v-card-title class="headline">
            It cannot be deleted because it has associated data!!!
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              text
              @click="dialog_conf_delete = false"
            >
              Agree
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-data-table
        :headers="headers_invest"
        :items="investment"
        sort-by="description"
        class="elevation-1"
        :search="search_invest"
        :items-per-page="5"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Marketing Investment</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search_invest"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog_invest" max-width="900px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="ma-2"
                  outlined
                  x-small
                  fab
                  color="indigo"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">Marketing Investment</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="4" md="4">
                        <v-text-field
                          v-model="editedItem.description"
                          label="Campaing Name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="2" md="2">
                        <v-text-field
                          v-model="editedItem.price"
                          label="Amount"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="3" md="3">
                        <v-text-field
                          v-model="editedItem.startDate"
                          label="Date(YYYY-MM-DD)"
                          outlined
                        ></v-text-field>
                      </v-col>
                      <v-col cols="4" sm="3" md="3">
                        <v-select
                          v-model="editedItem.productType"
                          :items="serviceTypes"
                          label="Product Type"
                          item-text="name"
                          item-value="id"
                          outlined
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
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
            type="danger"
            icon="el-icon-delete"
            circle
            size="mini"
            @click="deleteItem(item)"
          ></el-button>
        </template>
      </v-data-table>
    </v-app>
  </v-container>
</template>


<script>
import { API } from "aws-amplify";
import { listOrganizations, listSmartDash } from "../../../graphql/queries";
import { createRecord, updateRecord } from "../../../graphql/mutations";
import Vuex from "vuex";
import { uuid } from "vue-uuid";

export default {
  name: "Company",

  data: () => ({
    dialog_delete: false,
    search_invest: "",
    name_order: "",
    companys: [],
    apiRequest: false,
    dialog_invest: false,
    dialog_conf_delete: false,
    compare: "",
    headers_invest: [
      {
        text: "Campaings Name",
        align: "start",
        sortable: true,
        value: "description",
      },
      { text: "Amount", align: "start", sortable: true, value: "price" },
      {
        text: "Product Type",
        align: "start",
        sortable: true,
        value: "productType",
      },
      { text: "Date", align: "start", sortable: true, value: "startDate" },
      { text: "Actions", value: "actions", sortable: false },
    ],

    editedIndexInvest: -1,
    editedItem: {
      id: "",
      price: 0,
      startDate: "",
      description: "",
      productType: "",
    },
    defaultItem: {
      id: "",
      price: 0,
      startDate: "",
      description: "",
      productType: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ...Vuex.mapState([
      "usuario",
      "organizationID",
      "investment",
      "serviceTypes",
    ]),
  },

  watch: {
    dialog_invest(val) {
      val || this.close();
    },
  },

  created() {
    this.GetInvestment();
  },

  methods: {
    ...Vuex.mapActions(["GetInvestment"]),

    handleClickQC(value) {
      this.editItem(value);
      console.log(value);
    },

    //MARKETING INVEST
    async createInvestment(item) {
      const loading = this.$loading({
        lock: true,
        text: "Create Investment",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      const PK = this.organizationID;
      const id = uuid.v1();
      const SK = "CPG#" + id;
      const GSP1PK1 = SK;
      const GSP1SK1 = "#META#" + id;
      const GSP4PK1 = this.organizationID;
      const GSP4SK1 = "CPG#" + item.startDate;
      const entityType = "CAMPAIGNS";
      const createdAt = new Date().toISOString().substr(0, 10);
      const updateAt = new Date().toISOString().substr(0, 10);
      const createdBy = this.usuario;
      const active = "1";
      const price = item.price;
      const startDate = item.startDate;
      const description = item.description;
      const productType = item.productType;

      if (!price || !startDate || !description) return alert("error en datos");

      const todo = {
        PK,
        SK,
        id,
        GSP1PK1,
        GSP1SK1,
        GSP4PK1,
        GSP4SK1,
        entityType,
        createdAt,
        updateAt,
        createdBy,
        active,
        price,
        startDate,
        description,
        productType,
      };
      await API.graphql({
        query: createRecord,
        variables: { input: todo },
      });
      this.GetInvestment();
      loading.close();
    },

    async updateInvestment(item) {
      const loading = this.$loading({
        lock: true,
        text: "Update Investment",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      console.log(item);
      const PK = item.PK;
      const SK = item.SK;
      const updateAt = new Date().toISOString().substr(0, 10);
      const price = item.price;
      const GSP4PK1 = this.organizationID;
      const GSP4SK1 = "CPG#" + item.startDate;
      const startDate = item.startDate;
      const description = item.description;
      const productType = item.productType;
      if (!price || !startDate || !description) return alert("error en datos");

      const todo = {
        PK,
        SK,
        GSP4PK1,
        GSP4SK1,
        updateAt,
        price,
        startDate,
        description,
        productType,
      };

      await API.graphql({
        query: updateRecord,
        variables: { input: todo },
      });
      loading.close();
      this.GetInvestment();
    },

    editItem(item) {
      console.log(item);
      this.editedIndexInvest = this.investment.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog_invest = true;
    },

    deleteItem(item) {
      this.editedItem = Object.assign({}, item);
      this.dialog_delete = true;
    },

    async deleteCampingItem() {
      const loading = this.$loading({
        lock: true,
        text: "Delete Investment",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      const index = this.investment.indexOf(this.editedItem);
      this.investment.splice(index, 1);

      const SK = this.editedItem.SK;
      const PK = this.editedItem.PK;
      const updateAt = new Date().toISOString().substr(0, 10);
      const active = "0";
      const todo = {
        SK,
        PK,
        active,
        updateAt,
      };
      await API.graphql({
        query: updateRecord,
        variables: { input: todo },
      });
      this.dialog_delete = false;
      console.log(this.investment);
      loading.close();
      this.GetInvestment();
    },

    close() {
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndexInvest = -1;
      });
      this.dialog_invest = false;
    },

    async save() {
      if (this.editedIndexInvest > -1) {
        console.log("edit");
        await this.updateInvestment(this.editedItem);
        console.log(this.editedItem);
        this.close();
      } else {
        console.log("crear");
        this.createInvestment(this.editedItem);
        this.close();
      }
    },
  },
};
</script>
