<template>
  <div>
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
          <v-btn color="green darken-1" text @click="deletePhoneItem">
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog_p" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Phone:</span>
          <v-spacer></v-spacer>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            circle
            @click="deleteItem_p()"
          ></el-button>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="4" md="4">
                <v-select
                  v-model="editedItemLocalPhone.p_type"
                  :items="options_phone"
                  label="Type"
                  item-text="label"
                  item-value="value"
                  disabled
                  dense
                  solo
                  default="Active"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="8" md="8">
                <vue-tel-input
                  disabled
                  v-model="editedItemLocalPhone.phone"
                  @onInput="onInput"
                  :valid-characters-only="true"
                  :preferredCountries="['us']"
                >
                </vue-tel-input>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close_p">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="saves_p">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Phones:</span>
      </div>
      <div class="text item">
        <v-row>
          <v-col cols="12" sm="4" md="4">
            <v-select
              v-model="p_type"
              :items="options_phone"
              label="Type"
              item-text="label"
              item-value="value"
              required
              dense
              solo
              default="Active"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <vue-tel-input
              v-model="telephone"
              :valid-characters-only="true"
              :preferredCountries="['us']"
            >
            </vue-tel-input>
          </v-col>
          <v-btn
            class="ma-2"
            outlined
            x-small
            fab
            color="indigo"
            @click="addPhone(phone)"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-col sm="12" md="12">
            <v-list-item
              three-line
              v-for="item in listphone"
              :key="item.id"
              @click="handleClick(item)"
            >
              <v-hover v-slot:default="{ hover }">
                <v-list-item-content>
                  <v-list-item-subtitle>
                    <v-expand-transition>
                      <v-overlay absolute :opacity="0.1" :value="hover">
                      </v-overlay>
                    </v-expand-transition>
                    {{ item.p_type }}: {{ item.phone }}
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
import { deletePhoneNumber } from "../../../graphql/mutations";
import { API } from "aws-amplify";
export default {
  name: "Home",
  components: {},

  data() {
    return {
      show: false,
      dialog_delete: false,
      p_type: "Work",
      telephone: "",
      country: "",
      phone: {
        number: "",
        valid: false,
        country: undefined,
      },
      hover: "",
      list_phonelocal: [],
      dialog_p: false,
      apiRequest: false,
      options_phone: [
        {
          value: "Work",
          label: "Work",
        },
        {
          value: "Home",
          label: "Home",
        },
        {
          value: "Mobile",
          label: "Mobile",
        },
        {
          value: "Other",
          label: "Other",
        },
      ],
      headers_f: [
        { text: "Type", align: "start", sortable: true, value: "p_type" },
        { text: "Phone", align: "start", sortable: true, value: "phone" },
      ],
      editedIndexPhone: -1,
      editedItemLocalPhone: {
        sk: "",
        phone: "",
        p_type: "Work",
      },
      defaultItemPhone: {
        sk: "",
        phone: "",
        p_type: "Work",
      },
    };
  },

  computed: {
    ...Vuex.mapState(["company", "leads", "listphone", "organizationID"]),
  },

  created() {
    //this.list_phonelocal = this.list_phone;
  },

  watch: {
    dialog_p(val) {
      val || this.close_p();
    },
  },

  methods: {
    ...Vuex.mapActions(["GetLeads"]),
    ...Vuex.mapMutations(["SetPhone", "GetPhone"]),

    handleClick(value) {
      this.editItem_p(value);
    },

    onInput({ number, valid, country }) {
      console.log(number);
      this.country = number.international;
      this.phone.number = number.international;
      this.phone.valid = valid;
      this.phone.country = country && country.name;
    },

    async addPhone() {
      console.log(this.telephone);
      const phone = this.telephone;
      const p_type = this.p_type;
      if (!phone || !p_type) return alert("error en datos phone");
      const todo = {
        phone,
        p_type,
      };
      this.list_phonelocal = this.listphone;
      this.list_phonelocal = [...this.list_phonelocal, todo];
      await this.SetPhone(this.list_phonelocal);

      this.phone = {};
      this.telephone = "";
      this.p_type = "Work";
      console.log(this.listphone);
    },

    editItem_p(item) {
      this.list_phonelocal = this.listphone;
      this.editedIndexPhone = this.listphone.indexOf(item);
      this.editedItemLocalPhone = Object.assign({}, item);
      this.dialog_p = true;
      console.log(this.editedItemLocalPhone);
    },

    deleteItem_p() {
      this.dialog_delete = true;
    },

    async deletePhoneItem() {
      const lis = [];
      this.SetPhone(lis);
      if (this.editedItemLocalPhone.sk) {
        const PK = this.organizationID;
        const SK = this.editedItemLocalPhone.sk;
        const todo = {
          PK,
          SK,
        };
        const a = await API.graphql({
          query: deletePhoneNumber,
          variables: { input: todo },
        });
        console.log(a);
      }
      const index = this.editedIndexPhone;
      this.list_phonelocal.splice(index, 1);
      this.close_p();
      await this.SetPhone(this.list_phonelocal);
      this.dialog_delete = false;
    },

    async saves_p() {
      Object.assign(
        this.list_phonelocal[this.editedIndexPhone],
        this.editedItemLocalPhone
      );
      this.SetPhone(this.list_phonelocal);
      this.close_p();
    },

    close_p() {
      this.dialog_p = false;
      this.$nextTick(() => {
        this.editedItemLocalPhone = Object.assign({}, this.defaultItemPhone);
        this.editedIndexPhone = -1;
      });
      this.phone = {};
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