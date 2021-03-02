<template>
  <v-dialog v-model="show"  max-width="700" >
    <v-card>
      <v-card-title>
        <span class="headline">List from Library:</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-select
                v-model="content"
                :items="library"
                label="Select Library"
                item-text="title"
                item-value="description"
                dense
                solo
              ></v-select>
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <v-textarea
                outlined
                name="Content"
                v-model="content"
                required
                label="Content:"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="saves">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
import Vuex from "vuex";
import { getOrganization, listOrganizations } from "../../../graphql/queries";
import { API } from "aws-amplify";
export default {
  name: "Home",
  components: {},
  props: {
    value: Boolean,
  },
  data() {
    return {
      library: [],
      apiRequest: false,
      id_lab: "",
      content: "",
      headers_m: [
        { text: "Type", align: "start", sortable: true, value: "e_type" },
        { text: "Email", align: "start", sortable: true, value: "email" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        id: "",
        title: "",
        content: "",
      },
      defaultItem: {
        id: "",
        title: "",
        content: "",
      },
      organization: [],
    };
  },

  computed: {
    ...Vuex.mapState(["organizationID", "leads", "listemails", "conclusion"]),
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
    this.getLibrarys();
    //this.list_emaillocal = this.listemails;
  },

  watch: {},

  methods: {
    ...Vuex.mapActions(["GetLeads"]),
    ...Vuex.mapMutations(["SetConclusion", "GetConclusion"]),

    async getLibrarys() {
      this.library = [];
      const todos = await API.graphql({
        query: listOrganizations,
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

      this.organization = todos.data.listOrganizations[0];
      //Library
      if (this.organization.l_quoteLibrary[0]) {
        for (
          let i = 0;
          i < JSON.parse(this.organization.l_quoteLibrary).length;
          i++
        ) {
          if (
            JSON.parse(this.organization.l_quoteLibrary)[i].description != ""
          ) {
            let title = JSON.parse(this.organization.l_quoteLibrary)[i].title;
            let description = JSON.parse(this.organization.l_quoteLibrary)[i]
              .description;
            let abbreviation = JSON.parse(this.organization.l_quoteLibrary)[i]
              .abbreviation;
            let status = JSON.parse(this.organization.l_quoteLibrary)[i].status;
            const todo = {
              title,
              description,
              abbreviation,
              status,
            };
            this.library = [...this.library, todo];
          }
        }
      }
      console.log(this.library );
    },

    async saves() {
      this.SetConclusion(this.content);
      this.close();
    },

    close() {
      this.show = false;
      this.id_lab = "";
      this.content = "";
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      console.log(this.conclusion);
      this.$emit("conclucion", this.conclusion);
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
</style>