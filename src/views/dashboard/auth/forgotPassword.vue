<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <v-col cols="12">
        <router-link to="/">
          <v-img :src="require('../../../assets/logo.svg')" class="my-3" contain height="65" />
        </router-link>
      </v-col>
      <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>Confirm user</v-toolbar-title>
        </v-toolbar>
        <v-progress-linear v-if="apiRequest" :indeterminate="true"></v-progress-linear>

        <v-card-text>
          <v-form>
            <p align="center">
              Email
              </p>
            <v-text-field label="email" name="code" prepend-icon="mdi-email" type="text"></v-text-field>
          </v-form>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" large>Login</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card-text>
      </v-card>
      <br />
      <p align="center">
        Have an account?
        <a href="login">Login</a>
      </p>
    </v-col>
  </v-row>
</template>

<script>
import LoginOrSingupLayout from "../../../layouts/LoginOrSingupLayout";
import { Auth } from "aws-amplify";

export default {
  components: {},

  data() {
    return {
      email: "ddddd",
      signedIn: false,
      apiRequest: false,
    };
  },

  created() {
    this.$emit(`update:layout`, LoginOrSingupLayout);
    this.isUserSignedIn();
  },
  methods: {
    async isUserSignedIn() {
      try {
        const userObj = await Auth.currentAuthenticatedUser();
        this.signedIn = true;
        console.log(userObj);
      } catch (e) {
        this.signedIn = false;
        console.log(e);
      }
    },
  },
};
</script>