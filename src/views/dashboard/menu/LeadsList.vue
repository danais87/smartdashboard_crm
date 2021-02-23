<template>
  <v-container id="dashboard" fluid grid-list-lg class="mx-0 pa-0">
    <v-app>
      <DialogLeads
        v-model="showScheduleForm"
        v-bind:item="editedItem"
        v-bind:itemcompare="editedCompare"
        :index="this.editedIndex"
        call_type="leads"
      >
      </DialogLeads>
      <v-data-table
        :headers="headers"
        :items="leads"
        sort-by="full_name"
        class="elevation-1"
        :items-per-page="100"
        :footer-props="footerProps"
        :search="search"
        @click:row="handleClick"
      >
        <template v-slot:[`item.full_name`]="{ item }"
          >{{ JSON.parse(item.l_smName)[0].fullName }}
        </template>
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Customer</v-toolbar-title>
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
            <v-btn
              class="ma-2"
              outlined
              x-small
              fab
              color="indigo"
              @click="addLeads"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-toolbar>
        </template>
      </v-data-table>
    </v-app>
  </v-container>
</template>


<script>
import Vuex from "vuex";
import { API } from "aws-amplify";
import { listPhoneNumber } from "../../../graphql/queries";
import DialogLeads from "../dialogs/DialogLeads";
export default {
  name: "Leads",
  components: { DialogLeads },
  data: () => ({
    footerProps: { "items-per-page-options": [20, 50, 100, -1] },
    showScheduleForm: false,
    edite: [],
    search: "",
    show: false,
    country: "",
    list_email: [],
    list_phone: [],
    list_address: [],
    expanded: [],
    apiRequest: false,
    phones: [],
    headers: [
      { text: "Name", align: "start", sortable: true, value: "full_name" },
      {
        text: "Account",
        align: "start",
        sortable: true,
        value: "account",
      },
      {
        text: "Adquisition",
        align: "start",
        sortable: true,
        value: "adquisition",
      },
      { text: "CreatedAt", align: "start", sortable: true, value: "createdAt" },
    ],

    editedIndex: -1,
    editedCompare: {},
    editedItem: {
      GSP1SK1: "",
      GSP3PK1: "",
      GSP3SK1: "",
      PK: "",
      SK: "",
      id: "",
      entityType: " ",
      createdAt: " ",
      updateAt: " ",
      createdBy: " ",
      active: " ",
      createdBy: " ",
      account: " ",
      leadStatus: "No Status",
      seekingService: "Y",
      adquisition: " ",
      notes: " ",
      businessType: " ",
      jobTitle: " ",
      levelAuthority: " ",
      numberEmployee: " ",
      l_smName: "[]",
      name: " ",
      last_name: " ",
      l_email: "[]",
      l_smAddress: "[]",
    },

    defaultItem: {
      GSP1SK1: "",
      GSP3PK1: "",
      GSP3SK1: "",
      PK: "",
      SK: "",
      id: "",
      entityType: " ",
      createdAt: " ",
      updateAt: " ",
      active: " ",
      createdBy: " ",
      account: " ",
      leadStatus: "No Status",
      seekingService: "Y",
      adquisition: " ",
      notes: " ",
      businessType: " ",
      jobTitle: " ",
      levelAuthority: " ",
      numberEmployee: " ",
      l_smName: "[]",
      name: " ",
      last_name: " ",
      l_email: "[]",
      l_address: "[]",
    },
    options: [],
    options_service: [],
    options_acquisition: [],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ...Vuex.mapState([
      "organizationID",
      "leads",
      "listphone",
      "listemails",
      "listaddress",
    ]),
  },

  watch: {},

  created() {
    const loading = this.$loading({
      lock: true,
      text: "Loading Leads",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)",
    });
    this.GetLeads();
    loading.close();
  },

  methods: {
    ...Vuex.mapActions(["GetLeads"]),
    ...Vuex.mapMutations([
      "SetPhone",
      "SetEmails",
      "SetAddress",
      "GetPhone",
      "GetEmails",
      "GetAddress",
    ]),

    handleClick(value) {
      this.editItem(value);
    },

    addLeads() {
      this.editedItem = Object.assign({}, this.defaultItem);
      this.list_phone = [];
      this.list_email = [];
      this.list_address = [];
      this.SetPhone(this.list_phone);
      this.SetEmails(this.list_email);
      this.SetAddress(this.list_address);
      console.log(this.listphone);
      this.showScheduleForm = true;
      this.editedIndex = -1;
    },

    async editItem(item) {
      console.log(item);
      this.editedIndex = this.leads.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.editedItem.name = JSON.parse(item.l_smName)[0].firstName;
      this.editedItem.last_name = JSON.parse(item.l_smName)[0].lastName;

      this.editedCompare = Object.assign({}, item);
      this.list_phone = [];
      this.list_email = [];
      this.list_address = [];
      this.phones = [];
      this.SetPhone(this.list_phone);
      this.SetEmails(this.list_email);
      this.SetAddress(this.list_address);

      if (JSON.parse(item.l_email)[0]) {
        for (let i = 0; i < JSON.parse(item.l_email).length; i++) {
          let e_type = JSON.parse(item.l_email)[i].e_type;
          let email = JSON.parse(item.l_email)[i].email;
          const todo = {
            email,
            e_type,
          };
          this.list_email = [...this.list_email, todo];
        }
      }
      const todos = await API.graphql({
        query: listPhoneNumber,
        variables: { filter: { GSP1PK1: { eq: item.SK } } },
      });
      this.phones = todos.data.listPhoneNumber;
      console.log(this.phones);
      
      if (this.phones.length > 0) {
        for (let i = 0; i < this.phones.length; i++) {
          let phone = this.phones[i].value;
          let p_type = this.phones[i].type;
          let SK = this.phones[i].SK;
          const todo = {
            sk: SK,
            phone,
            p_type,
          };
          this.list_phone = [...this.list_phone, todo];
        }
      }

      if (JSON.parse(item.l_smAddress)[0]) {
        for (let i = 0; i < JSON.parse(item.l_smAddress).length; i++) {
          let country = JSON.parse(item.l_smAddress)[i].country;
          let state = JSON.parse(item.l_smAddress)[i].state;
          let city = JSON.parse(item.l_smAddress)[i].city;
          let street_address = JSON.parse(item.l_smAddress)[i].street_address;
          let zip_code = JSON.parse(item.l_smAddress)[i].zip_code;
          let a_type = JSON.parse(item.l_smAddress)[i].a_type;
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
      this.showScheduleForm = true;
      this.search = "";
    },

    deleteItem(item) {
      const index = this.leads.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.leads.splice(index, 1);
    },

    getColor(item) {
      if (item == "I") return "red";
      else if (item == "A") return "green";
      else return "orange";
    },
  },
};
</script>
