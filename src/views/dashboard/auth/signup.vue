<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <v-col cols="12">
        <router-link to="/">
          <v-img
            :src="require('../../../assets/logo.svg')"
            class="my-3"
            contain
            height="65"
          />
        </router-link>
      </v-col>
      <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>Sign Up</v-toolbar-title>
        </v-toolbar>
        <v-progress-linear
          v-if="apiRequest"
          :indeterminate="true"
        ></v-progress-linear>

        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="username"
              :rules="nameRules"
              label="username"
              prepend-icon="mdi-account"
              required
            ></v-text-field>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="email"
              prepend-icon="mdi-email"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="Password"
              prepend-icon="mdi-lock"
              required
              type="password"
            ></v-text-field>
            <v-checkbox
              v-model="checkbox"
              :rules="[(v) => !!v || 'You must agree to continue!']"
              label="Do you agree?"
              required
            ></v-checkbox>
          </v-form>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!valid"
              color="primary"
              large
              @click="createAccount"
              >Create account</v-btn
            >
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
      password: "",
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) =>
          (v && v.length >= 8) || "Password must be less than 8 characters",
      ],
      valid: true,
      username: "",
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length >= 4) || "Name must be less than 4 characters",
      ],
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      signedIn: false,
      apiRequest: false,
      checkbox: true,
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
    validate() {
      this.$refs.form.validate();
    },
    async createAccount() {
      this.validate();
      this.apiRequest = true;
      Auth.signUp({
        username: this.username,
        password: this.password,

        attributes: {
          email: this.email,
          name: this.username,
          "custom:organizationID": "ORG#Pharmadash",
        },
        validationData: [],
      })
        .then((data) => {
          console.log(data);
          this.apiRequest = false;
          console.log(this.username);
          this.$router.push({
            path: "/confirmSignup",
            query: { email: this.email, name: this.username },
          });
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>