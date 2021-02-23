<template>
  <div>
    <v-dialog v-model="dialog_e" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Emails:</span>
          <v-spacer></v-spacer>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            circle
            @click="deleteItem_e()"
          ></el-button>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="4" md="4">
                <v-select
                  v-model="editedItemLocalEmail.e_type"
                  :items="options_email"
                  label="Type"
                  item-text="label"
                  item-value="value"
                  required
                  dense
                  solo
                  default="Active"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="8" md="8">
                <v-text-field
                  v-model="editedItemLocalEmail.email"
                  label="Email"
                  :rules="emailRules"
                  autofocus
                  prepend-icon="mdi-email"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close_e">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="saves_e">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Emails:</span>
      </div>
      <div class="text item">
        <v-row>
          <v-col cols="12" sm="4" md="4">
            <v-select
              v-model="e_type"
              :items="options_email"
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
            <v-text-field
              v-model="email"
              label="Email"
              :rules="emailRules"
              prepend-icon="mdi-email"
            ></v-text-field>
          </v-col>
          <v-btn
            class="ma-2"
            outlined
            x-small
            fab
            color="indigo"
            @click="addEmail(email)"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-col sm="12" md="12">
            <v-list-item
              three-line
              v-for="item in listemails"
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
                    {{ item.e_type }}: {{ item.email }}
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
      emailRules: [(v) => /.+@.+\..+/.test(v) || "E-mail must be valid"],
      email: "",
      e_type: "Work",
      hover: "",
      list_emaillocal: [],
      dialog_e: false,
      apiRequest: false,
      options_email: [
        {
          value: "Work",
          label: "Work",
        },
        {
          value: "Personal",
          label: "Personal",
        },
        {
          value: "Other",
          label: "Other",
        },
      ],
      headers_m: [
        { text: "Type", align: "start", sortable: true, value: "e_type" },
        { text: "Email", align: "start", sortable: true, value: "email" },
      ],
      editedIndexEmail: -1,
      editedItemLocalEmail: {
        email: "Work",
        p_type: "",
      },
      defaultItemEmail: {
        email: "",
        p_type: "Work",
      },
    };
  },

  computed: {
    ...Vuex.mapState(["company", "leads", "listemails"]),
  },

  created() {
    //this.list_emaillocal = this.listemails;
  },

  watch: {
    dialog_e(val) {
      val || this.close_e();
    },
  },

  methods: {
    ...Vuex.mapActions(["GetLeads"]),
    ...Vuex.mapMutations(["SetEmails", "GetEmails"]),

    handleClick(value) {
      this.editItem_e(value);
    },

    async addEmail() {
      if (!this.email || !this.e_type) return alert("error en datos");

      const email = this.email;
      const e_type = this.e_type;
      const todo = {
        email,
        e_type,
      };
      this.list_emaillocal = this.listemails;
      this.list_emaillocal = [...this.list_emaillocal, todo];
      await this.SetEmails(this.list_emaillocal);

      this.email = "";
      this.e_type = "Work";
    },

    editItem_e(item) {
      this.list_emaillocal = this.listemails;
      this.editedIndexEmail = this.listemails.indexOf(item);
      this.editedItemLocalEmail = item;
      this.dialog_e = true;
    },

    deleteItem_e() {
      const lis = [];
      this.SetEmails(lis);
      const index = this.editedIndexEmail;
      confirm("Are you sure you want to delete this item?") &&
        this.list_emaillocal.splice(index, 1);
      this.close_e();
      this.SetEmails(this.list_emaillocal);
    },

    async saves_e() {
      Object.assign(
        this.list_emaillocal[this.editedIndexEmail],
        this.editedItemLocalEmail
      );
      this.SetEmails(this.list_emaillocal);
      this.close_e();
    },

    close_e() {
      this.dialog_e = false;
      this.$nextTick(() => {
        this.editedItemLocalEmail = Object.assign({}, this.defaultItemEmail);
        this.editedIndexEmail = -1;
      });
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