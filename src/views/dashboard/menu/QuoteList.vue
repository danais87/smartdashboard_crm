 <template>
  <v-container id="dashboard" fluid grid-list-lg class="mx-0 pa-0">
    <v-app>
      <DialogLeads
        v-model="dialog_lead"
        v-bind:item="editedItemLeads"
        :index="editedIndexLead"
        call_type="external"
      >
      </DialogLeads>
      <DialogLibrary
        v-model="showlibrary"
        call_type="external"
        @conclucion="conclusion = $event"
      ></DialogLibrary>
      <v-dialog
        v-model="dialog_email"
        max-width="500px"
        v-if="send_email.length > 0"
      >
        <v-card>
          <v-card-title>
            <span class="headline">Select Email:</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col sm="6" md="6">
                  <b>Name:</b> {{ send_email[0].name }}
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-select
                    v-model="selectedEmails"
                    :items="send_email[0].emails"
                    label="Select"
                    multiple
                    chips
                    persistent-hint
                    item-text="email"
                    item-value="email"
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close_email"
              >Cancel</v-btn
            >
            <v-btn
              color="blue darken-1"
              text
              @click="invokeLambda(send_email[0].quoteSK)"
              >Send</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
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
      <v-dialog v-model="dialog">
        <v-card>
          <el-container style="solid #eee">
            <el-header style="text-align: center; font-size: 16px">
              <v-row
                ><v-col cols="12" sm="6" md="6">
                  <span
                    >{{ formTitle }} : {{ editedItem_c.smName }}</span
                  ></v-col
                >
                <v-col cols="12" sm="6" md="6">
                  <el-button
                    id="c"
                    type="success"
                    icon="el-icon-shopping-cart-full"
                    circle
                    @click="OpenPayment(editedItem_c)"
                    size="mini"
                  ></el-button>
                  <el-button
                    type="success"
                    icon="el-icon-download"
                    circle
                    @click="DownLoad(editedItem_c)"
                    size="mini"
                  ></el-button>
                  <el-button
                    type="info"
                    icon="el-icon-message"
                    circle
                    @click="OpenSentEmail(editedItem_c)"
                    size="mini"
                  ></el-button>
                  <el-button
                    type="warning"
                    icon="el-icon-chat-line-square"
                    circle
                    @click="sendMessege(editedItem_c)"
                    size="mini"
                  ></el-button>
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    circle
                    @click="deleteItem(editedItem_c)"
                    size="mini"
                  ></el-button>
                  <v-btn color="blue darken-1" id="c" text @click="close"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" id="c" text @click="save"
                    >Save</v-btn
                  >
                </v-col>
              </v-row>
            </el-header>
            <el-main max-height="700">
              <v-row>
                <v-col cols="12" md="7" sm="7">
                  <v-row>
                    <v-spacer></v-spacer>
                    <p class="font-weight-light">Add New Contact</p>
                    <v-btn
                      class="ma-2"
                      outlined
                      x-small
                      fab
                      color="indigo"
                      @click="NewLead"
                    >
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </v-row>
                  <br />
                  <v-col v-if="editedItemLeads.name != ''">
                    <v-card outlined elevation="1">
                      <v-card-text>
                        <v-row>
                          <v-col sm="4" md="4">
                            <v-list-item three-line>
                              <v-list-item-content>
                                <v-list-item-subtitle>
                                  Name: {{ editedItemLeads.name }}
                                  {{ editedItemLeads.last_name }}
                                </v-list-item-subtitle>
                              </v-list-item-content>
                            </v-list-item>
                          </v-col>

                          <v-col sm="4" md="4">
                            <v-list-item
                              three-line
                              v-for="item in listemails"
                              :key="item.id"
                            >
                              <v-list-item-content>
                                <v-list-item-subtitle>
                                  {{ item.e_type }}: {{ item.email }}
                                </v-list-item-subtitle>
                              </v-list-item-content>
                            </v-list-item>
                          </v-col>
                          <v-col sm="4" md="4">
                            <v-list-item
                              three-line
                              v-for="item in listphone"
                              :key="item.id"
                            >
                              <v-list-item-content>
                                <v-list-item-subtitle>
                                  {{ item.p_type }}: {{ item.phone }}
                                </v-list-item-subtitle>
                              </v-list-item-content>
                            </v-list-item>
                          </v-col>
                        </v-row>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <el-button
                          type="primary"
                          icon="el-icon-edit"
                          circle
                          size="mini"
                          @click="editItemLead()"
                        ></el-button>
                        <el-button
                          type="danger"
                          icon="el-icon-delete"
                          circle
                          size="mini"
                          @click="deleteItemLead()"
                        ></el-button>
                      </v-card-actions>
                    </v-card>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="editedItem_c.subject"
                      label="Subject:"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="DialogLibrary()"
                      x-small
                      >[load it from library]</v-btn
                    >
                    <v-textarea
                      outlined
                      name="Introduction"
                      v-model="conclusion"
                      required
                      label="Introduction Notes:"
                    ></v-textarea>
                  </v-col>
                  <v-dialog v-model="dialog_service" max-width="800px">
                    <v-card>
                      <v-card-title>
                        <span class="headline"
                          >Service:{{ editedServiceItem.smName }}
                        </span>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeservice"
                          >Cancel</v-btn
                        >
                        <v-btn color="blue darken-1" text @click="saveservice"
                          >Save</v-btn
                        >
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="6" md="6">
                              <v-text-field
                                v-model="editedServiceItem.smName"
                                label="Name"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                              <v-textarea
                                outlined
                                name="description"
                                v-model="editedServiceItem.description"
                                label="Description"
                              ></v-textarea>
                            </v-col>
                            <v-col cols="12" sm="2" md="2">
                              <v-text-field
                                v-model="editedServiceItem.price"
                                label="Procut Price"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="5" md="5">
                              <v-select
                                v-model="editedServiceItem.typeName"
                                :items="types"
                                label="Type"
                                item-text="name"
                                item-value="id"
                                required
                              ></v-select>
                            </v-col>
                            <v-col cols="12" sm="5" md="5">
                              <v-text-field
                                v-model="editedServiceItem.otherType"
                                label="Other Type"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                              <v-textarea
                                outlined
                                name="description"
                                v-model="editedServiceItem.internalComments"
                                label="Internal Comments"
                              ></v-textarea>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions> </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-col v-for="item in q_services" :key="item.variant.id">
                    <v-card outlined elevation="1">
                      <br />
                      <v-row>
                        <v-col sm="2" md="4">
                          {{ item.service.smName }}
                        </v-col>
                        <v-col sm="2" md="4"> <b>Variant: </b> </v-col>
                        <v-spacer></v-spacer>
                        <v-col sm="2" md="4"
                          ><b>Price:</b>
                          {{
                            formattedCurrencyValue(item.service.price)
                          }}</v-col
                        >
                      </v-row>
                      <v-card-text
                        ><b>Description: </b>{{ item.service.description }}
                        <v-spacer></v-spacer>
                        <b>Recurrent: </b>
                        {{ item.service.isRecurrent }}
                        <v-spacer></v-spacer>
                        <b>Internal Comments: </b
                        >{{ item.service.internalComments }}
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <el-button
                          type="primary"
                          icon="el-icon-edit"
                          circle
                          size="mini"
                          @click="editServiceItem(item)"
                        ></el-button>
                        <el-button
                          type="danger"
                          icon="el-icon-delete"
                          circle
                          size="mini"
                          @click="deleteService(item)"
                        ></el-button>
                      </v-card-actions>
                    </v-card>
                  </v-col>
                  <v-col>
                    <el-header class="total" style="alaing: center"
                      >TOTAL:{{ formattedCurrencyValue(total) }}</el-header
                    >
                  </v-col>
                  <br />
                  <v-row>
                    <v-spacer></v-spacer>
                    <v-col sm="4" md="6">
                      <v-select
                        v-model="discount_id"
                        :items="discounts"
                        label="Discount"
                        item-text="discount_name"
                        item-value="discount_code"
                      ></v-select>
                    </v-col>
                    <v-col sm="4" md="5">
                      <v-btn outlined color="blue darken-1" text @click="aply"
                        >Aply</v-btn
                      >
                    </v-col>
                  </v-row>
                  <v-col>
                    <el-header class="total" style="alaing: center"
                      >TOTAL:
                      {{ formattedCurrencyValue(total_disc) }}</el-header
                    >
                  </v-col>
                  <v-col>
                    <el-card class="box-card">
                      <div slot="header" class="clearfix">
                        <span>Payments and Installments:</span>
                      </div>

                      <br />
                      <div v-if="is_installment == true" class="text item">
                        <el-form
                          ref="form"
                          label-width="100px"
                          :label-position="labelPosition"
                        >
                          <v-row>
                            <v-col sm="3" md="3">
                              <el-form-item label="Down Payment ($)">
                                <el-input v-model="payment"></el-input>
                              </el-form-item>
                            </v-col>
                            <v-col sm="3" md="3">
                              <el-form-item label="Installments">
                                <el-input v-model="number"></el-input>
                              </el-form-item>
                            </v-col>
                            <v-col sm="2" md="2">
                              <br /><br />
                              <v-btn color="blue darken-1" @click="aply_calc"
                                >Calculate</v-btn
                              >
                            </v-col>
                          </v-row>
                          <v-dialog v-model="dialog_v" max-width="300px">
                            <v-card>
                              <v-card-title>
                                <span class="headline">Installment</span>
                              </v-card-title>
                              <v-card-text>
                                <v-container>
                                  <v-row>
                                    <v-col cols="12" sm="6" md="6">
                                      <v-text-field
                                        v-model="editedItem_v.startDate"
                                        label="Pay Date"
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                      <v-text-field
                                        v-model="editedItem_v.amount"
                                        label="Amount"
                                      ></v-text-field>
                                    </v-col>
                                  </v-row>
                                </v-container>
                              </v-card-text>
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                  color="blue darken-1"
                                  text
                                  @click="close_v"
                                  >Cancel</v-btn
                                >
                                <v-btn
                                  color="blue darken-1"
                                  text
                                  @click="save_v"
                                  >Save</v-btn
                                >
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                          <v-row v-if="calc == true">
                            <v-col
                              class="d-flex"
                              cols="12"
                              sm="12"
                              md="12"
                              v-if="vari == 'new'"
                            >
                              <v-data-table
                                :headers="headers_i"
                                :items="installments"
                                class="elevation-1"
                                :items-per-page="-1"
                              >
                                <template v-slot:[`item.type`]="{ item }">
                                  <v-chip
                                    class="ma-2"
                                    :color="getColor(item.type)"
                                    outlined
                                    light
                                    small
                                    >{{ item.type }}</v-chip
                                  >
                                </template>
                                <template v-slot:top>
                                  <v-toolbar flat color="white">
                                    <v-toolbar-title
                                      >Installments</v-toolbar-title
                                    >
                                    <v-divider
                                      class="mx-4"
                                      inset
                                      vertical
                                    ></v-divider>
                                    <v-spacer></v-spacer>
                                  </v-toolbar>
                                </template>
                                <template v-slot:[`item.amount`]="{ item }"
                                  >{{ formattedCurrencyValue(item.amount) }}
                                </template>
                                <template v-slot:[`item.actions`]="{ item }">
                                  <el-button
                                    type="primary"
                                    icon="el-icon-edit"
                                    size="mini"
                                    circle
                                    @click="editItem_v(item)"
                                  ></el-button>
                                  <el-button
                                    type="danger"
                                    icon="el-icon-delete"
                                    size="mini"
                                    circle
                                    @click="deleteItem_v(item)"
                                  ></el-button>
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
                                :items="editedItem_c.l_variants"
                                class="elevation-1"
                                :items-per-page="-1"
                                v-if="editedItem_c.is_variant == 'Y'"
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
                                  <el-button
                                    type="primary"
                                    icon="el-icon-edit"
                                    size="mini"
                                    circle
                                    @click="editItem_v(item)"
                                  ></el-button>
                                  <el-button
                                    type="danger"
                                    icon="el-icon-delete"
                                    size="mini"
                                    circle
                                    @click="deleteItem_v(item)"
                                  ></el-button>
                                </template>
                              </v-data-table>
                            </v-col>
                          </v-row>
                        </el-form>
                      </div>
                    </el-card>
                  </v-col>
                  <br />
                  <v-col>
                    <v-textarea
                      outlined
                      name="Comments"
                      v-model="editedItem_c.internalComments"
                      required
                      label="Internal Comments:"
                    ></v-textarea>
                  </v-col>
                  <v-row>
                    <v-col class="d-flex" cols="12" sm="5" md="5">
                      <v-select
                        v-model="editedItem_c.processStatus"
                        :items="quoteStatus"
                        label="Status"
                        item-text="description"
                        item-value="description"
                        outlined
                      ></v-select>
                    </v-col>
                    <v-col class="d-flex" cols="12" sm="5" md="5">
                      <v-text-field
                        v-model="editedItem_c.revisitDate"
                        label="Revisit Date(YYYY-MM-DD)"
                        outlined
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-col class="d-flex" cols="12" sm="4" md="4">
                    <v-select
                      v-model="editedItem_c.live"
                      :items="options_live"
                      label="Live"
                      item-text="label"
                      item-value="value"
                      outlined
                    ></v-select>
                  </v-col>
                </v-col>
                <v-col cols="12" sm="5" md="5">
                  <template slot="title"
                    ><i class="el-icon-message"></i>Contacts</template
                  >
                  <v-row>
                    <v-col cols="12" sm="8">
                      <v-text-field
                        v-model="customer"
                        label="Customer Name"
                        outlined
                        @keyup.native.enter="focusFilter"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="8">
                      <el-tree
                        class="filter-tree"
                        :data="select_leads"
                        check-strictly
                        filterable
                        default-expand-all
                        node-key="value"
                        highlight-current
                        ref="tree_leads"
                        check-on-click-node
                        :props="defaultProps"
                        @node-click="clickLeads"
                      >
                      </el-tree>
                    </v-col>
                  </v-row>
                  <template slot="title"
                    ><i class="el-icon-setting"></i>Services</template
                  >
                  <br />
                  <v-row>
                    <v-col cols="12" sm="8">
                      <el-input
                        placeholder="Filter keyword"
                        v-model="filterText"
                      >
                      </el-input>
                      <el-tree
                        class="filter-tree"
                        :data="data"
                        check-strictly
                        filterable
                        default-expand-all
                        node-key="value"
                        highlight-current
                        ref="tree"
                        check-on-click-node
                        :props="defaultProps"
                        :filter-node-method="filterNode"
                        @node-click="clickService"
                      >
                      </el-tree>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </el-main>
          </el-container>
        </v-card>
      </v-dialog>
      <v-row cols="12" sm="12" md="12">
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
              <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
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
        <v-col sm="2" md="2">
          <br />
          <v-btn color="blue darken-1" text @click="fillData">Apply</v-btn>
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <v-btn outlined small fab color="indigo" @click="openDialog()">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-btn class="ma-2" outlined small fab color="indigo" to="/quotes">
            <v-icon>el-icon-s-grid</v-icon>
          </v-btn>
          <v-btn class="ma-2" outlined small fab color="indigo" to="/dashlist">
            <v-icon>el-icon-pie-chart</v-icon>
          </v-btn>
          <v-btn
            class="ma-2"
            outlined
            small
            fab
            color="indigo"
            to="/tablequote"
          >
            <v-icon>el-icon-s-unfold</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" md="6" align="center">
          <v-card max-width="400" max-height="400">
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4">Quotes</div>
                <line-chart
                  :chart-data="chartdata"
                  :options="boptions"
                  :height="200"
                  :width="200"
                ></line-chart>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="6" align="center">
          <v-card max-width="400" max-height="400">
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4">Quotes</div>
                <DoughnutChart
                  :chart-data="dchartdata"
                  :options="doptions"
                  :height="200"
                  :width="200"
                ></DoughnutChart>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col sm="4" md="4">
          <v-card>
            <v-toolbar flat color="blue lighten-3" dark>
              <v-col sm="6" md="6">Analyzed</v-col>
              <v-col sm="6" md="6" align="right">{{ total_qc }} </v-col>
            </v-toolbar>

            <v-card-text>
              <v-data-table
                id="c"
                :headers="headers"
                :items="quotes_created"
                sort-by="name"
                class="elevation-1"
                :search="search_c"
                :items-per-page="-1"
                @click:row="handleClickQC"
              >
                <template v-slot:[`item.full_name`]="{ item }">{{
                  item.customerName
                }}</template>
                <template v-slot:[`item.final_amount`]="{ item }">
                  <v-chip class="ma-2" color="green" outlined light small>{{
                    formattedCurrencyValue(item.finalAmount)
                  }}</v-chip>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col sm="4" md="4">
          <v-card>
            <v-toolbar flat color="blue lighten-3" dark>
              <v-col sm="6" md="6">Negotiation</v-col>
              <v-col sm="6" md="6" align="right">{{ total_qs }} </v-col>
            </v-toolbar>
            <v-card-text>
              <v-data-table
                id="s"
                :headers="headers"
                :items="quotes_s"
                sort-by="name"
                class="elevation-1"
                :items-per-page="-1"
                @click:row="handleClickQN"
              >
                <template v-slot:[`item.full_name`]="{ item }"
                  >{{ item.customerName }}
                </template>
                <template v-slot:[`item.final_amount`]="{ item }">
                  <v-chip class="ma-2" color="green" outlined light small>{{
                    formattedCurrencyValue(item.finalAmount)
                  }}</v-chip>
                </template>
                <template v-slot:top> </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col sm="4" md="4">
          <v-card>
            <v-toolbar flat color="blue lighten-3" dark>
              <v-col sm="8" md="8">Verbal Agreement</v-col>
              <v-col sm="4" md="4" align="right">{{ total_va }} </v-col>
            </v-toolbar>
            <v-card-text>
              <v-data-table
                id="s"
                :headers="headers"
                :items="quotes_va"
                sort-by="name"
                class="elevation-1"
                :search="search_s"
                :items-per-page="-1"
                @click:row="handleClickQVA"
              >
                <template v-slot:[`item.full_name`]="{ item }"
                  >{{ item.customerName }}
                </template>
                <template v-slot:[`item.final_amount`]="{ item }">
                  <v-chip class="ma-2" color="green" outlined light small>{{
                    formattedCurrencyValue(item.finalAmount)
                  }}</v-chip>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-app>
  </v-container>
</template>


<script>
import LineChart from "../component/dashboard/LineChart.js";
import DoughnutChart from "../component/dashboard/DoughnutChart.js";
import { API } from "aws-amplify";
import {
  createRecord,
  deleteInstallments,
  updateRecord,
} from "../../../graphql/mutations";
import {
  listQuotes,
  getOrganization,
  listProducts,
  listPhoneNumber,
  listCustomers,
  listQuoteItems,
} from "../../../graphql/queries";
import lang from "element-ui/lib/locale/lang/en";
import locale from "element-ui/lib/locale";
locale.use(lang);
import DialogLeads from "../dialogs/DialogLeads";
import DialogLibrary from "../dialogs/DialogLibrary";
import Vuex from "vuex";
import { uuid } from "vue-uuid";
import "element-ui/lib/theme-chalk/display.css";

export default {
  name: "Quote",
  components: { DialogLeads, DialogLibrary, LineChart, DoughnutChart },
  data: () => ({
    props: { multiple: true, expandTrigger: "hover", checkStrictly: true },
    defaultProps: {
      children: "children",
      label: "label",
    },
    footerProps: { "items-per-page-options": [20, 50, 100, -1] },
    startDate: new Date(),
    menu: false,
    modal: false,
    end_date: new Date().toISOString().substr(0, 10),
    menu1: false,
    modal1: false,
    chartdata: null,
    boptions: null,
    dchartdata: null,
    doptions: null,
    alert: false,
    loading: false,
    sm_analized: "3",
    md_analized: "3",
    sm_negotiation: "3",
    md_negotiation: "3",
    sm_verbal: "3",
    md_verbal: "3",
    labelPosition: "top",
    total_disc: 0,
    total: 0,
    total_v: 0,
    total_s: 0,
    total_qs: 0,
    total_qc: 0,
    total_va: 0,
    expanded: [],
    is_installment: true,
    singleExpand: false,
    dialog_v: false,
    search_c: "",
    search_s: "",
    search_l: "",
    discount_id: "",
    lead_id: "",
    show: false,
    see_leads: true,
    name: "",
    is_discount: "N",
    q_leads: [],
    q_discount: [],
    q_services: [],
    organization: [],
    send_email: {
      emails: [],
      name: "",
      quoteID: "",
    },
    options: [],
    selectedEmails: [],
    currentRow: null,
    services: [],
    quotes_created: [],
    quotes_s: [],
    quotes_va: [],
    quotes_datac: [],
    quotes_datas: [],
    quotes_datava: [],
    lista: [],
    types: [],
    installments: [],
    data: [],
    list_email: [],
    list_phone: [],
    list_address: [],
    select_service: "",
    select_type: "",
    dialog: false,
    dialogs: false,
    dialog_service: false,
    value_opt: [],
    dialog_detalle: false,
    dialog_delete: false,
    dialog_lead: false,
    showlibrary: false,
    dialog_email: false,
    accounts: [],
    apiRequest: false,
    customer: "",
    valid: true,
    item_service: [],
    headers_i: [
      {
        text: "Start Date",
        align: "start",
        sortable: true,
        value: "startDate",
      },
      { text: "Amount", align: "start", sortable: true, value: "amount" },
      {
        text: "Type of Payment",
        align: "start",
        sortable: true,
        value: "type",
      },
      {
        text: "Payment",
        align: "start",
        sortable: true,
        value: "scale",
      },
      { text: "Actions", value: "actions", sortable: false },
    ],
    headers_v: [
      {
        text: "Start Date",
        align: "start",
        sortable: true,
        value: "startDate",
      },
      { text: "Amount", align: "start", sortable: true, value: "amount" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    headers: [
      { text: "Name", sortable: true, value: "smName", align: "start" },
      { text: "Contact", sortable: true, value: "full_name", align: "start" },
      {
        text: "Final Amount",
        sortable: true,
        value: "final_amount",
        align: "right",
      },
    ],
    headers_l: [
      { text: "Name", sortable: true, value: "full_name", align: "start" },
      {
        text: "From",
        sortable: true,
        value: "adquisition",
        align: "right",
      },
      { text: "Actions", value: "actions", sortable: false },
    ],
    sheaders: [
      { text: "Name", align: "start", sortable: true, value: "name" },

      { text: "Price", align: "right", sortable: true, value: "price" },
      { text: "Type", sortable: true, value: "type_name", align: "start" },
      {
        text: "Other Type",
        sortable: true,
        value: "other_type",
        align: "start",
      },
    ],
    item_editquote: [],
    editedIndex: -1,
    editedIndexLead: -1,
    editedIndex_v: -1,
    editedIndexServi: -1,
    editedItem_c: {
      id: "",
      smName: "",
      emailSent: "",
      sentDate: "",
      isDiscount: "",
      discount_id: "",
      discount_code: "",
      discount_type: "",
      discount_value: "",
      discountAmount: "",
      quotationAmount: "",
      finalAmount: "",
      isInstallment: "",
      downPayment: "",
      numInstallments: "",
      createdAt: "",
      updateAt: "",
      createdBy: "",
      conclusion: "",
      introduction: "",
      internalComments: "",
      subject: "",
      customerName: "",
      processStatus: "Created",
      live: "Y",
      revisitDate: new Date().toISOString().substr(0, 10),
    },
    defaultItem_c: {
      id: "",
      smName: "",
      emailSent: "",
      sentDate: "",
      isDiscount: "",
      discount_id: "",
      discount_code: "",
      discount_type: "",
      discount_value: "",
      discountAmount: "",
      quotationAmount: "",
      finalAmount: "",
      isInstallment: "",
      downPayment: "",
      numInstallments: "",
      createdAt: "",
      updateAt: "",
      createdBy: "",
      conclusion: "",
      introduction: "",
      internalComments: "",
      subject: "",
      customerName: "",
      processStatus: "Created",
      live: "Y",
      revisitDate: new Date().toISOString().substr(0, 10),
    },
    editedItem_s: {
      id: "",
      name: "",
      lead_id: "",
      lead_name: "",
      email_sent: "",
      sent_date: "",
      is_discount: "N",
      discount_id: "",
      discount_code: "",
      discount_type: "",
      discount_value: "",
      discount_amount: "",
      quotation_amount: "",
      final_amount: "",
      services: "",
      leads: "",
      is_installment: "",
      payment: 1,
      number: 1,
      createdAt: "",
      conclusion: "",
      comments: "",
      subject: "",
      process_status: "Created",
    },
    defaultItem_s: {
      id: "",
      name: "",
      lead_id: "",
      lead_name: "",
      email_sent: "",
      sent_date: "",
      is_discount: "N",
      discount_id: "",
      discount_code: "",
      discount_type: "",
      discount_value: "",
      discount_amount: "",
      quotation_amount: "",
      final_amount: "",
      services: "",
      is_installment: "",
      payment: 1,
      number: 1,
      createdAt: "",
      conclusion: "",
      comments: "",
      subject: "",
      process_status: "Created",
    },
    payment: 1,
    number: 1,
    editedServiceItem: {
      id: "",
      name: "",
      description: "",
      price: 0,
      select_type: "",
      type_name: "",
      type_id: "",
      status: "A",
      is_recurrent: "",
      is_variant: "",
      other_type: "",
      variants: [],
      internalComments: "",
    },
    values_services: [],
    defaulServicetItem: {
      id: "",
      name: "",
      description: "",
      price: 0,
      select_type: "",
      type_name: "",
      type_id: "",
      status: "A",
      is_recurrent: "",
      is_variant: "",
      other_type: "",
      variants: [],
      internalComments: "",
    },
    editedItem_v: {
      id: "",
      startDate: "",
      amount: "",
    },
    defaultItem_v: {
      id: "",
      startDate: "",
      amount: "",
    },
    headers_d: [
      { text: "Type", align: "start", sortable: true, value: "p_type" },
      { text: "Phone", align: "start", sortable: true, value: "phone" },
    ],
    headers_e: [
      { text: "Type", align: "start", sortable: true, value: "e_type" },
      { text: "Email", align: "start", sortable: true, value: "email" },
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
    editedItemLeads: {
      id: "",
      name: "",
      lastname: "",
      street_address: "",
      country: "",
      city: "",
      state: "",
      zip_code: "",
      a_type: "",
      phone: "",
      p_type: "",
      e_type: "",
      status: "A",
      account_id: "",
      account_name: "",
      lead_status: "NS",
      seekingService: "Y",
      smLeadsdetails: [],
    },
    defaultItemLeads: {
      id: "",
      name: "",
      lastname: "",
      street_address: "",
      country: "",
      city: "",
      state: "",
      zip_code: "",
      a_type: "",
      phone: "",
      p_type: "",
      e_type: "",
      status: "A",
      account_id: "",
      account_name: "",
      lead_status: "NS",
      seekingService: "Y",
      smLeadsdetails: [],
    },
    vari: "new",
    calc: false,
    conclusion: "",
    process_status: "Created",
    filterText: "",
    service_type: [],
    select_leads: [],
    librarys: [],
    quote_status: [],
    l_discount: [],
    options_live: [
      {
        value: "Y",
        label: "Active",
      },
      {
        value: "N",
        label: "Inactive",
      },
    ],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Quote" : "Edit Quote";
    },
    ...Vuex.mapState([
      "organizationID",
      "usuario",
      "leads",
      "lead",
      "leads_seek",
      "discounts",
      "list_services",
      "quoteStatus",
      "listphone",
      "listemails",
      "listaddress",
      "body",
    ]),
  },
  mounted() {
    this.fillData();
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogs(val) {
      val || this.closeservice();
    },
    dialog_detalle(val) {
      val || this.closedetalle();
    },
    dialog_delete(val) {
      val || this.closedelete();
    },
    dialog_service(val) {
      val || this.closeservice();
    },
    dialog_v(val) {
      val || this.close_v();
    },
    dialog_email(val) {
      val || this.close_email();
    },
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },

  created() {
    this.GetListServices();
    this.getServices();
    const d = new Date();
    this.startDate = new Date(d.setMonth(d.getMonth() - 1))
      .toISOString()
      .substr(0, 10);
    const l = [];
    this.SetLeads_Seek(l);
  },

  methods: {
    ...Vuex.mapActions(["GetLeads_Seek", "GetListServices"]),
    ...Vuex.mapMutations([
      "SetPhone",
      "SetEmails",
      "SetAddress",
      "SetLead",
      "SetBody",
      "SetConclusion",
      "SetLeads_Seek",
    ]),

    async focusFilter(e) {
      await this.GetLeads_Seek(this.customer);
      this.GetSelectLeads();
    },

    GetSelectLeads() {
      console.log(this.leads_seek);
      var chill = [];
      this.select_leads = [];
      for (let i = 0; i < this.leads_seek.length; i++) {
        this.select_leads.push({
          label: JSON.parse(this.leads_seek[i].l_smName)[0].fullName,
          value: this.leads_seek[i].id,
          children: chill,
        });
      }
      console.log(this.select_leads);
    },

    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    clickLeads() {
      console.log(this.$refs.tree_leads.getCheckedKeys());
      this.addLead();
    },
    clickService() {
      console.log(this.$refs.tree.getCheckedKeys());
      this.addService();
    },

    async fillData() {
      const loading = this.$loading({
        lock: true,
        text: "Loading Quotes...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      var total_c = 0;
      var total_s = 0;
      var total_v = 0;
      this.quotes_datac = [];
      this.quotes_created = [];
      this.quotes_s = [];
      this.quotes_va = [];
      console.log(this.startDate);
      console.log(this.end_date);
      const todos = await API.graphql({
        query: listQuotes,
        variables: {
          filter: {
            PK: {
              eq: this.organizationID,
            },
            SK: {
              eq: "QUO#",
            },
            indexs: {
              eq: "4",
            },
            active: {
              eq: "1",
            },
            startDate: {
              eq: "QUO#" + this.startDate,
            },
            endDate: {
              eq: "QUO#" + this.end_date,
            },
          },
        },
      });

      this.quotes_datac = todos.data.listQuotes;
      console.log(this.quotes_datac);

      for (let i = 0; i < this.quotes_datac.length; i++) {
        console.log(this.quotes_created);
        if (this.quotes_datac[i].processStatus == "Created") {
          this.quotes_created.push(this.quotes_datac[i]);
          total_c = total_c + this.quotes_datac[i].finalAmount;
        }

        if (this.quotes_datac[i].processStatus == "Negotiations") {
          this.quotes_s.push(this.quotes_datac[i]);
          total_s = total_s + this.quotes_datac[i].finalAmount;
        }

        if (this.quotes_datac[i].processStatus == "Verbal Agreement") {
          this.quotes_va.push(this.quotes_datac[i]);
          total_v = total_v + this.quotes_datac[i].finalAmount;
        }
      }

      this.chartdata = {
        labels: ["MES"],
        datasets: [
          {
            label: "Analyzed",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            data: [total_c],
          },
          {
            label: "Negotiation",
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            data: [total_s],
          },
          {
            label: "Verbal Agreement",
            backgroundColor: "rgba(255, 206, 86, 0.2)",
            data: [total_v],
          },
        ],
      };

      this.boptions = {
        lineTension: 1,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              gridLines: {
                display: true,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
        legend: {
          display: true,
        },
        responsive: true,
        maintainAspectRatio: false,
      };

      this.dchartdata = {
        labels: ["Analyzed", "Negotiation", "Verbal Agreement"],
        datasets: [
          {
            borderWidth: 1,
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
            ],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
            ],
            data: [total_c, total_s, total_v],
          },
        ],
      };

      this.doptions = {
        responsive: true,
        maintainAspectRatio: false,
        pieceLabel: {
          mode: "percentage",
          precision: 1,
        },
      };

      this.total_qc = this.formattedCurrencyValue(total_c);
      this.total_qs = this.formattedCurrencyValue(total_s);
      this.total_va = this.formattedCurrencyValue(total_v);
      loading.close();
    },

    handleClickQC(value) {
      this.editItem(value);
    },

    handleClickQN(value) {
      this.editItem(value);
    },

    handleClickQVA(value) {
      this.editItem(value);
    },

    formattedCurrencyValue(value) {
      return (
        "$ " +
        parseFloat(value)
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,")
      );
    },

    formattedValInstal(value) {
      return parseFloat(value)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,");
    },

    OpenPayment(item) {
      this.$router.push({
        path: "/payment",
        query: {
          id: item.id,
          orgid: this.organizationID,
        },
      });
    },

    async getServices() {
      let chil = [];
      for (let i = 0; i < this.list_services.length; i++) {
        chil = [];
        for (
          let j = 0;
          j < JSON.parse(this.list_services[i].l_variant).length;
          j++
        ) {
          if (JSON.parse(this.list_services[i].l_variant)[j].name != "")
            chil.push({
              value:
                JSON.parse(this.list_services[i].l_variant)[j].name +
                "/" +
                JSON.stringify(
                  JSON.parse(this.list_services[i].l_variant)[j].product
                ),
              label:
                JSON.parse(this.list_services[i].l_variant)[j].name +
                "/ Price:$ " +
                JSON.parse(this.list_services[i].l_variant)[j].price,
            });
        }
        this.data.push({
          label:
            this.list_services[i].smName +
            "/ Price:$ " +
            this.list_services[i].price,
          value: this.list_services[i].id,
          children: chil,
        });
      }
      this.data.sort(function (a, b) {
        if (a.label.toLowerCase() > b.label.toLowerCase()) {
          return 1;
        } else {
          return -1;
        }
      });
      console.log(this.data);
    },

    async addLead() {
      const loading = this.$loading({
        lock: true,
        text: "Add Customer",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.list_email = [];
      this.list_phone = [];
      this.list_address = [];
      this.SetPhone(this.list_phone);
      this.SetEmails(this.list_email);
      this.SetAddress(this.list_address);

      this.lead_id = this.$refs.tree_leads.getCheckedKeys();

      const l = await API.graphql({
        query: listCustomers,
        variables: {
          filter: {
            PK: {
              eq: this.organizationID,
            },
            SK: {
              eq: "CUS#" + this.lead_id,
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
      this.editedItemLeads = l.data.listCustomers[0];
      console.log(this.editedItemLeads);
      this.editedItemLeads.name = JSON.parse(
        this.editedItemLeads.l_smName
      )[0].fullName;

      if (JSON.parse(this.editedItemLeads.l_email)[0]) {
        for (
          let i = 0;
          i < JSON.parse(this.editedItemLeads.l_email).length;
          i++
        ) {
          let e_type = JSON.parse(this.editedItemLeads.l_email)[i].e_type;
          let email = JSON.parse(this.editedItemLeads.l_email)[i].email;
          const todo = {
            email,
            e_type,
          };
          this.list_email = [...this.list_email, todo];
        }
      }

      const todos = await API.graphql({
        query: listPhoneNumber,
        variables: { filter: { GSP1PK1: { eq: this.editedItemLeads.SK } } },
      });
      this.phones = todos.data.listPhoneNumber;

      if (this.phones.length > 0) {
        for (let i = 0; i < this.phones.length; i++) {
          let phone = this.phones[i].value;
          let p_type = this.phones[i].type;
          const todo = {
            phone,
            p_type,
          };
          this.list_phone = [...this.list_phone, todo];
        }
      }

      if (JSON.parse(this.editedItemLeads.l_smAddress)[0]) {
        for (
          let i = 0;
          i < JSON.parse(this.editedItemLeads.l_smAddress).length;
          i++
        ) {
          let country = JSON.parse(this.editedItemLeads.l_smAddress)[i].country;
          let state = JSON.parse(this.editedItemLeads.l_smAddress)[i].state;
          let city = JSON.parse(this.editedItemLeads.l_smAddress)[i].city;
          let street_address = JSON.parse(this.editedItemLeads.l_smAddress)[i]
            .street_address;
          let zip_code = JSON.parse(this.editedItemLeads.l_smAddress)[i]
            .zip_code;
          let a_type = JSON.parse(this.editedItemLeads.l_smAddress)[i].a_type;
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

      this.lead_id = "";
      this.customer = "";
      this.select_leads = [];
      this.$refs.tree_leads.setCheckedKeys([]);
      loading.close();
    },

    NewLead() {
      this.editedItemLeads = this.defaultItemLeads;
      this.list_phone = [];
      this.list_email = [];
      this.list_address = [];
      this.SetPhone(this.list_phone);
      this.SetEmails(this.list_email);
      this.SetAddress(this.list_address);
      this.editedIndexLead = -1;
      this.dialog_lead = true;
    },

    DialogLibrary() {
      this.conclusion = "";
      this.SetConclusion(this.conclusion);
      this.showlibrary = true;
    },

    async addService() {
      const loading = this.$loading({
        lock: true,
        text: "Add Services",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.values_services = this.$refs.tree.getCheckedKeys();
      console.log(this.values_services);

      this.total = 0;
      this.total_v = 0;
      this.total_s = 0;
      var lista = [];
      var servi = [];

      for (let i = 0; i < this.values_services.length; i++) {
        servi = [];
        const id_s = this.values_services[i];
        const s = await API.graphql({
          query: listProducts,
          variables: {
            filter: {
              PK: {
                eq: this.organizationID,
              },
              SK: {
                eq: "PRO#" + id_s,
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

        lista = s.data.listProducts[0];
        if (lista != undefined) {
          var v = [];
          servi = lista;
        } else {
          var v = [];
          servi = servi;
        }

        this.q_services.push({
          service: servi,
          variant: v,
        });
      }
      console.log(this.q_services);

      for (let i = 0; i < this.q_services.length; i++) {
        if (this.q_services[i].variant.price != undefined) {
          console.log(parseFloat(this.q_services[i].variant.price));
          this.total_v += parseFloat(this.q_services[i].variant.price);
          this.q_services[i].service.price = parseFloat(
            this.q_services[i].variant.price
          );
        } else {
          this.total_s += parseFloat(this.q_services[i].service.price);
        }
      }

      this.total = this.total_s + this.total_v;
      this.total_disc = this.total;
      this.quotation_amount = this.total;
      this.payment = this.total;
      this.number = 1;
      this.calc = true;

      this.installments = [];
      const startDate = new Date().toISOString().substr(0, 10);
      const amount = this.payment;
      const type = "DPAY";
      const scale = "1/" + this.number;
      const pay = {
        startDate,
        amount,
        type,
        scale,
      };
      this.installments = [...this.installments, pay];
      this.value_opt = "";
      this.aply();
      loading.close();
      this.$refs.tree.setCheckedKeys([]);
    },

    async aply() {
      this.discount_code = "";
      this.discount_type = "";
      this.discount_value = 0;
      this.discount_amount = 0;
      if (this.discount_id != "") {
        for (let i = 0; i < this.discounts.length; i++) {
          if (this.discount_id == this.discounts[i].discount_code) {
            this.discount_code = this.discounts[i].discount_code;
            this.discount_type = this.discounts[i].discount_type;
            this.discount_value = this.discounts[i].discount_value;
            this.is_discount = "Y";
            this.l_discount.push(this.discounts[i]);
          }
        }
      }
      console.log(this.l_discount);
      this.quotation_amount = this.total;
      if (this.discount_type == "F") {
        this.discount_amount = this.discount_value;
      }
      if (this.discount_type == "P") {
        this.discount_amount =
          (this.quotation_amount * this.discount_value) / 100;
      }
      this.total_disc = this.quotation_amount - this.discount_amount;
    },

    async aply_calc() {
      var num = 0;
      if (!this.payment || !this.number || !this.total_disc)
        return alert("error en datos");
      this.calc = true;
      let cant_amounts = 0;
      this.installments = [];
      const startDate = new Date().toISOString().substr(0, 10);
      const amount = this.payment;
      const type = "DPAY";
      num = parseInt(this.number, 10) + 1;
      console.log(num);
      const scale = "1/" + num;
      const pay = {
        startDate,
        amount,
        type,
        scale,
      };
      this.installments = [...this.installments, pay];
      cant_amounts = (this.total_disc - this.payment) / this.number;

      for (let i = 0; i < this.number; i++) {
        const type = "INST";
        const s = i + 2;
        const scale = s + "/" + num;
        const d = new Date();
        const startDate = new Date(d.setMonth(d.getMonth() + i + 1))
          .toISOString()
          .substr(0, 10);

        const amount = cant_amounts;
        const todo = {
          startDate,
          amount,
          type,
          scale,
        };
        this.installments = [...this.installments, todo];
      }
    },

    async createQuotes(item) {
      const loading = this.$loading({
        lock: true,
        text: "Create Quote",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      console.log(item);
      console.log(this.l_discount);
      console.log(this.lead);
      console.log(this.editedItemLeads);
      if (this.lead.id != undefined) {
        this.editedItemLeads = this.lead;
        this.editedItemLeads.name = JSON.parse(this.lead.l_smName)[0].firstName;
        this.editedItemLeads.last_name = JSON.parse(
          this.lead.l_smName
        )[0].lastName;
      }
      var downPayment = 0;
      var numInstallments = 0;
      const seq = await API.graphql({
        query: listQuotes,
        variables: {
          filter: {
            PK: {
              eq: this.organizationID,
            },
            SK: {
              eq: "QUO#",
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
      const sequence = seq.data.listQuotes;
      const c = sequence.length++;
      var PK = this.organizationID;
      const id = uuid.v1();
      var SK = "QUO#" + id;
      const GSP1PK1 = this.editedItemLeads.SK;
      const GSP1SK1 = SK;
      var GSP2PK1 = SK;
      var GSP2SK1 = "#META#";
      const revisitDate = new Date().toISOString().substr(0, 10);
      const entityType = "QUOTE";
      const GSP4PK1 = this.organizationID;
      const GSP4SK1 = "QUO#" + revisitDate;
      const createdAt = new Date().toISOString().substr(0, 10);
      var updateAt = new Date().toISOString().substr(0, 10);
      const createdBy = this.usuario;
      const active = "1";
      const smName = "Q" + c;
      const subject = item.subject;
      const introduction = item.introduction;
      const conclusion = this.conclusion;
      const internalComments = item.internalComments;
      const isDiscount = this.is_discount;
      const isInstallment = this.is_installment;
      if (isInstallment == false) {
        downPayment = this.total_disc;
        numInstallments = this.number;
      } else {
        downPayment = this.payment;
        numInstallments = this.number;
      }

      const disccountAmount = this.discount_amount;
      const l_discount = JSON.stringify(this.l_discount);
      const quotationAmount = this.total;
      const finalAmount = this.total_disc;
      const processStatus = item.processStatus;
      const live = "Y";
      const customerName =
        this.editedItemLeads.name + " " + this.editedItemLeads.last_name;

      const todo = {
        PK,
        id,
        SK,
        GSP1PK1,
        GSP1SK1,
        GSP2PK1,
        GSP2SK1,
        GSP4PK1,
        GSP4SK1,
        entityType,
        createdAt,
        updateAt,
        revisitDate,
        createdBy,
        active,
        smName,
        customerName,
        conclusion,
        internalComments,
        subject,
        introduction,
        isDiscount,
        l_discount,
        disccountAmount,
        quotationAmount,
        finalAmount,
        isInstallment,
        processStatus,
        live,
        downPayment,
        numInstallments,
      };

      const a = await API.graphql({
        query: createRecord,
        variables: { input: todo },
      });
      //update customer
      var id_quote = a.data.createRecord.SK;
      var GSP2PK1 = a.data.createRecord.SK;
      var GSP2SK1 = this.editedItemLeads.SK;
      SK = this.editedItemLeads.SK;
      PK = this.editedItemLeads.PK;

      const seekingService = "N";
      const l = { SK, PK, GSP2PK1, GSP2SK1, seekingService };
      await API.graphql({
        query: updateRecord,
        variables: { input: l },
      });

      let price = 0;
      for (let i = 0; i < this.q_services.length; i++) {
        const id = uuid.v1();
        const SK = "QIT#" + id;
        const GSP1PK1 = this.editedItemLeads.SK;
        const GSP1SK1 = SK;
        const GSP2PK1 = id_quote;
        const GSP2SK1 = SK;
        const GSP4PK1 = this.organizationID;
        const GSP4SK1 = "TASK#" + new Date().toISOString().substr(0, 10);
        const entityType = "QUOTEITEM";
        const createdAt = new Date().toISOString().substr(0, 10);
        const updateAt = new Date().toISOString().substr(0, 10);
        const createdBy = this.usuario;
        const active = "1";
        const smName = this.q_services[i].service.smName;
        const description = this.q_services[i].service.description;
        price = parseFloat(this.q_services[i].service.price);
        const typeName = this.q_services[i].service.typeName;
        const otherType = this.q_services[i].service.otherType;
        const isRecurrent = this.q_services[i].service.isRecurrent;
        const isVariant = this.q_services[i].service.isVariant;
        const internalComments = this.q_services[i].service.internalComments;
        const customerName =
          this.editedItemLeads.name + " " + this.editedItemLeads.last_name;

        const t = {
          PK,
          SK,
          id,
          GSP1PK1,
          GSP1SK1,
          GSP2PK1,
          GSP2SK1,
          GSP4PK1,
          GSP4SK1,
          entityType,
          createdAt,
          updateAt,
          createdBy,
          active,
          smName,
          description,
          price,
          typeName,
          otherType,
          isRecurrent,
          isVariant,
          internalComments,
          customerName,
        };
        await API.graphql({
          query: createRecord,
          variables: { input: t },
        });
      }

      if (this.installments != null) {
        let inst = "";
        for (let i = 0; i < this.installments.length; i++) {
          const id = uuid.v1();
          const SK = "INS#" + id;
          const GSP1PK1 = this.editedItemLeads.SK;
          const GSP1SK1 = SK;
          const GSP2PK1 = id_quote;
          const GSP2SK1 = SK;
          const GSP4PK1 = this.organizationID;
          const GSP4SK1 = "PAY#" + this.installments[i].startDate;
          const entityType = "INSTALLMENT";
          const createdAt = new Date().toISOString().substr(0, 10);
          const updateAt = new Date().toISOString().substr(0, 10);
          const createdBy = this.usuario;
          const active = "1";
          const startDate = this.installments[i].startDate;
          const amount = this.installments[i].amount;
          const type = this.installments[i].type;
          const scale = this.installments[i].scale;
          const isPaid = "N";
          const customerName =
            this.editedItemLeads.name + " " + this.editedItemLeads.last_name;

          inst = {
            PK,
            SK,
            id,
            GSP1PK1,
            GSP1SK1,
            GSP2PK1,
            GSP2SK1,
            GSP4PK1,
            GSP4SK1,
            entityType,
            createdAt,
            updateAt,
            createdBy,
            active,
            startDate,
            amount,
            type,
            isPaid,
            customerName,
            scale,
          };
          await API.graphql({
            query: createRecord,
            variables: { input: inst },
          });
        }
      }

      this.name = "";
      this.q_services = [];
      this.installments = [];
      this.quotes_created = [];
      this.quotes_s = [];
      this.quotes_va = [];
      this.is_installment = true;
      this.calc = false;
      this.number = 1;
      this.payment = 1;
      this.conclusion = "";
      loading.close();
    },

    async updateQuote(item) {
      const loading = this.$loading({
        lock: true,
        text: "Update Quote",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      console.log(item);
      console.log(this.l_discount);
      if (this.lead.id != undefined) {
        this.editedItemLeads = this.lead;
      }
      var downPayment = 0;
      var numInstallments = 0;
      var todo = [];
      var PK = item.PK;
      var SK = item.SK;
      const GSP1PK1 = this.editedItemLeads.SK;
      const GSP4SK1 = "QUO#" + item.revisitDate;
      var updateAt = new Date().toISOString().substr(0, 10);
      const subject = item.subject;
      const introduction = item.introduction;
      const conclusion = this.conclusion;
      const internalComments = item.internalComments;
      const isDiscount = this.is_discount;
      const isInstallment = this.is_installment;
      if (isInstallment == false) {
        downPayment = this.total_disc;
        numInstallments = this.number;
      } else {
        downPayment = this.payment;
        numInstallments = this.number;
      }
      var list_e = "";
      for (let i = 0; i < this.l_discount.length; i++) {
        list_e += JSON.stringify(this.l_discount[i]) + ",";
      }
      const disccountAmount = this.discount_amount;
      const l_discount = list_e.slice(0, -1);
      const quotationAmount = this.total;
      const finalAmount = this.total_disc;
      const processStatus = item.processStatus;
      const live = item.live;
      const customerName =
        this.editedItemLeads.name + " " + this.editedItemLeads.last_name;
      todo = {
        PK,
        SK,
        GSP1PK1,
        GSP4SK1,
        updateAt,
        customerName,
        conclusion,
        internalComments,
        subject,
        introduction,
        isDiscount,
        l_discount,
        disccountAmount,
        quotationAmount,
        finalAmount,
        isInstallment,
        processStatus,
        live,
        downPayment,
        numInstallments,
      };

      if (!this.q_services || !this.editedItemLeads.id)
        return alert("error en datos");

      await API.graphql({
        query: updateRecord,
        variables: { input: todo },
      });

      //update customer
      var id_quote = item.SK;
      var GSP2PK1 = id_quote;
      var GSP2SK1 = this.editedItemLeads.SK;
      SK = this.editedItemLeads.SK;
      PK = this.editedItemLeads.PK;
      const seekingService = "N";
      const l = { SK, PK, GSP2PK1, GSP2SK1, seekingService };
      await API.graphql({
        query: updateRecord,
        variables: { input: l },
      });
      console.log(this.q_services);
      //update quoteitems
      const list_q = await API.graphql({
        query: listQuotes,
        variables: {
          filter: {
            PK: {
              eq: this.organizationID,
            },
            SK: {
              eq: id_quote,
            },
            indexs: {
              eq: "2",
            },
            active: {
              eq: "1",
            },
          },
        },
      });
      var list_quote = list_q.data.listQuotes;
      var qitem = [];
      for (let i = 0; i < list_quote.length; i++) {
        if (list_quote[i].entityType == "QUOTEITEM") {
          qitem.push(list_quote[i]);
        }
      }
      for (let i = 0; i < qitem.length; i++) {
        const PK = qitem[i].PK;
        const SK = qitem[i].SK;
        const todo = {
          PK,
          SK,
        };
        await API.graphql({
          query: deleteInstallments,
          variables: { input: todo },
        });
      }
      let price = 0;
      for (let i = 0; i < this.q_services.length; i++) {
        const id = uuid.v1();
        const PK = this.organizationID;
        const SK = "QIT#" + id;
        const GSP1PK1 = this.editedItemLeads.SK;
        const GSP1SK1 = SK;
        const GSP2PK1 = id_quote;
        const GSP2SK1 = SK;
        const GSP4PK1 = this.organizationID;
        const GSP4SK1 = "TASK#" + new Date().toISOString().substr(0, 10);
        const entityType = "QUOTEITEM";
        const createdAt = new Date().toISOString().substr(0, 10);
        const updateAt = new Date().toISOString().substr(0, 10);
        const createdBy = this.usuario;
        const active = "1";
        const smName = this.q_services[i].service.smName;
        const description = this.q_services[i].service.description;
        price = parseFloat(this.q_services[i].service.price);
        const typeName = this.q_services[i].service.typeName;
        const otherType = this.q_services[i].service.otherType;
        const isRecurrent = this.q_services[i].service.isRecurrent;
        const isVariant = this.q_services[i].service.isVariant;
        const internalComments = this.q_services[i].service.internalComments;
        const customerName =
          this.editedItemLeads.name + " " + this.editedItemLeads.last_name;

        const t = {
          PK,
          SK,
          id,
          GSP1PK1,
          GSP1SK1,
          GSP2PK1,
          GSP2SK1,
          GSP4PK1,
          GSP4SK1,
          entityType,
          createdAt,
          updateAt,
          createdBy,
          active,
          smName,
          description,
          price,
          typeName,
          otherType,
          isRecurrent,
          isVariant,
          internalComments,
          customerName,
        };
        await API.graphql({
          query: createRecord,
          variables: { input: t },
        });
      }
      //update installments
      if (this.installments != null) {
        const seq = await API.graphql({
          query: listQuotes,
          variables: {
            filter: {
              PK: {
                eq: this.organizationID,
              },
              SK: {
                eq: id_quote,
              },
              indexs: {
                eq: "2",
              },
              active: {
                eq: "1",
              },
            },
          },
        });
        var datas = seq.data.listQuotes;
        var ins = [];
        for (let i = 0; i < datas.length; i++) {
          if (datas[i].entityType == "INSTALLMENT") {
            ins.push(datas[i]);
          }
        }
        for (let i = 0; i < ins.length; i++) {
          const PK = ins[i].PK;
          const SK = ins[i].SK;
          const todo = {
            PK,
            SK,
          };
          await API.graphql({
            query: deleteInstallments,
            variables: { input: todo },
          });
        }
        let inst = "";
        for (let i = 0; i < this.installments.length; i++) {
          const id = uuid.v1();
          const SK = "INS#" + id;
          const GSP1PK1 = this.editedItemLeads.SK;
          const GSP1SK1 = SK;
          const GSP2PK1 = id_quote;
          const GSP2SK1 = SK;
          const GSP4PK1 = this.organizationID;
          const GSP4SK1 = "PAY#" + this.installments[i].startDate;
          const entityType = "INSTALLMENT";
          const createdAt = new Date().toISOString().substr(0, 10);
          const updateAt = new Date().toISOString().substr(0, 10);
          const createdBy = this.usuario;
          const active = "1";
          const startDate = this.installments[i].startDate;
          const amount = this.installments[i].amount;
          const type = this.installments[i].type;
          const scale = this.installments[i].scale;
          const isPaid = "N";
          const customerName =
            this.editedItemLeads.name + " " + this.editedItemLeads.last_name;

          inst = {
            PK,
            SK,
            id,
            GSP1PK1,
            GSP1SK1,
            GSP2PK1,
            GSP2SK1,
            GSP4PK1,
            GSP4SK1,
            entityType,
            createdAt,
            updateAt,
            createdBy,
            active,
            startDate,
            amount,
            isPaid,
            type,
            customerName,
            scale,
          };
          await API.graphql({
            query: createRecord,
            variables: { input: inst },
          });
        }
      }

      this.name = "";
      this.q_services = [];
      this.installments = [];
      this.quotes_created = [];
      this.quotes_s = [];
      this.quotes_va = [];
      this.is_installment = true;
      this.calc = false;
      this.number = 1;
      this.payment = 1;
      this.conclusion = "";
      loading.close();
    },

    async updateServices(item) {
      console.log(item.SK.slice(0, 4));
      if (item.SK.slice(0, 4) != "PRO#") {
        var l_team = "";
        this.variants = [];
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
        const internalComments = item.internalComments;
        const l_variant = l_team.slice(0, -1);
        const customerName =
          this.editedItemLeads.name + " " + this.editedItemLeads.last_name;
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
            internalComments,
            l_variant,
            customerName,
          };
          const prod = await API.graphql({
            query: updateRecord,
            variables: { input: todo },
          });
          console.log(prod);
          const seq = await API.graphql({
            query: listQuotes,
            variables: {
              filter: {
                PK: {
                  eq: this.organizationID,
                },
                SK: {
                  eq: item.GSP2PK1,
                },
                indexs: {
                  eq: "2",
                },
                active: {
                  eq: "1",
                },
              },
            },
          });
          const services = [];
          this.q_services = [];
          var servi = [];
          var vari = [];
          var datas = seq.data.listQuotes;
          console.log(datas);
          for (let i = 0; i < datas.length; i++) {
            if (datas[i].entityType == "QUOTEITEM") {
              services.push(datas[i]);
            }
          }
          console.log(services);
          for (let j = 0; j < services.length; j++) {
            vari = [];
            servi = [];
            servi = services[j];
            this.q_services.push({
              service: servi,
              variant: vari,
            });
          }
          console.log(this.q_services);
        }
        this.aply();
      } else {
        console.log("cambair local");
        this.total = 0;
        this.total_s = 0;

        Object.assign(this.q_services[this.editedIndexServi].service, item);
        for (let i = 0; i < this.q_services.length; i++) {
          this.total_s += parseFloat(this.q_services[i].service.price);
        }
        console.log(this.q_services);
        this.total = this.total_s;
        this.payment = this.total;
        this.number = 1;
        this.calc = true;

        this.installments = [];
        const startDate = new Date().toISOString().substr(0, 10);
        const amount = this.payment;
        const type = "DPAY";
        const scale = "1/1";
        const pay = {
          startDate,
          amount,
          type,
          scale,
        };
        this.installments = [...this.installments, pay];
        this.aply();
      }
    },

    OpenSentEmail(item) {
      this.dialog_email = true;
      this.list_email = [];
      this.send_email = [];
      console.log(this.listemails);
      if (this.listemails.length > 0) {
        for (let i = 0; i < this.listemails.length; i++) {
          let e_type = this.listemails[i].e_type;
          let email = this.listemails[i].email;
          const todo = {
            email,
            e_type,
          };
          this.list_email = [...this.list_email, todo];
        }
      }
      this.send_email.push({
        name: item.customerName,
        emails: this.list_email,
        quoteSK: item.SK,
      });
      this.SetBody(item);
    },

    async invokeLambda(quoteSK) {
      var AWS = require("aws-sdk");

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

      const com = todos.data.getOrganization[0];
      const quotePK = this.organizationID;
      const user = this.usuario;
      var REGION = com.funcRegion;
      var identityPoolId = com.funcIdentityPoolId;

      AWS.config.update({
        region: REGION,
      });

      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: identityPoolId,
      });

      var lambda = new AWS.Lambda({
        region: REGION,
        apiVersion: "2015-03-31",
      });

      this.selectedEmails = [...this.selectedEmails, "ucidanais@gmail.com"];
      this.selectedEmails = [...this.selectedEmails, "alberto@bizplaneasy.com"];
      this.selectedEmails = [...this.selectedEmails, "info@bizplaneasy.com"];

      for (let i = 0; i < this.selectedEmails.length; i++) {
        var pullParams = {
          FunctionName: com.funcName,
          InvocationType: "RequestResponse",
          Payload:
            '{ "toAddresses": "' +
            this.selectedEmails[i] +
            '","source":"' +
            com.funcSource +
            '","subject":"' +
            "Your Quote: (" +
            this.editedItem_c.smName +
            ") from BizPlanEasy: " +
            this.editedItem_c.subject +
            '","body":"' +
            this.body +
            '"}',
          LogType: "None",
        };
        var pullResults = null;
        await lambda.invoke(pullParams, async function (error, data) {
          if (error) {
            prompt(error);
          } else {
            pullResults = JSON.parse(data.Payload);
            console.log(pullResults);

            if (pullResults.MessageId) {
              const emailSent = "Y";
              const sentDate = new Date().toISOString().substr(0, 10);
              const sentBy = user;
              const PK = quotePK;
              const SK = quoteSK;
              const todo = { emailSent, sentDate, sentBy, PK, SK };
              await API.graphql({
                query: updateRecord,
                variables: { input: todo },
              });
              this.alert = true;
            }
          }
        });
      }
      await this.close_email();
    },

    async editItem(item) {
      this.q_services = [];
      this.installments = [];
      this.list_phone = [];
      this.list_email = [];
      this.list_address = [];

      if (item.processStatus == "Created") {
        this.editedIndex = this.quotes_created.indexOf(item);
      }
      if (item.processStatus == "Negotiations") {
        this.editedIndex = this.quotes_s.indexOf(item);
      }
      if (item.processStatus == "Verbal Agreement") {
        this.editedIndex = this.quotes_va.indexOf(item);
      }

      this.editedItem_c = Object.assign({}, item);
      this.conclusion = item.conclusion;
      this.number = item.numInstallments;
      this.payment = item.downPayment;
      console.log(this.editedItem_c);

      const seq = await API.graphql({
        query: listQuotes,
        variables: {
          filter: {
            PK: {
              eq: this.organizationID,
            },
            SK: {
              eq: item.SK,
            },
            indexs: {
              eq: "2",
            },
            active: {
              eq: "1",
            },
          },
        },
      });
      console.log(seq.data.listQuotes);
      var datas = seq.data.listQuotes;
      var quotes = [];
      var leads = [];
      var installments = [];
      var services = [];
      let vari = [];
      let servi = [];
      this.editedItemLeads = [];

      for (let i = 0; i < datas.length; i++) {
        if (datas[i].entityType == "QUOTE") {
          quotes.push(datas[i]);
        }
        if (datas[i].entityType == "CUSTOMER") {
          leads.push(datas[i]);
        }
        if (datas[i].entityType == "INSTALLMENT") {
          installments.push(datas[i]);
        }
        if (datas[i].entityType == "QUOTEITEM") {
          services.push(datas[i]);
        }
      }
      console.log(services);

      for (let j = 0; j < services.length; j++) {
        vari = [];
        servi = [];
        servi = services[j];
        this.q_services.push({
          service: servi,
          variant: vari,
        });
      }
      for (let k = 0; k < installments.length; k++) {
        this.is_installment = true;
        this.calc = true;
        this.installments.push(installments[k]);
      }

      for (let l = 0; l < leads.length; l++) {
        this.editedItemLeads = leads[l];
      }

      this.editedItemLeads.name = JSON.parse(
        this.editedItemLeads.l_smName
      )[0].firstName;

      this.editedItemLeads.last_name = JSON.parse(
        this.editedItemLeads.l_smName
      )[0].lastName;

      if (JSON.parse(this.editedItemLeads.l_email)[0]) {
        for (
          let i = 0;
          i < JSON.parse(this.editedItemLeads.l_email).length;
          i++
        ) {
          let e_type = JSON.parse(this.editedItemLeads.l_email)[i].e_type;
          let email = JSON.parse(this.editedItemLeads.l_email)[i].email;
          const todo = {
            email,
            e_type,
          };
          this.list_email = [...this.list_email, todo];
        }
      }

      const todos = await API.graphql({
        query: listPhoneNumber,
        variables: { filter: { GSP1PK1: { eq: this.editedItemLeads.SK } } },
      });
      this.phones = todos.data.listPhoneNumber;
      console.log(this.phones);

      if (this.phones.length > 0) {
        for (let i = 0; i < this.phones.length; i++) {
          let phone = this.phones[i].value;
          let p_type = this.phones[i].type;
          const todo = {
            phone,
            p_type,
          };
          this.list_phone = [...this.list_phone, todo];
        }
      }

      if (JSON.parse(this.editedItemLeads.l_smAddress)[0]) {
        for (
          let i = 0;
          i < JSON.parse(this.editedItemLeads.l_smAddress).length;
          i++
        ) {
          let country = JSON.parse(this.editedItemLeads.l_smAddress)[i].country;
          let state = JSON.parse(this.editedItemLeads.l_smAddress)[i].state;
          let city = JSON.parse(this.editedItemLeads.l_smAddress)[i].city;
          let street_address = JSON.parse(this.editedItemLeads.l_smAddress)[i]
            .street_address;
          let zip_code = JSON.parse(this.editedItemLeads.l_smAddress)[i]
            .zip_code;
          let a_type = JSON.parse(this.editedItemLeads.l_smAddress)[i].a_type;
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

      if (JSON.parse(item.l_discount)[0]) {
        this.discount_id = JSON.parse(item.l_discount)[0].discount_code;
      }

      this.total = item.quotationAmount;
      this.total_disc = item.finalAmount;
      this.dialog = true;
    },

    closedetalle() {
      this.dialog_detalle = false;
    },

    closedelete() {
      this.dialog_delete = false;
    },

    deleteItem(item) {},

    close() {
      this.list_phone = [];
      this.list_email = [];
      this.list_address = [];
      this.conclusion = "";
      const lead = "";
      this.SetPhone(this.list_phone);
      this.SetEmails(this.list_email);
      this.SetAddress(this.list_address);
      this.SetLead(lead);
      this.dialog = false;
      this.editedItemLeads.name = "";
      this.editedItemLeads.lastname = "";
      this.q_services = [];
      this.discount_id = "";
      this.total = "";
      this.total_disc = "";
      this.installments = [];
      this.is_installment = true;
      this.calc = false;
      this.number = 1;
      this.payment = 1;
      this.$nextTick(() => {
        this.editedItem_c = Object.assign({}, this.defaultItem_c);
        this.editedIndex = -1;
      });
      this.$refs.tree.setCheckedKeys([]);
    },

    openDialog() {
      this.dialog = true;
    },

    async save() {
      if (this.editedIndex > -1) {
        console.log("edit");
        await this.updateQuote(this.editedItem_c);
      } else {
        console.log("crear");
        await this.createQuotes(this.editedItem_c);
      }
      this.close();
      this.fillData();
    },

    editServiceItem(item) {
      console.log(item);
      this.editedIndexServi = this.q_services.indexOf(item);
      this.editedServiceItem = Object.assign({}, item.service);
      this.dialog_service = true;
    },

    deleteService(item) {
      this.dialog_delete = true;
      this.item_service = item;
    },

    async deleteServiceItem() {
      const loading = this.$loading({
        lock: true,
        text: "Delete Services",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      this.total = 0;
      this.total_v = 0;
      this.total_s = 0;
      const index = this.q_services.indexOf(this.item_service);
      this.q_services.splice(index, 1);

      const todos = await API.graphql({
        query: listQuoteItems,
        variables: {
          filter: {
            active: { eq: "1" },
            SK: {
              eq: "QIT#",
            },
            PK: { eq: this.organizationID },
            indexs: {
              eq: "table_items",
            },
            GSP1SK1: {
              eq: this.item_service.service.SK,
            },
          },
        },
      });

      if (todos.data.listQuoteItems[0]) {
        const SK = this.item_service.service.SK;
        const PK = this.item_service.service.PK;
        const active = "0";

        const t = {
          PK,
          SK,
          active,
        };
        const sq = await API.graphql({
          query: updateRecord,
          variables: { input: t },
        });
      }

      for (let i = 0; i < this.q_services.length; i++) {
        this.total_s += parseFloat(this.q_services[i].service.price);
      }

      this.total = this.total_s + this.total_v;
      this.total_disc = this.total;
      this.quotation_amount = this.total;
      this.payment = this.total;
      this.number = 1;
      this.calc = true;

      this.installments = [];
      const startDate = new Date().toISOString().substr(0, 10);
      const amount = this.payment;
      const type = "DPAY";
      const scale = "1/1";
      const pay = {
        startDate,
        amount,
        type,
        scale,
      };
      this.installments = [...this.installments, pay];
      console.log(this.q_services);
      this.closedelete();
      loading.close();
    },

    saveservice() {
      console.log("edit");
      this.updateServices(this.editedServiceItem);
      this.closeservice();
    },

    closeservice() {
      this.dialog_service = false;
      this.$nextTick(() => {
        this.editedServiceItem = Object.assign({}, this.defaulServicetItem);
        // this.editedIndex = -1;
      });
    },

    editItem_v(item) {
      this.editedIndex_v = this.installments.indexOf(item);
      this.editedItem_v = Object.assign({}, item);
      this.dialog_v = true;
    },

    deleteItem_v(item) {
      const index = this.installments.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.installments.splice(index, 1);
    },

    close_v() {
      this.dialog_v = false;
      this.$nextTick(() => {
        this.editedItem_v = Object.assign({}, this.defaultItem_v);
        this.editedIndex_v = -1;
      });
    },

    async save_v() {
      this.updateInstallment();
      this.close_v();
    },

    async updateInstallment() {
      Object.assign(this.installments[this.editedIndex_v], this.editedItem_v);
    },

    deleteItemLead() {
      const loading = this.$loading({
        lock: true,
        text: "Delete Customer",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      console.log("delete");
      this.list_phone = [];
      this.list_email = [];
      this.list_address = [];
      this.SetPhone(this.list_phone);
      this.SetEmails(this.list_email);
      this.SetAddress(this.list_address);

      this.lead_id = "";
      this.customer = "";
      this.select_leads = [];
      this.editedItemLeads = this.defaultItemLeads;
      this.$refs.tree_leads.setCheckedKeys([]);
      loading.close();
    },

    close_email() {
      this.dialog_email = false;
      this.send_email = {};
      this.selectedEmails = [];
    },

    async editItemLead() {
      this.editedIndexLead = 1;
      this.list_email = [];
      this.list_phone = [];
      this.list_address = [];
      this.SetPhone(this.list_phone);
      this.SetEmails(this.list_email);
      this.SetAddress(this.list_address);

      if (JSON.parse(this.editedItemLeads.l_email)[0]) {
        for (
          let i = 0;
          i < JSON.parse(this.editedItemLeads.l_email).length;
          i++
        ) {
          let e_type = JSON.parse(this.editedItemLeads.l_email)[i].e_type;
          let email = JSON.parse(this.editedItemLeads.l_email)[i].email;
          const todo = {
            email,
            e_type,
          };
          this.list_email = [...this.list_email, todo];
        }
      }
      const todos = await API.graphql({
        query: listPhoneNumber,
        variables: { filter: { GSP1PK1: { eq: this.editedItemLeads.SK } } },
      });
      this.phones = todos.data.listPhoneNumber;
      console.log(this.phones);

      if (this.phones.length > 0) {
        for (let i = 0; i < this.phones.length; i++) {
          let phone = this.phones[i].value;
          let p_type = this.phones[i].type;
          const todo = {
            phone,
            p_type,
          };
          this.list_phone = [...this.list_phone, todo];
        }
      }

      if (JSON.parse(this.editedItemLeads.l_smAddress)[0]) {
        for (
          let i = 0;
          i < JSON.parse(this.editedItemLeads.l_smAddress).length;
          i++
        ) {
          let country = JSON.parse(this.editedItemLeads.l_smAddress)[i].country;
          let state = JSON.parse(this.editedItemLeads.l_smAddress)[i].state;
          let city = JSON.parse(this.editedItemLeads.l_smAddress)[i].city;
          let street_address = JSON.parse(this.editedItemLeads.l_smAddress)[i]
            .street_address;
          let zip_code = JSON.parse(this.editedItemLeads.l_smAddress)[i]
            .zip_code;
          let a_type = JSON.parse(this.editedItemLeads.l_smAddress)[i].a_type;
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

      this.dialog_lead = true;
    },

    async ItemLeadT(item) {
      this.editedIndexLead = this.leads.indexOf(item);
      this.editedItemLeads = Object.assign({}, item);
      this.editedItemLeads.name = JSON.parse(item.l_smName)[0].fullName;
      this.list_email = [];
      this.list_phone = [];
      this.list_address = [];
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
          const todo = {
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
      this.dialog = true;
    },

    closeLead() {
      this.see_leads = false;
      this.sm_analized = "4";
      this.md_analized = "4";
      this.sm_negotiation = "4";
      this.md_negotiation = "4";
      this.sm_verbal = "4";
      this.md_verbal = "4";
    },
    getColor(item) {
      if (item == "INST") return "blue";
      else if (item == "DPAY") return "green";
      else return "orange";
    },
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.list.filter((item) => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options = [];
      }
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
}
.col-12 {
  padding: 12px !important;
}
.v-card__subtitle,
.v-card__text,
.v-card__title {
  padding: 5px;
}

.v-list-item {
  min-height: 0px;
}
.el-menu--horizontal ul.el-menu.el-menu--popup.el-menu--popup-bottom-start {
  left: 50% !important;
  right: auto !important;
  transform: translate(-50%, 0) !important;
  text-align: left;
  display: block !important;
  position: absolute !important;
}
</style>