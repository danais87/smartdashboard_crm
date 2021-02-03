<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>

<style scoped>
.v-main {
  padding: 0px 0px 0px 0px !important;
}
.row {
  margin-left: 5px !important;
  flex: unset;
}
.col .col-sm-2 .col-md-2 .col-12 {
  padding: 2px !important;
}
</style>