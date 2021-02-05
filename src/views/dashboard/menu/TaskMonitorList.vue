<template>
  <v-container id="dashboard" fluid grid-list-lg class="mx-0 pa-0">
    <div id="app">
      <v-app>
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
                <v-btn text color="primary" @click="menu = false">
                  Cancel
                </v-btn>
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
              :return-value.sync="endDate"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="endDate"
                  label="End Date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="endDate" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu1 = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.menu1.save(endDate)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col>
            <br />
            <v-btn color="blue darken-1" text @click="getTask">Apply</v-btn>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
        <v-dialog v-model="dialog" max-width="800px">
          <v-card>
            <v-card-title>
              <span class="headline">Task</span>
              <v-spacer></v-spacer>

              <el-button
                id="c"
                type="info"
                icon="el-icon-message"
                circle
                @click="OpenSentEmail(editedItem_c)"
                size="mini"
              ></el-button>
              <el-button
                id="c"
                type="warning"
                icon="el-icon-chat-line-square"
                circle
                @click="sendMessege(editedItem_c)"
                size="mini"
              ></el-button>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.label"
                      label="datos lead"
                      disabled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.name"
                      label="service name"
                      disabled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4" md="4">
                    <v-select
                      v-model="editedItem.status"
                      :items="task_status"
                      label="Status"
                      item-text="description"
                      item-value="description"
                      required
                      dense
                      solo
                      default="Active"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="4" md="4">
                    <v-select
                      v-model="editedItem.responsible"
                      :items="teams"
                      label="Responsible"
                      item-text="teamName"
                      item-value="teamName"
                      required
                      dense
                      solo
                      default="Active"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="4" md="4" align="center">
                    <v-menu
                      ref="menu2"
                      v-model="menu2"
                      :close-on-content-click="false"
                      :return-value.sync="startDate2"
                      transition="scale-transition"
                      offset-y
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="startDate2"
                          label="Start Date"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="startDate2" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu2 = false">
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.menu2.save(startDate2)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" sm="2" md="2" align="center">
                    <v-menu
                      ref="menu3"
                      v-model="menu3"
                      :close-on-content-click="false"
                      :return-value.sync="endDate2"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="endDate2"
                          label="End Date"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="endDate2" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu3 = false">
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.menu3.save(endDate2)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-data-table
          :headers="headers"
          :items="chil"
          sort-by="label"
          class="elevation-1"
          :search="search"
          :items-per-page="-1"
          @click:row="handleClick"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>Task</v-toolbar-title>
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
        </v-data-table>
      </v-app>
    </div>
  </v-container>
</template>


<script>
import { API } from "aws-amplify";
import {
  getOrganization,
  getSmTeam,
  listQuoteItems,
} from "../../../graphql/queries";
import { updateRecord, updateServicesLineQ } from "../../../graphql/mutations";
import Vuex from "vuex";
import { uuid } from "vue-uuid";

export default {
  name: "Company",

  data: () => ({
    search: "",
    name_order: "",
    task: [],
    team: [],
    apiRequest: false,
    data: [],
    startDate: "",
    menu: false,
    modal: false,
    endDate: new Date().toISOString().substr(0, 10),
    menu1: false,
    modal1: false,
    startDate2: "",
    menu2: false,
    modal2: false,
    endDate2: new Date().toISOString().substr(0, 10),
    menu3: false,
    modal3: false,
    headers: [
      { text: "Contact", align: "start", sortable: true, value: "label" },
      {
        text: "Service",
        align: "start",
        sortable: true,
        value: "name",
      },
      {
        text: "Status",
        align: "start",
        sortable: true,
        value: "status",
      },
      {
        text: "Responsible",
        align: "start",
        sortable: true,
        value: "resp",
      },
    ],
    teams: [],
    task_status: [],
    options: [],
    chil: [],
    dialog: false,
    editedIndex: -1,
    editedItem: {
      label: "",
      name: "",
      resp: "",
      state: "In Progress",
    },
    defaultItem: {
      label: "",
      name: "",
      resp: "",
      state: "In Progress",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ...Vuex.mapState(["organizationID", "usuario"]),
  },

  watch: {},

  created() {
    const d = new Date();
    this.startDate1 = new Date(d.setMonth(d.getMonth() - 3))
      .toISOString()
      .substr(0, 10);
    this.startDate2 = new Date(d.setMonth(d.getMonth() - 3))
      .toISOString()
      .substr(0, 10);
    this.getTask();
    this.getTeam();
  },

  methods: {
    async getTeam() {
      const loading = this.$loading({
        lock: true,
        text: "Loading...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      console.log(this.organizationID);
      this.teams = [];
      this.task_status = [];
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

      //TEAMS
      if (this.organization.l_team[0]) {
        for (let i = 0; i < JSON.parse(this.organization.l_team).length; i++) {
          if (JSON.parse(this.organization.l_team)[i].teamName != "") {
            let teamName = JSON.parse(this.organization.l_team)[i].teamName;
            let teamEmail = JSON.parse(this.organization.l_team)[i].teamEmail;
            let status = JSON.parse(this.organization.l_team)[i].status;
            const todo = {
              teamName,
              teamEmail,
              status,
            };
            this.teams = [...this.teams, todo];
          }
        }
      }

      //TASK
      if (this.organization.l_taskStatusType[0]) {
        for (
          let i = 0;
          i < JSON.parse(this.organization.l_taskStatusType).length;
          i++
        ) {
          if (
            JSON.parse(this.organization.l_taskStatusType)[i].description != ""
          ) {
            let description = JSON.parse(this.organization.l_taskStatusType)[i]
              .description;
            let abbreviation = JSON.parse(this.organization.l_taskStatusType)[i]
              .abbreviation;
            let status = JSON.parse(this.organization.l_taskStatusType)[i]
              .status;
            const todo = {
              description,
              abbreviation,
              status,
            };
            this.task_status = [...this.task_status, todo];
          }
        }
      }

      loading.close();
    },

    async getTask() {
      this.task = [];

      const loading = this.$loading({
        lock: true,
        text: "Get Task...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      const todos = await API.graphql({
        query: listQuoteItems,
        variables: {
          filter: {
            PK: {
              eq: this.organizationID,
            },
            SK: {
              eq: "QIT#",
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

      this.task = todos.data.listQuoteItems;

      this.chil = [];

      for (let i = 0; i < this.task.length; i++) {
        this.chil.push({
          label: this.task[i].customerName,
          name: this.task[i].smName,
          status: this.task[i].taskStatus,
          resp: this.task[i].taskNameResponsible,
          servi_PK: this.task[i].PK,
          servi_SK: this.task[i].SK,
        });
      }
      loading.close();
      console.log(this.task);
      console.log(this.chil);
    },

    handleClick(value) {
      this.editItem(value);
      console.log(value);
    },

    async updateTask(item) {
      console.log(item);
      const SK = item.servi_SK;
      const PK = item.servi_PK;
      const taskStatus = item.status;
      const taskNameResponsible = item.responsible;

      const lineq = {
        SK,
        PK,
        taskStatus,
        taskNameResponsible,
      };
      await API.graphql({
        query: updateRecord,
        variables: { input: lineq },
      });

      this.getTask();
    },

    editItem(item) {
      console.log(item);
      this.editedIndex = this.task.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.task.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.task.splice(index, 1);
    },

    close() {
      this.dialog = false;
    },

    async save() {
      console.log("edit");
      await this.updateTask(this.editedItem);
      console.log(this.editedItem);
      this.close();
    },

    onRowClick(params) {
      console.log(params);
      this.dialog = true;
    },
  },
};
</script>
<style scoped>
body {
  font-family: Helvetica Neue, Arial, sans-serif;
  font-size: 14px;
  color: #444;
}

table {
  background-color: #fff;
}

th {
  background-color: #42b983;
  color: rgba(255, 255, 255, 0.66);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

td {
  background-color: #f9f9f9;
}

th,
td {
  min-width: 120px;
  padding: 10px 20px;
}

th.active {
  color: #fff;
}

th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}
.row {
  margin-left: 5px;
  flex: unset;
}
.col,
.col-sm-2 .col-md-2 .col-12 {
  padding: 2px;
}
.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}
</style>