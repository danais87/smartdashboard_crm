<template>
  <v-navigation-drawer
    id="core-navigation-drawer"
    v-model="drawer"
    :dark="barColor !== 'rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)'"
    :expand-on-hover="expandOnHover"
    mobile-breakpoint="960"
    app
  >
    <v-list expand nav>
      <template v-for="(item, i) in computedItems">
        <base-item-group v-if="item.children" :key="`group-${i}`" :item="item">
        </base-item-group>
        <base-item v-else :key="`item-${i}`" :item="item" />
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import { mapState } from "vuex";

export default {
  name: "DashboardCoreDrawer",

  props: {
    expandOnHover: {
      type: Boolean,
      default: true,
    },
  },

  data: () => ({
    items: [
      {
        icon: "mdi-view-dashboard",
        title: "dashboard",
        to: "/index",
      },
      {
        icon: "mdi-account",
        title: "org",
        to: "/menu/organization",
      },
      {
        icon: "mdi-account",
        title: "user",
        to: "/menu/customer",
      },
      {
        icon: "mdi-chart-bubble",
        title: "pro",
        to: "/menu/products",
      },
      {
        icon: "mdi-clipboard-outline",
        title: "quo",
        to: "/menu/quotes",
      },
      {
        icon: "mdi-clipboard-outline",
        title: "invo",
        to: "/menu/invoice",
      },
      {
        icon: "mdi-information-outline",
        title: "pay",
        to: "/menu/payments",
      },
      {
        icon: "mdi-information-outline",
        title: "task",
        to: "/menu/task",
      },
      {
        icon: "mdi-information-outline",
        title: "se",
        to: "/menu/setting",
      },
 
      /* {
        title: "rtables",
        icon: "mdi-clipboard-outline",
        to: "/tables/regular-tables",
      },
      {
        title: "typography",
        icon: "mdi-format-font",
        to: "/components/typography",
      },
      {
        title: "icons",
        icon: "mdi-chart-bubble",
        to: "/components/icons",
      },
      {
        title: "google",
        icon: "mdi-map-marker",
        to: "/maps/google-maps",
      },
      {
        title: "notifications",
        icon: "mdi-bell",
        to: "/components/notifications",
      },*/
    ],
  }),

  computed: {
    ...mapState(["barColor", "barImage"]),
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(val) {
        this.$store.commit("SET_DRAWER", val);
      },
    },
    computedItems() {
      return this.items.map(this.mapItem);
    },
    profile() {
      return {
        avatar: true,
        title: this.$t("avatar"),
      };
    },
  },

  methods: {
    mapItem(item) {
      return {
        ...item,
        children: item.children ? item.children.map(this.mapItem) : undefined,
        title: this.$t(item.title),
      };
    },
  },
};
</script>

<style scoped>
.v-application .primary {
  background-color: rgba(228, 226, 226, 0.404) !important;
}
.v-list--nav .v-list-item {
  padding: 0 0px;
}
</style>