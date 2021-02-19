<template>
  <div>
    <v-dialog v-model="dialog_deleteTeam" max-width="400">
      <v-card>
        <v-card-title class="headline">
          Are you sure you want to delete this item?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog_deleteTeam = false">
            Cancel
          </v-btn>
          <v-btn color="green darken-1" text @click="deleteItemTeam()">
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog_deleteAcc" max-width="400">
      <v-card>
        <v-card-title class="headline">
          Are you sure you want to delete this item?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog_deleteAcc = false">
            Cancel
          </v-btn>
          <v-btn color="green darken-1" text @click="deleteItemAccount()">
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog_deleteST" max-width="400">
      <v-card>
        <v-card-title class="headline">
          Are you sure you want to delete this item?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog_deleteST = false">
            Cancel
          </v-btn>
          <v-btn color="green darken-1" text @click="deleteItemST()">
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog_deleteDis" max-width="400">
      <v-card>
        <v-card-title class="headline">
          Are you sure you want to delete this item?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog_deleteDis = false">
            Cancel
          </v-btn>
          <v-btn color="green darken-1" text @click="deleteItemDis()">
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog_deleteTask" max-width="400">
      <v-card>
        <v-card-title class="headline">
          Are you sure you want to delete this item?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog_deleteTask = false">
            Cancel
          </v-btn>
          <v-btn color="green darken-1" text @click="deleteItemTaskStatus()">
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog_deletePay" max-width="400">
      <v-card>
        <v-card-title class="headline">
          Are you sure you want to delete this item?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog_deletePay = false">
            Cancel
          </v-btn>
          <v-btn color="green darken-1" text @click="deleteItemPayment()">
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog_deleteAcqui" max-width="400">
      <v-card>
        <v-card-title class="headline">
          Are you sure you want to delete this item?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialog_deleteAcqui = false"
          >
            Cancel
          </v-btn>
          <v-btn color="green darken-1" text @click="deleteItemAcquisition()">
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog_deleteLeads" max-width="400">
      <v-card>
        <v-card-title class="headline">
          Are you sure you want to delete this item?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialog_deleteLeads = false"
          >
            Cancel
          </v-btn>
          <v-btn color="green darken-1" text @click="deleteItemLeadsStatus()">
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog_deleteLib" max-width="400">
      <v-card>
        <v-card-title class="headline">
          Are you sure you want to delete this item?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog_deleteLib = false">
            Cancel
          </v-btn>
          <v-btn color="green darken-1" text @click="deleteItemQuoteLibrary()">
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog_deleteQuo" max-width="400">
      <v-card>
        <v-card-title class="headline">
          Are you sure you want to delete this item?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog_deleteQuo = false">
            Cancel
          </v-btn>
          <v-btn color="green darken-1" text @click="deleteItemQuoteStatus()">
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog_deleteBT" max-width="400">
      <v-card>
        <v-card-title class="headline">
          Are you sure you want to delete this item?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog_deleteBT = false">
            Cancel
          </v-btn>
          <v-btn color="green darken-1" text @click="deleteItemBusinessType()">
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog_deleteMarketing" max-width="400">
      <v-card>
        <v-card-title class="headline">
          Are you sure you want to delete this item?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialog_deleteMarketing = false"
          >
            Cancel
          </v-btn>
          <v-btn color="green darken-1" text @click="deleteItemInvest()">
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
            Close
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
                        v-model="editedItemInvest.description"
                        label="Campaing Name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="2" md="2">
                      <v-text-field
                        v-model="editedItemInvest.price"
                        label="Amount"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="3" md="3">
                      <v-text-field
                        v-model="editedItemInvest.startDate"
                        label="Date(YYYY-MM-DD)"
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4" sm="3" md="3">
                      <v-select
                        v-model="editedItemInvest.productType"
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
                <v-btn color="blue darken-1" text @click="closeInvest"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="saveInvest"
                  >Save</v-btn
                >
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
          @click="editItemInvestment(item)"
        ></el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          circle
          size="mini"
          @click="deleteItemMarketing(item)"
        ></el-button>
      </template>
    </v-data-table>
    <br />
    <v-data-table
      :headers="headers_team"
      :items="teams"
      sort-by="teamName"
      class="elevation-1"
      :search="search_team"
      :items-per-page="5"
    >
      <template v-slot:[`item.status`]="{ item }">
        <v-chip :color="getColor(item.status)" dark small
          >{{ item.status }}
        </v-chip>
      </template>
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Team</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search_team"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog_team" max-width="800px">
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
                <span class="headline">Team</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        v-model="editedItemTeam.teamName"
                        label="Name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        v-model="editedItemTeam.teamEmail"
                        label="Email"
                        prepend-icon="mdi-email"
                      ></v-text-field>
                    </v-col>
                    <br />
                    <v-col class="d-flex" cols="12" sm="3" md="3">
                      <v-select
                        v-model="editedItemTeam.status"
                        :items="options_status"
                        label="Status"
                        item-text="label"
                        item-value="value"
                        required
                        dense
                        solo
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeTeam"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="saveTeam">Save</v-btn>
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
          @click="editItemTeam(item)"
        ></el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          circle
          size="mini"
          @click="deleteItemT(item)"
        ></el-button>
      </template>
    </v-data-table>
    <br />
    <v-data-table
      :headers="headers_account"
      :items="accounts"
      sort-by="smName"
      class="elevation-1"
      :search="search_account"
      :items-per-page="5"
    >
      <template v-slot:[`item.status`]="{ item }">
        <v-chip :color="getColor(item.status)" dark small
          >{{ item.status }}
        </v-chip>
      </template>
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Accounts</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search_account"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog_account" max-width="800px">
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
                <span class="headline">Account</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItemAccount.smName"
                        label="Name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItemAccount.website"
                        label="WebSite"
                        prepend-icon="mdi-web"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="editedItemAccount.smAddress"
                        label="Address"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeAccount"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="saveAccount"
                  >Save</v-btn
                >
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
          @click="editItemAccount(item)"
        ></el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          circle
          size="mini"
          @click="deleteItemAcc(item)"
        ></el-button>
      </template>
    </v-data-table>
    <br />
    <v-data-table
      :headers="headers_stype"
      :items="serviceTypes"
      sort-by="name"
      class="elevation-1"
      :search="search_stype"
      :items-per-page="5"
    >
      <template v-slot:[`item.status`]="{ item }">
        <v-chip :color="getColor(item.status)" dark small
          >{{ item.status }}
        </v-chip>
      </template>
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Product Type</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search_stype"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog_stype" max-width="800px">
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
                <span class="headline">Service Type</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        v-model="editedItemStype.name"
                        label="Name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        v-model="editedItemStype.description"
                        label="Description"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="2" md="2">
                      <v-text-field
                        v-model="editedItemStype.abbreviation"
                        label="Abbreviation"
                      ></v-text-field>
                    </v-col>
                    <v-col class="d-flex" cols="12" sm="3" md="3">
                      <v-select
                        v-model="editedItemStype.status"
                        :items="options_status"
                        label="Status"
                        item-text="label"
                        item-value="value"
                        required
                        dense
                        solo
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeStype"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="saveStype"
                  >Save</v-btn
                >
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
          @click="editItemStype(item)"
        ></el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          circle
          size="mini"
          @click="deleteItemStype(item)"
        ></el-button>
      </template>
    </v-data-table>
    <br />
    <v-data-table
      :headers="headers_discount"
      :items="discounts"
      sort-by="discount_name"
      class="elevation-1"
      :search="search_discount"
      :items-per-page="5"
    >
      <template v-slot:[`item.status`]="{ item }">
        <v-chip :color="getColor(item.status)" dark small
          >{{ item.status }}
        </v-chip>
      </template>
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Discounts</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search_discount"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog_discount" max-width="800px">
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
                <span class="headline">Discount</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="2" md="2">
                      <v-text-field
                        v-model="editedItemDiscount.discount_code"
                        label="Code"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        v-model="editedItemDiscount.discount_name"
                        label="Name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        v-model="editedItemDiscount.discount_desc"
                        label="Description"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        v-model="editedItemDiscount.discount_value"
                        label="Value"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="editedItemDiscount.valid_from"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="editedItemDiscount.valid_from"
                            label="Valid From"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="editedItemDiscount.valid_from"
                          no-title
                          scrollable
                        >
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="menu = false">
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="
                              $refs.menu.save(editedItemDiscount.valid_from)
                            "
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-menu
                        ref="menu1"
                        v-model="menu1"
                        :close-on-content-click="false"
                        :return-value.sync="editedItemDiscount.valid_to"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="editedItemDiscount.valid_to"
                            label="Valid To"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="editedItemDiscount.valid_to"
                          no-title
                          scrollable
                        >
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="menu1 = false">
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="
                              $refs.menu1.save(editedItemDiscount.valid_to)
                            "
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-select
                        v-model="editedItemDiscount.discount_type"
                        :items="options_dtype"
                        label="Type"
                        item-text="label"
                        item-value="value"
                        required
                        dense
                        solo
                      ></v-select>
                    </v-col>
                    <v-col class="d-flex" cols="12" sm="3" md="3">
                      <v-select
                        v-model="editedItemDiscount.status"
                        :items="options_status"
                        label="Status"
                        item-text="label"
                        item-value="value"
                        required
                        dense
                        solo
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDiscount"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="saveDiscount"
                  >Save</v-btn
                >
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
          @click="editItemDiscount(item)"
        ></el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          circle
          size="mini"
          @click="deleteItemDiscount(item)"
        ></el-button>
      </template>
    </v-data-table>
    <br />
    <v-data-table
      :headers="headers_payment"
      :items="payments"
      sort-by="description"
      class="elevation-1"
      :search="search_pay"
      :items-per-page="5"
    >
      <template v-slot:[`item.status`]="{ item }">
        <v-chip :color="getColor(item.status)" dark small
          >{{ item.status }}
        </v-chip>
      </template>
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Payment Method</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search_pay"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog_payment" max-width="800px">
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
                <span class="headline">Payment Method</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        v-model="editedItemPayment.description"
                        label="Descripcion"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="2" md="2">
                      <v-text-field
                        v-model="editedItemPayment.abbreviation"
                        label="Abbreviation"
                      ></v-text-field>
                    </v-col>
                    <v-col class="d-flex" cols="12" sm="3" md="3">
                      <v-select
                        v-model="editedItemPayment.status"
                        :items="options_status"
                        label="Status"
                        item-text="label"
                        item-value="value"
                        required
                        dense
                        solo
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closePaymentM"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="savePaymentM"
                  >Save</v-btn
                >
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
          @click="editItemPaymentM(item)"
        ></el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          circle
          size="mini"
          @click="deleteItemPay(item)"
        ></el-button>
      </template>
    </v-data-table>
    <br />
    <v-data-table
      :headers="headers_acquisition"
      :items="acquisitions"
      sort-by="description"
      class="elevation-1"
      :search="search_acq"
      :items-per-page="5"
    >
      <template v-slot:[`item.status`]="{ item }">
        <v-chip :color="getColor(item.status)" dark small
          >{{ item.status }}
        </v-chip>
      </template>
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Acquisitions</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search_acq"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog_acquisition" max-width="800px">
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
                <span class="headline">Acquisitions</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        v-model="editedItemAcquisition.description"
                        label="Descripcion"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="2" md="2">
                      <v-text-field
                        v-model="editedItemAcquisition.abbreviation"
                        label="Abbreviation"
                      ></v-text-field>
                    </v-col>
                    <v-col class="d-flex" cols="12" sm="3" md="3">
                      <v-select
                        v-model="editedItemAcquisition.status"
                        :items="options_status"
                        label="Status"
                        item-text="label"
                        item-value="value"
                        required
                        dense
                        solo
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeAcquisition"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="saveAcquisition"
                  >Save</v-btn
                >
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
          @click="editItemAcquisition(item)"
        ></el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          circle
          size="mini"
          @click="deleteItemAcqui(item)"
        ></el-button>
      </template>
    </v-data-table>
    <br />
    <v-data-table
      :headers="headers_task"
      :items="taskStatus"
      sort-by="description"
      class="elevation-1"
      :search="search_task"
      :items-per-page="5"
    >
      <template v-slot:[`item.status`]="{ item }">
        <v-chip :color="getColor(item.status)" dark small
          >{{ item.status }}
        </v-chip>
      </template>
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Task Status</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search_task"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog_task" max-width="800px">
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
                <span class="headline">Task Status</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        v-model="editedItemTask.description"
                        label="Descripcion"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="2" md="2">
                      <v-text-field
                        v-model="editedItemTask.abbreviation"
                        label="Abbreviation"
                      ></v-text-field>
                    </v-col>
                    <v-col class="d-flex" cols="12" sm="3" md="3">
                      <v-select
                        v-model="editedItemTask.status"
                        :items="options_status"
                        label="Status"
                        item-text="label"
                        item-value="value"
                        required
                        dense
                        solo
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeTask"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="saveTask">Save</v-btn>
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
          @click="editItemTask(item)"
        ></el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          circle
          size="mini"
          @click="deleteItemTask(item)"
        ></el-button>
      </template>
    </v-data-table>
    <br />
    <v-data-table
      :headers="headers_leads"
      :items="leadStatus"
      sort-by="description"
      class="elevation-1"
      :search="search_leads"
      :items-per-page="5"
    >
      <template v-slot:[`item.status`]="{ item }">
        <v-chip :color="getColor(item.status)" dark small
          >{{ item.status }}
        </v-chip>
      </template>
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Leads Status</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search_leads"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog_leads" max-width="800px">
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
                <span class="headline">Leads Status</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        v-model="editedItemLeads.description"
                        label="Descripcion"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="2" md="2">
                      <v-text-field
                        v-model="editedItemLeads.abbreviation"
                        label="Abbreviation"
                      ></v-text-field>
                    </v-col>
                    <v-col class="d-flex" cols="12" sm="3" md="3">
                      <v-select
                        v-model="editedItemLeads.status"
                        :items="options_status"
                        label="Status"
                        item-text="label"
                        item-value="value"
                        required
                        dense
                        solo
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeLeadsStatus"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="saveLeadsStatus"
                  >Save</v-btn
                >
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
          @click="editItemLeads(item)"
        ></el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          circle
          size="mini"
          @click="deleteItemLeads(item)"
        ></el-button>
      </template>
    </v-data-table>
    <br />
    <v-data-table
      :headers="headers_library"
      :items="librarys"
      sort-by="name"
      class="elevation-1"
      :search="search_library"
      :items-per-page="5"
    >
      <template v-slot:[`item.status`]="{ item }">
        <v-chip :color="getColor(item.status)" dark small
          >{{ item.status }}
        </v-chip>
      </template>
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Librarys</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search_library"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog_library" max-width="800px">
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
                <span class="headline">Librarys</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="2" md="2">
                      <v-text-field
                        v-model="editedItemLibrary.abbreviation"
                        label="Abbreviation"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        v-model="editedItemLibrary.title"
                        label="Title"
                      ></v-text-field>
                    </v-col>
                    <v-col class="d-flex" cols="12" sm="3" md="3">
                      <v-select
                        v-model="editedItemLibrary.status"
                        :items="options_status"
                        label="Status"
                        item-text="label"
                        item-value="value"
                        required
                        dense
                        solo
                      ></v-select>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea
                        outlined
                        name="description"
                        v-model="editedItemLibrary.description"
                        label="Descripcion:"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeLibrary"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="saveLibrary"
                  >Save</v-btn
                >
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
          @click="editItemLibrary(item)"
        ></el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          circle
          size="mini"
          @click="deleteItemLibrary(item)"
        ></el-button>
      </template>
    </v-data-table>
    <br />
    <v-data-table
      :headers="headers_quote"
      :items="quoteStatus"
      sort-by="name"
      class="elevation-1"
      :search="search_quote"
      :items-per-page="5"
    >
      <template v-slot:[`item.status`]="{ item }">
        <v-chip :color="getColor(item.status)" dark small
          >{{ item.status }}
        </v-chip>
      </template>
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Quote Status</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search_quote"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog_quote" max-width="800px">
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
                <span class="headline">Quote Status</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="2" md="2">
                      <v-text-field
                        v-model="editedItemQuote.abbreviation"
                        label="Abbreviation"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        v-model="editedItemQuote.description"
                        label="Descripcion"
                      ></v-text-field>
                    </v-col>
                    <v-col class="d-flex" cols="12" sm="3" md="3">
                      <v-select
                        v-model="editedItemQuote.status"
                        :items="options_status"
                        label="Status"
                        item-text="label"
                        item-value="value"
                        required
                        dense
                        solo
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeQuote"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="saveQuote"
                  >Save</v-btn
                >
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
          @click="editItemQuote(item)"
        ></el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          circle
          size="mini"
          @click="deleteItemQuote(item)"
        ></el-button>
      </template>
    </v-data-table>
    <br />
    <v-data-table
      :headers="headers_bt"
      :items="businessType"
      sort-by="name"
      class="elevation-1"
      :search="search_bt"
      :items-per-page="5"
    >
      <template v-slot:[`item.status`]="{ item }">
        <v-chip :color="getColor(item.status)" dark small
          >{{ item.status }}
        </v-chip>
      </template>
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Industry Type</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search_bt"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog_bt" max-width="800px">
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
                <span class="headline">Industry Type</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="2" md="2">
                      <v-text-field
                        v-model="editedItemBT.abbreviation"
                        label="Abbreviation"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        v-model="editedItemBT.description"
                        label="Descripcion"
                      ></v-text-field>
                    </v-col>
                    <v-col class="d-flex" cols="12" sm="3" md="3">
                      <v-select
                        v-model="editedItemBT.status"
                        :items="options_status"
                        label="Status"
                        item-text="label"
                        item-value="value"
                        required
                        dense
                        solo
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeBusinessType"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="saveBusinessType"
                  >Save</v-btn
                >
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
          @click="editItemBusinessType(item)"
        ></el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          circle
          size="mini"
          @click="deleteItemBT(item)"
        ></el-button>
      </template>
    </v-data-table>
    <br />
  </div>
</template>


<script>
import { API } from "aws-amplify";
import { createRecord, updateRecord } from "../../../graphql/mutations";
import {
  listAccounts,
  listInvestment,
  listSmartDash,
} from "../../../graphql/queries";
import Vuex from "vuex";
import { uuid } from "vue-uuid";

export default {
  name: "SettingList",
  components: {},
  data: () => ({
    dialog_conf_delete: false,
    dialog_deleteTeam: false,
    dialog_deleteAcc: false,
    dialog_deleteST: false,
    dialog_deleteDis: false,
    dialog_deleteTask: false,
    dialog_deleteAcqui: false,
    dialog_deletePay: false,
    dialog_deleteLeads: false,
    dialog_deleteLib: false,
    dialog_deleteQuo: false,
    dialog_deleteBT: false,
    dialog_deleteMarketing: false,
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
    date1: new Date().toISOString().substr(0, 10),
    menu1: false,
    modal1: false,
    company_id: "",
    search_team: "",
    search_account: "",
    search_stype: "",
    search_discount: "",
    search_pay: "",
    search_acq: "",
    search_task: "",
    search_leads: "",
    search_library: "",
    search_quote: "",
    search_bt: "",
    search_invest: "",
    show: false,
    accounts: [],
    investment: [],
    dialog_team: false,
    dialog_account: false,
    dialog_stype: false,
    dialog_discount: false,
    dialog_task: false,
    dialog_payment: false,
    dialog_acquisition: false,
    dialog_leads: false,
    dialog_library: false,
    dialog_quote: false,
    dialog_bt: false,
    dialog_invest: false,
    apiRequest: false,
    options_status: [
      {
        value: "A",
        label: "Active",
      },
      {
        value: "I",
        label: "Inactive",
      },
    ],
    options_dtype: [
      {
        value: "P",
        label: "Percentage",
      },
      {
        value: "F",
        label: "Amount",
      },
    ],
    headers_invest: [
      {
        text: "Campaings Name",
        align: "start",
        sortable: true,
        value: "description",
      },
      { text: "Amount", align: "start", sortable: true, value: "price" },
      { text: "Product Type", align: "start", sortable: true, value: "productType" },
      { text: "Date", align: "start", sortable: true, value: "startDate" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    headers_team: [
      { text: "Name", align: "start", sortable: true, value: "teamName" },
      { text: "Email", align: "start", sortable: true, value: "teamEmail" },
      { text: "Status", align: "start", sortable: true, value: "status" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    headers_account: [
      { text: "Name", align: "start", sortable: true, value: "smName" },
      { text: "WebSite", align: "start", sortable: true, value: "website" },
      { text: "Address", align: "start", sortable: true, value: "smAddress" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    headers_stype: [
      { text: "Name", align: "start", sortable: true, value: "name" },
      {
        text: "Description",
        align: "start",
        sortable: true,
        value: "description",
      },
      { text: "Status", align: "start", sortable: true, value: "status" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    headers_discount: [
      { text: "Name", align: "start", sortable: true, value: "discount_name" },
      {
        text: "Description",
        align: "start",
        sortable: true,
        value: "discount_desc",
      },
      {
        text: "Value",
        align: "start",
        sortable: true,
        value: "discount_value",
      },
      { text: "Status", align: "start", sortable: true, value: "status" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    headers_payment: [
      {
        text: "Descripcion",
        align: "start",
        sortable: true,
        value: "description",
      },
      {
        text: "Abbreviation",
        align: "start",
        sortable: true,
        value: "abbreviation",
      },
      { text: "Status", align: "start", sortable: true, value: "status" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    headers_acquisition: [
      {
        text: "Description",
        align: "start",
        sortable: true,
        value: "description",
      },
      {
        text: "Abbreviation",
        align: "start",
        sortable: true,
        value: "abbreviation",
      },
      { text: "Status", align: "start", sortable: true, value: "status" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    headers_task: [
      {
        text: "Description",
        align: "start",
        sortable: true,
        value: "description",
      },
      {
        text: "Abbreviation",
        align: "start",
        sortable: true,
        value: "abbreviation",
      },
      { text: "Status", align: "start", sortable: true, value: "status" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    headers_leads: [
      {
        text: "Description",
        align: "start",
        sortable: true,
        value: "description",
      },
      {
        text: "Abbreviation",
        align: "start",
        sortable: true,
        value: "abbreviation",
      },
      { text: "Status", align: "start", sortable: true, value: "status" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    headers_library: [
      {
        text: "Title",
        align: "start",
        sortable: true,
        value: "title",
      },
      {
        text: "Abbreviation",
        align: "start",
        sortable: true,
        value: "abbreviation",
      },
      { text: "Status", align: "start", sortable: true, value: "status" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    headers_quote: [
      {
        text: "Description",
        align: "start",
        sortable: true,
        value: "description",
      },
      {
        text: "Abbreviation",
        align: "start",
        sortable: true,
        value: "abbreviation",
      },
      { text: "Status", align: "start", sortable: true, value: "status" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    headers_bt: [
      {
        text: "Description",
        align: "start",
        sortable: true,
        value: "description",
      },
      {
        text: "Abbreviation",
        align: "start",
        sortable: true,
        value: "abbreviation",
      },
      { text: "Status", align: "start", sortable: true, value: "status" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    editedIndexTeam: -1,
    editedIndexAccount: -1,
    editedIndexStype: -1,
    editedIndexDiscount: -1,
    editedIndexPayment: -1,
    editedIndexAcquisition: -1,
    editedIndexTask: -1,
    editedIndexLeads: -1,
    editedIndexLibrary: -1,
    editedIndexQuote: -1,
    editedIndexBusinessType: -1,
    editedIndexInvest: -1,
    editedItemPayment: { status: "A" },
    defaultItemPayment: { status: "A" },
    editedItemAcquisition: { status: "A" },
    defaultItemAcquisition: { status: "A" },
    editedItemTask: { status: "A" },
    defaultItemTask: { status: "A" },
    editedItemLeads: { status: "A" },
    defaultItemLeads: { status: "A" },
    editedItemTeam: {
      id: "",
      name: "",
      email: "",
      status: "A",
    },
    defaultItemTeam: {
      id: "",
      name: "",
      email: "",
      status: "A",
    },
    editedItemInvest: {
      id: "",
      price: 0,
      startDate: "",
      description: "",
      productType:"",
    },
    defaultItemInvest: {
      id: "",
      price: 0,
      startDate: "",
      description: "",
      productType:"",
    },
    editedItemAccount: {
      id: "",
      name: "",
      address: "",
      website: "",
      status: "A",
    },
    defaultItemAccount: {
      id: "",
      name: "",
      address: "",
      website: "",
      status: "A",
    },
    editedItemStype: {
      id: "",
      name: "",
      description: "",
      abbreviation: "",
      status: "A",
    },
    defaultItemStype: {
      id: "",
      name: "",
      description: "",
      abbreviation: "",
      status: "A",
    },
    editedItemBT: {
      id: "",
      name: "",
      description: "",
      abbreviation: "",
      status: "A",
    },
    defaultItemBT: {
      id: "",
      name: "",
      description: "",
      abbreviation: "",
      status: "A",
    },
    editedItemDiscount: {
      id: "",
      discount_code: "",
      discount_name: "",
      discount_desc: "",
      discount_type: "",
      discount_value: "",
      valid_from: "",
      valid_to: "",
      status: "A",
    },
    defaultItemDiscount: {
      id: "",
      discount_code: "",
      discount_name: "",
      discount_desc: "",
      discount_type: "",
      discount_value: "",
      valid_from: "",
      valid_to: "",
      status: "A",
    },
    editedItemLibrary: {
      abbreviation: "",
      title: "",
      description: "",
      status: "A",
    },
    defaultItemLibrary: {
      abbreviation: "",
      title: "",
      description: "",
      status: "A",
    },
    editedItemQuote: {
      description: "",
      abbreviation: "",
      status: "A",
    },
    defaultItemQuote: {
      description: "",
      abbreviation: "",
      status: "A",
    },
  }),
  computed: {
    ...Vuex.mapState([
      "usuario",
      "organizationID",
      "leads",
      "teams",
      "serviceTypes",
      "discounts",
      "acquisitions",
      "taskStatus",
      "payments",
      "leadStatus",
      "librarys",
      "quoteStatus",
      "organization",
      "businessType",
    ]),
  },

  watch: {
    dialog_account(val) {
      val || this.closeAccount();
    },
    dialog_team(val) {
      val || this.closeTeam();
    },
    dialog_stype(val) {
      val || this.closeStype();
    },
    dialog_discount(val) {
      val || this.closeDiscount();
    },
    dialog_payment(val) {
      val || this.closePaymentM();
    },
    dialog_acquisition(val) {
      val || this.closeAcquisition();
    },
    dialog_task(val) {
      val || this.closeTask();
    },
    dialog_leads(val) {
      val || this.closeLeadsStatus();
    },
    dialog_library(val) {
      val || this.closeLibrary();
    },
    dialog_quote(val) {
      val || this.closeQuote();
    },
    dialog_invest(val) {
      val || this.closeInvest();
    },
  },

  created() {
    this.GetCatalogs();
    this.getAccounts();
    this.getInvestment();
  },

  methods: {
    ...Vuex.mapActions(["GetCatalogs"]),

    //MARKETING INVEST
    async getInvestment() {
      const todos = await API.graphql({
        query: listInvestment,
        variables: {
          filter: {
            PK: {
              eq: this.organizationID,
            },
            SK: {
              eq: "CPG#",
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
      console.log(todos);
      this.investment = todos.data.listInvestment;
    },

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

      if (!price || !startDate || !description ) return alert("error en datos");

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
        productType
      };
      await API.graphql({
        query: createRecord,
        variables: { input: todo },
      });
      this.getInvestment();
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
        productType
      };

      await API.graphql({
        query: updateRecord,
        variables: { input: todo },
      });
      loading.close();
      this.getInvestment();
    },

    editItemInvestment(item) {
      console.log(item);
      this.editedIndexInvest = this.investment.indexOf(item);
      this.editedItemInvest = Object.assign({}, item);
      this.dialog_invest = true;
    },

    deleteItemMarketing(item) {
      this.editedItemInvest = Object.assign({}, item);
      this.dialog_deleteMarketing = true;
    },

    async deleteItemInvest() {
      const loading = this.$loading({
        lock: true,
        text: "Delete Investment",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      console.log(this.editedItemInvest);
      const index = this.investment.indexOf(this.editedItemInvest);
      this.investment.splice(index, 1);
      console.log(this.investment);

      const SK = this.editedItemInvest.SK;
      const PK = this.editedItemInvest.PK;
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
      this.dialog_deleteMarketing = false;
      console.log(this.investment);
      loading.close();
      this.getInvestment();
    },

    closeInvest() {
      this.$nextTick(() => {
        this.editedItemInvest = Object.assign({}, this.defaultItemInvest);
        this.editedIndexInvest = -1;
      });
      this.dialog_invest = false;
    },

    async saveInvest() {
      if (this.editedIndexInvest > -1) {
        console.log("edit");
        await this.updateInvestment(this.editedItemInvest);
        console.log(this.editedItemInvest);
        this.closeInvest();
      } else {
        console.log("crear");
        this.createInvestment(this.editedItemInvest);
        this.closeInvest();
      }
    },

    //TEAM
    async createTeam(item) {
      var list_t = [];
      var li_team = "";
      const teamName = item.teamName;
      const teamEmail = item.teamEmail;
      const status = item.status;
      if (!teamName || !teamEmail) return alert("error en datos");

      const todo = {
        teamName,
        teamEmail,
        status,
      };
      list_t = [...this.teams, todo];
      console.log(list_t);

      for (let i = 0; i < list_t.length; i++) {
        li_team += JSON.stringify(list_t[i]) + ",";
      }
      console.log(l_team);
      const SK = this.organization.SK;
      const PK = this.organization.PK;
      const updateAt = new Date().toISOString().substr(0, 10);
      const l_team = li_team.slice(0, -1);

      const org = {
        SK,
        PK,
        updateAt,
        l_team,
      };

      await API.graphql({
        query: updateRecord,
        variables: { input: org },
      });
      this.GetCatalogs();
    },

    async updateTeam(item) {
      const teamName = item.teamName;
      const teamEmail = item.teamEmail;
      const status = item.status;
      if (!teamName || !teamEmail) return alert("error en datos");

      const todo = {
        teamName,
        teamEmail,
        status,
      };

      Object.assign(this.teams[this.editedIndexTeam], todo);
      console.log(this.teams);

      var li_team = "";
      for (let i = 0; i < this.teams.length; i++) {
        li_team += JSON.stringify(this.teams[i]) + ",";
      }
      const SK = this.organization.SK;
      const PK = this.organization.PK;
      const updateAt = new Date().toISOString().substr(0, 10);
      const l_team = li_team.slice(0, -1);

      const org = {
        SK,
        PK,
        updateAt,
        l_team,
      };

      await API.graphql({
        query: updateRecord,
        variables: { input: org },
      });
      this.GetCatalogs();
    },

    editItemTeam(item) {
      this.editedIndexTeam = this.teams.indexOf(item);
      this.editedItemTeam = Object.assign({}, item);
      this.dialog_team = true;
    },

    deleteItemT(item) {
      this.editedItemTeam = Object.assign({}, item);
      this.dialog_deleteTeam = true;
    },

    async deleteItemTeam() {
      const loading = this.$loading({
        lock: true,
        text: "Delete Team Member",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      const index = this.teams.indexOf(this.editedItemTeam);
      this.teams.splice(index, 1);
      console.log(this.teams);
      var li_team = "";
      for (let i = 0; i < this.teams.length; i++) {
        li_team += JSON.stringify(this.teams[i]) + ",";
      }
      const list = await API.graphql({
        query: listSmartDash,
        variables: {
          filter: {
            PK: {
              eq: this.editedItemTeam.teamName,
            },
            SK: {
              eq: "#",
            },
            indexs: {
              eq: "3",
            },
            active: {
              eq: "1",
            },
          },
        },
      });
      console.log(list.data.listSmartDash.length);
      if (list.data.listSmartDash.length == 0) {
        const SK = this.organization.SK;
        const PK = this.organization.PK;
        const updateAt = new Date().toISOString().substr(0, 10);
        const l_team = li_team.slice(0, -1);
        const todo = {
          SK,
          PK,
          l_team,
          updateAt,
        };
        await API.graphql({
          query: updateRecord,
          variables: { input: todo },
        });
        this.dialog_deleteTeam = false;
        this.dialog = false;
        console.log(this.teams);
        loading.close();
      } else {
        this.dialog_conf_delete = true;
        this.dialog_deleteTeam = false;
        this.dialog = false;
        console.log(this.teams);
        loading.close();
      }
      this.GetCatalogs();
    },

    closeTeam() {
      this.$nextTick(() => {
        this.editedItemTeam = Object.assign({}, this.defaultItemTeam);
        this.editedIndexTeam = -1;
      });
      this.dialog_team = false;
    },

    async saveTeam() {
      if (this.editedIndexTeam > -1) {
        console.log("edit");
        await this.updateTeam(this.editedItemTeam);
        //Object.assign(this.teams[this.editedIndexTeam], this.editedItemTeam);
        this.closeTeam();
      } else {
        console.log("crear");
        this.createTeam(this.editedItemTeam);
        this.closeTeam();
      }
    },

    //ACCOUNTS
    async getAccounts() {
      const todos = await API.graphql({
        query: listAccounts,
        variables: {
          filter: {
            PK: {
              eq: this.organizationID,
            },
            SK: {
              eq: "ACC#",
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
      console.log(todos);
      this.accounts = todos.data.listAccounts;
    },

    async createAccounts(item) {
      const loading = this.$loading({
        lock: true,
        text: "Create Account",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      const PK = this.organizationID;
      const id = uuid.v1();
      const SK = "ACC#" + id;
      const GSP1PK1 = SK;
      const GSP1SK1 = "#META#" + id;
      const entityType = "ACCOUNTS";
      const createdAt = new Date().toISOString().substr(0, 10);
      const updateAt = new Date().toISOString().substr(0, 10);
      const createdBy = this.usuario;
      const active = "1";
      const smName = item.smName;
      const smAddress = item.smAddress;
      const website = item.website;

      if (!smName || !smAddress || !website) return alert("error en datos");

      const todo = {
        PK,
        SK,
        id,
        GSP1PK1,
        GSP1SK1,
        entityType,
        createdAt,
        updateAt,
        createdBy,
        active,
        smName,
        smAddress,
        website,
      };
      await API.graphql({
        query: createRecord,
        variables: { input: todo },
      });
      this.getAccounts();
      loading.close();
    },

    async updateAccounts(item) {
      const loading = this.$loading({
        lock: true,
        text: "Update Account",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      console.log(item);
      const PK = item.PK;
      const SK = item.SK;
      const updateAt = new Date().toISOString().substr(0, 10);
      const smName = item.smName;
      const smAddress = item.smAddress;
      const website = item.website;

      if (!smName || !smAddress || !website) return alert("error en datos");

      const todo = {
        PK,
        SK,
        updateAt,
        smName,
        smAddress,
        website,
      };

      await API.graphql({
        query: updateRecord,
        variables: { input: todo },
      });
      loading.close();
      this.getAccounts();
    },

    editItemAccount(item) {
      console.log(item);
      this.editedIndexAccount = this.accounts.indexOf(item);
      this.editedItemAccount = Object.assign({}, item);
      this.dialog_account = true;
    },

    deleteItemAcc(item) {
      this.editedItemAccount = Object.assign({}, item);
      this.dialog_deleteAcc = true;
    },

    async deleteItemAccount() {
      const loading = this.$loading({
        lock: true,
        text: "Delete Account",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      const index = this.accounts.indexOf(this.editedItemAccount);
      this.accounts.splice(index, 1);
      console.log(this.accounts);

      const list = await API.graphql({
        query: listSmartDash,
        variables: {
          filter: {
            PK: {
              eq: this.editedItemAccount.smName,
            },
            SK: {
              eq: "#META#",
            },
            indexs: {
              eq: "1_acc",
            },
            active: {
              eq: "1",
            },
          },
        },
      });
      console.log(list.data.listSmartDash.length);
      if (list.data.listSmartDash.length == 0) {
        const SK = this.editedItemAccount.SK;
        const PK = this.editedItemAccount.PK;
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
        this.dialog_deleteAcc = false;
        this.dialog = false;
        console.log(this.teams);
        loading.close();
      } else {
        this.dialog_conf_delete = true;
        this.dialog_deleteAcc = false;
        this.dialog = false;
        console.log(this.teams);
        loading.close();
      }
      this.getAccounts();
    },

    closeAccount() {
      this.dialog_account = false;
      this.$nextTick(() => {
        this.editedItemAccount = Object.assign({}, this.defaultItemAccount);
        this.editedIndexAccount = -1;
      });
    },

    async saveAccount() {
      if (this.editedIndexAccount > -1) {
        console.log("edit");
        await this.updateAccounts(this.editedItemAccount);
        console.log(this.editedItemAccount);
        this.closeAccount();
      } else {
        console.log("crear");
        this.createAccounts(this.editedItemAccount);
        this.closeAccount();
      }
    },

    //SERVICE TYPE
    async createType(item) {
      console.log(this.organization);
      var list_t = [];
      var l_type = "";
      var name = item.name;
      const description = item.description;
      const abbreviation = item.abbreviation;
      const status = item.status;

      if (!name || !description) return alert("error service type");
      const type = { name, description, abbreviation, status };

      list_t = [...this.serviceTypes, type];
      for (let i = 0; i < list_t.length; i++) {
        l_type += JSON.stringify(list_t[i]) + ",";
      }
      const SK = this.organization.SK;
      const PK = this.organization.PK;
      const updateAt = new Date().toISOString().substr(0, 10);
      const l_productType = l_type.slice(0, -1);

      const org = {
        SK,
        PK,
        updateAt,
        l_productType,
      };

      await API.graphql({
        query: updateRecord,
        variables: { input: org },
      });
      this.GetCatalogs();
    },

    async updateType(item) {
      var name = item.name;
      const description = item.description;
      const abbreviation = item.abbreviation;
      const status = item.status;

      if (!name || !description) return alert("error service type");

      const type = { name, description, abbreviation, status };
      Object.assign(this.serviceTypes[this.editedIndexStype], type);
      console.log(this.serviceTypes);
      var l_type = "";
      for (let i = 0; i < this.serviceTypes.length; i++) {
        l_type += JSON.stringify(this.serviceTypes[i]) + ",";
      }

      const SK = this.organization.SK;
      const PK = this.organization.PK;
      const updateAt = new Date().toISOString().substr(0, 10);
      const l_productType = l_type.slice(0, -1);

      const org = {
        SK,
        PK,
        updateAt,
        l_productType,
      };

      await API.graphql({
        query: updateRecord,
        variables: { input: org },
      });
      this.GetCatalogs();
    },

    editItemStype(item) {
      this.editedIndexStype = this.serviceTypes.indexOf(item);
      this.editedItemStype = Object.assign({}, item);
      this.dialog_stype = true;
    },

    deleteItemStype(item) {
      this.editedItemStype = Object.assign({}, item);
      this.dialog_deleteST = true;
    },

    async deleteItemST() {
      const loading = this.$loading({
        lock: true,
        text: "Delete Product Type",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      const index = this.serviceTypes.indexOf(this.editedItemStype);
      this.serviceTypes.splice(index, 1);
      console.log(this.serviceTypes);
      var l_type = "";
      for (let i = 0; i < this.serviceTypes.length; i++) {
        l_type += JSON.stringify(this.serviceTypes[i]) + ",";
      }
      const list = await API.graphql({
        query: listSmartDash,
        variables: {
          filter: {
            PK: {
              eq: this.editedItemStype.name,
            },
            SK: {
              eq: "#",
            },
            indexs: {
              eq: "3_servi",
            },
            active: {
              eq: "1",
            },
          },
        },
      });
      console.log(list.data.listSmartDash.length);
      if (list.data.listSmartDash.length == 0) {
        const SK = this.organization.SK;
        const PK = this.organization.PK;
        const updateAt = new Date().toISOString().substr(0, 10);
        const l_productType = l_type.slice(0, -1);
        const todo = {
          SK,
          PK,
          updateAt,
          l_productType,
        };
        await API.graphql({
          query: updateRecord,
          variables: { input: todo },
        });

        this.dialog_deleteST = false;
        this.dialog = false;
        console.log(this.serviceTypes);
        loading.close();
      } else {
        this.dialog_conf_delete = true;
        this.dialog_deleteST = false;
        this.dialog = false;
        console.log(this.serviceTypes);
        loading.close();
      }
      this.GetCatalogs();
    },

    closeStype() {
      this.$nextTick(() => {
        this.editedItemStype = Object.assign({}, this.defaultItemStype);
        this.editedIndexStype = -1;
      });
      this.dialog_stype = false;
    },

    async saveStype() {
      if (this.editedIndexStype > -1) {
        console.log("edit");
        await this.updateType(this.editedItemStype);
        this.closeStype();
      } else {
        console.log("crear");
        await this.createType(this.editedItemStype);
        this.closeStype();
      }
    },

    //Business Type
    async createBusinessType(item) {
      console.log(this.organization);
      var list_t = [];
      var l_type = "";

      const description = item.description;
      const abbreviation = item.abbreviation;
      const status = item.status;

      if (!description) return alert("error service type");
      const type = { description, abbreviation, status };

      list_t = [...this.businessType, type];
      for (let i = 0; i < list_t.length; i++) {
        l_type += JSON.stringify(list_t[i]) + ",";
      }
      const SK = this.organization.SK;
      const PK = this.organization.PK;
      const updateAt = new Date().toISOString().substr(0, 10);
      const l_businessType = l_type.slice(0, -1);

      const org = {
        SK,
        PK,
        updateAt,
        l_businessType,
      };

      await API.graphql({
        query: updateRecord,
        variables: { input: org },
      });
      this.GetCatalogs();
    },

    async updateBusinessType(item) {
      const description = item.description;
      const abbreviation = item.abbreviation;
      const status = item.status;

      if (!description) return alert("error service type");

      const type = { description, abbreviation, status };
      Object.assign(this.businessType[this.editedIndexBusinessType], type);
      console.log(this.businessType);
      var l_type = "";
      for (let i = 0; i < this.businessType.length; i++) {
        l_type += JSON.stringify(this.businessType[i]) + ",";
      }

      const SK = this.organization.SK;
      const PK = this.organization.PK;
      const updateAt = new Date().toISOString().substr(0, 10);
      const l_businessType = l_type.slice(0, -1);

      const org = {
        SK,
        PK,
        updateAt,
        l_businessType,
      };

      await API.graphql({
        query: updateRecord,
        variables: { input: org },
      });
      this.GetCatalogs();
    },

    editItemBusinessType(item) {
      this.editedIndexBusinessType = this.businessType.indexOf(item);
      this.editedItemBT = Object.assign({}, item);
      this.dialog_bt = true;
    },

    deleteItemBT(item) {
      this.editedItemBT = Object.assign({}, item);
      this.dialog_deleteBT = true;
    },

    async deleteItemBusinessType() {
      const loading = this.$loading({
        lock: true,
        text: "Delete Industry Type",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      const index = this.businessType.indexOf(this.editedItemBT);
      this.businessType.splice(index, 1);
      console.log(this.businessType);
      var l_dis = "";
      for (let i = 0; i < this.businessType.length; i++) {
        l_dis += JSON.stringify(this.businessType[i]) + ",";
      }
      const SK = this.organization.SK;
      const PK = this.organization.PK;
      const updateAt = new Date().toISOString().substr(0, 10);
      const l_businessType = l_dis.slice(0, -1);

      const todo = {
        SK,
        PK,
        updateAt,
        l_businessType,
      };
      await API.graphql({
        query: updateRecord,
        variables: { input: todo },
      });
      this.dialog_deleteBT = false;
      this.dialog = false;
      loading.close();
      this.GetCatalogs();
    },

    closeBusinessType() {
      this.$nextTick(() => {
        this.editedItemBT = Object.assign({}, this.defaultItemBT);
        this.editedIndexBusinessType = -1;
      });
      this.dialog_bt = false;
    },

    async saveBusinessType() {
      if (this.editedIndexBusinessType > -1) {
        console.log("edit");
        await this.updateBusinessType(this.editedItemBT);
        this.closeBusinessType();
      } else {
        console.log("crear");
        await this.createBusinessType(this.editedItemBT);
        this.closeBusinessType();
      }
    },

    //DISCOUNT
    async createDiscount(item) {
      var list_dis = [];
      const discount_code = item.discount_code;
      const discount_name = item.discount_name;
      const discount_desc = item.discount_desc;
      const discount_type = item.discount_type;
      const discount_value = item.discount_value;
      const valid_from = item.valid_from;
      const valid_to = item.valid_to;
      const status = item.status;

      if (!discount_code || !discount_name || !discount_value || !discount_type)
        return alert("error en datos discount");

      const dis = {
        discount_code,
        discount_name,
        discount_desc,
        discount_type,
        discount_value,
        valid_from,
        valid_to,
        status,
      };
      list_dis = [...this.discounts, dis];
      var l_dis = "";
      for (let i = 0; i < list_dis.length; i++) {
        l_dis += JSON.stringify(list_dis[i]) + ",";
      }
      const SK = this.organization.SK;
      const PK = this.organization.PK;
      const updateAt = new Date().toISOString().substr(0, 10);
      const l_discount = l_dis.slice(0, -1);

      const org = {
        SK,
        PK,
        updateAt,
        l_discount,
      };

      await API.graphql({
        query: updateRecord,
        variables: { input: org },
      });
      this.GetCatalogs();
    },

    async updateDiscount(item) {
      const discount_code = item.discount_code;
      const discount_name = item.discount_name;
      const discount_desc = item.discount_desc;
      const discount_type = item.discount_type;
      const discount_value = item.discount_value;
      const valid_from = item.valid_from;
      const valid_to = item.valid_to;
      const status = item.status;

      if (!discount_code || !discount_name || !discount_value || !discount_type)
        return alert("error en datos discount");

      const dis = {
        discount_code,
        discount_name,
        discount_desc,
        discount_type,
        discount_value,
        valid_from,
        valid_to,
        status,
      };

      Object.assign(this.discounts[this.editedIndexDiscount], dis);
      console.log(this.discounts);
      var l_dis = "";
      for (let i = 0; i < this.discounts.length; i++) {
        l_dis += JSON.stringify(this.discounts[i]) + ",";
      }
      const SK = this.organization.SK;
      const PK = this.organization.PK;
      const updateAt = new Date().toISOString().substr(0, 10);
      const l_discount = l_dis.slice(0, -1);

      const org = {
        SK,
        PK,
        updateAt,
        l_discount,
      };

      await API.graphql({
        query: updateRecord,
        variables: { input: org },
      });
      this.GetCatalogs();
    },

    editItemDiscount(item) {
      this.editedIndexDiscount = this.discounts.indexOf(item);
      this.editedItemDiscount = Object.assign({}, item);
      this.dialog_discount = true;
    },

    deleteItemDiscount(item) {
      this.editedItemDiscount = Object.assign({}, item);
      this.dialog_deleteDis = true;
    },

    async deleteItemDis() {
      const loading = this.$loading({
        lock: true,
        text: "Delete Team Member",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      const index = this.discounts.indexOf(this.editedItemDiscount);
      this.discounts.splice(index, 1);
      console.log(this.discounts);
      var l_dis = "";
      for (let i = 0; i < this.discounts.length; i++) {
        l_dis += JSON.stringify(this.discounts[i]) + ",";
      }
      const SK = this.organization.SK;
      const PK = this.organization.PK;
      const updateAt = new Date().toISOString().substr(0, 10);
      const l_discount = l_dis.slice(0, -1);

      const todo = {
        SK,
        PK,
        updateAt,
        l_discount,
      };
      await API.graphql({
        query: updateRecord,
        variables: { input: todo },
      });
      this.dialog_deleteDis = false;
      this.dialog = false;
      console.log(this.teams);
      loading.close();
      this.GetCatalogs();
    },

    closeDiscount() {
      this.dialog_discount = false;
      this.$nextTick(() => {
        this.editedItemDiscount = Object.assign({}, this.defaultItemDiscount);
        this.editedIndexDiscount = -1;
      });
    },

    async saveDiscount() {
      if (this.editedIndexDiscount > -1) {
        console.log("edit");
        await this.updateDiscount(this.editedItemDiscount);
        console.log(this.editedItemDiscount);
        this.closeDiscount();
      } else {
        console.log("crear");
        this.createDiscount(this.editedItemDiscount);
        this.closeDiscount();
      }
    },

    //Payment Method
    async createPaymentM(item) {
      var list_pay = [];
      var l_pay = "";
      const description = item.description;
      const abbreviation = item.abbreviation;
      const status = item.status;

      if (!description) return alert("error service type");
      const type = { description, abbreviation, status };

      list_pay = [...this.payments, type];
      for (let i = 0; i < list_pay.length; i++) {
        l_pay += JSON.stringify(list_pay[i]) + ",";
      }
      const SK = this.organization.SK;
      const PK = this.organization.PK;
      const updateAt = new Date().toISOString().substr(0, 10);
      const l_paymentMethod = l_pay.slice(0, -1);

      const org = {
        SK,
        PK,
        updateAt,
        l_paymentMethod,
      };

      await API.graphql({
        query: updateRecord,
        variables: { input: org },
      });
      this.GetCatalogs();
    },

    async updatePaymentM(item) {
      const description = item.description;
      const abbreviation = item.abbreviation;
      const status = item.status;

      if (!description) return alert("error service type");

      const type = { description, abbreviation, status };
      Object.assign(this.payments[this.editedIndexPayment], type);
      console.log(this.payments);

      var l_type = "";
      for (let i = 0; i < this.payments.length; i++) {
        l_type += JSON.stringify(this.payments[i]) + ",";
      }

      const SK = this.organization.SK;
      const PK = this.organization.PK;
      const updateAt = new Date().toISOString().substr(0, 10);
      const l_paymentMethod = l_type.slice(0, -1);

      const org = {
        SK,
        PK,
        updateAt,
        l_paymentMethod,
      };

      await API.graphql({
        query: updateRecord,
        variables: { input: org },
      });
      this.GetCatalogs();
    },

    editItemPaymentM(item) {
      this.editedIndexPayment = this.payments.indexOf(item);
      this.editedItemPayment = Object.assign({}, item);
      this.dialog_payment = true;
    },

    deleteItemPay(item) {
      this.editedItemPayment = Object.assign({}, item);
      this.dialog_deletePay = true;
    },

    async deleteItemPayment() {
      const loading = this.$loading({
        lock: true,
        text: "Delete Payment Method",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      const index = this.payments.indexOf(this.editedItemPayment);
      this.payments.splice(index, 1);
      console.log(this.payments);
      var l_type = "";
      for (let i = 0; i < this.payments.length; i++) {
        l_type += JSON.stringify(this.payments[i]) + ",";
      }

      const SK = this.organization.SK;
      const PK = this.organization.PK;
      const updateAt = new Date().toISOString().substr(0, 10);
      const l_paymentMethod = l_type.slice(0, -1);
      const todo = {
        SK,
        PK,
        updateAt,
        l_paymentMethod,
      };
      await API.graphql({
        query: updateRecord,
        variables: { input: todo },
      });

      this.dialog_deletePay = false;
      this.dialog = false;
      console.log(this.payments);
      loading.close();
      this.GetCatalogs();
    },

    closePaymentM() {
      this.$nextTick(() => {
        this.editedItemPayment = Object.assign({}, this.defaultItemPayment);
        this.editedIndexPayment = -1;
      });
      this.dialog_payment = false;
    },

    async savePaymentM() {
      if (this.editedIndexPayment > -1) {
        console.log("edit");
        await this.updatePaymentM(this.editedItemPayment);
        this.closePaymentM();
      } else {
        console.log("crear");
        await this.createPaymentM(this.editedItemPayment);
        this.closePaymentM();
      }
    },

    //acquisitions
    async createAcquisition(item) {
      var list_pay = [];
      var l_pay = "";
      const description = item.description;
      const abbreviation = item.abbreviation;
      const status = item.status;

      if (!description) return alert("error service type");
      const type = { description, abbreviation, status };

      list_pay = [...this.acquisitions, type];
      for (let i = 0; i < list_pay.length; i++) {
        l_pay += JSON.stringify(list_pay[i]) + ",";
      }
      const SK = this.organization.SK;
      const PK = this.organization.PK;
      const updateAt = new Date().toISOString().substr(0, 10);
      const l_acquisition = l_pay.slice(0, -1);

      const org = {
        SK,
        PK,
        updateAt,
        l_acquisition,
      };

      await API.graphql({
        query: updateRecord,
        variables: { input: org },
      });
      this.GetCatalogs();
    },

    async updateAcquisition(item) {
      const description = item.description;
      const abbreviation = item.abbreviation;
      const status = item.status;

      if (!description) return alert("error service type");

      const type = { description, abbreviation, status };
      Object.assign(this.acquisitions[this.editedIndexAcquisition], type);
      console.log(this.acquisitions);

      var l_type = "";
      for (let i = 0; i < this.acquisitions.length; i++) {
        l_type += JSON.stringify(this.acquisitions[i]) + ",";
      }

      const SK = this.organization.SK;
      const PK = this.organization.PK;
      const updateAt = new Date().toISOString().substr(0, 10);
      const l_acquisition = l_type.slice(0, -1);

      const org = {
        SK,
        PK,
        updateAt,
        l_acquisition,
      };

      await API.graphql({
        query: updateRecord,
        variables: { input: org },
      });
      this.GetCatalogs();
    },

    editItemAcquisition(item) {
      this.editedIndexAcquisition = this.acquisitions.indexOf(item);
      this.editedItemAcquisition = Object.assign({}, item);
      this.dialog_acquisition = true;
    },

    deleteItemAcqui(item) {
      this.editedItemAcquisition = Object.assign({}, item);
      this.dialog_deleteAcqui = true;
    },

    async deleteItemAcquisition() {
      const loading = this.$loading({
        lock: true,
        text: "Delete acquisitions",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      const index = this.acquisitions.indexOf(this.editedItemAcquisition);
      this.acquisitions.splice(index, 1);
      console.log(this.acquisitions);
      var l_type = "";
      for (let i = 0; i < this.acquisitions.length; i++) {
        l_type += JSON.stringify(this.acquisitions[i]) + ",";
      }

      const SK = this.organization.SK;
      const PK = this.organization.PK;
      const updateAt = new Date().toISOString().substr(0, 10);
      const l_acquisition = l_type.slice(0, -1);
      const todo = {
        SK,
        PK,
        updateAt,
        l_acquisition,
      };
      await API.graphql({
        query: updateRecord,
        variables: { input: todo },
      });

      this.dialog_deleteAcqui = false;
      this.dialog = false;
      console.log(this.acquisitions);
      loading.close();
      this.GetCatalogs();
    },

    closeAcquisition() {
      this.$nextTick(() => {
        this.editedItemAcquisition = Object.assign(
          {},
          this.defaultItemAcquisition
        );
        this.editedIndexAcquisition = -1;
      });
      this.dialog_acquisition = false;
    },

    async saveAcquisition() {
      if (this.editedIndexAcquisition > -1) {
        console.log("edit");
        await this.updateAcquisition(this.editedItemAcquisition);
        this.closeAcquisition();
      } else {
        console.log("crear");
        await this.createAcquisition(this.editedItemAcquisition);
        this.closeAcquisition();
      }
    },

    //Task Status
    async createTaskStatus(item) {
      var list_pay = [];
      var l_pay = "";
      const description = item.description;
      const abbreviation = item.abbreviation;
      const status = item.status;

      if (!description) return alert("error service type");
      const type = { description, abbreviation, status };

      list_pay = [...this.taskStatus, type];
      for (let i = 0; i < list_pay.length; i++) {
        l_pay += JSON.stringify(list_pay[i]) + ",";
      }
      const SK = this.organization.SK;
      const PK = this.organization.PK;
      const updateAt = new Date().toISOString().substr(0, 10);
      const l_taskStatusType = l_pay.slice(0, -1);

      const org = {
        SK,
        PK,
        updateAt,
        l_taskStatusType,
      };

      await API.graphql({
        query: updateRecord,
        variables: { input: org },
      });
      this.GetCatalogs();
    },

    async updateTaskStatus(item) {
      const description = item.description;
      const abbreviation = item.abbreviation;
      const status = item.status;

      if (!description) return alert("error service type");

      const type = { description, abbreviation, status };
      Object.assign(this.taskStatus[this.editedIndexTask], type);
      console.log(this.taskStatus);

      var l_type = "";
      for (let i = 0; i < this.taskStatus.length; i++) {
        l_type += JSON.stringify(this.taskStatus[i]) + ",";
      }

      const SK = this.organization.SK;
      const PK = this.organization.PK;
      const updateAt = new Date().toISOString().substr(0, 10);
      const l_taskStatusType = l_type.slice(0, -1);

      const org = {
        SK,
        PK,
        updateAt,
        l_taskStatusType,
      };

      await API.graphql({
        query: updateRecord,
        variables: { input: org },
      });
      this.GetCatalogs();
    },

    editItemTask(item) {
      this.editedIndexTask = this.taskStatus.indexOf(item);
      this.editedItemTask = Object.assign({}, item);
      this.dialog_task = true;
    },

    deleteItemTask(item) {
      this.editedItemTask = Object.assign({}, item);
      this.dialog_deleteTask = true;
    },

    async deleteItemTaskStatus() {
      const loading = this.$loading({
        lock: true,
        text: "Delete Task Satus",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      const index = this.taskStatus.indexOf(this.editedItemTask);
      this.taskStatus.splice(index, 1);
      console.log(this.taskStatus);
      var l_type = "";
      for (let i = 0; i < this.taskStatus.length; i++) {
        l_type += JSON.stringify(this.taskStatus[i]) + ",";
      }

      const SK = this.organization.SK;
      const PK = this.organization.PK;
      const updateAt = new Date().toISOString().substr(0, 10);
      const l_taskStatusType = l_type.slice(0, -1);
      const todo = {
        SK,
        PK,
        updateAt,
        l_taskStatusType,
      };
      await API.graphql({
        query: updateRecord,
        variables: { input: todo },
      });

      this.dialog_deleteTask = false;
      this.dialog = false;
      console.log(this.taskStatus);
      loading.close();
      this.GetCatalogs();
    },

    closeTask() {
      this.$nextTick(() => {
        this.editedItemTask = Object.assign({}, this.defaultItemTask);
        this.editedIndexTask = -1;
      });
      this.dialog_task = false;
    },

    async saveTask() {
      if (this.editedIndexTask > -1) {
        console.log("edit");
        await this.updateTaskStatus(this.editedItemTask);
        this.closeTask();
      } else {
        console.log("crear");
        await this.createTaskStatus(this.editedItemTask);
        this.closeTask();
      }
    },

    //Leads Status
    async createLeadsStatus(item) {
      var list_pay = [];
      var l_pay = "";
      const description = item.description;
      const abbreviation = item.abbreviation;
      const status = item.status;

      if (!description) return alert("error service type");
      const type = { description, abbreviation, status };

      list_pay = [...this.leadStatus, type];
      for (let i = 0; i < list_pay.length; i++) {
        l_pay += JSON.stringify(list_pay[i]) + ",";
      }
      const SK = this.organization.SK;
      const PK = this.organization.PK;
      const updateAt = new Date().toISOString().substr(0, 10);
      const l_leadStatus = l_pay.slice(0, -1);

      const org = {
        SK,
        PK,
        updateAt,
        l_leadStatus,
      };

      await API.graphql({
        query: updateRecord,
        variables: { input: org },
      });
      this.GetCatalogs();
    },

    async updateLeadsStatus(item) {
      const description = item.description;
      const abbreviation = item.abbreviation;
      const status = item.status;

      if (!description) return alert("error service type");

      const type = { description, abbreviation, status };
      Object.assign(this.leadStatus[this.editedIndexLeads], type);
      console.log(this.leadStatus);

      var l_type = "";
      for (let i = 0; i < this.leadStatus.length; i++) {
        l_type += JSON.stringify(this.leadStatus[i]) + ",";
      }

      const SK = this.organization.SK;
      const PK = this.organization.PK;
      const updateAt = new Date().toISOString().substr(0, 10);
      const l_leadStatus = l_type.slice(0, -1);

      const org = {
        SK,
        PK,
        updateAt,
        l_leadStatus,
      };

      await API.graphql({
        query: updateRecord,
        variables: { input: org },
      });
      this.GetCatalogs();
    },

    editItemLeads(item) {
      this.editedIndexLeads = this.leadStatus.indexOf(item);
      this.editedItemLeads = Object.assign({}, item);
      this.dialog_leads = true;
    },

    deleteItemLeads(item) {
      this.editedItemLeads = Object.assign({}, item);
      this.dialog_deleteLeads = true;
    },

    async deleteItemLeadsStatus() {
      const loading = this.$loading({
        lock: true,
        text: "Delete Leads Satus",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      const index = this.leadStatus.indexOf(this.editedItemLeads);
      this.leadStatus.splice(index, 1);
      console.log(this.leadStatus);
      var l_type = "";
      for (let i = 0; i < this.leadStatus.length; i++) {
        l_type += JSON.stringify(this.leadStatus[i]) + ",";
      }

      const SK = this.organization.SK;
      const PK = this.organization.PK;
      const updateAt = new Date().toISOString().substr(0, 10);
      const l_leadStatus = l_type.slice(0, -1);
      const todo = {
        SK,
        PK,
        updateAt,
        l_leadStatus,
      };
      await API.graphql({
        query: updateRecord,
        variables: { input: todo },
      });

      this.dialog_deleteLeads = false;
      this.dialog = false;
      console.log(this.leadStatus);
      loading.close();
      this.GetCatalogs();
    },

    closeLeadsStatus() {
      this.$nextTick(() => {
        this.editedItemLeads = Object.assign({}, this.defaultItemLeads);
        this.editedIndexLeads = -1;
      });
      this.dialog_leads = false;
    },

    async saveLeadsStatus() {
      if (this.editedIndexLeads > -1) {
        console.log("edit");
        await this.updateLeadsStatus(this.editedItemLeads);
        this.closeLeadsStatus();
      } else {
        console.log("crear");
        await this.createLeadsStatus(this.editedItemLeads);
        this.closeLeadsStatus();
      }
    },

    //lIBRARY
    async createLibrary(item) {
      var list_pay = [];
      var l_pay = "";

      const title = item.title;
      const description = item.description;
      const abbreviation = item.abbreviation;
      const status = item.status;
      if (!title || !description) return alert("error librarys");

      const lib = { title, description, abbreviation, status };
      list_pay = [...this.librarys, lib];
      for (let i = 0; i < list_pay.length; i++) {
        l_pay += JSON.stringify(list_pay[i]) + ",";
      }
      const SK = this.organization.SK;
      const PK = this.organization.PK;
      const updateAt = new Date().toISOString().substr(0, 10);
      const l_quoteLibrary = l_pay.slice(0, -1);

      const org = {
        SK,
        PK,
        updateAt,
        l_quoteLibrary,
      };

      await API.graphql({
        query: updateRecord,
        variables: { input: org },
      });
      this.GetCatalogs();
    },

    async updateLibrary(item) {
      const title = item.title;
      const description = item.description;
      const abbreviation = item.abbreviation;
      const status = item.status;

      if (!title || !description) return alert("error librarys");

      const lib = { title, description, abbreviation, status };

      Object.assign(this.librarys[this.editedIndexLibrary], lib);
      console.log(this.librarys);

      var l_type = "";
      for (let i = 0; i < this.librarys.length; i++) {
        l_type += JSON.stringify(this.librarys[i]) + ",";
      }
      const SK = this.organization.SK;
      const PK = this.organization.PK;
      const updateAt = new Date().toISOString().substr(0, 10);
      const l_quoteLibrary = l_type.slice(0, -1);
      const org = {
        SK,
        PK,
        updateAt,
        l_quoteLibrary,
      };

      await API.graphql({
        query: updateRecord,
        variables: { input: org },
      });
      this.GetCatalogs();
    },

    editItemLibrary(item) {
      this.editedIndexLibrary = this.librarys.indexOf(item);
      this.editedItemLibrary = Object.assign({}, item);
      this.dialog_library = true;
    },

    deleteItemLibrary(item) {
      this.editedItemLibrary = Object.assign({}, item);
      this.dialog_deleteLib = true;
    },

    async deleteItemQuoteLibrary() {
      const loading = this.$loading({
        lock: true,
        text: "Delete Library",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      const index = this.librarys.indexOf(this.editedItemLibrary);
      this.librarys.splice(index, 1);
      console.log(this.librarys);

      var l_type = "";
      for (let i = 0; i < this.librarys.length; i++) {
        l_type += JSON.stringify(this.librarys[i]) + ",";
      }

      const SK = this.organization.SK;
      const PK = this.organization.PK;
      const updateAt = new Date().toISOString().substr(0, 10);
      const l_quoteLibrary = l_type.slice(0, -1);
      const todo = {
        SK,
        PK,
        updateAt,
        l_quoteLibrary,
      };
      await API.graphql({
        query: updateRecord,
        variables: { input: todo },
      });

      this.dialog_deleteLib = false;
      this.dialog = false;
      console.log(this.librarys);
      loading.close();
      this.GetCatalogs();
    },

    closeLibrary() {
      this.dialog_library = false;
      this.$nextTick(() => {
        this.editedItemLibrary = Object.assign({}, this.defaultItemLibrary);
        this.editedIndexLibrary = -1;
      });
    },

    async saveLibrary() {
      if (this.editedIndexLibrary > -1) {
        console.log("edit");
        await this.updateLibrary(this.editedItemLibrary);
        this.closeLibrary();
      } else {
        console.log("crear");
        this.createLibrary(this.editedItemLibrary);
        this.closeLibrary();
      }
    },

    //Quote Status
    async createQuoteStatus(item) {
      var list_pay = [];
      var l_pay = "";
      const description = item.description;
      const abbreviation = item.abbreviation;
      const status = item.status;

      if (!description) return alert("error service type");
      const type = { description, abbreviation, status };

      list_pay = [...this.quoteStatus, type];
      for (let i = 0; i < list_pay.length; i++) {
        l_pay += JSON.stringify(list_pay[i]) + ",";
      }
      const SK = this.organization.SK;
      const PK = this.organization.PK;
      const updateAt = new Date().toISOString().substr(0, 10);
      const l_quoteStatus = l_pay.slice(0, -1);

      const org = {
        SK,
        PK,
        updateAt,
        l_quoteStatus,
      };

      await API.graphql({
        query: updateRecord,
        variables: { input: org },
      });
      this.GetCatalogs();
    },

    async updateQuoteStatus(item) {
      const description = item.description;
      const abbreviation = item.abbreviation;
      const status = item.status;

      if (!description) return alert("error service type");

      const type = { description, abbreviation, status };
      Object.assign(this.quoteStatus[this.editedIndexQuote], type);
      console.log(this.quoteStatus);

      var l_type = "";
      for (let i = 0; i < this.quoteStatus.length; i++) {
        l_type += JSON.stringify(this.quoteStatus[i]) + ",";
      }

      const SK = this.organization.SK;
      const PK = this.organization.PK;
      const updateAt = new Date().toISOString().substr(0, 10);
      const l_quoteStatus = l_type.slice(0, -1);

      const org = {
        SK,
        PK,
        updateAt,
        l_quoteStatus,
      };

      await API.graphql({
        query: updateRecord,
        variables: { input: org },
      });
      this.GetCatalogs();
    },

    editItemQuote(item) {
      this.editedIndexQuote = this.quoteStatus.indexOf(item);
      this.editedItemQuote = Object.assign({}, item);
      this.dialog_quote = true;
    },

    deleteItemQuote(item) {
      this.editedItemQuote = Object.assign({}, item);
      this.dialog_deleteQuo = true;
    },

    async deleteItemQuoteStatus() {
      const loading = this.$loading({
        lock: true,
        text: "Delete Quote Satus",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      const index = this.quoteStatus.indexOf(this.editedItemQuote);
      this.quoteStatus.splice(index, 1);
      console.log(this.quoteStatus);
      var l_type = "";
      for (let i = 0; i < this.quoteStatus.length; i++) {
        l_type += JSON.stringify(this.quoteStatus[i]) + ",";
      }

      const SK = this.organization.SK;
      const PK = this.organization.PK;
      const updateAt = new Date().toISOString().substr(0, 10);
      const l_quoteStatus = l_type.slice(0, -1);
      const todo = {
        SK,
        PK,
        updateAt,
        l_quoteStatus,
      };
      await API.graphql({
        query: updateRecord,
        variables: { input: todo },
      });

      this.dialog_deleteQuo = false;
      this.dialog = false;
      console.log(this.quoteStatus);
      loading.close();
      this.GetCatalogs();
    },

    closeQuote() {
      this.$nextTick(() => {
        this.editedItemQuote = Object.assign({}, this.defaultItemQuote);
        this.editedIndexQuote = -1;
      });
      this.dialog_quote = false;
    },

    async saveQuote() {
      if (this.editedIndexQuote > -1) {
        console.log("edit");
        await this.updateQuoteStatus(this.editedItemQuote);
        this.closeQuote();
      } else {
        console.log("crear");
        await this.createQuoteStatus(this.editedItemQuote);
        this.closeQuote();
      }
    },

    getColor(item) {
      if (item == "I") return "red";
      else if (item == "A") return "green";
      else return "orange";
    },
  },
};
</script>
