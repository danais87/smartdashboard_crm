<template>
  <div>
    <v-dialog v-model="show">
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
            <v-btn color="green darken-1" text @click="deleteLeadItem">
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
      <v-card>
        <v-col>
          <br />
          <base-material-card>
            <template v-slot:heading>
              <v-row>
                <div class="display-2 font-weight-light">Customer Profile</div>
                <v-spacer></v-spacer>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="deleteItem()"
                ></el-button>
                <v-btn color="blanck darken-1" text @click="close"
                  >Cancel</v-btn
                >
                <v-btn color="blanck darken-1" text @click="save">Save</v-btn>
              </v-row>
            </template>
            <v-form>
              <v-container class="py-0">
                <v-row>
                  <v-col cols="12" md="2">
                    <v-text-field
                      v-model="item.name"
                      label="First Name"
                      class="purple-input"
                      autofocus
                    />
                  </v-col>

                  <v-col cols="12" md="2">
                    <v-text-field
                      v-model="item.last_name"
                      label="Last Name"
                      class="purple-input"
                    />
                  </v-col>

                  <v-col cols="12" md="2">
                    <v-text-field
                      v-model="item.jobTitle"
                      label="Job Title"
                      class="purple-input"
                    />
                  </v-col>

                  <v-col cols="12" md="2">
                    <v-text-field
                      v-model="item.levelAuthority"
                      label="Level Authority"
                      class="purple-input"
                    />
                  </v-col>

                  <v-col cols="12" md="2">
                    <v-text-field
                      v-model="item.numberEmployee"
                      label="Company Number Employee"
                      class="purple-input"
                    />
                  </v-col>
                  <v-col sm="6" md="6">
                    <DialogPhone v-model="showPhone"></DialogPhone>
                  </v-col>
                  <v-col sm="6" md="6">
                    <DialogEmail v-model="showEmail"></DialogEmail>
                  </v-col>
                  <v-col sm="12" md="12">
                    <DialogAddress v-model="showAddress"></DialogAddress>
                  </v-col>
                  <v-col class="d-flex" cols="12" sm="3" md="3">
                    <v-select
                      v-model="item.account"
                      :items="accounts"
                      label="Select Account"
                      item-text="smName"
                      item-value="smName"
                      outlined
                    ></v-select>
                  </v-col>
                  <v-col class="d-flex" cols="12" sm="2" md="2">
                    <v-select
                      v-model="item.leadStatus"
                      :items="leadStatus"
                      label="Contact Status"
                      item-text="description"
                      item-value="description"
                      outlined
                    ></v-select>
                  </v-col>
                  <v-col class="d-flex" cols="12" sm="2" md="2">
                    <v-select
                      v-model="item.seekingService"
                      :items="options_service"
                      label="Seeking Service"
                      item-text="label"
                      item-value="value"
                      outlined
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="2" md="2">
                    <v-select
                      v-model="item.businessType"
                      :items="businessType"
                      label="Industry Type"
                      item-text="description"
                      item-value="description"
                      outlined
                    ></v-select>
                  </v-col>
                  <v-col class="d-flex" cols="12" sm="3" md="3">
                    <v-select
                      v-model="item.acquisition"
                      :items="acquisitions"
                      label="Acquisition"
                      item-text="description"
                      item-value="description"
                      outlined
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-textarea
                      outlined
                      name="notes"
                      v-model="item.notes"
                      label="Notes"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </base-material-card>
        </v-col>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
import { API } from "aws-amplify";
import Vuex from "vuex";
import { createRecord, updateRecord } from "../../../graphql/mutations";
import { listSmartDash } from "../../../graphql/queries";
import DialogEmail from "../dialogs/DialogEmail";
import DialogPhone from "../dialogs/DialogPhone";
import DialogAddress from "../dialogs/DialogAddress";
import { uuid } from "vue-uuid";

export default {
  name: "Home",
  components: { DialogEmail, DialogAddress, DialogPhone },
  props: {
    value: Boolean,
    item: Object,
    itemcompare: Object,
    index: Number,
    call_type: String,
  },
  data() {
    return {
      phones_n: [],
      phones: [],
      apiRequest: false,
      showPhone: true,
      showEmail: true,
      showAddress: true,
      dialog_delete: false,
      dialog_conf_delete: false,

      options_service: [
        {
          value: "Y",
          label: "YES",
        },
        {
          value: "N",
          label: "NO",
        },
      ],

      options: [],
      editedIndex: -1,
    };
  },

  computed: {
    ...Vuex.mapState([
      "usuario",
      "organizationID",
      "leads",
      "lead",
      "listphone",
      "listemails",
      "listaddress",
      "accounts",
      "acquisitions",
      "leadStatus",
      "businessType",
    ]),

    show: {
      get() {
        return this.value;
      },
      set(values) {
        this.$emit("input", values);
      },
    },
  },

  created() {
    this.GetAccounts();
  },

  watch: {},

  methods: {
    ...Vuex.mapActions(["GetLeads", "GetCatalogs", "GetAccounts"]),
    ...Vuex.mapMutations(["SetLead", "SetPhone", "SetEmails", "SetAddress"]),

    async CULeads(item, index) {
      const loading = this.$loading({
        lock: true,
        text: "Contact...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.phones = [];
      this.phones = this.listphone;
      var names = [];
      var l = "";
      names.push({
        firstName: item.name,
        lastName: item.last_name,
        fullName: item.name + " " + item.last_name,
      });
      const PK = this.organizationID;
      const id = uuid.v1();
      const SK = "CUS#" + id;
      const GSP1PK1 = SK;
      const GSP1SK1 = "#META#" + id;
      const GSP4PK1 = this.organizationID;
      const GSP4SK1 = "CUS#" + new Date().toISOString().substr(0, 10);
      const entityType = "CUSTOMER";
      const createdAt = new Date().toISOString().substr(0, 10);
      const updateAt = new Date().toISOString().substr(0, 10);
      const createdBy = this.usuario;
      const active = "1";
      const account = item.account;
      const l_smName = JSON.stringify(names);
      const l_email = JSON.stringify(this.listemails);
      const l_smAddress = JSON.stringify(this.listaddress);
      const seekingService = item.seekingService;
      const acquisition = item.acquisition;
      const leadStatus = item.leadStatus;
      const notes = item.notes;
      const businessType = item.businessType;
      const jobTitle = item.jobTitle;
      const levelAuthority = item.levelAuthority;
      const numberEmployee = item.numberEmployee;

      if (!l_smName) return alert("error en datos incompletos leads");

      if (index > -1) {
        console.log("edit");
        this.ser_var = [];
        var list_e = "";
        for (let i = 0; i < this.listemails.length; i++) {
          list_e += JSON.stringify(this.listemails[i]) + ",";
        }
        var list_a = "";
        for (let i = 0; i < this.listaddress.length; i++) {
          list_a += JSON.stringify(this.listaddress[i]) + ",";
        }
        const l_smName = JSON.stringify(names[0]);
        const l_email = list_e.slice(0, -1);
        const l_smAddress = list_a.slice(0, -1);
        const SK = item.SK;
        const PK = this.organizationID;
        const id = item.id;
        const todo = {
          PK,
          id,
          SK,
          entityType,
          createdAt,
          updateAt,
          createdBy,
          active,
          l_smName,
          leadStatus,
          account,
          l_email,
          l_smAddress,
          seekingService,
          acquisition,
          notes,
          businessType,
          jobTitle,
          levelAuthority,
          numberEmployee,
        };
        console.log(todo);

        l = await API.graphql({
          query: updateRecord,
          variables: { input: todo },
        });
        await this.SetLead(l.data.updateRecord);

        try {
          for (let i = 0; i < this.phones.length; i++) {
            const PK = this.organizationID;
            const SK = "PHO#" + this.phones[i].phone;
            const GSP1PK1 = item.SK;
            const GSP1SK1 = SK;
            const entityType = "PHONENUMBER";
            const createdAt = new Date().toISOString().substr(0, 10);
            const updateAt = new Date().toISOString().substr(0, 10);
            const createdBy = this.usuario;
            const active = "1";
            const value = this.phones[i].phone;
            const type = this.phones[i].p_type;
            const customerName = item.name + " " + item.last_name;
            const todo = {
              PK,
              SK,
              GSP1PK1,
              GSP1SK1,
              entityType,
              createdAt,
              updateAt,
              createdBy,
              active,
              value,
              l_email,
              customerName,
              type,
            };

            await API.graphql({
              query: updateRecord,
              variables: { input: todo },
            });
          }
        } catch (error) {
          console.log("error update telefono");
          console.log(error);
        }
      } else {
        console.log("created");
        const todo = {
          PK,
          id,
          SK,
          GSP1PK1,
          GSP1SK1,
          GSP4PK1,
          GSP4SK1,
          entityType,
          createdAt,
          updateAt,
          createdBy,
          active,
          l_smName,
          leadStatus,
          account,
          l_email,
          l_smAddress,
          seekingService,
          acquisition,
          notes,
          businessType,
          jobTitle,
          levelAuthority,
          numberEmployee,
        };
        try {
          l = await API.graphql({
            query: createRecord,
            variables: { input: todo },
          });
          this.SetLead(l.data.createRecord);
        } catch (error) {
          console.log("error crear usuario");
          console.log(error);
        }

        try {
          for (let i = 0; i < this.phones.length; i++) {
            const PK = this.organizationID;
            const SK = "PHO#" + this.phones[i].phone;
            const GSP1PK1 = l.data.createRecord.SK;
            const GSP1SK1 = SK;
            const entityType = "PHONENUMBER";
            const createdAt = new Date().toISOString().substr(0, 10);
            const updateAt = new Date().toISOString().substr(0, 10);
            const createdBy = this.usuario;
            const active = "1";
            const value = this.phones[i].phone;
            const type = this.phones[i].p_type;
            const customerName = item.name + " " + item.last_name;
            const todo = {
              PK,
              SK,
              GSP1PK1,
              GSP1SK1,
              entityType,
              createdAt,
              updateAt,
              createdBy,
              active,
              value,
              customerName,
              l_email,
              type,
            };
            console.log(todo);
            await API.graphql({
              query: updateRecord,
              variables: { input: todo },
            });
          }
        } catch (error) {
          console.log("error crear telefono");
          console.log(error);
        }
      }
      loading.close();
      this.GetLeads();
    },

    close() {
      this.GetLeads();
      this.show = false;
    },

    async save() {
      await this.CULeads(this.item, this.index);
      this.close();
    },

    deleteItem() {
      this.dialog_delete = true;
    },

    async deleteLeadItem() {
      const loading = this.$loading({
        lock: true,
        text: "Delete Contact...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      const list = await API.graphql({
        query: listSmartDash,
        variables: {
          filter: {
            PK: {
              eq: this.item.SK,
            },
            SK: {
              eq: "QUO#",
            },
            indexs: {
              eq: "1",
            },
            active: {
              eq: "1",
            },
          },
        },
      });
      console.log(list.data.listSmartDash);
      if (list.data.listSmartDash.length == 0) {
        const PK = this.item.PK;
        const SK = this.item.SK;
        const updateAt = new Date().toISOString().substr(0, 10);
        const active = "0";
        const todo = {
          PK,
          SK,
          updateAt,
          active,
        };
        console.log(todo);
        await API.graphql({
          query: updateRecord,
          variables: { input: todo },
        });
        this.dialog_delete = false;
        this.show = false;
        loading.close();
      } else {
        this.dialog_conf_delete = true;
        this.dialog_delete = false;
        this.show = false;
        loading.close();
      }
      const lead = [];
      this.list_phone = [];
      this.list_email = [];
      this.list_address = [];
      this.SetPhone(this.list_phone);
      this.SetEmails(this.list_email);
      this.SetAddress(this.list_address);
      this.SetLead(lead);
      this.GetLeads();
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
@media {
  .container {
    max-width: 4000px;
  }
}
</style>