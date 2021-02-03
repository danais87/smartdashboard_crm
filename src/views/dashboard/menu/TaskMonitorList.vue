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
              :return-value.sync="start_date"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="start_date"
                  label="Start Date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="start_date" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.menu.save(start_date)"
                >
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
                type="danger"
                icon="el-icon-delete"
                size="mini"
                circle
                @click="deleteItem()"
              ></el-button>
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
                      :items="options"
                      label="Status"
                      item-text="title"
                      item-value="value"
                      required
                      dense
                      solo
                      default="Active"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="4" md="4">
                    <v-select
                      v-model="editedItem.responsible"
                      :items="team"
                      label="Responsible"
                      item-text="name"
                      item-value="id"
                      required
                      dense
                      solo
                      default="Active"
                    ></v-select>
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
import { API, Auth } from "aws-amplify";
import {
  getSmTeam,
  listSmLibraryCategorys,
  listSmLibrarys,
  listSmTaskMonitors,
  listSmTeams,
} from "../../../graphql/queries";
import { updateServicesLineQ } from "../../../graphql/mutations";

export default {
  name: "Company",

  data: () => ({
    search: "",
    name_order: "",
    task: [],
    team: [],
    apiRequest: false,
    data: [],
    start_date: "",
    menu: false,
    modal: false,
    end_date: new Date().toISOString().substr(0, 10),
    menu1: false,
    modal1: false,
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
    options: [],
    chil: [],
    dialog: false,
    editedIndex: -1,
    editedItem: {
      label: "",
      name: "",
      resp: "",
      state: "IP",
    },
    defaultItem: {
      label: "",
      name: "",
      resp: "",
      state: "IP",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {},

  created() {
    this.$emit(`update:layout`, DefaultLayout);
    this.getTask();
    this.getCatalogs();
    this.getTeam();
    const d = new Date();
    this.start_date = new Date(d.setMonth(d.getMonth() - 3))
      .toISOString()
      .substr(0, 10);
  },

  methods: {
    logout() {
      Auth.signOut()
        .then((data) => {
          console.log(data);
          this.$router.push("/login");
        })
        .catch((err) => console.log(err));
    },
    async getCatalogs() {
      //Status Task
      const op = await API.graphql({
        query: listSmLibraryCategorys,
        variables: {
          filter: {
            category_name: { eq: "TaskStatus" },
          },
        },
      });

      const id = op.data.listSmLibraryCategorys.items[0].id;

      const op_status = await API.graphql({
        query: listSmLibrarys,
        variables: {
          filter: {
            lib_category_id: { eq: id },
          },
        },
      });
      this.options = op_status.data.listSmLibrarys.items;
      this.options.sort(function (a, b) {
        if (a.value.toLowerCase() > b.value.toLowerCase()) {
          return 1;
        } else {
          return -1;
        }
      });
      console.log(this.options);
    },

    async getTeam() {
      const team = await API.graphql({
        query: listSmTeams,
      });
      this.team = team.data.listSmTeams.items;
      console.log(this.team);
    },

    async getTask() {
      this.task = [];

      this.apiRequest = true;

      const todos = await API.graphql({
        query: listSmTaskMonitors,
      });

      this.task = todos.data.listSmTaskMonitors.items;
      this.apiRequest = false;
      this.chil = [];

      for (let i = 0; i < this.task.length; i++) {
        for (
          let j = 0;
          j < this.task[i].quote.items[0].services.items.length;
          j++
        ) {
          if (
           this.task[i].quote.items[0].services.items[j].createdAt.substr(0, 10) >=
              this.start_date &&
            this.task[i].quote.items[0].services.items[j].createdAt.substr(0, 10) <=
              this.end_date
          ) {
            if (this.task[i].quote.items[0].services.items[j].variants != "") {
              this.chil.push({
                label: this.task[i].quote.items[0].leads.items[0].full_name,
                name:
                  this.task[i].quote.items[0].services.items[j].name +
                  " Is Variant: " +
                  this.task[i].quote.items[0].services.items[j].variants,
                status: this.task[i].quote.items[0].services.items[j]
                  .task_descstatus,
                resp: this.task[i].quote.items[0].services.items[j]
                  .task_nameresp,
                id_task: this.task[i].id,
                id_serv: this.task[i].quote.items[0].services.items[j].id,
              });
            } else {
              this.chil.push({
                label: this.task[i].quote.items[0].leads.items[0].full_name,
                name: this.task[i].quote.items[0].services.items[j].name,
                status: this.task[i].quote.items[0].services.items[j]
                  .task_descstatus,
                resp: this.task[i].quote.items[0].services.items[j]
                  .task_nameresp,
                id_task: this.task[i].id,
                id_serv: this.task[i].quote.items[0].services.items[j].id,
              });
            }
          }
        }
      }
      console.log(this.task);
      console.log(this.chil);
    },

    handleClick(value) {
      this.editItem(value);
      console.log(value);
    },

    async updateTask(item) {
      console.log(item);
      const id = item.id_serv;
      const task_status = item.status;
      const task_descstatus = item.status;
      const task_responsible = item.responsible;
      const l = await API.graphql({
        query: getSmTeam,
        variables: { id: task_responsible },
      });
      const task_nameresp = l.data.getSmTeam.name;

      const lineq = {
        task_status,
        task_descstatus,
        task_responsible,
        task_nameresp,
        id,
      };
      await API.graphql({
        query: updateServicesLineQ,
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