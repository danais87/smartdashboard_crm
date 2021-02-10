<template>
  <v-container id="dashboard" fluid grid-list-lg class="mx-0 pa-0">
    <v-app>
      <v-dialog v-model="dialog_delete" max-width="290">
        <v-card>
          <v-card-title class="headline">
            Are you sure you want to delete this item?
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog_delete = false">
              Cancel
            </v-btn>
            <v-btn color="green darken-1" text @click="deleteServiceItem">
              Yes
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-data-table
        :headers="headers"
        :items="list_services"
        sort-by="name"
        class="elevation-1"
        :search="search"
        @click:row="handleClick"
        :items-per-page="100"
        :footer-props="footerProps"
      >
        <template v-slot:[`item.price`]="{ item }">
          <v-chip class="ma-2" color="green" outlined light small>{{
            formattedCurrencyValue(item.price)
          }}</v-chip>
        </template>
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Products</v-toolbar-title>
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
            <v-dialog v-model="dialog" max-width="900px">
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
                  <span class="headline">{{ formTitle }}</span>
                  <v-spacer></v-spacer>
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    size="mini"
                    circle
                    @click="deleteItem()"
                  ></el-button>
                  <v-btn color="blue darken-1" text @click="close"
                    >Cancel</v-btn
                  >
                  <v-btn
                    :disabled="!valid"
                    color="blue darken-1"
                    text
                    @click="save"
                    >Save</v-btn
                  >
                </v-card-title>
                <v-card-text>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="7" md="7">
                          <v-text-field
                            v-model="editedItem.smName"
                            label="Name"
                            :rules="nameRules"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                          <v-textarea
                            outlined
                            name="description"
                            v-model="editedItem.description"
                            required
                            :rules="descRules"
                            label="Description"
                          ></v-textarea>
                        </v-col>
                        <v-col cols="4" sm="2" md="2">
                          <v-text-field
                            v-model="editedItem.price"
                            label="Price"
                            required
                            :rules="priceRules"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="4" sm="4" md="4">
                          <v-select
                            v-model="editedItem.typeName"
                            :items="serviceTypes"
                            label="Product Type"
                            item-text="name"
                            item-value="id"
                            outlined
                          ></v-select>
                        </v-col>
                        <v-col cols="4" sm="5" md="5">
                          <v-text-field
                            v-model="editedItem.otherType"
                            label="Other Type"
                          ></v-text-field>
                        </v-col>
                        <v-col class="d-flex" cols="4" sm="2" md="2">
                          <v-select
                            v-model="editedItem.isRecurrent"
                            :items="options_r"
                            label="Select"
                            item-text="label"
                            item-value="value"
                            hint="Is Recurrent?"
                            persistent-hint
                            outlined
                          ></v-select>
                        </v-col>
                        <v-col class="d-flex" cols="4" sm="2" md="2">
                          <v-select
                            v-model="editedItem.isVariant"
                            :items="options_r"
                            label="Select"
                            item-text="label"
                            item-value="value"
                            hint="Has Variants?"
                            persistent-hint
                            outlined
                          ></v-select>
                        </v-col>
                        <v-dialog v-model="dialog_v" max-width="500px">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              class="ma-2"
                              outlined
                              x-small
                              fab
                              color="indigo"
                              v-bind="attrs"
                              v-on="on"
                              v-show="editedItem.isVariant == 'Y'"
                            >
                              <v-icon>mdi-plus</v-icon>
                            </v-btn>
                          </template>
                          <v-card>
                            <v-card-title>
                              <span class="headline"
                                >Variant {{ formTitle }}</span
                              >
                            </v-card-title>
                            <v-card-text>
                              <v-container>
                                <v-row>
                                  <v-col cols="12" sm="4" md="4">
                                    <v-text-field
                                      v-model="editedItem_v.name"
                                      label="Name"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="4" sm="4" md="4">
                                    <v-text-field
                                      v-model="editedItem_v.price"
                                      label="Price"
                                    ></v-text-field>
                                  </v-col>
                                </v-row>
                              </v-container>
                            </v-card-text>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="blue darken-1" text @click="close_v"
                                >Cancel</v-btn
                              >
                              <v-btn color="blue darken-1" text @click="save_v"
                                >Save</v-btn
                              >
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                        <v-col
                          class="d-flex"
                          cols="4"
                          sm="5"
                          md="5"
                          v-if="vari == 'new'"
                        >
                          <v-data-table
                            :headers="headers_v"
                            :items="variants"
                            sort-by="calories"
                            class="elevation-1"
                            :items-per-page="-1"
                            v-if="editedItem.isVariant == 'Y'"
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
                              <v-icon small @click="deleteItem_v(item)"
                                >mdi-delete</v-icon
                              >
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
                            :items="variants"
                            sort-by="calories"
                            class="elevation-1"
                            :items-per-page="-1"
                            v-if="editedItem.isVariant == 'Y'"
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
                              <v-icon small @click="deleteItem_v(item)"
                                >mdi-delete</v-icon
                              >
                            </template>
                          </v-data-table>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-form>
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
import { updateRecord, createRecord } from "../../../graphql/mutations";
import Vuex from "vuex";
import { uuid } from "vue-uuid";

export default {
  name: "Service",
  components: {},
  data: () => ({
    footerProps: { "items-per-page-options": [20, 50, 100, -1] },
    alert: true,
    search: "",
    is_recurrent: "",
    show: false,
    dialog_delete: false,
    name: "",
    description: "",
    price: "",
    compare: "",
    v: [],
    variants: [],
    form: "",
    vari: "new",
    select_type: "",
    type_name: "",
    dialog: false,
    dialog_v: false,
    apiRequest: false,
    options: [
      {
        value: "A",
        label: "Active",
      },
      {
        value: "I",
        label: "Inactive",
      },
    ],
    options_r: [
      {
        value: "Y",
        label: "Yes",
      },
      {
        value: "N",
        label: "No",
      },
    ],
    headers: [
      { text: "Name", align: "start", sortable: true, value: "smName" },
      { text: "Price", align: "start", sortable: true, value: "price" },
      { text: "Type", sortable: true, value: "typeName", align: "start" },
      {
        text: "Other Type",
        sortable: true,
        value: "otherType",
        align: "start",
      },
      {
        text: "Is Variant",
        sortable: true,
        value: "isVariant",
        align: "start",
      },
    ],
    headers_v: [
      { text: "Name", align: "start", sortable: true, value: "name" },
      { text: "Price", align: "start", sortable: true, value: "price" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    items: [],
    ser_var: [],
    editedIndex: -1,
    editedIndex_v: -1,
    editedItem: {
      smName: "",
      description: "",
      price: 0,
      typeName: "",
      isRecurrent: "",
      isVariant: "N",
      otherType: "",
      l_variant: [],
    },
    defaultItem: {
      smName: "",
      description: "",
      price: 0,
      typeName: "",
      isRecurrent: "",
      isVariant: "N",
      otherType: "",
      l_variant: [],
    },
    editedItem_v: {
      id: "",
      name: "",
      price: 0,
    },
    defaultItem_v: {
      id: "",
      name: "",
      price: 0,
    },
    valid: true,
    nameRules: [(v) => !!v || "Name is required"],
    descRules: [(v) => !!v || "Description is required"],
    priceRules: [(v) => !!v || "Price is required"],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    formTitle_v() {
      return this.editedIndex_v === -1 ? "New Item" : "Edit Item";
    },
    ...Vuex.mapState([
      "usuario",
      "organizationID",
      "serviceTypes",
      "list_services",
    ]),
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialog_v(val) {
      val || this.close_v();
    },
  },

  created() {
    const loading = this.$loading({
      lock: true,
      text: "Loading Products",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)",
    });
    this.GetListServices();

    loading.close();
  },

  methods: {
    formattedCurrencyValue(value) {
      return "$ " + parseFloat(value).toFixed(2);
    },

    ...Vuex.mapActions(["GetListServices"]),

    handleClick(value) {
      this.editItem(value);
      console.log(value);
    },

    validate() {
      this.$refs.form.validate();
    },

    async createService(item) {
      this.validate();
      const loading = this.$loading({
        lock: true,
        text: "Create Product...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      const PK = this.organizationID;
      const id = uuid.v1();
      const SK = "PRO#" + id;
      const GSP1PK1 = SK;
      const GSP1SK1 = "#META#" + id;
      const entityType = "PRODUCT";
      const createdAt = new Date().toISOString().substr(0, 10);
      const updateAt = new Date().toISOString().substr(0, 10);
      const createdBy = this.usuario;
      const active = "1";
      const smName = item.smName;
      const description = item.description;
      const price = item.price;
      const typeName = item.typeName;
      const otherType = item.otherType;
      const isRecurrent = item.isRecurrent;
      const isVariant = item.isVariant;
      const l_variant = JSON.stringify(this.variants);

      if (!smName || !description || !price) {
        this.alert = false;
        this.openMS();
      } else {
        const todo = {
          smName,
          description,
          price,
          typeName,
          otherType,
          isRecurrent,
          isVariant,
          active,
          createdBy,
          updateAt,
          createdAt,
          entityType,
          GSP1SK1,
          GSP1PK1,
          PK,
          SK,
          id,
          l_variant,
        };
        const serv = await API.graphql({
          query: createRecord,
          variables: { input: todo },
        });

        this.alert = true;
        this.close();
        loading.close();
        this.GetListServices();
        this.variants = [];
      }
    },

    async updateServices(item) {
      this.apiRequest = true;
      this.validate();
      const loading = this.$loading({
        lock: true,
        text: "Update Producst",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      var l_team = "";
      if (this.variants.length > 0) {
        for (let i = 0; i < this.variants.length; i++) {
          l_team += JSON.stringify(this.variants[i]) + ",";
        }
      }

      const PK = item.PK;
      const SK = item.SK;
      const updateAt = new Date().toISOString().substr(0, 10);
      const smName = item.smName;
      const description = item.description;
      const price = item.price;
      const typeName = item.typeName;
      const otherType = item.otherType;
      const isRecurrent = item.isRecurrent;
      const isVariant = item.isVariant;
      const l_variant = l_team.slice(0, -1);
      if (!smName || !description || !price) {
        this.alert = false;
        this.openMS();
      } else {
        const todo = {
          PK,
          SK,
          updateAt,
          smName,
          description,
          price,
          typeName,
          otherType,
          isRecurrent,
          isVariant,
          l_variant,
        };
        const prod = await API.graphql({
          query: updateRecord,
          variables: { input: todo },
        });

        this.alert = true;
        this.close();
        this.GetListServices();
      }
      this.variants = [];
      loading.close();
    },

    async createVariants(item) {
      const name = item.name;
      const price = item.price;
      const product = "";
      if (!name || !price) return;

      const todo = {
        name,
        price,
        product,
      };
      this.variants = [...this.variants, todo];
    },

    editItem(item) {
      this.variants = [];
      this.vari = "edit";
      this.editedIndex = this.list_services.indexOf(item);
      this.editedItem = Object.assign({}, item);

      if (JSON.parse(item.l_variant)[0]) {
        for (let i = 0; i < JSON.parse(item.l_variant).length; i++) {
          if (JSON.parse(item.l_variant)[i].name != "") {
            let name = JSON.parse(item.l_variant)[i].name;
            let price = JSON.parse(item.l_variant)[i].price;
            let product = JSON.parse(item.l_variant)[i].product;
            const todo = {
              name,
              price,
              product,
            };
            this.variants = [...this.variants, todo];
          }
        }
      }

      this.compare = JSON.stringify(item);
      this.dialog = true;
    },

    deleteItem() {
      this.dialog_delete = true;
    },

    async deleteServiceItem() {
      const loading = this.$loading({
        lock: true,
        text: "Delete service...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      const PK = this.editedItem.PK;
      const SK = this.editedItem.SK;
      const updateAt = new Date().toISOString().substr(0, 10);
      const active = "0";
      const todo = {
        PK,
        SK,
        updateAt,
        active,
      };
      await API.graphql({
        query: updateRecord,
        variables: { input: todo },
      });

      this.dialog_delete = false;
      this.dialog = false;
      loading.close();
      this.GetListServices();
    },

    deleteItem_v(item) {
      const index = this.variants.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.variants.splice(index, 1);
    },

    close() {
      this.vari = "new";
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    close_v() {
      this.dialog_v = false;
      this.$nextTick(() => {
        this.editedItem_v = Object.assign({}, this.defaultItem_v);
        this.editedIndex_v = -1;
      });
    },

    async save() {
      if (this.editedIndex > -1) {
        console.log("edit");
        await this.updateServices(this.editedItem);
      } else {
        console.log("crear");
        this.createService(this.editedItem);
      }
      if (this.alert == true) {
        this.close();
      }
    },

    async save_v() {
      console.log("crear");
      this.createVariants(this.editedItem_v);
      this.close_v();
    },

    getColor(item) {
      if (item == "I") return "red";
      else if (item == "A") return "green";
      else return "orange";
    },

    openMS() {
      this.$alert(
        "Required data can not be blank(Name,Description,Price,Type or Other Type)",
        "Error",
        {
          confirmButtonText: "OK",
        }
      );
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