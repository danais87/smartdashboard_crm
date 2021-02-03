<template>
  <v-row align="center" justify="center">
    <br />
    <v-col cols="12" sm="8" md="4">

        <router-link to="/">
          <v-img
            :src="require('../../../assets/logo.svg')"
            class="my-3"
            contain
            height="50"
          />
        </router-link>

      <v-card class="elevation-2">
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>
        <v-progress-linear
          v-if="apiRequest"
          :indeterminate="true"
        ></v-progress-linear>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="user"
              label="username"
              name="username"
              prepend-icon="mdi-account"
              type="text"
            ></v-text-field>
            <v-text-field
              v-model="password"
              id="password"
              label="Password"
              name="password"
              prepend-icon="mdi-lock"
              type="password"
            ></v-text-field>
            <p align="center">
              Forgot Password?
              <a href="forgotPassword">RessetPassword</a>
            </p>
          </v-form>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" large @click="loginUser">Login</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card-text>
      </v-card>
      <br />
    </v-col>
  </v-row>
</template>

<script >
import { Auth } from "aws-amplify";
import LoginOrSingupLayout from "../../../layouts/LoginOrSingupLayout";
import store from "../../../store";
export default {
  components: {},

  data() {
    return {
      username: this.$route.query.name,
      user: "",
      password: "",
      signedIn: false,
      apiRequest: false,
    };
  },

  created() {
    this.$emit(`update:router-view`, LoginOrSingupLayout);
    this.isUserSignedIn();
    console.log(store.state.usuario);
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
    async loginUser() {
      this.apiRequest = true;
      Auth.signIn(this.user, this.password)
        .then((user) => {
          console.log(user.username);
          console.log(
            user.signInUserSession.accessToken["payload"]["cognito:groups"]
          );
          store.state.usuario = user.username;
          store.state.organizationID = user.attributes["custom:organizationID"];
          store.state.role =
            user.signInUserSession.accessToken["payload"]["cognito:groups"];
          console.log(store.state);
          this.$router.push({
            path: "/index",
            query: {
              name: this.user,
              organizationID: user.attributes["custom:organizationID"],
              rol:
                user.signInUserSession.accessToken["payload"]["cognito:groups"],
            },
          });
          this.apiRequest = false;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
