<template>
  <div>
    <v-dialog v-model="dialog_a" max-width="800px">
      <v-card>
        <v-card-title>
          <span class="headline">Address</span>
          <v-spacer></v-spacer>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            circle
            @click="deleteItem_a()"
          ></el-button>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="4" md="4">
                <v-text-field
                  v-model="editedItemLocalAddress.street_address"
                  label="Street Address"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-text-field
                  v-model="editedItemLocalAddress.city"
                  label="City"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-text-field
                  v-model="editedItemLocalAddress.state"
                  label="State "
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="2" md="2">
                <v-text-field
                  v-model="editedItemLocalAddress.zip_code"
                  label="Zip Code"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-text-field
                  v-model="editedItemLocalAddress.country"
                  label="Country"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <br />
                <v-select
                  v-model="editedItemLocalAddress.a_type"
                  :items="options_address"
                  label="Type"
                  item-text="label"
                  item-value="value"
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
          <v-btn color="blue darken-1" text @click="close_a">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="saves_a">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Address:</span>
      </div>
      <div class="text item">
        <v-row>
          <v-col cols="12" sm="2" md="2">
            <v-text-field
              v-model="street_address"
              label="Street Address"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="2" md="2">
            <v-text-field v-model="city" label="City"></v-text-field>
          </v-col>
          <v-col cols="12" sm="2" md="2">
            <v-text-field v-model="state" label="State "></v-text-field>
          </v-col>
          <v-col cols="12" sm="1" md="1">
            <v-text-field v-model="zip_code" label="Zip Code"></v-text-field>
          </v-col>
          <v-col cols="12" sm="2" md="2">
            <v-text-field v-model="country" label="Country"></v-text-field>
          </v-col>
          <v-col cols="12" sm="2" md="2">
            <br />
            <v-select
              v-model="a_type"
              :items="options_address"
              label="Type"
              item-text="label"
              item-value="value"
              required
              dense
              solo
              default="Active"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="1" md="1">
            <v-btn
              class="ma-2"
              outlined
              x-small
              fab
              color="indigo"
              @click="addAddress()"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" sm="12" md="12">
            <v-list-item
              three-line
              v-for="item in listaddress"
              :key="item.id"
              color="#CFD8DC"
              @click="handleClick(item)"
            >
              <v-hover v-slot="{ hover }">
                <v-list-item-content>
                  <v-list-item-subtitle>
                    <v-expand-transition>
                      <v-overlay
                        absolute
                        :opacity="0.1"
                        :value="hover"
                        :elevation="hover ? 12 : 2"
                        :class="{ 'on-hover': hover }"
                      >
                      </v-overlay>
                    </v-expand-transition>
                    {{ item.a_type }}: {{ item.street_address }},
                    {{ item.country }}, {{ item.city }}, {{ item.state }},
                    {{ item.zip_code }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-hover>
            </v-list-item>
          </v-col>
        </v-row>
      </div>
    </el-card>
  </div>
</template>


<script>
import Vuex from "vuex";

export default {
  name: "Home",
  components: {},

  data() {
    return {
      list_addresslocal: [],
      dialog_a: false,
      apiRequest: false,
      street_address: "",
      country: "",
      city: "",
      state: "",
      zip_code: "",
      a_type: "Work",
      options_address: [
        {
          value: "Work",
          label: "Work",
        },
        {
          value: "Home",
          label: "Home",
        },
      ],
      headers_a: [
        { text: "Type", align: "start", sortable: true, value: "a_type" },
        { text: "Country", align: "start", sortable: true, value: "country" },
        { text: "City", align: "start", sortable: true, value: "city" },
        { text: "State", align: "start", sortable: true, value: "state" },
        {
          text: "Street",
          align: "start",
          sortable: true,
          value: "street_address",
        },
        { text: "Zip Code", align: "start", sortable: true, value: "zip_code" },
      ],

      editedIndexAddress: -1,
      editedItemLocalAddress: {
        street_address: "",
        country: "",
        city: "",
        state: "",
        zip_code: "",
        a_type: "Work",
      },
      defaultItemAddress: {
        street_address: "",
        country: "",
        city: "",
        state: "",
        zip_code: "",
        a_type: "Work",
      },
    };
  },

  computed: {
    ...Vuex.mapState(["company", "leads", "listaddress"]),
  },

  created() {
    //this.list_addresslocal = this.listaddress;
  },

  watch: {
    dialog_a(val) {
      val || this.close_a();
    },
  },

  methods: {
    ...Vuex.mapActions(["GetLeads"]),
    ...Vuex.mapMutations(["SetAddress", "GetAddress"]),

    handleClick(value) {
      this.editItem_a(value);
    },

    async addAddress() {
      if (
        !this.street_address ||
        !this.country ||
        !this.state ||
        !this.city ||
        !this.zip_code ||
        !this.a_type
      )
        return alert("error en datos address");

      const street_address = this.street_address;
      const country = this.country;
      const state = this.state;
      const city = this.city;
      const zip_code = this.zip_code;
      const a_type = this.a_type;

      const todo = {
        street_address,
        country,
        state,
        city,
        zip_code,
        a_type,
      };
      this.list_addresslocal = this.listaddress;
      this.list_addresslocal = [...this.list_addresslocal, todo];
      await this.SetAddress(this.list_addresslocal);
      this.street_address = "";
      this.country = "";
      this.state = "";
      this.city = "";
      this.zip_code = "";
      this.a_type = "Work";
    },

    editItem_a(item) {
      this.list_addresslocal = this.listaddress;
      this.editedIndexAddress = this.listaddress.indexOf(item);
      this.editedItemLocalAddress = Object.assign({}, item);
      this.dialog_a = true;
    },

    deleteItem_a() {
      const lis = [];
      this.SetAddress(lis);
      const index = this.editedIndexAddress;
      confirm("Are you sure you want to delete this item?") &&
        this.list_addresslocal.splice(index, 1);
      this.close_a();
      this.SetAddress(this.list_addresslocal);
    },

    async saves_a() {
      Object.assign(
        this.list_addresslocal[this.editedIndexAddress],
        this.editedItemLocalAddress
      );
      this.SetAddress(this.list_addresslocal);
      this.close_a();
    },

    close_a() {
      this.dialog_a = false;
      this.$nextTick(() => {
        this.editedItemLocalAddress = Object.assign(
          {},
          this.defaultItemAddress
        );
        this.editedIndexAddress = -1;
      });
      console.log(this.listaddress);
    },
  },
};
</script>

<style scoped>
.v-card,
.v-card__text {
  padding: 0px;
}
.v-application--wrap {
  min-height: 0px;
}

.v-list--three-line .v-list-item,
.v-list-item--three-line {
  min-height: 0px;
}
.el-card__header {
  padding: 5px 5px !important;
}
.col-xl,
.col-xl-auto,
.col-xl-12,
.col-xl-11,
.col-xl-10,
.col-xl-9,
.col-xl-8,
.col-xl-7,
.col-xl-6,
.col-xl-5,
.col-xl-4,
.col-xl-3,
.col-xl-2,
.col-xl-1,
.col-lg,
.col-lg-auto,
.col-lg-12,
.col-lg-11,
.col-lg-10,
.col-lg-9,
.col-lg-8,
.col-lg-7,
.col-lg-6,
.col-lg-5,
.col-lg-4,
.col-lg-3,
.col-lg-2,
.col-lg-1,
.col-md,
.col-md-auto,
.col-md-12,
.col-md-11,
.col-md-10,
.col-md-9,
.col-md-8,
.col-md-7,
.col-md-6,
.col-md-5,
.col-md-4,
.col-md-3,
.col-md-2,
.col-md-1,
.col-sm,
.col-sm-auto,
.col-sm-12,
.col-sm-11,
.col-sm-10,
.col-sm-9,
.col-sm-8,
.col-sm-7,
.col-sm-6,
.col-sm-5,
.col-sm-4,
.col-sm-3,
.col-sm-2,
.col-sm-1,
.col,
.col-auto,
.col-12,
.col-11,
.col-10,
.col-9,
.col-8,
.col-7,
.col-6,
.col-5,
.col-4,
.col-3,
.col-2,
.col-1 {
  padding: 5px;
}
.v-list-item__content {
  padding: 5px 0;
}
</style>