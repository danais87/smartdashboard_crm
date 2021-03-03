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
            <v-btn color="green darken-1" text @click="deleteCompanyItem">
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
        :headers="headers"
        :items="companys"
        sort-by="description"
        class="elevation-1"
        :search="search"
        :items-per-page="-1"
        @click:row="handleClickQC"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Company</v-toolbar-title>
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
            <v-dialog v-model="dialog" max-width="800px">
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
                  <v-row>
                    <span class="headline">{{ formTitle }}</span>
                    <v-spacer></v-spacer>
                    <el-button
                      type="danger"
                      icon="el-icon-delete"
                      @click="deleteItem()"
                      size="mini"
                    ></el-button>
                    <v-btn color="blue darken-1" text @click="close"
                      >Cancel</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                  </v-row>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="4" md="4">
                        <v-text-field
                          v-model="editedItem.smName"
                          label="Name"
                          autofocus
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4" md="4">
                        <v-text-field
                          v-model="editedItem.smAddress"
                          label="Address"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4" md="4">
                        <v-text-field
                          v-model="editedItem.funcRegion"
                          label="AWS Region"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4" md="4">
                        <v-text-field
                          v-model="editedItem.funcIdentityPoolId"
                          label="AWS IdentityPoolId"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4" md="4">
                        <v-text-field
                          v-model="editedItem.funcName"
                          label="Lambda FunctionName"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.funcSource"
                          label="Outbound Email"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-toolbar>
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
    search: "",
    name_order: "",
    companys: [],
    apiRequest: false,
    dialog: false,
    dialog_conf_delete: false,
    compare: "",
    headers: [
      { text: "Name", align: "start", sortable: true, value: "smName" },
      {
        text: "Address",
        align: "start",
        sortable: true,
        value: "smAddress",
      },
      {
        text: "Outbound Email",
        align: "start",
        sortable: true,
        value: "funcSource",
      },
    ],

    editedIndex: -1,
    editedItem: {},
    defaultItem: {},
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ...Vuex.mapState(["usuario", "organizationID"]),
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.getCompanys();
  },

  methods: {
    handleClickQC(value) {
      this.editItem(value);
      console.log(value);
    },

    async createCompany(item) {
      console.log("entra a crear");
      var PK = "ORG#" + item.smName;
      const id = uuid.v1();
      const SK = "#META#" + item.smName;
      const entityType = "ORGANIZATION";
      const active = "1";
      const createdAt = new Date().toISOString().substr(0, 10);
      const updateAt = new Date().toISOString().substr(0, 10);
      const createdBy = this.usuario;
      const smName = item.smName;
      const smAddress = item.smAddress;
      const funcRegion = item.funcRegion;
      const funcIdentityPoolId = item.funcIdentityPoolId;
      const funcName = item.funcName;
      const funcSource = item.funcSource;
      const l_team = JSON.stringify([
        { teamName: "", teamEmail: "", status: "" },
      ]);
      const l_productType = JSON.stringify([
        { name: "", description: "", abbreviation: "", status: "" },
      ]);
      const l_acquisition = JSON.stringify([
        { description: "", abbreviation: "", status: "" },
      ]);
      const l_taskStatusType = JSON.stringify([
        { description: "", abbreviation: "", status: "" },
      ]);
      const l_paymentMethod = JSON.stringify([
        { description: "", abbreviation: "", status: "" },
      ]);
      const l_leadStatus = JSON.stringify([
        { description: "", abbreviation: "", status: "" },
      ]);
      const l_quoteStatus = JSON.stringify([
        { description: "", abbreviation: "", status: "" },
      ]);
      const l_quoteLibrary = JSON.stringify([
        { title: "", description: "", abbreviation: "", status: "" },
      ]);
      const l_discount = JSON.stringify([
        {
          discount_code: "",
          discount_name: "",
          discount_desc: "",
          discount_type: "",
          discount_value: "",
          valid_from: "",
          valid_to: "",
          status: "",
        },
      ]);

      if (
        !smName ||
        !smAddress ||
        !funcRegion ||
        !funcIdentityPoolId ||
        !funcName ||
        !funcSource
      )
        return;
      const search = {
        PK,
        SK,
        id,
        entityType,
        l_team,
        l_productType,
        l_discount,
        l_acquisition,
        l_taskStatusType,
        l_paymentMethod,
        l_leadStatus,
        l_quoteLibrary,
        l_quoteStatus,
        createdAt,
        updateAt,
        createdBy,
        smName,
        smAddress,
        funcRegion,
        funcIdentityPoolId,
        funcName,
        funcSource,
        active,
      };
      const searchText = JSON.stringify(search);

      const todo = {
        PK,
        SK,
        id,
        entityType,
        l_team,
        l_productType,
        l_discount,
        l_acquisition,
        l_taskStatusType,
        l_paymentMethod,
        l_leadStatus,
        l_quoteLibrary,
        l_quoteStatus,
        createdAt,
        updateAt,
        createdBy,
        smName,
        smAddress,
        funcRegion,
        funcIdentityPoolId,
        funcName,
        funcSource,
        active,
        searchText
      };
      this.companys = [...this.companys, todo];
      const c = await API.graphql({
        query: createRecord,
        variables: { input: todo },
      });

      /*
      PK = this.organizationID;
      const table = "ORGANIZATION";
      const type = "C";
      const id_registry = c.data.createCompany.SK;
      const value = JSON.stringify(c.data.createCompany);
      const logs = {
        companyID,
        table,
        type,
        id_registry,
        value,
        created_by,
      };
      await API.graphql({
        query: createSmLogs,
        variables: { input: logs },
      });
      */
      this.getCompanys();
    },

    async getCompanys() {
      const todos = await API.graphql({
        query: listOrganizations,
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
      this.companys = todos.data.listOrganizations;

      console.log(this.companys);
    },

    async updateCompany(item) {
      console.log("entra a actualizar");
      console.log(item);
      const SK = item.SK;
      const PK = item.PK;
      const updateAt = new Date().toISOString().substr(0, 10);
      const smName = item.smName;
      const smAddress = item.smAddress;
      const funcRegion = item.funcRegion;
      const funcIdentityPoolId = item.funcIdentityPoolId;
      const funcName = item.funcName;
      const funcSource = item.funcSource;

      if (
        !smName ||
        !smAddress ||
        !funcRegion ||
        !funcIdentityPoolId ||
        !funcName ||
        !funcSource
      )
        return;

      const search = {
        SK,
        PK,
        updateAt,
        smName,
        smAddress,
        funcRegion,
        funcIdentityPoolId,
        funcName,
        funcSource,
      };
      const searchText = JSON.stringify(search);

      const todo = {
        SK,
        PK,
        updateAt,
        smName,
        smAddress,
        funcRegion,
        funcIdentityPoolId,
        funcName,
        funcSource,
        searchText
      };

      await API.graphql({
        query: updateRecord,
        variables: { input: todo },
      });
      /*
      var cadena = JSON.stringify(item);

      if (this.compare != cadena) {
        const companyID = this.company;
        const table = "Company";
        const type = "U";
        const id_registry = id;
        const value = JSON.stringify(item);

        const logs = {
          companyID,
          table,
          type,
          id_registry,
          value,
          created_by,
        };

        await API.graphql({
          query: createSmLogs,
          variables: { input: logs },
        });
      }
      */
      this.getCompanys();
    },

    editItem(item) {
      this.editedIndex = this.companys.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.compare = JSON.stringify(item);
      console.log(this.editedItem);
      this.dialog = true;
    },

    deleteItem() {
      this.dialog_delete = true;
    },

    async deleteCompanyItem() {
      const loading = this.$loading({
        lock: true,
        text: "Delete Company",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      const index = this.companys.indexOf(this.editedItem);
      this.companys.splice(index, 1);
      console.log(this.editedItem);

      const list = await API.graphql({
        query: listSmartDash,
        variables: {
          filter: {
            PK: {
              eq: this.editedItem.PK,
            },
            SK: {
              eq: "#",
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
      console.log(list.data.listSmartDash.length);
      if (list.data.listSmartDash.length == 1) {
        const SK = this.editedItem.SK;
        const PK = this.editedItem.PK;
        const active = "0";
        const updateAt = new Date().toISOString().substr(0, 10);

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
        /*  const companyID = this.company;
        const table = "Company";
        const type = "D";
        const id_registry = id;
        const value = JSON.stringify(this.editedItem);
        const created_by = this.usuario;
        const logs = {
          companyID,
          table,
          type,
          id_registry,
          value,
          created_by,
        };

        await API.graphql({
          query: createSmLogs,
          variables: { input: logs },
        });*/
        this.dialog_delete = false;
        this.dialog = false;
        console.log(this.companys);
        loading.close();
      } else {
        this.dialog_conf_delete = true;
        this.dialog_delete = false;
        this.dialog = false;
        console.log(this.companys);
        loading.close();
      }
      this.getCompanys();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        console.log("edit");
        console.log(this.editedItem);
        this.updateCompany(this.editedItem);
        Object.assign(this.companys[this.editedIndex], this.editedItem);
      } else {
        console.log("crear");
        this.createCompany(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
